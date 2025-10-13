const { useState } = React;

function StatisticsStudyGuide() {
  const [activeSection, setActiveSection] = useState('intro');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Get data from external file
  const { sections, contentData, quizQuestions } = window.studyGuideData || { sections: [], contentData: {}, quizQuestions: [] };

  const handleAnswer = (questionIndex, answerIndex) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answerIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswer) correct++;
    });
    return { correct, total: quizQuestions.length, percentage: Math.round((correct / quizQuestions.length) * 100) };
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setQuizMode(false);
  };

  const renderContent = () => {
    const content = contentData[activeSection];
    if (!content) return <p className="text-gray-600">Content loading...</p>;

    return (
      <div className="space-y-6">
        <div className="prose max-w-none">
          {content.intro && <p className="text-lg text-gray-700 leading-relaxed">{content.intro}</p>}
          
          {content.sections && content.sections.map((section, idx) => (
            <div key={idx} className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h3>
              <p className="text-gray-700">{section.content}</p>
            </div>
          ))}

          {content.items && (
            <div className="grid gap-4 mt-4">
              {content.items.map((item, idx) => (
                <div key={idx} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900">{item.name || item.title}</h4>
                  <p className="text-gray-700 mt-2">{item.description || item.content}</p>
                  {item.details && <p className="text-sm text-gray-600 mt-2">{item.details}</p>}
                </div>
              ))}
            </div>
          )}

          {content.keyPoint && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
              <p className="font-semibold text-yellow-900">💡 Key Point:</p>
              <p className="text-gray-700 mt-2">{content.keyPoint}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    if (showResults) {
      const score = calculateScore();
      return (
        <div className="space-y-6">
          <div className="text-center py-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
            <div className="text-6xl font-bold text-indigo-600 mb-4">{score.percentage}%</div>
            <p className="text-xl text-gray-600">{score.correct} out of {score.total} correct</p>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={index} className={`p-6 rounded-lg border-2 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`text-2xl ${isCorrect ? '✅' : '❌'}`}>{isCorrect ? '✅' : '❌'}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Question {index + 1}</h3>
                      <p className="text-gray-800 mb-3">{q.question}</p>
                      
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} className={`p-3 rounded ${
                            optIndex === q.correctAnswer ? 'bg-green-100 border-2 border-green-500' :
                            optIndex === userAnswer ? 'bg-red-100 border-2 border-red-500' :
                            'bg-white border border-gray-200'
                          }`}>
                            {option}
                            {optIndex === q.correctAnswer && <span className="ml-2 text-green-700 font-semibold">✓ Correct</span>}
                            {optIndex === userAnswer && optIndex !== q.correctAnswer && <span className="ml-2 text-red-700 font-semibold">✗ Your Answer</span>}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 p-3 bg-white bg-opacity-70 rounded">
                        <p className="text-sm text-gray-700"><strong>Explanation:</strong> {q.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button onClick={resetQuiz} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
              Back to Study Guide
            </button>
          </div>
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];
    if (!question) return <p>No questions available</p>;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Question {currentQuestion + 1} of {quizQuestions.length}</h2>
          <div className="text-sm text-gray-600">{Object.keys(userAnswers).length} / {quizQuestions.length} answered</div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl text-gray-800 mb-6">{question.question}</p>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion, index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition ${
                  userAnswers[currentQuestion] === index
                    ? 'bg-indigo-100 border-indigo-500'
                    : 'bg-white border-gray-200 hover:border-indigo-300'
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
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion < quizQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(userAnswers).length < quizQuestions.length}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-indigo-600">📊 Statistics & Assessment Study Guide</h1>
          <button
            onClick={() => {
              setQuizMode(!quizMode);
              if (!quizMode) {
                setUserAnswers({});
                setCurrentQuestion(0);
                setShowResults(false);
              }
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {quizMode ? 'Exit Quiz' : '📝 Take Quiz'}
          </button>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
          <nav className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setQuizMode(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeSection === section.id && !quizMode
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {section.icon} {section.title}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            {quizMode ? renderQuiz() : (
              <>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  {sections.find(s => s.id === activeSection)?.title || 'Content'}
                </h2>
                {renderContent()}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StatisticsStudyGuide />);
