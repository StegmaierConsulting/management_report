import React, { useState } from 'react';

interface AccidentDetailsFormProps {
  data: {
    fechaHora: string;
    lugar: string;
    descripcion: string;
  }
}

const AccidentDetailsForm: React.FC<AccidentDetailsFormProps> = ({ data }) => {
  const { fechaHora, lugar, descripcion } = data || { fechaHora: '', lugar: '', descripcion: '' };
  const [history, setHistory] = useState<string>('');

  // Función para limpiar, separar y formatear fecha y hora
  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return '';

    // Limpiar el texto no deseado
    let cleanedDateTime = dateTime.replace('y Fecha:', '').trim();

    // Separar hora y fecha
    const [time, date] = cleanedDateTime.split(' | ');

    // Formatear fecha y hora en el orden correcto
    return `${date} ${time}`;
  };

  return (
    <div className="border border-gray-300 border-dotted p-6 mx-20 mb-6">
      <div className="mb-4 flex">
        <h2 className="font-bold mb-4">5. FECHA Y HORA DEL ACCIDENTE/INCIDENTE (*)</h2>
        <input
          type="text"
          name="fechaHora"
          value={formatDateTime(fechaHora)}
          readOnly
          className="border-b border-dotted border-gray-300 focus:outline-none mb-4 ml-4 font-bold text-[#0070c0]"
        />
      </div>
      <div className="mb-4 flex">
        <h2 className="font-bold mb-4">6. LUGAR (*)</h2>
        <input
          type="text"
          name="lugar"
          value={lugar}
          readOnly
          className="border-b border-dotted border-gray-300 focus:outline-none font-bold mb-8 ml-4 text-[#0070c0]"
        />
      </div>

      <h2 className="font-bold mb-4">7. DESCRIPCIÓN DEL ACCIDENTE/INCIDENTE (*)</h2>
      <div className="mb-4">
        <textarea
          name="descripcion"
          value={descripcion}
          readOnly
          className="w-full p-2 border border-gray-300 focus:outline-none border-dotted text-[#0070c0] font-bold"
          rows={4}
        />
      </div>
      <h2 className="font-bold mb-4">8. ANTECEDENTES PREVIOS (*)</h2>
      <div className="mb-4">
        <textarea
          name="history"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          className="w-full p-2 border border-gray-300 focus:outline-none border-dotted text-[#0070c0] font-bold"
          rows={4}
        />
      </div>
    </div>
  );
};

export default AccidentDetailsForm;
