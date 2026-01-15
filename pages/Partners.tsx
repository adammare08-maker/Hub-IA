
import React from 'react';
import { Link } from 'react-router-dom';

const Partners: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-slate-500 hover:text-indigo-600 font-medium mb-8 transition-colors group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour à l'accueil
      </Link>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Rejoignez l'écosystème IA Hub</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Vous avez créé un outil IA exceptionnel ? Exposez-le à des milliers de créateurs et entreprises chaque jour.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Pourquoi nous rejoindre ?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Visibilité immédiate</h3>
                <p className="text-sm text-slate-600">Accédez à une audience qualifiée cherchant activement des solutions IA.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Intégration simplifiée</h3>
                <p className="text-sm text-slate-600">Un processus d'onboarding fluide en moins de 24 heures.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">Dashboard analytics</h3>
                <p className="text-sm text-slate-600">Suivez vos clics et conversions en temps réel.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
          <div className="text-indigo-400 font-bold mb-2 uppercase tracking-widest text-xs">Tarification claire</div>
          <h2 className="text-3xl font-bold mb-6">Devenir Partenaire</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center py-4 border-b border-slate-800">
              <span className="text-slate-400">Abonnement mensuel</span>
              <span className="font-bold text-xl">49€ / mois</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-slate-800">
              <span className="text-slate-400">Commission</span>
              <span className="font-bold text-xl">5% par vente</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-slate-800">
              <span className="text-slate-400">Frais d'inscription</span>
              <span className="font-bold text-xl text-green-400">Offert</span>
            </div>
          </div>
          <button className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all transform hover:scale-[1.02]">
            Devenir partenaire maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default Partners;
