import { create } from 'zustand';

interface AuraState {
  frequency: number; // 0.1 to 2.0
  amplitude: number; // 0 to 1
  complexity: number; // 0 to 1
  hue: number; // 0 to 360
  setFrequency: (v: number) => void;
  setAmplitude: (v: number) => void;
  setComplexity: (v: number) => void;
  setHue: (v: number) => void;
}

export const useAuraStore = create<AuraState>((set) => ({
  frequency: 0.5,
  amplitude: 0.5,
  complexity: 0.3,
  hue: 260, // Default Purple
  setFrequency: (v) => set({ frequency: v }),
  setAmplitude: (v) => set({ amplitude: v }),
  setComplexity: (v) => set({ complexity: v }),
  setHue: (v) => set({ hue: v }),
}));
