import React from 'react';

export interface DatosExtraidos {
  id: string;
  autoClient: string;
  autoDate: string;
  cliente1: string;
  date: string;
  empresaGuardado: string;
  mainInput: string;
  numeroDocumento: string;
  responsable1: string;
  responsable2: string;
  responsable3: string;
  responsable4: string;
  responsable5: string;
  responsable6: string;
  tipo1: string;
  tipo2: string;
  tipo3: string;
  tipo4: string;
  tipo5: string;
  tipo6: string;
}

interface InmediateActionsProps {
  formData?: DatosExtraidos;
}

const InmediateActions: React.FC<InmediateActionsProps> = ({ formData }) => {
  if (!formData) {
    return <div>No se han encontrado datos de acciones inmediatas.</div>;
  }

  const columnSizes = [
    '6.71px', '27.84px', '14.40px', '14.40px', '18.40px', '23.73px', '13.73px', '16.48px', '18.40px', '11.28px'
  ];

  const rowSizes = [
    '19.33px', '19.33px', '19.33px', '20px', '38.67px', '136px', '107px', '110px', '80px', '103px', '109px'
  ];

  return (
    <div className="overflow-x-auto mx-16 mb-4">
      <h2 className="text-2xl font-bold mb-4">12. ACCIONES INMEDIATAS:</h2>
      <table id="inmediateActionsTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* First row */}
          <tr>
            <td colSpan={10} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Acciones Inmediatas:</span>
                <span className="ml-2 flex-1">{formData.mainInput || 'N/A'}</span>
              </div>
            </td>
          </tr>
          {/* Second row */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border-none" colSpan={3}>
              <div className="flex items-center w-full">
                <span className="text-left">Fecha:</span>
                <span className="ml-2 flex-1">{formData.date || 'N/A'}</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">Inicio</span>
              </div>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">Término</span>
              </div>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border-none" colSpan={2}>
              <div className="flex items-center w-full">
                <span className="text-left">%Avance Plan en Tiempo</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 bg-[#36BE52]">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={2} className="border-none"></td>
          </tr>
          {/* Third row */}
          <tr style={{ height: rowSizes[2] }}>
            <td colSpan={3} className="border-none"></td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate || 'N/A'}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate || 'N/A'}</span>
            </td>
            <td colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">%Estatus Plan</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 bg-[#36BE52]">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={2} className="border-none"></td>
          </tr>
          {/* Fourth row */}
          <tr style={{ height: rowSizes[3] }}>
            <td colSpan={10} className="border-none"></td>
          </tr>
          {/* Fifth row */}
          <tr style={{ height: rowSizes[4] }} className='bg-[#00B0F0]'>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">#</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-center align-middle">Tarea</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-center align-middle">INICIO</td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 text-center align-middle">FIN</td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 text-center align-middle">Responsable</td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 text-center align-middle">Cliente</td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">Avance Real</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">Avance Programado</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">III_ddmmm: Comentario</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">Tipo ACC-INC</td>
          </tr>
          {/* Sixth row */}
          <tr style={{ height: rowSizes[5] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">1</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Comunicar lo acontecido a Jefatura Directa</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.responsable1}</span>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.cliente1}</span>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.tipo1}</span>
            </td>
          </tr>
          {/* Seventh row */}
          <tr style={{ height: rowSizes[6] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">2</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Informar Incidente y su clasificación a la Dirección</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.responsable2}</span>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoClient}</span>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.tipo2}</span>
            </td>
          </tr>
          {/* Eighth row */}
          <tr style={{ height: rowSizes[7] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">3</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Enviar recopilación de antecedentes</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.responsable3}</span>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoClient}</span>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.tipo3}</span>
            </td>
          </tr>
          {/* Ninth row */}
          <tr style={{ height: rowSizes[8] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">4</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Informar Incidente Ocurrido a Jefatura CGE</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.responsable4}</span>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoClient}</span>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.tipo4}</span>
            </td>
          </tr>
          {/* Tenth row */}
          <tr style={{ height: rowSizes[9] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">5</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Generar Reporte Flash vía WhatsApp a Jefe de Área CGE y HSEQ</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.responsable5}</span>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.autoClient}</span>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <span className="w-full h-full text-center bg-[#D9E1F2] bg-opacity-100">{formData.tipo5}</span>
            </td>
          </tr>
          {/* Eleventh row */}
          <tr style={{ height: rowSizes[10] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">6</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Iniciar Proceso de Investigación Preliminar de Incidentes</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoDate}</span>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.responsable6}</span>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.autoClient}</span>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <span className="w-full h-full text-center">{formData.tipo6}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InmediateActions;
