const { useState } = React;
const { ChartVisualizer, CorrelationGrid } = window;

function App() {
  const [activeSection, setActiveSection] = useState('scales');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const data = window.studyGuideData;
  const sections = data.sections;
  const quizQuestions = data.quizQuestions;

  const handleAnswerSelect = (questionIdx, optionIdx) => {
    setUserAnswers({ ...userAnswers, [questionIdx]: optionIdx });
  };

  const calculateScore = () => {
    return Object.keys(userAnswers).filter(
      (key) => userAnswers[key] === quizQuestions[key].correctAnswer
    ).length;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const renderContent = () => {
    const section = sections.find(s => s.id === activeSection);
    if (!section) return <div>Content not found</div>;
    const content = section.content;
    if (!content) return <div>Content not found</div>;

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">{section.title}</h2>
        
        {content.intro && (
          <p className="text-lg text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            {content.intro}
          </p>
        )}

        {/* Measurement Scales */}
        {content.scales && (
          <div className="space-y-4">
            {content.scales.map((scale, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">
                  {scale.number}. {scale.name}
                </h3>
                <p className="text-gray-700 mb-2"><strong>Purpose:</strong> {scale.purpose}</p>
                <p className="text-gray-600 mb-2"><strong>Examples:</strong> {scale.examples}</p>
              </div>
            ))}
          </div>
        )}

        {/* Central Tendency Measures */}
        {content.measures && (
          <div className="space-y-4">
            {content.measures.map((measure, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{measure.name}</h3>
                <p className="text-gray-700 mb-2"><strong>What it is:</strong> {measure.whatItIs}</p>
                <p className="text-gray-700 mb-2"><strong>How to calculate:</strong> {measure.howToCalculate}</p>
                <p className="text-gray-600 mb-2"><strong>When to use:</strong> {measure.whenToUse}</p>
              </div>
            ))}
          </div>
        )}

        {/* Variability Subsections */}
        {content.subsections && (
          <div className="space-y-4">
            {content.subsections.map((subsection, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{subsection.title}</h3>
                <p className="text-gray-700 mb-3">{subsection.content}</p>
                {subsection.rule && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-bold text-yellow-800 mb-2">{subsection.rule.title}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {subsection.rule.points.map((point, pidx) => (
                        <li key={pidx} className="text-gray-700">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {subsection.formula && <p className="text-gray-600 mt-2"><strong>Formula:</strong> {subsection.formula}</p>}
                {subsection.relationship && <p className="text-gray-600 mt-2">{subsection.relationship}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Distribution Types */}
        {content.types && activeSection === 'distributions' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-2"><strong>Tail:</strong> {type.tailDirection}</p>
                <p className="text-gray-700 mb-2"><strong>Where scores are:</strong> {type.whereScoresAre}</p>
                <p className="text-gray-700 mb-2"><strong>Mean vs Median:</strong> {type.meanVsMedian}</p>
                {type.example && <p className="text-gray-600 bg-gray-50 p-3 rounded"><strong>Example:</strong> {type.example}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Correlation Ranges */}
        {content.ranges && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-800">Correlation Strength Guide</h3>
            {content.ranges.map((range, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-indigo-700">{range.strength}</span>
                  <span className="text-sm text-gray-600">{range.value}</span>
                </div>
                <p className="text-gray-700">{range.meaning}</p>
              </div>
            ))}
          </div>
        )}

        {/* Standardized Scores */}
        {content.types && activeSection === 'standardized-scores' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-700 mb-3">{type.name}</h3>
                <p className="text-gray-700"><strong>Mean:</strong> {type.mean}</p>
                <p className="text-gray-700"><strong>SD:</strong> {type.sd}</p>
                <p className="text-gray-600 mt-2"><strong>Used for:</strong> {type.usedFor}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ordinal Scores */}
        {content.ordinalScores && (
          <>
            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Ordinal Scores (Different Scale!)</h3>
            <div className="space-y-4">
              {content.ordinalScores.map((type, idx) => (
                <div key={idx} className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500">
                  <h4 className="text-xl font-bold text-yellow-800 mb-3">{type.name}</h4>
                  <p className="text-gray-700"><strong>Mean:</strong> {type.mean}</p>
                  <p className="text-gray-700"><strong>SD:</strong> {type.sd}</p>
                  <p className="text-gray-700"><strong>Scale:</strong> {type.scale}</p>
                  <p className="text-red-700 mt-2 font-semibold">⚠️ {type.note}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reliability */}
        {content.types && activeSection === 'reliability' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-3">{type.description}</p>
                {type.methods && (
                  <div className="mb-2">
                    <strong className="text-gray-800">Methods:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.methods.map((method, midx) => (
                        <li key={midx} className="text-gray-600">{method}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {type.method && <p className="text-gray-600 mb-2"><strong>Method:</strong> {type.method}</p>}
                {type.uses && <p className="text-gray-600 mb-2"><strong>Uses:</strong> {type.uses}</p>}
                {type.relationship && <p className="text-gray-600 mt-2">{type.relationship}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Reliability Concepts */}
        {content.concepts && activeSection === 'reliability' && (
          <div className="space-y-4 mt-4">
            {content.concepts.map((concept, idx) => (
              <div key={idx} className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">{concept.name}</h3>
                <p className="text-gray-700 mb-2">{concept.description}</p>
                <p className="text-gray-600"><strong>Use:</strong> {concept.use}</p>
                {concept.format && <p className="text-gray-600 mt-2"><strong>Format:</strong> {concept.format}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Validity Evidence Sources */}
        {content.evidenceSources && activeSection === 'validity' && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-bold text-blue-800 mb-2">Five Sources of Validity Evidence</h3>
            <p className="text-gray-700">{content.evidenceSources}</p>
          </div>
        )}

        {/* Validity */}
        {content.types && activeSection === 'validity' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-3">{type.description}</p>
                <p className="text-gray-600"><strong>Purpose:</strong> {type.purpose}</p>
                {type.types && (
                  <div className="mt-3">
                    <strong className="text-gray-800">Types:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.types.map((subtype, sidx) => (
                        <li key={sidx} className="text-gray-600">{subtype}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Test Types */}
        {content.types && activeSection === 'test-types' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-2">{type.description}</p>
                <p className="text-gray-700 mb-2"><strong>Purpose:</strong> {type.purpose}</p>
                {type.examples && (
                  Array.isArray(type.examples) ? (
                    <div className="mb-2">
                      <strong className="text-gray-800">Examples:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {type.examples.map((ex, eidx) => (
                          <li key={eidx} className="text-gray-600">{ex}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-600 mb-2"><strong>Examples:</strong> {type.examples}</p>
                  )
                )}
              </div>
            ))}
          </div>
        )}

        {/* Language Assessment */}
        {content.types && activeSection === 'language' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-3">{type.description}</p>
                {type.skills && (
                  <div className="mb-3">
                    <strong className="text-gray-800">Skills Include:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.skills.map((skill, sidx) => (
                        <li key={sidx} className="text-gray-600">{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scoring */}
        {content.concepts && activeSection === 'scoring' && (
          <div className="space-y-4">
            {content.concepts.map((concept, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{concept.name}</h3>
                <p className="text-gray-700 mb-2">{concept.description}</p>
                {concept.purpose && <p className="text-gray-600"><strong>Purpose:</strong> {concept.purpose}</p>}
                {concept.types && (
                  <div className="mt-2">
                    <strong className="text-gray-800">Types:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {concept.types.map((t, tidx) => (
                        <li key={tidx} className="text-gray-600">{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {concept.format && <p className="text-gray-600 mt-2"><strong>Format:</strong> {concept.format}</p>}
                {concept.note && <p className="text-red-600 mt-2">⚠️ {concept.note}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Norming */}
        {content.concepts && activeSection === 'norming' && (
          <div className="space-y-4">
            {content.concepts.map((concept, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{concept.name}</h3>
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
              </div>
            ))}
          </div>
        )}

        {/* KTEA Activity Topics */}
        {content.activity && (
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">From {content.activity.source}</h3>
            <ul className="list-disc list-inside space-y-1">
              {content.activity.topics.map((topic, idx) => (
                <li key={idx} className="text-gray-700">{topic}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Point */}
        {content.keyPoint && (
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-6">
            <p className="text-gray-800"><strong>🔑 Key Point:</strong> {content.keyPoint}</p>
          </div>
        )}
            
        {/* Visualizations */}
        {section.visualization && (
          <>
            {section.visualization.type === 'correlation' && Array.isArray(section.visualization.config) ? (
              <CorrelationGrid 
                correlations={section.visualization.config}
                sectionId={section.id}
              />
            ) : (
              <ChartVisualizer 
                type={section.visualization.type}
                config={section.visualization.config}
                sectionId={section.id}
              />
            )}
          </>
        )}
      </div>
    );
  };
        
  const renderQuiz = () => {
    if (showResults) {
      const score = calculateScore();
      const percentage = Math.round((score / quizQuestions.length) * 100);

      return (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Quiz Results</h3>
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {score} / {quizQuestions.length}
            </div>
            <div className="text-xl text-gray-600">{percentage}% Correct</div>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, idx) => {
              const isCorrect = userAnswers[idx] === q.correctAnswer;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
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
      {/* Header */}
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
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transition-transform duration-300 z-20 overflow-y-auto`}
        >
          <nav className="p-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setQuizMode(false);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeSection === section.id && !quizMode
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="text-sm">{section.title}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            {quizMode ? renderQuiz() : renderContent()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
