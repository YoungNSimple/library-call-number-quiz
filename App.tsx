import React, { useState } from 'react';
import { TabType } from './types';
import { CompareView } from './components/views/CompareView';
import { RulesView } from './components/views/RulesView';
import { QuizView } from './components/views/QuizView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('compare');

  const renderContent = () => {
    switch (activeTab) {
      case 'compare':
        return <CompareView />;
      case 'rules':
        return <RulesView />;
      case 'quiz':
        return <QuizView />;
      default:
        return <CompareView />;
    }
  };

  const navButtonClass = (tab: TabType) => `
    flex-1 py-3 px-4 text-sm sm:text-base font-bold rounded-xl transition-all duration-300 transform 
    ${activeTab === tab 
      ? 'bg-white text-fuchsia-700 shadow-lg scale-100 ring-2 ring-fuchsia-200' 
      : 'bg-fuchsia-800/20 text-fuchsia-100 hover:bg-fuchsia-800/40 hover:text-white'
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-purple-900 text-gray-800 font-sans selection:bg-fuchsia-300 selection:text-fuchsia-900 pb-12">
      
      {/* Header Section */}
      <header className="pt-8 pb-6 px-4 text-center">
        <div className="inline-block p-3 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl mb-4 border border-white/20">
          <span className="text-4xl sm:text-5xl">📚</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight mb-2">
          도서관 서가 <span className="text-fuchsia-300">정리 마스터</span>
        </h1>
        <p className="text-fuchsia-100 text-lg sm:text-xl font-medium opacity-90">
          서가 정리의 달인이 되어보세요!
        </p>
      </header>

      {/* Navigation */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <nav className="flex space-x-2 bg-black/20 p-1.5 rounded-2xl backdrop-blur-sm">
          <button onClick={() => setActiveTab('compare')} className={navButtonClass('compare')}>
            🔍 순서 비교
          </button>
          <button onClick={() => setActiveTab('rules')} className={navButtonClass('rules')}>
            💡 정리 규칙
          </button>
          <button onClick={() => setActiveTab('quiz')} className={navButtonClass('quiz')}>
            🏆 실전 퀴즈
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 min-h-[500px] transition-all duration-500">
          {renderContent()}
        </div>
      </main>

      <footer className="text-center text-fuchsia-200/60 mt-12 text-sm font-medium">
        KDC (한국십진분류법) 정렬 도우미
      </footer>
    </div>
  );
};

export default App;