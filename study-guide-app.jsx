import React, { useState } from 'react';
import { BookOpen, Award, TrendingUp, Target, FileText, Menu, X, CheckCircle, XCircle, Brain } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, 
         LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
         ScatterChart, Scatter, AreaChart, Area } from 'recharts';

export default function StatisticsStudyGuide() {
  const [activeSection, setActiveSection] = useState('intro');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    { id: 'intro', title: 'Introduction', icon: BookOpen },
    { id: 'scales', title: 'Measurement Scales', icon: TrendingUp },
    { id: 'central-tendency', title: 'Central Tendency', icon: Target },
    { id: 'dispersion', title: 'Variability & Dispersion', icon: TrendingUp },
    { id: 'distribution', title: 'Distribution Shapes', icon: TrendingUp },
    { id: 'scores', title: 'Score Types', icon: TrendingUp },
    { id: 'correlation', title: 'Correlation', icon: TrendingUp },
    { id: 'validity', title: 'Validity', icon: Target },
    { id: 'reliability', title: 'Reliability', icon: Award },
    { id: 'norm-samples', title: 'Norm Samples', icon: FileText },
    { id: 'test-admin', title: 'Test Administration', icon: FileText },
    { id: 'test-types', title: 'Test Types', icon: Brain },
    { id: 'achievement', title: 'Achievement Tests', icon: Brain },
    { id: 'language', title: 'Language Assessment', icon: BookOpen }
  ];

  // Sample quiz questions - will be expanded with alternative examples
  const quizQuestions = [
    {
      id: 1,
      question: "Students ranked by first, second, third place ribbons - what scale?",
      options: ["Ratio", "Interval", "Ordinal", "Nominal"],
      correctAnswer: 2,
      explanation: "Ordinal scales rank items without equal intervals."
    },
    {
      id: 2,
      question: "Scale with equidistant numbers but no true zero?",
      options: ["Ratio", "Interval", "Ordinal", "Nominal"],
      correctAnswer: 1,
      explanation: "Interval scales have equal distances but no absolute zero."
    },
    {
      id: 3,
      question: "What does the vertical line in normal distribution represent?",
      options: ["Median", "Mode", "Mean", "Central tendency"],
      correctAnswer: 2,
      explanation: "In normal distribution, the mean is at center."
    }
  ];

  const validityTypes = [
    { type: 'Content', value: 85 },
    { type: 'Criterion', value: 78 },
    { type: 'Construct', value: 82 },
    { type: 'Consequential', value: 75 },
    { type: 'Face', value: 70 }
  ];

  const normalDistData = Array.from({ length: 50 }, (_, i) => {
    const x = (i - 25) / 5;
    const y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    return { x: i * 4 + 50, y: y * 100 };
  });

  const scoreComparison = [
    { name: 'Student A', raw: 85, percentile: 92, stanine: 8, zscore: 1.5 },
    { name: 'Student B', raw: 75, percentile: 75, stanine: 6, zscore: 0.7 },
    { name: 'Student C', raw: 65, percentile: 50, stanine: 5, zscore: 0 },
    { name: 'Student D', raw: 55, percentile: 25, stanine: 4, zscore: -0.7 },
    { name: 'Student E', raw: 45, percentile: 8, stanine: 2, zscore: -1.5 }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'intro':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Statistics & Assessment Study Guide</h1>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Welcome</h2>
              <p className="text-gray-700 leading-relaxed">
                Interactive study guide covering educational and psychological assessment concepts including 
                validity, reliability, score interpretation, and standardized testing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <Target className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Key Topics</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Measurement Scales</li>
                  <li>• Central Tendency & Variability</li>
                  <li>• Validity & Reliability</li>
                  <li>• Score Interpretation</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Interactive visualizations</li>
                  <li>• Practice questions</li>
                  <li>• Real-world examples</li>
                  <li>• Detailed explanations</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'scales':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Measurement Scales</h1>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-indigo-900 mb-3">Four Scales of Measurement</h2>
              <p className="text-gray-700">
                The scale determines what statistical operations can be performed on data.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-2xl font-semibold mb-3 text-blue-800">Nominal</h3>
                <p className="text-gray-700 mb-3">Numbers for identification only. No mathematical meaning.</p>
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Jersey numbers</li>
                    <li>• ZIP codes</li>
                    <li>• Student IDs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-2xl font-semibold mb-3 text-green-800">Ordinal</h3>
                <p className="text-gray-700 mb-3">Rank order. Differences not necessarily equal.</p>
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Rankings (1st, 2nd, 3rd)</li>
                    <li>• Likert scales</li>
                    <li>• Percentile ranks</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <h3 className="text-2xl font-semibold mb-3 text-purple-800">Interval</h3>
                <p className="text-gray-700 mb-3">Equal distances. No true zero.</p>
                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Temperature (F/C)</li>
                    <li>• IQ scores</li>
                    <li>• Calendar years</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                <h3 className="text-2xl font-semibold mb-3 text-orange-800">Ratio</h3>
                <p className="text-gray-700 mb-3">Equal intervals AND true zero. All math operations possible.</p>
                <div className="bg-orange-50 p-4 rounded">
                  <h4 className="font-semibold mb-2">Examples:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Height, weight, age</li>
                    <li>• Number correct</li>
                    <li>• Income</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'central-tendency':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Central Tendency</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Measures of Central Tendency</h2>
              <p className="text-gray-700">Describe the center or typical value of a distribution.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Mean (M or μ)</h3>
                <p className="text-gray-700 mb-3">The arithmetic average.</p>
                <div className="bg-blue-50 p-4 rounded mb-3">
                  <p className="font-mono text-sm">M = ΣX / n</p>
                </div>
                <p className="text-sm text-gray-600">Most affected by outliers</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-xl font-semibold mb-3 text-green-800">Median (Mdn)</h3>
                <p className="text-gray-700 mb-3">The middle score when ordered.</p>
                <div className="bg-green-50 p-4 rounded mb-3">
                  <p className="text-sm">50th percentile</p>
                </div>
                <p className="text-sm text-gray-600">Not affected by outliers</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <h3 className="text-xl font-semibold mb-3 text-purple-800">Mode</h3>
                <p className="text-gray-700 mb-3">Most frequently occurring score.</p>
                <div className="bg-purple-50 p-4 rounded mb-3">
                  <p className="text-sm">Can have multiple modes</p>
                </div>
                <p className="text-sm text-gray-600">Actual score in data</p>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">In Normal Distribution</h3>
              <p className="text-gray-700">Mean = Median = Mode</p>
            </div>
          </div>
        );

      case 'dispersion':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Variability & Dispersion</h1>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-orange-900 mb-3">What is Variability?</h2>
              <p className="text-gray-700">Describes how spread out scores are from the mean.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Standard Deviation (σ or s)</h3>
                <p className="text-gray-700 mb-3">Average distance of scores from the mean.</p>
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">68-95-99.7 Rule</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 68% within ±1 SD</li>
                    <li>• 95% within ±2 SD</li>
                    <li>• 99.7% within ±3 SD</li>
                  </ul>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={normalDistData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="y" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Variance (σ² or s²)</h3>
                <p className="text-gray-700 mb-3">Average of squared deviations from mean.</p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-mono text-sm">s² = Σ(X - M)² / (n - 1)</p>
                  <p className="text-sm text-gray-600 mt-2">SD = √Variance</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Range</h3>
                <p className="text-gray-700 mb-3">Difference between highest and lowest scores.</p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="font-mono text-sm">Range = Max - Min</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'distribution':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Distribution Shapes</h1>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-purple-900 mb-3">Understanding Skewness</h2>
              <p className="text-gray-700">Distributions aren't always perfectly normal. Skewness describes asymmetry.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-blue-800">Negative Skew (Left)</h3>
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <p className="text-sm text-gray-700">Tail extends LEFT. Most scores HIGH.</p>
                  <p className="text-sm font-semibold mt-2">Mode &gt; Median &gt; Mean</p>
                </div>
                <p className="text-sm text-gray-700">Example: Easy test - most score high</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4 text-orange-800">Positive Skew (Right)</h3>
                <div className="bg-orange-50 p-4 rounded mb-4">
                  <p className="text-sm text-gray-700">Tail extends RIGHT. Most scores LOW.</p>
                  <p className="text-sm font-semibold mt-2">Mean &gt; Median &gt; Mode</p>
                </div>
                <p className="text-sm text-gray-700">Example: Hard test - most score low</p>
              </div>
            </div>
          </div>
        );

      case 'scores':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Score Types & Interpretation</h1>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-purple-900 mb-3">Understanding Test Scores</h2>
              <p className="text-gray-700">Raw scores need context. Derived scores help interpret performance.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Types of Standard Scores</h3>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold text-lg">Z-Scores</h4>
                  <p className="text-gray-700">Mean = 0, SD = 1</p>
                  <p className="text-sm text-gray-600">z = (X - M) / SD</p>
                </div>
                
                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold text-lg">T-Scores</h4>
                  <p className="text-gray-700">Mean = 50, SD = 10</p>
                </div>
                
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold text-lg">IQ Scores</h4>
                  <p className="text-gray-700">Mean = 100, SD = 15</p>
                </div>
                
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="font-semibold text-lg">Scaled Scores</h4>
                  <p className="text-gray-700">Mean = 10, SD = 3</p>
                  <p className="text-sm text-gray-600">Used for subtests</p>
                </div>
                
                <div className="p-4 border-l-4 border-red-500 bg-red-50">
                  <h4 className="font-semibold text-lg">Percentile Ranks</h4>
                  <p className="text-gray-700">Range: 1-99</p>
                  <p className="text-sm text-gray-600">50th percentile = median</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Score Comparison</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={scoreComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentile" fill="#3b82f6" name="Percentile" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'correlation':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Correlation</h1>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-red-900 mb-3">Understanding Correlation</h2>
              <p className="text-gray-700">Correlation describes relationship strength and direction between variables. Symbol: r. Range: -1.00 to +1.00</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Correlation Coefficient (r)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded border-2 border-red-300">
                  <h4 className="font-bold text-red-900">Negative (-1 to 0)</h4>
                  <p className="text-sm">One increases, other decreases</p>
                </div>
                <div className="p-4 bg-gray-50 rounded border-2 border-gray-300">
                  <h4 className="font-bold text-gray-900">Zero (0)</h4>
                  <p className="text-sm">No relationship</p>
                </div>
                <div className="p-4 bg-green-50 rounded border-2 border-green-300">
                  <h4 className="font-bold text-green-900">Positive (0 to +1)</h4>
                  <p className="text-sm">Both increase together</p>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded">
                <h4 className="font-semibold text-blue-900 mb-3">Strength:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span className="font-semibold">±0.90 to ±1.00</span>
                    <span className="text-sm">Very strong</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span className="font-semibold">±0.70 to ±0.89</span>
                    <span className="text-sm">Strong</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded">
                    <span className="font-semibold">±0.50 to ±0.69</span>
                    <span className="text-sm">Moderate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Remember</h3>
              <p className="text-gray-700">Correlation ≠ Causation. A correlation shows relationship, not cause.</p>
            </div>
          </div>
        );

      case 'validity':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Validity</h1>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-green-900 mb-3">What is Validity?</h2>
              <p className="text-gray-700">The degree to which evidence and theory support interpretations of test scores for proposed uses.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Types of Validity Evidence</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={validityTypes}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="type" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Validity" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-lg">Content Validity</h4>
                    <p className="text-sm text-gray-600">Test items represent the domain being measured</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Criterion-Related</h4>
                    <p className="text-sm text-gray-600">Scores predict/correlate with external criterion</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Construct Validity</h4>
                    <p className="text-sm text-gray-600">Measures the theoretical construct claimed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reliability':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Reliability</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">What is Reliability?</h2>
              <p className="text-gray-700">Consistency of test scores across occasions, forms, or raters. Range: 0 to 1.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Types of Reliability</h3>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold text-lg">Test-Retest</h4>
                  <p className="text-sm">Same test, same group, different times</p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold text-lg">Internal Consistency</h4>
                  <p className="text-sm">Items measure same construct (Cronbach's alpha)</p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold text-lg">Inter-Rater</h4>
                  <p className="text-sm">Different raters, same performance</p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="font-semibold text-lg">Parallel Forms</h4>
                  <p className="text-sm">Two equivalent forms of same test</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Standard Error of Measurement (SEM)</h3>
              <p className="text-gray-700 mb-4">Indicates precision of individual scores. Smaller SEM = more precise.</p>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-mono text-sm">SEM = SD × √(1 - reliability)</p>
                <p className="text-sm text-gray-600 mt-2">68% CI = Observed Score ± 1 SEM</p>
              </div>
            </div>
          </div>
        );

      case 'norm-samples':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Norm Samples</h1>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-orange-900 mb-3">What are Norms?</h2>
              <p className="text-gray-700">Test performance data of representative sample used to compare individual scores.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Good Norm Sample Characteristics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded">
                  <h4 className="font-bold text-blue-900">Representative</h4>
                  <p className="text-gray-700">Reflects population diversity (age, gender, ethnicity, SES, region)</p>
                </div>
                <div className="p-4 bg-green-50 rounded">
                  <h4 className="font-bold text-green-900">Large Sample</h4>
                  <p className="text-gray-700">Hundreds or thousands for stable, reliable norms</p>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <h4 className="font-bold text-purple-900">Recent</h4>
                  <p className="text-gray-700">Current norms - populations change over time</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded">
                  <h4 className="font-bold text-yellow-900">Relevant</h4>
                  <p className="text-gray-700">Appropriate for test purpose</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Types of Norms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-blue-200 rounded">
                  <h4 className="font-semibold">Age Norms</h4>
                  <p className="text-sm">Compare to same age</p>
                </div>
                <div className="p-4 border-2 border-green-200 rounded">
                  <h4 className="font-semibold">Grade Norms</h4>
                  <p className="text-sm">Compare to same grade</p>
                </div>
                <div className="p-4 border-2 border-purple-200 rounded">
                  <h4 className="font-semibold">National Norms</h4>
                  <p className="text-sm">Representative national sample</p>
                </div>
                <div className="p-4 border-2 border-orange-200 rounded">
                  <h4 className="font-semibold">Local Norms</h4>
                  <p className="text-sm">Specific local population</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'test-admin':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Test Administration</h1>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-green-900 mb-3">Standardized Administration</h2>
              <p className="text-gray-700">Proper procedures critical for valid results. Ensures comparability.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Key Concepts</h3>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold text-lg">Protocol</h4>
                  <p className="text-gray-700">Standardized form for administration and scoring</p>
                </div>
                <div className="p-4 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold text-lg">Raw Score</h4>
                  <p className="text-gray-700">Total points before conversion. Starting point for derived scores.</p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold text-lg">Basal</h4>
                  <p className="text-gray-700">Point demonstrating mastery (3-5 consecutive correct). Items below credited.</p>
                </div>
                <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="font-semibold text-lg">Ceiling</h4>
                  <p className="text-gray-700">Point of non-mastery (3-5 consecutive incorrect). Testing stops.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Administration Guidelines</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold">Follow standardized procedures</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold">Maintain rapport</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold">Don't reveal answers</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold">Don't modify instructions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'test-types':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Types of Tests</h1>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-indigo-900 mb-3">Overview</h2>
              <p className="text-gray-700">Different assessments serve different purposes in educational decision-making.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-2xl font-semibold mb-3">Achievement Tests</h3>
                <p className="text-gray-700 mb-4">Measure what student has learned in specific content areas</p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm font-semibold mb-1">Examples:</p>
                  <p className="text-xs">WIAT-III, KTEA-3, WJ-IV Achievement</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-2xl font-semibold mb-3">Aptitude Tests</h3>
                <p className="text-gray-700 mb-4">Measure potential for future learning or performance</p>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm font-semibold mb-1">Examples:</p>
                  <p className="text-xs">SAT, ACT, IQ tests</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <h3 className="text-2xl font-semibold mb-3">Diagnostic Tests</h3>
                <p className="text-gray-700 mb-4">In-depth analysis to identify specific skill deficits</p>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm">Used when additional info needed for interventions</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
                <h3 className="text-2xl font-semibold mb-3">Screening Tests</h3>
                <p className="text-gray-700 mb-4">Brief assessments to identify potential areas of concern</p>
                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm">Quick, broad coverage to determine need for deeper assessment</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Norm vs Criterion Referenced</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-blue-50 rounded border-2 border-blue-300">
                  <h4 className="text-xl font-bold text-blue-900 mb-3">Norm-Referenced</h4>
                  <p className="text-sm mb-2">Compare to peer group</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Percentiles, stanines</li>
                    <li>Shows relative standing</li>
                  </ul>
                </div>
                <div className="p-5 bg-green-50 rounded border-2 border-green-300">
                  <h4 className="text-xl font-bold text-green-900 mb-3">Criterion-Referenced</h4>
                  <p className="text-sm mb-2">Compare to standard</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Pass/fail, percentage</li>
                    <li>Shows absolute mastery</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'achievement':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Achievement Tests</h1>
            
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-indigo-900 mb-3">What are Achievement Tests?</h2>
              <p className="text-gray-700">Measure what person has learned - acquired knowledge and skills in specific areas.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Uses</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded">
                  <h4 className="font-bold text-green-800">Educational Planning</h4>
                  <p className="text-sm">Guide instruction and curriculum</p>
                </div>
                <div className="p-4 bg-blue-50 rounded">
                  <h4 className="font-bold text-blue-800">Progress Monitoring</h4>
                  <p className="text-sm">Track student growth over time</p>
                </div>
                <div className="p-4 bg-purple-50 rounded">
                  <h4 className="font-bold text-purple-800">Placement</h4>
                  <p className="text-sm">Determine appropriate level/program</p>
                </div>
                <div className="p-4 bg-orange-50 rounded">
                  <h4 className="font-bold text-orange-800">Identification</h4>
                  <p className="text-sm">Find students needing support</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Popular Tests</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                  <h4 className="font-semibold">Woodcock-Johnson IV</h4>
                  <p className="text-sm text-gray-600">Individual, ages 2-90+</p>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50">
                  <h4 className="font-semibold">WIAT-III</h4>
                  <p className="text-sm text-gray-600">Individual, ages 4-50</p>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                  <h4 className="font-semibold">KTEA-3</h4>
                  <p className="text-sm text-gray-600">Individual achievement assessment</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Language Assessment</h1>
            
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-teal-900 mb-3">Understanding Language Skills</h2>
              <p className="text-gray-700">Language assessment evaluates receptive (understanding) and expressive (producing) skills.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h3 className="text-2xl font-semibold mb-3 text-blue-800">Receptive Language</h3>
                <p className="text-gray-700 mb-4 font-semibold">
                  Understanding and comprehending language
                </p>
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Components:</h4>
                  <ul className="text-sm space-y-1 text-gray-700 list-disc list-inside">
                    <li>Vocabulary comprehension</li>
                    <li>Following directions</li>
                    <li>Listening comprehension</li>
                    <li>Reading comprehension</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-100 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">Examples:</h4>
                  <p className="text-sm">"Point to the picture of the dog"</p>
                  <p className="text-sm">"Which one is biggest?"</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h3 className="text-2xl font-semibold mb-3 text-green-800">Expressive Language</h3>
                <p className="text-gray-700 mb-4 font-semibold">
                  Producing language through speaking or writing
                </p>
                <div className="bg-green-50 p-4 rounded mb-4">
                  <h4 className="font-semibold text-green-900 mb-2">Components:</h4>
                  <ul className="text-sm space-y-1 text-gray-700 list-disc list-inside">
                    <li>Vocabulary usage</li>
                    <li>Sentence formation</li>
                    <li>Grammar and syntax</li>
                    <li>Written expression</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-100 rounded">
                  <h4 className="font-semibold text-green-900 mb-2">Examples:</h4>
                  <p className="text-sm">"Tell me about your weekend"</p>
                  <p className="text-sm">"What is this called?"</p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg">
              <h3 className="text-lg font-semibold text-teal-900 mb-2">Remember</h3>
              <p className="text-gray-700">
                <strong>Receptive = Understanding</strong> (input: listening, reading)
                <br />
                <strong>Expressive = Producing</strong> (output: speaking, writing)
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderQuiz = () => {
    if (!quizMode) {
      return (
        <div className="text-center py-12">
          <Brain className="w-24 h-24 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Your Knowledge</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Practice quiz covering key concepts from measurement scales to test interpretation.
          </p>
          <button
            onClick={() => setQuizMode(true)}
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      );
    }

    if (showResults) {
      const correct = quizQuestions.filter((q, i) => userAnswers[i] === q.correctAnswer).length;
      const percentage = (correct / quizQuestions.length) * 100;
      
      return (
        <div className="space-y-6">
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Results</h2>
            <div className="text-6xl font-bold text-indigo-600 mb-4">
              {percentage.toFixed(0)}%
            </div>
            <p className="text-xl text-gray-600">
              {correct} out of {quizQuestions.length} correct
            </p>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-lg border-2 ${
                    isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Question {index + 1}</h3>
                      <p className="text-gray-800 mb-3">{q.question}</p>
                      
                      <div className="space-y-2 mb-3">
                        {q.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-3 rounded ${
                              optIndex === q.correctAnswer
                                ? 'bg-green-100 border-2 border-green-500'
                                : optIndex === userAnswer
                                ? 'bg-red-100 border-2 border-red-500'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            {option}
                            {optIndex === q.correctAnswer && (
                              <span className="ml-2 text-green-700 font-semibold">✓ Correct</span>
                            )}
                            {optIndex === userAnswer && optIndex !== q.correctAnswer && (
                              <span className="ml-2 text-red-700 font-semibold">✗ Your Answer</span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-white bg-opacity-50 p-3 rounded">
                        <p className="text-sm text-gray-700">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setUserAnswers({});
                setCurrentQuestion(0);
                setShowResults(false);
                setQuizMode(false);
              }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </h2>
          <div className="text-sm text-gray-600">
            {Object.keys(userAnswers).length} / {quizQuestions.length} answered
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl text-gray-800 mb-6">
            {quizQuestions[currentQuestion].question}
          </p>

          <div className="space-y-3">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setUserAnswers({ ...userAnswers, [currentQuestion]: index })}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
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
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion < quizQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(userAnswers).length < quizQuestions.length}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Statistics Study Guide</h1>
          </div>
          <button
            onClick={() => {
              setActiveSection('quiz');
              setQuizMode(false);
              setShowResults(false);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            <span className="hidden sm:inline">Quiz</span>
          </button>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40 overflow-y-scroll overflow-x-hidden`}
        >
          <nav className="p-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                setActiveSection('quiz');
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === 'quiz'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span className="font-medium">Quiz</span>
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeSection === 'quiz' ? renderQuiz() : renderContent()}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
