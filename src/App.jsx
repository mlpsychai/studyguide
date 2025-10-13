const { useState } = React;
const { ChartVisualizer, CorrelationGrid } = window;

function App() {
  const [activeSection, setActiveSection] = useState('scales');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load data from window.studyGuideData
  const data = window.studyGuideData;
  const sections = data.sections;
  const contentData = data.contentData;
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
        <h2 className="text-3xl font-bold text-gray-800">{content.title}</h2>
        
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
                {scale.math && <p className="text-sm text-gray-600"><strong>Math:</strong> {scale.math}</p>}
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
                {measure.symbol && <p className="text-sm text-gray-600 mb-2"><strong>Symbol:</strong> {measure.symbol}</p>}
                <p className="text-gray-700 mb-2">{measure.definition}</p>
                {measure.example && <p className="text-gray-600 bg-gray-50 p-3 rounded"><strong>Example:</strong> {measure.example}</p>}
                {measure.sensitivity && <p className="text-sm text-gray-600 mt-2"><strong>Note:</strong> {measure.sensitivity}</p>}
              </div>
            ))}
            {content.normalDistribution && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700">{content.normalDistribution}</p>
              </div>
            )}
          </div>
        )}

        {/* Variability Concepts */}
        {content.concepts && (
          <div className="space-y-4">
            {content.concepts.map((concept, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{concept.name}</h3>
                {concept.symbol && <p className="text-sm text-gray-600 mb-2"><strong>Symbol:</strong> {concept.symbol}</p>}
                <p className="text-gray-700 mb-2">{concept.definition}</p>
                {concept.example && <p className="text-gray-600 bg-gray-50 p-3 rounded"><strong>Example:</strong> {concept.example}</p>}
                {concept.interpretation && <p className="text-sm text-gray-600 mt-2">{concept.interpretation}</p>}
                {concept.relationship && <p className="text-sm text-gray-600 mt-2">{concept.relationship}</p>}
                {concept.limitation && <p className="text-sm text-gray-600 mt-2"><strong>Limitation:</strong> {concept.limitation}</p>}
              </div>
            ))}
            {content.rule68_95_997 && (
              <div className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">{content.rule68_95_997.title}</h3>
                <p className="text-gray-700 mb-2">{content.rule68_95_997.description}</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  {content.rule68_95_997.rules.map((rule, idx) => (
                    <li key={idx} className="text-gray-700">{rule}</li>
                  ))}
                </ul>
                <div className="bg-white p-3 rounded mt-3">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{content.rule68_95_997.example}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Distribution Types */}
        {content.types && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-3">{type.description}</p>
                {type.characteristics && (
                  <div className="mb-3">
                    <strong className="text-gray-800">Characteristics:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.characteristics.map((char, cidx) => (
                        <li key={cidx} className="text-gray-600">{char}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {type.example && <p className="text-gray-600 bg-gray-50 p-3 rounded"><strong>Example:</strong> {type.example}</p>}
                {type.mnemonic && <p className="text-sm text-purple-700 mt-2 italic">💡 {type.mnemonic}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Correlation */}
        {content.symbol && (
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-700"><strong>Symbol:</strong> {content.symbol}</p>
          </div>
        )}
        {content.interpretation && (
          <div className="space-y-4">
            {content.interpretation.map((interp, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{interp.type}</h3>
                <p className="text-gray-600 mb-2"><strong>Range:</strong> {interp.range}</p>
                <p className="text-gray-700 mb-2">{interp.meaning}</p>
                {interp.example && <p className="text-gray-600 bg-gray-50 p-3 rounded"><strong>Example:</strong> {interp.example}</p>}
                {interp.strength && <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{interp.strength}</p>}
              </div>
            ))}
          </div>
        )}
        {content.comparing && (
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-green-800 mb-2">{content.comparing.title}</h3>
            <p className="text-gray-700 mb-2">{content.comparing.rule}</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">{content.comparing.example}</p>
          </div>
        )}
        {content.causation && (
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <p className="text-lg font-bold text-red-800 mb-2">{content.causation.warning}</p>
            <p className="text-gray-700 whitespace-pre-line">{content.causation.explanation}</p>
          </div>
        )}

        {/* Standardized Scores */}
        {content.types && activeSection === 'scores' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-700 mb-3">{type.name}</h3>
                {type.mean !== undefined && <p className="text-gray-700"><strong>Mean:</strong> {type.mean}</p>}
                {type.sd !== undefined && <p className="text-gray-700"><strong>SD:</strong> {type.sd}</p>}
                {type.meaning && <p className="text-gray-700"><strong>Meaning:</strong> {type.meaning}</p>}
                {type.range && <p className="text-gray-700"><strong>Range:</strong> {type.range}</p>}
                {type.formula && <p className="text-gray-600 bg-gray-50 p-2 rounded mt-2"><strong>Formula:</strong> {type.formula}</p>}
                {type.conversion && <p className="text-gray-600 bg-gray-50 p-2 rounded mt-2"><strong>Conversion:</strong> {type.conversion}</p>}
                {type.interpretation && <p className="text-gray-700 mt-2">{type.interpretation}</p>}
                {type.example && <p className="text-gray-600 mt-2"><strong>Example:</strong> {type.example}</p>}
                {type.use && <p className="text-sm text-gray-600 mt-2"><strong>Use:</strong> {type.use}</p>}
                {type.scale && <p className="text-sm text-purple-700 mt-2"><strong>Scale:</strong> {type.scale}</p>}
                {type.caution && <p className="text-sm text-red-700 mt-2">⚠️ {type.caution}</p>}
                {type.percentages && <p className="text-sm text-gray-600 mt-2">{type.percentages}</p>}
                {type.explanation && <p className="text-gray-700 mt-2">{type.explanation}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Reliability */}
        {content.definition && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
            <p className="text-gray-700"><strong>Definition:</strong> {content.definition}</p>
          </div>
        )}
        {content.types && activeSection === 'reliability' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-3">{type.description}</p>
                {type.process && <p className="text-gray-600 mb-2"><strong>Process:</strong> {type.process}</p>}
                {type.interpretation && <p className="text-gray-600 mb-2"><strong>Interpretation:</strong> {type.interpretation}</p>}
                {type.methods && (
                  <div className="mt-3 space-y-3">
                    {type.methods.map((method, midx) => (
                      <div key={midx} className="bg-gray-50 p-4 rounded">
                        <h4 className="font-bold text-gray-800 mb-1">{method.name}</h4>
                        <p className="text-gray-700 text-sm mb-1">{method.process}</p>
                        <p className="text-gray-600 text-sm">{method.interpretation}</p>
                        {method.limitation && <p className="text-sm text-red-600 mt-1">⚠️ {method.limitation}</p>}
                        {method.goodValue && <p className="text-sm text-green-600 mt-1">✓ {method.goodValue}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {type.considerations && (
                  <div className="mt-3">
                    <strong className="text-gray-800">Considerations:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.considerations.map((consideration, cidx) => (
                        <li key={cidx} className="text-gray-600 text-sm">{consideration}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {type.threats && <p className="text-sm text-red-600 mt-2"><strong>Threats:</strong> {type.threats}</p>}
                {type.importance && <p className="text-sm text-blue-700 mt-2">{type.importance}</p>}
                {type.example && <p className="text-gray-600 mt-2 bg-gray-50 p-3 rounded"><strong>Example:</strong> {type.example}</p>}
                {type.measures && <p className="text-sm text-gray-600 mt-2"><strong>Measures:</strong> {type.measures}</p>}
              </div>
            ))}
          </div>
        )}
        {content.sem && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">{content.sem.title}</h3>
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> {content.sem.definition}</p>
            <p className="text-gray-600 bg-white p-2 rounded mb-2"><strong>Formula:</strong> {content.sem.formula}</p>
            <p className="text-gray-700 mb-2 whitespace-pre-line"><strong>Relationship:</strong> {content.sem.relationship}</p>
            <p className="text-gray-700 mb-2"><strong>Use:</strong> {content.sem.use}</p>
            <p className="text-gray-700 mb-2">{content.sem.interpretation}</p>
            <p className="text-sm text-gray-600 whitespace-pre-line">{content.sem.example}</p>
          </div>
        )}

        {/* Validity */}
        {content.relationship && activeSection === 'validity' && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
            <p className="text-gray-700">{content.relationship}</p>
          </div>
        )}
        {content.types && activeSection === 'validity' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                {type.question && <p className="text-gray-600 italic mb-2">{type.question}</p>}
                <p className="text-gray-700 mb-3">{type.description}</p>
                {type.process && <p className="text-gray-600 mb-2"><strong>Process:</strong> {type.process}</p>}
                {type.threats && (
                  <div className="mt-2">
                    <strong className="text-red-700">Threats:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.threats.map((threat, tidx) => (
                        <li key={tidx} className="text-gray-600 text-sm">{threat}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {type.example && <p className="text-gray-600 mt-3 bg-gray-50 p-3 rounded"><strong>Example:</strong> {type.example}</p>}
                {type.validation && <p className="text-sm text-green-700 mt-2">{type.validation}</p>}
                {type.importance && <p className="text-sm text-blue-700 mt-2">{type.importance}</p>}
                {type.limitation && <p className="text-sm text-gray-600 mt-2">{type.limitation}</p>}
                {type.biasFactors && <p className="text-sm text-red-600 mt-2"><strong>Bias Factors:</strong> {type.biasFactors}</p>}
                {type.types && (
                  <div className="mt-3 space-y-2">
                    {type.types.map((subtype, sidx) => (
                      <div key={sidx} className="bg-gray-50 p-3 rounded">
                        <h4 className="font-bold text-gray-800 mb-1">{subtype.subtype}</h4>
                        <p className="text-sm text-gray-600 mb-1"><strong>Timing:</strong> {subtype.timing}</p>
                        <p className="text-sm text-gray-700">{subtype.example}</p>
                        {subtype.use && <p className="text-sm text-gray-600 mt-1"><strong>Use:</strong> {subtype.use}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {content.fiveSources && (
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-bold text-green-800 mb-2">{content.fiveSources.title}</h3>
            <p className="text-gray-700 mb-2">{content.fiveSources.description}</p>
            <ul className="list-disc list-inside space-y-1">
              {content.fiveSources.sources.map((source, idx) => (
                <li key={idx} className="text-gray-700">{source}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Test Types */}
        {content.types && activeSection === 'test-types' && (
          <div className="space-y-4">
            {content.types.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
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
                {type.uses && <p className="text-gray-600 mb-2"><strong>Uses:</strong> {type.uses}</p>}
                {type.use && <p className="text-gray-600 mb-2"><strong>Use:</strong> {type.use}</p>}
                {type.characteristics && <p className="text-gray-600 mb-2">{type.characteristics}</p>}
                {type.difference && <p className="text-gray-600 mb-2 italic">{type.difference}</p>}
                {type.interpretation && <p className="text-gray-600 mb-2">{type.interpretation}</p>}
                {type.example && <p className="text-gray-600 bg-gray-50 p-3 rounded">{type.example}</p>}
                {type.followUp && <p className="text-sm text-blue-700 mt-2">{type.followUp}</p>}
                {type.scores && <p className="text-sm text-gray-600 mt-2"><strong>Scores:</strong> {type.scores}</p>}
                {type.domains && <p className="text-sm text-gray-600 mt-2"><strong>Domains:</strong> {type.domains}</p>}
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
                <p className="text-gray-700 mb-3"><strong>Definition:</strong> {type.definition}</p>
                {type.includes && (
                  <div className="mb-3">
                    <strong className="text-gray-800">Includes:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.includes.map((item, iidx) => (
                        <li key={iidx} className="text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {type.assessment && <p className="text-gray-600 mb-2"><strong>Assessment:</strong> {type.assessment}</p>}
                {type.example && <p className="text-gray-600 bg-gray-50 p-3 rounded mb-2"><strong>Example:</strong> {type.example}</p>}
                {type.developmentalNote && <p className="text-sm text-blue-700">💡 {type.developmentalNote}</p>}
              </div>
            ))}
          </div>
        )}
        {content.relationship && activeSection === 'language' && (
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 mb-2"><strong>Normal:</strong> {content.relationship.normal}</p>
            <p className="text-gray-700 mb-2"><strong>Concern:</strong> {content.relationship.concern}</p>
            <p className="text-gray-700"><strong>Pattern:</strong> {content.relationship.pattern}</p>
          </div>
        )}

        {/* Scoring */}
        {content.scoreTypes && (
          <div className="space-y-4">
            {content.scoreTypes.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{type.name}</h3>
                <p className="text-gray-700 mb-2"><strong>Definition:</strong> {type.definition}</p>
                {type.characteristics && <p className="text-gray-600 mb-2">{type.characteristics}</p>}
                {type.use && <p className="text-gray-600 mb-2"><strong>Use:</strong> {type.use}</p>}
                {type.limitation && <p className="text-gray-600 mb-2"><strong>Limitation:</strong> {type.limitation}</p>}
                {type.example && <p className="text-gray-600 bg-gray-50 p-3 rounded mb-2">{type.example}</p>}
                {type.types && <p className="text-gray-600 mb-2"><strong>Types:</strong> {type.types}</p>}
                {type.requirement && <p className="text-gray-600 mb-2">{type.requirement}</p>}
                {type.purpose && <p className="text-gray-600 mb-2">{type.purpose}</p>}
                {type.format && <p className="text-gray-600 bg-gray-50 p-2 rounded mb-2"><strong>Format:</strong> {type.format}</p>}
                {type.limitations && (
                  <div className="mt-2">
                    <strong className="text-red-700">Limitations:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      {type.limitations.map((lim, lidx) => (
                        <li key={lidx} className="text-gray-600 text-sm">{lim}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {type.caution && <p className="text-red-700 mt-2">{type.caution}</p>}
              </div>
            ))}
          </div>
        )}
        {content.terminology && (
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Key Terminology</h3>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Subtest:</strong> {content.terminology.subtest}</p>
              <p className="text-gray-700"><strong>Domain:</strong> {content.terminology.domain}</p>
              <p className="text-gray-700"><strong>Composite:</strong> {content.terminology.composite}</p>
              <p className="text-gray-700"><strong>Battery:</strong> {content.terminology.battery}</p>
            </div>
          </div>
        )}

        {/* Norming */}
        {content.norming && (
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">Norming Process</h3>
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> {content.norming.definition}</p>
            <p className="text-gray-700 mb-2"><strong>Purpose:</strong> {content.norming.purpose}</p>
            <p className="text-gray-700 mb-2"><strong>Norm Sample:</strong> {content.norming.normSample}</p>
            <p className="text-gray-700 mb-2"><strong>Requirement:</strong> {content.norming.requirement}</p>
            <p className="text-gray-700 mb-2"><strong>Size:</strong> {content.norming.size}</p>
            <p className="text-gray-700"><strong>Updates:</strong> {content.norming.updates}</p>
          </div>
        )}
        {content.standardization && (
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <h3 className="text-xl font-bold text-indigo-700 mb-3">Standardization</h3>
            <p className="text-gray-700 mb-2"><strong>Definition:</strong> {content.standardization.definition}</p>
            <p className="text-gray-700 mb-3"><strong>Purpose:</strong> {content.standardization.purpose}</p>
            <strong className="text-gray-800">Requirements:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1 mb-3">
              {content.standardization.requires.map((req, idx) => (
                <li key={idx} className="text-gray-600">{req}</li>
              ))}
            </ul>
            <p className="text-red-700">{content.standardization.importance}</p>
          </div>
        )}
        {content.variablesAffecting && (
          <div className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-500 mb-4">
            <h3 className="text-xl font-bold text-yellow-800 mb-3">{content.variablesAffecting.title}</h3>
            <div className="space-y-3">
              {content.variablesAffecting.factors.map((factor, idx) => (
                <div key={idx} className="bg-white p-3 rounded">
                  <p className="font-bold text-gray-800">{factor.variable}</p>
                  <p className="text-gray-600 text-sm">{factor.impact}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.administration && (
          <div className="bg-red-50 p-6 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 mb-3">{content.administration.title}</h3>
            <ul className="list-disc list-inside space-y-1 mb-3">
              {content.administration.rules.map((rule, idx) => (
                <li key={idx} className="text-gray-700">{rule}</li>
              ))}
            </ul>
            <p className="text-red-700 font-bold">{content.administration.violations}</p>
          </div>
        )}

        {/* Generic sections */}
        {content.sections && (
          <div className="space-y-4">
            {content.sections.map((section, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{section.subtitle}</h3>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
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
          <ChartVisualizer 
            type={section.visualization.type}
            config={section.visualization.config}
            sectionId={section.id}
          />
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

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
