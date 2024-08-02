import React, { useState, useEffect } from 'react';
import ExportButton from '@/components/ExportButtonTable';
import AuthSaveButton from '@/components/AuthSaveButton';

const columnSizes = [
  '6.71px', '27.84px', '14.40px', '14.40px', '18.40px', '23.73px', '13.73px', '16.48px', '18.40px', '11.28px'
];

const rowSizes = [
  '19.33px', '19.33px', '19.33px', '20px', '38.67px', '136px', '107px', '110px', '80px', '103px', '109px'
];

const Table: React.FC = () => {
  const [date, setDate] = useState('');
  const [autoDate, setAutoDate] = useState('');
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [mainInput, setMainInput] = useState('');
  const [client, setClient] = useState('');
  const [autoClient, setAutoClient] = useState('');

  useEffect(() => {
    if (date) {
      const timer = setTimeout(() => {
        setAutoDate(date);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [date]);

  useEffect(() => {
    if (client) {
      const timer = setTimeout(() => {
        setAutoClient(client);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [client]);

  useEffect(() => {
    let newInputValues = { ...inputValues };
    const keyword = mainInput.toLowerCase();
    if (keyword.includes('accidente')) {
      newInputValues = { ...newInputValues, tipo1: 'ACC', tipo2: 'ACC', tipo3: 'ACC', tipo4: 'ACC', tipo5: 'ACC', tipo6: 'ACC' };
    } else if (keyword.includes('incidente')) {
      newInputValues = { ...newInputValues, tipo1: 'INC', tipo2: 'INC', tipo3: 'INC', tipo4: 'INC', tipo5: 'INC', tipo6: 'INC' };
    }
    setInputValues(newInputValues);
  }, [mainInput]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const handleMainInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainInput(e.target.value);
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient(e.target.value);
  };

  const getTableData = () => {
    return {
      mainInput,
      date,
      autoDate,
      autoClient,
      ...inputValues
    };
  };

  return (
    <div className="overflow-x-auto">
      <table id="myTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* First row */}
          <tr>
            <td colSpan={10} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Acciones Inmediatas:</span>
                <input type="text" className="ml-2 flex-1 border-none focus:outline-none bg-[#00B0F0] bg-opacity-100" onChange={handleMainInputChange} />
              </div>
            </td>
          </tr>
          {/* Second row */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border-none" colSpan={3}>
              <div className="flex items-center w-full">
                <span className="text-left">fecha:</span>
                <input type="text" className="ml-2 flex-1 border-none focus:outline-none" onChange={handleDateChange} />
              </div>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">inicio</span>
              </div>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">termino</span>
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
              <input type="text" value={inputValues['inicio1'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio1')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin1'] || autoDate} onChange={(e) => handleInputChange(e, 'fin1')} className="w-full h-full border-none focus:outline-none text-center" />
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
              <input type="text" value={inputValues['inicio2'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio2')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['fin2'] || autoDate} onChange={(e) => handleInputChange(e, 'fin2')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['responsable1'] || ''} onChange={(e) => handleInputChange(e, 'responsable1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['cliente1'] || autoClient} onChange={(e) => handleInputChange(e, 'cliente1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" onBlur={handleClientChange}/>
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['tipo1'] || ''} onChange={(e) => handleInputChange(e, 'tipo1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Seventh row */}
          <tr style={{ height: rowSizes[6] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">2</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Informar Incidente y su clasificación a la Dirección</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <input type="text" value={inputValues['inicio3'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio3')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin3'] || autoDate} onChange={(e) => handleInputChange(e, 'fin3')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['responsable2'] || ''} onChange={(e) => handleInputChange(e, 'responsable2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <input type="text" value={inputValues['cliente2'] || autoClient} onChange={(e) => handleInputChange(e, 'cliente2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <input type="text" value={inputValues['tipo2'] || ''} onChange={(e) => handleInputChange(e, 'tipo2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
          {/* Eighth row */}
          <tr style={{ height: rowSizes[7] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">3</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Enviar recopilación de antecedentes</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['inicio4'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio4')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['fin4'] || autoDate} onChange={(e) => handleInputChange(e, 'fin4')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['responsable3'] || ''} onChange={(e) => handleInputChange(e, 'responsable3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['cliente3'] || autoClient} onChange={(e) => handleInputChange(e, 'cliente3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['tipo3'] || ''} onChange={(e) => handleInputChange(e, 'tipo3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Ninth row */}
          <tr style={{ height: rowSizes[8] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">4</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Informar Incidente Ocurrido a Jefatura CGE</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <input type="text" value={inputValues['inicio5'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio5')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin5'] || autoDate} onChange={(e) => handleInputChange(e, 'fin5')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['responsable4'] || ''} onChange={(e) => handleInputChange(e, 'responsable4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <input type="text" value={inputValues['cliente4'] || autoClient} onChange={(e) => handleInputChange(e, 'cliente4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <input type="text" value={inputValues['tipo4'] || ''} onChange={(e) => handleInputChange(e, 'tipo4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
          {/* Tenth row */}
          <tr style={{ height: rowSizes[9] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">5</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Generar Reporte Flash vía WhatsApp a Jefe de Área CGE y HSEQ</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['inicio6'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio6')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['fin6'] || autoDate} onChange={(e) => handleInputChange(e, 'fin6')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['responsable5'] || ''} onChange={(e) => handleInputChange(e, 'responsable5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['cliente5'] || autoClient} onChange={(e) => handleInputChange(e, 'cliente5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['tipo5'] || ''} onChange={(e) => handleInputChange(e, 'tipo5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Eleventh row */}
          <tr style={{ height: rowSizes[10] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">6</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Iniciar Proceso de Investigación Preliminar de Incidentes</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <input type="text" value={inputValues['inicio7'] || autoDate} onChange={(e) => handleInputChange(e, 'inicio7')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin7'] || autoDate} onChange={(e) => handleInputChange(e, 'fin7')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['responsable6'] || ''} onChange={(e) => handleInputChange(e, 'responsable6')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <input type="text" value={inputValues['cliente6'] || autoClient} onChange={(e) => handleInputChange(e, 'cliente6')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <input type="text" value={inputValues['tipo6'] || ''} onChange={(e) => handleInputChange(e, 'tipo6')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
        </tbody>
      </table>
      <ExportButton tableId="myTable" />
      <AuthSaveButton data={getTableData()} collectionName="InmediateActions" />
    </div>
  );
};

export default Table;
