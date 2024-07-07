declare module 'spellchecker' {
    export function getCorrectionsForMisspelling(word: string): string[];
    export function isMisspelled(word: string): boolean;
  }
  