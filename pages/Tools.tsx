
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../constants';
import ToolCard from '../components/ToolCard';
import { CategoryType } from '../types';

const Tools: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'Tous'>('Tous');

  const filteredTools = activeCategory === 'Tous' 
    ? TOOLS 
    : TOOLS.filter(tool => tool.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à l'accueil
      </Link>

      <header className="mb-12 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Bibliothèque d'outils</h1>
        <p className="text-slate-600">Trouvez l'outil idéal pour propulser votre créativité ou votre business.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-100 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveCategory('Tous')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeCategory === 'Tous'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
          }`}
        >
          Tous les outils
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500">Aucun outil trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tools;
