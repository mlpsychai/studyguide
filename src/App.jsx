const { useState } = React;

function StatisticsStudyGuide() {
  const [activeSection, setActiveSection] = useState('intro');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    { id: 'intro', title: '📚 Introduction' },
    { id: 'scales', title: '📊 Measurement Scales' },
    { id: 'central', title: '🎯 Central Tendency' },
    { id: 'variability', title: '📈 Variability' },
    { id: 'correlation', title: '🔗 Correlation' },
    { id: 'reliability', title: '🏆 Reliability' },
    { id: 'validity', title: '✓ Validity' },
    { id: 'scores', title: '💯 Score Types' },
  ];

  const content = {
    intro: {
      title: 'Welcome to Statistics & Assessment',
      body: 'This interactive study guide covers essential concepts in educational statistics and psychological assessment.'
    },
    scales: {
      title: 'Scales of Measurement',
      body: 'Nominal, Ordinal, Interval, and Ratio scales each have unique properties for measuring variables.'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">📊 Statistics Study Guide</h1>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
          <nav className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeSection === section.id
                    ? 'bg-indigo-100 text-indigo-700 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {content[activeSection]?.title || sections.find(s => s.id === activeSection)?.title}
            </h2>
            <p className="text-gray-700 text-lg">
              {content[activeSection]?.body || 'Content coming soon...'}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StatisticsStudyGuide />);
