export interface ChartLayers {
  asc: number;
  mn: number;
  su: number;
  mu: number;
  ve: number;
  ma: number;
  ju: number;
  sa: number;
  ur: number;
  ne: number;
  pl: number;
}

export interface DivinationResult {
  id: string;
  timestamp: number;
  question: string;
  chart1: ChartLayers;
  chart2: ChartLayers;
}

export const LAYERS: (keyof ChartLayers)[] = [
  'asc', 'mn', 'su', 'mu', 've', 'ma', 'ju', 'sa', 'ur', 'ne', 'pl'
];

export const API_DOMAIN = "https://www.soilastro.com";
export const ASSET_PATH = "/uploads/archive/";

// Mapping for display names
export const LAYER_NAMES: Record<keyof ChartLayers, string> = {
  asc: 'Ascendant',
  mn: 'Node',
  su: 'Sun',
  mu: 'Moon',
  ve: 'Venus',
  ma: 'Mars',
  ju: 'Jupiter',
  sa: 'Saturn',
  ur: 'Uranus',
  ne: 'Neptune',
  pl: 'Pluto'
};