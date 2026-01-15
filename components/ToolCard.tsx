
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col justify-between h-full">
      <div>
        <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:rotate-6 transition-transform shadow-lg`}>
          {tool.icon}
        </div>
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 px-2 py-1 bg-slate-100 rounded-full">
            {tool.category}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.name}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {tool.description}
        </p>
      </div>
      <Link
        to={`/outil/${tool.id}`}
        className="inline-flex items-center justify-center px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors w-full"
      >
        Lancer le Playground
      </Link>
    </div>
  );
};

export default ToolCard;
