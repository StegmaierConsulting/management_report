// TypeAccidentIncidentTable.tsx

import React, { useState, useEffect } from 'react';

interface TypeAccidentIncidentTableProps {
  onDataChange: (data: { accidentChecks: any; incidentChecks: any }) => void;
  initialData?: { accidentChecks: any; incidentChecks: any };
}

const TypeAccidentIncidentTable: React.FC<TypeAccidentIncidentTableProps> = ({ onDataChange, initialData }) => {
  // Estado para los checkboxes de accidentes
  const [accidentChecks, setAccidentChecks] = useState({
    cbil: false,
    sbil: false,
    cbii: false,
    sbii: false,
    cdma: false,
  });

  // Estado para los checkboxes de incidentes
  const [incidentChecks, setIncidentChecks] = useState({
    ii: false,
    cdpp: false,
    tto: false,
    ilsb: false,
  });

  // Efecto para inicializar los estados con initialData cuando esté disponible
  useEffect(() => {
    if (initialData) {
      if (initialData.accidentChecks) {
        setAccidentChecks(initialData.accidentChecks);
      }
      if (initialData.incidentChecks) {
        setIncidentChecks(initialData.incidentChecks);
      }
    }
  }, [initialData]);

  // Manejadores de cambio para los checkboxes de accidentes
  const handleAccidentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAccidentChecks = { ...accidentChecks, [e.target.name]: e.target.checked };
    setAccidentChecks(newAccidentChecks);
  };

  // Manejadores de cambio para los checkboxes de incidentes
  const handleIncidentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIncidentChecks = { ...incidentChecks, [e.target.name]: e.target.checked };
    setIncidentChecks(newIncidentChecks);
  };

  // Efecto para notificar al componente padre cuando los checks cambian
  useEffect(() => {
    onDataChange({ accidentChecks, incidentChecks });
  }, [accidentChecks, incidentChecks, onDataChange]);

  return (
    <div className="my-6 mx-6">
      <h2 className="font-bold mb-2">1. TIPO DE ACCIDENTE/INCIDENTE (*)</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Tabla de Accidentes */}
        <div className="border border-[#0070c0] border-dotted">
          <div className="p-1 font-bold text-center">ACCIDENTE</div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Con Baja In Labore (CBIL)</span>
            <input
              type="checkbox"
              name="cbil"
              checked={accidentChecks.cbil}
              onChange={handleAccidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Sin Baja In Labore (SBIL)</span>
            <input
              type="checkbox"
              name="sbil"
              checked={accidentChecks.sbil}
              onChange={handleAccidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Con Baja In Itínere (CBII)</span>
            <input
              type="checkbox"
              name="cbii"
              checked={accidentChecks.cbii}
              onChange={handleAccidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Sin Baja In Itínere (SBII)</span>
            <input
              type="checkbox"
              name="sbii"
              checked={accidentChecks.sbii}
              onChange={handleAccidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Con Daño al Medioambiente (CDMA)</span>
            <input
              type="checkbox"
              name="cdma"
              checked={accidentChecks.cdma}
              onChange={handleAccidentChange}
              className="custom-checkbox"
            />
          </div>
        </div>

        {/* Tabla de Incidentes */}
        <div className="border border-[#0070c0] border-dotted">
          <div className="p-1 font-semibold text-center">INCIDENTE</div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Industrial (II)</span>
            <input
              type="checkbox"
              name="ii"
              checked={incidentChecks.ii}
              onChange={handleIncidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Con Daño a Proceso Productivo (CDPP)</span>
            <input
              type="checkbox"
              name="cdpp"
              checked={incidentChecks.cdpp}
              onChange={handleIncidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Tránsito (TTO)</span>
            <input
              type="checkbox"
              name="tto"
              checked={incidentChecks.tto}
              onChange={handleIncidentChange}
              className="custom-checkbox"
            />
          </div>
          <div className="p-1 border-t border-[#0070c0] border-dotted flex justify-between items-center font-semibold">
            <span>Laboral Sin Baja (ILSB)</span>
            <input
              type="checkbox"
              name="ilsb"
              checked={incidentChecks.ilsb}
              onChange={handleIncidentChange}
              className="custom-checkbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeAccidentIncidentTable;

