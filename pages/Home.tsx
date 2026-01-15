
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
          Plateforme All-in-One
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Tous les outils IA utiles, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            au même endroit
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
          Créez, automatisez et gagnez du temps avec notre sélection d'outils IA simples et performants.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/outils"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300"
          >
            Découvrir les outils
          </Link>
          <Link
            to="/partenaires"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-semibold hover:bg-slate-50 transition-all"
          >
            Devenir partenaire
          </Link>
        </div>

        <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">100+</span>
            <span className="text-sm">Outils listés</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">10k+</span>
            <span className="text-sm">Utilisateurs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">4.9/5</span>
            <span className="text-sm">Avis moyens</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">24/7</span>
            <span className="text-sm">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
