
export enum CategoryType {
  TEXT = 'IA Texte',
  IMAGE = 'IA Image',
  VIDEO = 'IA Vidéo',
  AUDIO = 'IA Audio'
}

export type ToolFunction = 'scribe' | 'alchemy' | 'aura' | 'lens';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  icon: string;
  function: ToolFunction;
  color: string;
}

export interface NavItem {
  label: string;
  path: string;
}
