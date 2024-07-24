import { DatosExtraidos } from '@/components/incidentOrAccidentForm';

interface Props {
  texto: string;
  spellChecker: any;
}

export function automaticLanguageChecker({ texto, spellChecker }: Props): DatosExtraidos {
  const regex: Record<keyof DatosExtraidos, RegExp> = {
    suceso: /^1[\.\-]?\s*s?uceso?s?:?\s*(.+)$/im,
    tipo: /^2[\.\-]?\s*t?i?p?o?s?:?\s*(.+)$/im,
    lugar: /^3[\.\-]?\s*l?u?g?a?r?,?\s*c?o?m?u?n?a?:?\s*(.+)$/im,
    fechaHora: /^4[\.\-]?\s*f?e?c?h?a?\s*y?\s*h?o?r?a?:?\s*(.+)$/im,
    fecha: /^4[\.\-]?\s*f?e?c?h?a?\s*y?\s*h?o?r?a?:?\s*(.+)$/im,
    hora: /^4[\.\-]?\s*f?e?c?h?a?\s*y?\s*h?o?r?a?:?\s*(.+)$/im,
    areaZona: /^5[\.\-]?\s*á?r?e?a?\s*z?o?n?a?:?\s*(.+)$/im,
    empresa: /^6[\.\-]?\s*e?m?p?r?e?s?a?:?\s*(.+)$/im,
    supervisor: /^7[\.\-]?\s*s?u?p?e?r?v?i?s?o?r?\s*c?g?e?:?\s*(.+)$/im,
    descripcion: /^8[\.\-]?\s*d?e?s?c?r?i?p?c?i?ó?n?:?\s*["“]([^"”]+)["”]?/im,
    numeroProsafety: /^9[\.\-]?\s*n?u?m?e?r?o?\s*p?r?o?s?a?f?e?t?y?:?\s*(.+)$/im,
    fotografias: /^10[\.\-]?\s*f?o?t?o?g?r?a?f?í?a?s?:?\s*(.+)$/im,
    accionesInmediatas: /^11[\.\-]?\s*a?c?c?i?o?n?e?s?\s*i?n?m?e?d?i?a?t?a?s?:?\s*(.+)$/im,
    controlesInmediatos: /^12[\.\-]?\s*c?o?n?t?r?o?l?e?s?\s*i?n?m?e?d?i?a?t?o?s?:?\s*(.+)$/im,
    factoresRiesgo: /^13[\.\-]?\s*f?a?c?t?o?r?e?s?\s*d?e?\s*r?i?e?s?g?o?:?\s*(.+)$/im,
    zonal: /^14[\.\-]?\s*z?o?n?a?l?:?\s*(.+)$/im,
    conBajaIL: /con\s*baja\s*il/im,
    incidenteIndustrial: /incidente\s*industrial/im,
    sinBajaIL: /sin\s*baja\s*il/im,
    incidenteLaboral: /incidente\s*laboral/im,
  };

  const datos: Partial<DatosExtraidos> = {};
  for (const campo of Object.keys(regex) as (keyof DatosExtraidos)[]) {
    const match = texto.match(regex[campo]);
    if (match) {
      let correctedText = match[1]?.trim();
      if (correctedText && correctedText.length > 4 && !spellChecker.correct(correctedText)) {
        const suggestions = spellChecker.suggest(correctedText);
        correctedText = suggestions.length > 0 ? suggestions[0] : correctedText;
      }
      if (campo === 'conBajaIL' || campo === 'incidenteIndustrial' || campo === 'sinBajaIL' || campo === 'incidenteLaboral') {
        datos[campo] = true;
      } else {
        datos[campo] = correctedText;
      }
    } else if (campo === 'conBajaIL' || campo === 'incidenteIndustrial' || campo === 'sinBajaIL' || campo === 'incidenteLaboral') {
      datos[campo] = false;
    }
  }

  // Separar fecha y hora si están en el campo fechaHora
  if (datos.fechaHora) {
    const [fecha, hora] = datos.fechaHora.split(' ').filter(Boolean);
    datos.fecha = fecha || '';
    datos.hora = hora || '';
  }

  return datos as DatosExtraidos;
}
