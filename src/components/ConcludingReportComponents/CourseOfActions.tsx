import React, { useEffect } from 'react';

const columnSizes = [
  '6.71px', '27.84px', '27.84px', '14.40px', '14.40px', '18.40px', '23.73px', '13.73px', '16.48px', '18.40px', '11.28px'
];

const rowSizes = [
  '19.33px', '19.33px', '19.33px', '20px', '38.67px', '136px', '107px', '110px', '80px', '103px'
];

export interface DatosExtraidos {
  mainInput: string | number | readonly string[] | undefined;
  id: string;
  numeroDocumento: string;
  timestamp: Date;
  [key: string]: any; // Para permitir propiedades dinámicas
}

interface CourseOfActionViewProps {
  formData: DatosExtraidos | null; // Permitir que formData sea null
  onDataChange: (updatedData: DatosExtraidos) => void;
}

const CourseOfActionView: React.FC<CourseOfActionViewProps> = ({ formData, onDataChange }) => {
  const tareasDinamicas = formData
    ? Object.keys(formData)
        .filter((key) => key.startsWith('tarea') && !key.includes('Final'))
        .map((key) => {
          const index = parseInt(key.replace('tarea', ''), 10);
          return {
            id: index,
            tarea: formData[key],
            subtarea: formData[`subtarea${index}`] || '',
            inicio: formData[`inicio${index}`] || '',
            fin: formData[`fin${index}`] || '',
            responsable: formData[`responsable${index}`] || '',
            cliente: formData[`cliente${index}`] || '',
            tipo: formData[`tipo${index}`] || '',
          };
        })
        .filter((tarea) => tarea.tarea)
        .sort((a, b) => a.id - b.id)
    : [];

  const fechaInicioPropagada = formData?.inicio1;
  const fechaFinPropagada = formData?.fin1;
  const tipoPropagado = formData?.tipo1;

  useEffect(() => {
    if (formData) {
      const updatedData = {
        ...formData,
        tareasDinamicas,
      };
      onDataChange(updatedData);
    }
  }, [formData, tareasDinamicas, onDataChange]);

  if (!formData) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div className="overflow-x-auto mx-16 mb-4">
      <h2 className="text-2xl font-bold mb-4">13. ACCIONES CORRELATIVAS/PREVENTIVAS</h2>
      <table id="viewTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Primera fila (estática) */}
          <tr>
            <td colSpan={11} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Plan de Acción:</span>
                <span className="ml-2 flex-1">{formData.mainInput}</span>
              </div>
            </td>
          </tr>
          {/* Segunda fila (estática) */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0] }} colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">Fecha:</span>
                <span className="ml-2 flex-1">{formData.inicio1}</span>
              </div>
            </td>
            <td style={{ width: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">Duración</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">Inicio</span>
              </div>
            </td>
            <td style={{ width: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">Término</span>
              </div>
            </td>
            <td style={{ width: columnSizes[5] }} colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">%Avance Plan en Tiempo</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Tercera fila (estática) */}
          <tr style={{ height: rowSizes[2] }}>
            <td colSpan={2} className="border-none"></td>
            <td style={{ width: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">7 días</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.inicio1}</span>
            </td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.fin1}</span>
            </td>
            <td colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">%Estatus Plan</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Cuarta fila (estática) */}
          <tr style={{ height: rowSizes[3] }}>
            <td colSpan={11} className="border-none"></td>
          </tr>
          {/* Quinta fila (cabecera dinámica) */}
          <tr style={{ height: rowSizes[4] }} className='bg-[#00B0F0]'>
            <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">#</td>
            <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-center align-middle">Tarea</td>
            <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-center align-middle">Sub-Tarea</td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300 text-center align-middle">INICIO</td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300 text-center align-middle">FIN</td>
            <td style={{ width: columnSizes[5] }} className="border border-gray-300 text-center align-middle">Responsable</td>
            <td style={{ width: columnSizes[6] }} className="border border-gray-300 text-center align-middle">Cliente</td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">Avance Real</td>
            <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">Avance Programado</td>
            <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">III_ddmmm: Comentario</td>
            <td style={{ width: columnSizes[10] }} className="border border-gray-300 text-center align-middle">Tipo ACC-INC</td>
          </tr>
          {/* Primera fila dinámica (estática) */}
          <tr style={{ height: rowSizes[5] }} className="bg-[#D9E1F2]">
            <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">1</td>
            <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-left align-middle">
              <span className="w-full h-full text-center">{formData.medidasCorrectivas}</span>
            </td>
            <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <span className="w-full h-full text-center">{formData.subtarea1}</span>
            </td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.inicio2}</span>
            </td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.fin2}</span>
            </td>
            <td style={{ width: columnSizes[5] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.responsable1}</span>
            </td>
            <td style={{ width: columnSizes[6] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.cliente1}</span>
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.tipo1}</span>
            </td>
          </tr>
          {/* Filas dinámicas */}
          {tareasDinamicas.map((tarea, index) => (
            <tr
              key={tarea.id}
              style={{ height: rowSizes[6 + index] || rowSizes[rowSizes.length - 1] }} // Asegura que siempre haya una altura válida
              className={index % 2 === 0 ? 'bg-white' : 'bg-[#D9E1F2]'}
            >
              <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">{tarea.id}</td>
              <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-left align-middle">{tarea.tarea}</td>
              <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
                <span className="w-full h-full text-center">{tarea.subtarea}</span>
              </td>
              <td style={{ width: columnSizes[3] }} className="border border-gray-300">
                <span className="w-full h-full text-center">{tarea.inicio}</span>
              </td>
              <td style={{ width: columnSizes[4] }} className="border border-gray-300">
                <span className="w-full h-full text-center">{tarea.fin}</span>
              </td>
              <td style={{ width: columnSizes[5] }} className="border border-gray-300">
                <span className="w-full h-full text-center">{tarea.responsable}</span>
              </td>
              <td style={{ width: columnSizes[6] }} className="border border-gray-300">
                <span className="w-full h-full text-center">{tarea.cliente}</span>
              </td>
              <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
              <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
              <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
              <td style={{ width: columnSizes[10] }} className="border border-gray-300">
                <span className="w-full h-full text-center">{tarea.tipo}</span>
              </td>
            </tr>
          ))}
          {/* Última fila fija (estática) */}
          <tr style={{ height: rowSizes[9] }} className="bg-[#D9E1F2]">
            <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">{tareasDinamicas.length + 2}</td>
            <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Reportar Avances de Plan de Acción</td>
            <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <span className="w-full h-full text-center">{formData[`subtarea${tareasDinamicas.length + 2}`]}</span>
            </td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData[`inicio${tareasDinamicas.length + 2}`] || fechaInicioPropagada}</span>
            </td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData[`fin${tareasDinamicas.length + 2}`] || fechaFinPropagada}</span>
            </td>
            <td style={{ width: columnSizes[5] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData[`responsable${tareasDinamicas.length + 2}`]}</span>
            </td>
            <td style={{ width: columnSizes[6] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData[`cliente${tareasDinamicas.length + 2}`]}</span>
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData[`tipo${tareasDinamicas.length + 2}`] || tipoPropagado}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CourseOfActionView;