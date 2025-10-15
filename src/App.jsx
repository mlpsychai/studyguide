const { useState, useMemo, useEffect } = React;
const { ChartVisualizer, CorrelationGrid } = window;

function App() {
  const [dataReady, setDataReady] = useState(false);
  const [studyData, setStudyData] = useState(null);
  const [activeSection, setActiveSection] = useState('scales');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [extraChartsOpen, setExtraChartsOpen] = useState(false);

  useEffect(() => {
    if (window.studyGuideData) {
      setStudyData(window.studyGuideData);
      setDataReady(true);
    } else {
      const handler = () => {
        setStudyData(window.studyGuideData);
        setDataReady(true);
      };
      window.addEventListener('studyGuideDataReady', handler);
      return () => window.removeEventListener('studyGuideDataReady', handler);
    }
  }, []);

  if (!dataReady || !studyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <div className="text-xl text-gray-600">Loading study guide...</div>
        </div>
      </div>
    );
  }

  const sections = studyData.sections;
  const quizQuestions = studyData.quizQuestions;

  const mainSections = useMemo(() => {
    if (!sections || !Array.isArray(sections)) return [];
    return sections.filter(s => !s.isExtraChart);
  }, [sections]);

  const extraChartSections = useMemo(() => {
    if (!sections || !Array.isArray(sections)) return [];
    return sections.filter(s => s.isExtraChart);
  }, [sections]);

  const currentSection = useMemo(() => {
    if (!sections || !Array.isArray(sections)) return null;
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

  // DEBUG LOGGING
  useEffect(() => {
    console.log('🔄 RENDER CYCLE:', {
      dataReady,
      sectionsLength: sections?.length,
      mainSectionsLength: mainSections?.length,
      extraChartsLength: extraChartSections?.length,
      currentSectionId: currentSection?.id,
      activeSection,
      hasSectionContent: !!sectionContent,
      hasVisualizationConfig: !!visualizationConfig,
      visualizationConfigType: visualizationConfig?.type
    });
  });

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

    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Quiz Results
          </h2>
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {percentage}%
            </div>
            <p className="text-xl text-gray-600">
              {score} out of {quizQuestions.length} correct
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="text-4xl">
              {percentage >= 90 ? '🌟' : percentage >= 80 ? '🎉' : percentage >= 70 ? '👍' : '📚'}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-4">Review Your Answers</h3>
          {quizQuestions.map((q, idx) => {
            const isCorrect = userAnswers[idx] === q.correctAnswer;
            return (
              <div
                key={idx}
                className={`bg-white p-6 rounded-lg shadow border-l-4 ${
                  isCorrect
                    ? 'border-green-300 bg-green-50'
                    : 'border-red-300 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  {isCorrect ? (
                    <span className="text-green-600 text-xl">✓</span>
                  ) : (
                    <span className="text-red-600 text-xl">✗</span>
                  )}
                  <p className="font-semibold text-gray-800">
                    {idx + 1}. {q.question}
                  </p>
                </div>
                <p className="text-sm text-gray-700 ml-8 mb-2">
                  <strong>Your answer:</strong> {q.options[userAnswers[idx]]}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-gray-700 ml-8 mb-2">
                    <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                  </p>
                )}
                <p className="text-sm text-gray-600 ml-8 italic">{q.explanation}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              resetQuiz();
              setQuizMode(false);
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Return to Study Guide
          </button>
        </div>
      </div>
    );
  };

  const renderQuizQuestion = () => {
    if (showResults) {
      return renderQuizResults();
    }

    const currentQ = quizQuestions[currentQuestion];

    return (
      <div>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span>{Object.keys(userAnswers).length} answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(currentQuestion, idx)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  userAnswers[currentQuestion] === idx
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
          >
            Previous
          </button>
          {currentQuestion < quizQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              📚 Statistics & Assessment Study Guide
            </h1>
          </div>
          <button
            onClick={() => {
              setQuizMode(!quizMode);
              if (!quizMode) resetQuiz();
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {quizMode ? 'Exit Quiz' : 'Take Quiz'}
          </button>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto`}
          style={{ top: '73px' }}
        >
          <nav className="p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Topics</h2>
            <ul className="space-y-2">
              {mainSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeSection === section.id
                        ? 'bg-indigo-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                onClick={() => setExtraChartsOpen(!extraChartsOpen)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-between"
              >
                <span>📊 Extra Chart Examples</span>
                <span>{extraChartsOpen ? '▼' : '▶'}</span>
              </button>
              {extraChartsOpen && (
                <ul className="mt-2 space-y-2 ml-2">
                  {extraChartSections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition text-sm ${
                          activeSection === section.id
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="mr-2">{section.icon}</span>
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {quizMode ? (
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              {renderQuizQuestion()}
            </div>
          ) : (
            <div>
              {currentSection && (
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-4xl">{currentSection.icon}</span>
                    {currentSection.title}
                  </h2>
                </div>
              )}

              {sectionContent && (
                <div className="space-y-6">
                  {sectionContent.intro && (
                    <div className="bg-white p-6 rounded-lg shadow">
                      <p className="text-lg text-gray-700">{sectionContent.intro}</p>
                    </div>
                  )}

                  {sectionContent.explanation && (
                    <div className="space-y-4">
                      {sectionContent.explanation.map((section, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow">
                          <h3 className="text-xl font-bold text-indigo-700 mb-3">
                            {section.title}
                          </h3>
                          <ul className="list-disc list-inside space-y-2">
                            {section.points.map((point, pidx) => (
                              <li key={pidx} className="text-gray-700">{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionContent.ranges && (
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-bold text-indigo-700 mb-4">
                        Correlation Strength Guide
                      </h3>
                      <div className="space-y-3">
                        {sectionContent.ranges.map((range, idx) => (
                          <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                            <div className="font-bold text-gray-800">{range.value}</div>
                            <div className="text-gray-600">{range.strength}</div>
                            <div className="text-sm text-gray-500">{range.meaning}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sectionContent.types && (
                    <div className="space-y-4">
                      {sectionContent.types.map((type, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow">
                          <h3 className="text-xl font-bold text-indigo-700 mb-2">
                            {type.name}
                          </h3>
                          <p className="text-gray-700 mb-2">{type.description}</p>
                          {type.mean && (
                            <p className="text-gray-600">
                              <strong>Mean:</strong> {type.mean}
                              {type.sd && <>, <strong>SD:</strong> {type.sd}</>}
                            </p>
                          )}
                          {type.usedFor && (
                            <p className="text-gray-600">
                              <strong>Used for:</strong> {type.usedFor}
                            </p>
                          )}
                          {type.methods && (
                            <div className="mt-2">
                              <strong className="text-gray-800">Methods:</strong>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {type.methods.map((method, midx) => (
                                  <li key={midx} className="text-gray-600">{method}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {type.method && (
                            <p className="text-gray-600">
                              <strong>Method:</strong> {type.method}
                            </p>
                          )}
                          {type.uses && (
                            <p className="text-gray-600">
                              <strong>Uses:</strong> {type.uses}
                            </p>
                          )}
                          {type.limitation && (
                            <p className="text-gray-600 italic">
                              <strong>Limitation:</strong> {type.limitation}
                            </p>
                          )}
                          {type.relationship && (
                            <p className="text-gray-600">
                              <strong>Relationship:</strong> {type.relationship}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionContent.ordinalScores && (
                    <div className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500">
                      <h3 className="text-xl font-bold text-yellow-800 mb-4">
                        ⚠️ Ordinal Scales (Unequal Intervals!)
                      </h3>
                      <div className="space-y-4">
                        {sectionContent.ordinalScores.map((score, idx) => (
                          <div key={idx} className="bg-white p-4 rounded">
                            <div className="font-bold text-gray-800">{score.name}</div>
                            <div className="text-sm text-gray-600">
                              <strong>Scale:</strong> {score.scale}
                            </div>
                            {score.mean && (
                              <div className="text-sm text-gray-600">
                                <strong>Mean:</strong> {score.mean}
                              </div>
                            )}
                            <div className="text-sm text-gray-500 italic mt-1">
                              {score.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sectionContent.concepts && (
                    <div className="space-y-4">
                      {sectionContent.concepts.map((concept, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow">
                          <h3 className="text-xl font-bold text-indigo-700 mb-2">
                            {concept.name}
                          </h3>
                          <p className="text-gray-700 mb-2">{concept.description}</p>
                          <p className="text-gray-600"><strong>Purpose:</strong> {concept.purpose}</p>
                          {concept.factors && (
                            <div className="mt-3">
                              <strong className="text-gray-800">Factors:</strong>
                              <ul className="list-disc list-inside mt-1 space-y-1">
                                {concept.factors.map((factor, fidx) => (
                                  <li key={fidx} className="text-gray-600">{factor}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {concept.note && <p className="text-gray-600 mt-2 italic">{concept.note}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {sectionContent.activity && (
                    <div className="bg-white p-6 rounded-lg shadow mb-4">
                      <h3 className="text-xl font-bold text-indigo-700 mb-3">From {sectionContent.activity.source}</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {sectionContent.activity.topics.map((topic, idx) => (
                          <li key={idx} className="text-gray-700">{topic}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sectionContent.keyPoint && (
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-6">
                      <p className="text-gray-800"><strong>🔑 Key Point:</strong> {sectionContent.keyPoint}</p>
                    </div>
                  )}
                  
                  {visualizationConfig && (
                    <>
                      {visualizationConfig.type === 'correlation' && Array.isArray(visualizationConfig.config) ? (
                        <CorrelationGrid correlations={visualizationConfig.config} />
                      ) : (
                        <ChartVisualizer
                          type={visualizationConfig.type}
                          config={visualizationConfig.config}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
