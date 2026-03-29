
export enum DieColor {
  TEAL = "bg-teal-700 text-white",
  MUSTARD = "bg-yellow-500 text-slate-900",
  SALMON = "bg-rose-300 text-slate-900",
  SLATE = "bg-slate-700 text-white",
  INDIGO = "bg-indigo-600 text-white",
  EMERALD = "bg-emerald-600 text-white",
  ORANGE = "bg-orange-500 text-white",
  PINK = "bg-pink-600 text-white",
}

export interface DieData {
  id: string;
  category: string;
  value: string;
  color: DieColor;
  isLocked: boolean;
  options: string[];
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
    DD_RUM: any;
  }
}
