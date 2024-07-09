// components/automaticLanguageChecker.tsx
import { DatosExtraidos } from '@/components/ZeroToleranceForm';

function AutomaticLanguageChecker({ texto }: { texto: string }): DatosExtraidos {
  const regex: Record<keyof DatosExtraidos, RegExp> = {
    suceso: /^1[\.\-]?\s*s?uceso?s?:?\s*(.+)$/im,
    tipo: /^2[\.\-]?\s*t?i?p?o?s?:?\s*(.+)$/im,
    lugar: /^3[\.\-]?\s*l?u?g?a?r?,?\s*c?o?m?u?n?a?:?\s*(.+)$/im,
    fechaHora: /^4[\.\-]?\s*f?e?c?h?a?\s*y?\s*h?o?r?a?:?\s*(.+)$/im,
    areaZona: /^5[\.\-]?\s*á?r?e?a?\s*z?o?n?a?:?\s*(.+)$/im,
    empresa: /^6[\.\-]?\s*e?m?p?r?e?s?a?:?\s*(.+)$/im,
    supervisor: /^7[\.\-]?\s*s?u?p?e?r?v?i?s?o?r?\s*c?g?e?:?\s*(.+)$/im,
    descripcion: /^8[\.\-]?\s*d?e?s?c?r?i?p?c?i?ó?n?:?\s*["“]([^"”]+)["”]?/im,
    numeroProsafety: /^9[\.\-]?\s*n?u?m?e?r?o?\s*p?r?o?s?a?f?e?t?y?:?\s*(.+)$/im,
    fotografias: /^10[\.\-]?\s*f?o?t?o?g?r?a?f?í?a?s?:?\s*(.+)$/im,
  };

  const datos: DatosExtraidos = {};
  for (const campo of Object.keys(regex) as (keyof DatosExtraidos)[]) { 
    const match = texto.match(regex[campo]);
    if (match) {
      datos[campo] = match[1].trim(); 
    }
  }

  return datos;
}

export default AutomaticLanguageChecker;
