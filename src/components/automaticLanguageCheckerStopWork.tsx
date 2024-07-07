import { DatosExtraidos } from '@/components/stopWork';

function AutomaticLanguageChecker({ texto }: { texto: string }): DatosExtraidos {
  const regex: Record<keyof DatosExtraidos, RegExp> = {
    suceso: /^1 Suceso:\s*(.+)$/m,
    tipo: /^2 Tipo:\s*(.+)$/m,
    lugar: /^3 Lugar, comuna \(dirección\):\s*(.+)$/m,
    fechaHora: /^4 Fecha y Hora:\s*(.+)$/m,
    areaZona: /^5 Área Zona:\s*(.+)$/m,
    empresa: /^6 Empresa:\s*(.+)$/m,
    supervisor: /^7 Supervisor CGE:\s*(.+)$/m,
    descripcion: /^8 Descripción:\s*"([^"]+)"$/m,
    numeroProsafety: /^9 Número Prosafety:\s*(.+)$/m,
    fotografias: /^10 Fotografías:\s*(.+)$/m,
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
