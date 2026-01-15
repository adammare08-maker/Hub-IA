
import { Tool, CategoryType } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'lumina-scribe',
    name: 'Lumina Scribe',
    description: 'Transformez vos pensées brutes en textes poétiques ou techniques avec une précision chirurgicale.',
    category: CategoryType.TEXT,
    icon: '✨',
    function: 'scribe',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'pixel-alchemy',
    name: 'Pixel Alchemy',
    description: 'Transmutez des concepts abstraits en chefs-d\'œuvre visuels grâce à notre moteur de rendu onirique.',
    category: CategoryType.IMAGE,
    icon: '🔮',
    function: 'alchemy',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'vox-aura',
    name: 'Vox Aura',
    description: 'Donnez une voix céleste à vos écrits. Synthèse vocale de haute fidélité pour vos projets narratifs.',
    category: CategoryType.AUDIO,
    icon: '🌊',
    function: 'aura',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'visionary-lens',
    name: 'Visionary Lens',
    description: 'L\'IA qui voit au-delà des apparences. Analysez et décryptez le contenu de n\'importe quelle image.',
    category: CategoryType.IMAGE,
    icon: '👁️',
    function: 'lens',
    color: 'from-emerald-500 to-teal-600'
  }
];

export const CATEGORIES = Object.values(CategoryType);
