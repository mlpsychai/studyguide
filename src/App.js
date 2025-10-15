const { useState, useMemo, useEffect } = React;

function App() {
  const [dataReady, setDataReady] = useState(false);
  const [componentsReady, setComponentsReady] = useState(false);
  const [studyData, setStudyData] = useState(null);
  const [activeSection, setActiveSection] = useState('scales');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [extraChartsOpen, setExtraChartsOpen] = useState(false);

  // Wait for components to be available
  useEffect(() => {
    // Check if ChartVisualizer is available
    const checkComponents = () => {
      if (window.ChartVisualizer && window.CorrelationGrid) {
        setComponentsReady(true);
        return true;
      }
      return false;
    };

    if (!checkComponents()) {
      // Set up listener for when components are ready
      window.onChartVisualizerReady = () => {
        setComponentsReady(true);
      };

      // Also poll in case the event already fired
      const interval = setInterval(() => {
        if (checkComponents()) {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    // Check if data is already available
    if (window.studyGuideData) {
      setStudyData(window.studyGuideData);
      setDataReady(true);
    } else {
      // Wait for data to be ready
      const handler = () => {
        if (window.studyGuideData) {
          setStudyData(window.studyGuideData);
          setDataReady(true);
        }
      };
      window.addEventListener('studyGuideDataReady', handler);
      
      // Also check periodically in case the event already fired
      const interval = setInterval(() => {
        if (window.studyGuideData) {
          setStudyData(window.studyGuideData);
          setDataReady(true);
          clearInterval(interval);
        }
      }, 100);

      return () => {
        window.removeEventListener('studyGuideDataReady', handler);
        clearInterval(interval);
      };
    }
  }, []);

  // Get components from window only when ready
  const ChartVisualizer = componentsReady ? window.ChartVisualizer : null;
  const CorrelationGrid = componentsReady ? window.CorrelationGrid : null;

  if (!dataReady || !studyData || !componentsReady) {
    return React.createElement('div', { className: 'min-h-screen bg-gray-50 flex items-center justify-center' },
      React.createElement('div', { className: 'text-center' },
        React.createElement('div', { className: 'text-4xl mb-4' }, '📚'),
        React.createElement('div', { className: 'text-xl text-gray-600' }, 
          'Loading study guide' + 
          (!dataReady ? ' (data)' : '') + 
          (!componentsReady ? ' (components)' : '') + 
          '...'
        )
      )
    );
  }

  const sections = studyData.sections || [];
  const quizQuestions = studyData.quizQuestions || [];

  const mainSections = useMemo(() => {
    return sections.filter(s => !s.isExtraChart);
  }, [sections]);

  const extraChartSections = useMemo(() => {
    return sections.filter(s => s.isExtraChart);
  }, [sections]);

  const currentSection = useMemo(() => {
    return sections.find(s => s.id === activeSection);
  }, [activeSection, sections]);

  const sectionContent = useMemo(() => {
    if (!currentSection) return null;
    return currentSection.content;
  }, [currentSection]);

  const visualizationConfig = useMemo(() => {
    if (!currentSection?.visualization) return null;
    return {
      type: currentSection.visualization.type,
      config: currentSection.visualization.config,
      sectionId: currentSection.id
    };
  }, [currentSection]);

  const handleAnswerSelect = (questionIdx, answerIdx) => {
    setUserAnswers(prev => ({ ...prev, [questionIdx]: answerIdx }));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const renderQuizResults = () => {
    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return React.createElement('div', { className: 'max-w-3xl mx-auto p-6' },
      React.createElement('div', { className: 'bg-white p-8 rounded-lg shadow-lg mb-6' },
        React.createElement('h2', { className: 'text-3xl font-bold text-center mb-4' }, 'Quiz Results'),
        React.createElement('div', { className: 'text-center mb-6' },
          React.createElement('div', { className: 'text-6xl font-bold text-indigo-600 mb-2' }, `${percentage}%`),
          React.createElement('p', { className: 'text-xl text-gray-600' }, `${score} out of ${quizQuestions.length} correct`)
        ),
        React.createElement('div', { className: 'flex justify-center mb-4' },
          React.createElement('div', { className: 'text-4xl' },
            percentage >= 90 ? '🌟' : percentage >= 80 ? '🎉' : percentage >= 70 ? '👍' : '📚'
          )
        )
      ),
      React.createElement('div', { className: 'space-y-4' },
        React.createElement('h3', { className: 'text-2xl font-bold mb-4' }, 'Review Your Answers'),
        quizQuestions.map((q, idx) => {
          const isCorrect = userAnswers[idx] === q.correctAnswer;
          return React.createElement('div', {
            key: idx,
            className: `bg-white p-6 rounded-lg shadow border-l-4 ${
              isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
            }`
          },
            React.createElement('div', { className: 'flex items-start gap-3 mb-2' },
              isCorrect
                ? React.createElement('span', { className: 'text-green-600 text-xl' }, '✓')
                : React.createElement('span', { className: 'text-red-600 text-xl' }, '✗'),
              React.createElement('p', { className: 'font-semibold text-gray-800' },
                `${idx + 1}. ${q.question}`
              )
            ),
            React.createElement('p', { className: 'text-sm text-gray-700 ml-8 mb-2' },
              React.createElement('strong', null, 'Your answer: '),
              q.options[userAnswers[idx]]
            ),
            !isCorrect && React.createElement('p', { className: 'text-sm text-gray-700 ml-8 mb-2' },
              React.createElement('strong', null, 'Correct answer: '),
              q.options[q.correctAnswer]
            ),
            React.createElement('p', { className: 'text-sm text-gray-600 ml-8 italic' }, q.explanation)
          );
        })
      ),
      React.createElement('div', { className: 'mt-8 text-center' },
        React.createElement('button', {
          onClick: () => {
            resetQuiz();
            setQuizMode(false);
          },
          className: 'px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        }, 'Return to Study Guide')
      )
    );
  };

  const renderQuizQuestion = () => {
    if (showResults) {
      return renderQuizResults();
    }

    const currentQ = quizQuestions[currentQuestion];

    return React.createElement('div', null,
      React.createElement('div', { className: 'mb-6' },
        React.createElement('div', { className: 'flex justify-between text-sm text-gray-600 mb-2' },
          React.createElement('span', null, `Question ${currentQuestion + 1} of ${quizQuestions.length}`),
          React.createElement('span', null, `${Object.keys(userAnswers).length} answered`)
        ),
        React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-2' },
          React.createElement('div', {
            className: 'bg-indigo-600 h-2 rounded-full transition-all',
            style: { width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }
          })
        )
      ),
      React.createElement('div', { className: 'mb-8' },
        React.createElement('h3', { className: 'text-xl font-bold mb-4' }, currentQ.question),
        React.createElement('div', { className: 'space-y-3' },
          currentQ.options.map((option, idx) =>
            React.createElement('button', {
              key: idx,
              onClick: () => handleAnswerSelect(currentQuestion, idx),
              className: `w-full text-left p-4 rounded-lg border-2 transition ${
                userAnswers[currentQuestion] === idx
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-indigo-300'
              }`
            }, option)
          )
        )
      ),
      React.createElement('div', { className: 'flex justify-between' },
        React.createElement('button', {
          onClick: () => setCurrentQuestion(Math.max(0, currentQuestion - 1)),
          disabled: currentQuestion === 0,
          className: 'px-6 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition'
        }, 'Previous'),
        currentQuestion < quizQuestions.length - 1
          ? React.createElement('button', {
              onClick: () => setCurrentQuestion(currentQuestion + 1),
              className: 'px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
            }, 'Next')
          : React.createElement('button', {
              onClick: () => setShowResults(true),
              className: 'px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition'
            }, 'Submit Quiz')
      )
    );
  };

  return React.createElement('div', { className: 'min-h-screen bg-gray-50' },
    React.createElement('header', { className: 'bg-white shadow-md sticky top-0 z-50' },
      React.createElement('div', { className: 'max-w-7xl mx-auto px-4 py-4 flex items-center justify-between' },
        React.createElement('div', { className: 'flex items-center gap-4' },
          React.createElement('button', {
            onClick: () => setSidebarOpen(!sidebarOpen),
            className: 'lg:hidden p-2 hover:bg-gray-100 rounded'
          }, sidebarOpen ? '✕' : '☰'),
          React.createElement('h1', { className: 'text-2xl font-bold text-gray-800' },
            '📚 Statistics & Assessment Study Guide'
          )
        ),
        React.createElement('button', {
          onClick: () => {
            setQuizMode(!quizMode);
            if (!quizMode) resetQuiz();
          },
          className: 'px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
        }, quizMode ? 'Exit Quiz' : 'Take Quiz')
      )
    ),
    React.createElement('div', { className: 'flex max-w-7xl mx-auto' },
      React.createElement('aside', {
        className: `${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto`,
        style: { top: '73px' }
      },
        React.createElement('nav', { className: 'p-4' },
          React.createElement('h2', { className: 'text-lg font-bold mb-4 text-gray-800' }, 'Topics'),
          React.createElement('ul', { className: 'space-y-2' },
            mainSections.map((section) =>
              React.createElement('li', { key: section.id },
                React.createElement('button', {
                  onClick: () => {
                    setActiveSection(section.id);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  },
                  className: `w-full text-left px-4 py-2 rounded-lg transition ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`
                },
                  React.createElement('span', { className: 'mr-2' }, section.icon),
                  section.title
                )
              )
            )
          ),
          React.createElement('div', { className: 'mt-6' },
            React.createElement('button', {
              onClick: () => setExtraChartsOpen(!extraChartsOpen),
              className: 'w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-between'
            },
              React.createElement('span', null, '📊 Extra Chart Examples'),
              React.createElement('span', null, extraChartsOpen ? '▼' : '▶')
            ),
            extraChartsOpen && React.createElement('ul', { className: 'mt-2 space-y-2 ml-2' },
              extraChartSections.map((section) =>
                React.createElement('li', { key: section.id },
                  React.createElement('button', {
                    onClick: () => {
                      setActiveSection(section.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    },
                    className: `w-full text-left px-4 py-2 rounded-lg transition text-sm ${
                      activeSection === section.id
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`
                  },
                    React.createElement('span', { className: 'mr-2' }, section.icon),
                    section.title
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement('main', { className: 'flex-1 p-6' },
        quizMode
          ? React.createElement('div', { className: 'max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg' },
              renderQuizQuestion()
            )
          : React.createElement('div', null,
              currentSection && React.createElement('div', { className: 'mb-6' },
                React.createElement('h2', { className: 'text-3xl font-bold text-gray-800 flex items-center gap-3' },
                  React.createElement('span', { className: 'text-4xl' }, currentSection.icon),
                  currentSection.title
                )
              ),
              sectionContent && React.createElement('div', { className: 'space-y-6' },
                sectionContent.intro && React.createElement('div', { className: 'bg-white p-6 rounded-lg shadow' },
                  React.createElement('p', { className: 'text-lg text-gray-700' }, sectionContent.intro)
                ),
                sectionContent.keyPoint && React.createElement('div', { className: 'bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-6' },
                  React.createElement('p', { className: 'text-gray-800' },
                    React.createElement('strong', null, '🔑 Key Point: '),
                    sectionContent.keyPoint
                  )
                ),
                visualizationConfig && (
                  visualizationConfig.type === 'correlation' && Array.isArray(visualizationConfig.config)
                    ? React.createElement(CorrelationGrid, {
                        key: visualizationConfig.sectionId,
                        correlations: visualizationConfig.config,
                        sectionId: visualizationConfig.sectionId
                      })
                    : React.createElement(ChartVisualizer, {
                        key: visualizationConfig.sectionId,
                        type: visualizationConfig.type,
                        config: visualizationConfig.config,
                        sectionId: visualizationConfig.sectionId
                      })
                )
              )
            )
      )
    )
  );
}

// Mount the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(React.createElement(App));
  });
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(React.createElement(App));
}

console.log('✅ App component loaded');
