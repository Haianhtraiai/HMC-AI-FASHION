
export interface ModelOption {
  id: string;
  label: string;
  description: string;
  thumbnail: string;
  prompt: string;
}

export interface BackgroundOption {
  id: string;
  label: string;
  thumbnail: string;
  prompt: string;
}

export type AspectRatio = '16:9' | '9:16';

export interface GenerationSettings {
  modelId: string;
  backgroundId: string;
  aspectRatio: AspectRatio;
  resultCount: number;
}

export interface GeneratedResult {
  url: string;
  timestamp: number;
}
