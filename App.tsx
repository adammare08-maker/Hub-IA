
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Partners from './pages/Partners';
import ToolDetail from './pages/ToolDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/outils" element={<Tools />} />
            <Route path="/outil/:id" element={<ToolDetail />} />
            <Route path="/partenaires" element={<Partners />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
            <p className="text-sm">© {new Date().getFullYear()} IA Hub. Propulsé par Gemini.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="hover:text-indigo-600 transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
