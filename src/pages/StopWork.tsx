'use client';

import { useState } from 'react';
import AutomaticLanguageChecker from '../components/automaticLanguageCheckerStopWork';
import StopWork, { DatosExtraidos } from '../components/stopWork';
import VisualizacionReporteStopWork from '@/components/reportVisualizationStopWork';
import { Header } from '@/components/header';
import '@/app/globals.css';

export default function StopWorkCondition() {
  const [textoPegado, setTextoPegado] = useState('');
  const [datosExtraidos, setDatosExtraidos] = useState<DatosExtraidos>({});
  const [previas, setPrevias] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = event.target.value;
    setTextoPegado(texto);
    setDatosExtraidos(AutomaticLanguageChecker({ texto }));
  };

  const handleDatosChange = (updatedDatos: DatosExtraidos) => {
    setDatosExtraidos(updatedDatos);
  };

  const handleFileChange = (nuevasPrevias: string[]) => {
    setPrevias(nuevasPrevias);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 mt-24">
        <div className='z-5'>
          <textarea
            placeholder="Pega o escribe el texto aquí"
            value={textoPegado}
            onChange={handleInputChange}
            rows={5}
            className="text-black w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <StopWork datos={datosExtraidos} onDatosChange={handleDatosChange} onFileChange={handleFileChange} />
        </div>
        <div>
          <VisualizacionReporteStopWork datos={datosExtraidos} imagenes={previas} />
        </div>
      </div>
    </>
  );
}
