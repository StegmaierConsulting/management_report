import React, { useState, useEffect } from 'react';
import { firestore } from '@/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import ExportButton from '@/components/ExportButtonTable'; // Importamos el botón de exportación

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

interface InmediateActionsEditProps {
  formData: DatosExtraidos;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedEmpresa: string;
  onFileChange: () => void;
}

const InmediateActionsEdit: React.FC<InmediateActionsEditProps> = ({ formData, handleChange, selectedEmpresa, onFileChange }) => {
  const [localData, setLocalData] = useState<DatosExtraidos>(formData);

  useEffect(() => {
    setLocalData(formData);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({ ...prevData, [name]: value }));
    handleChange(e);
  };

  const handleSave = async () => {
    try {
      const docRef = doc(firestore, `USERAUTH/${selectedEmpresa}/InmediateActions`, formData.id);
      await updateDoc(docRef, { ...localData });
      onFileChange();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const columnSizes = [
    '6.71px', '27.84px', '14.40px', '14.40px', '18.40px', '23.73px', '13.73px', '16.48px', '18.40px', '11.28px'
  ];

  const rowSizes = [
    '19.33px', '19.33px', '19.33px', '20px', '38.67px', '136px', '107px', '110px', '80px', '103px', '109px'
  ];

  return (
    <div className="overflow-x-auto">
      <table id="editTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* First row */}
          <tr>
            <td colSpan={10} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Acciones Inmediatas:</span>
                <input
                  type="text"
                  className="ml-2 flex-1 border-none focus:outline-none bg-[#00B0F0] bg-opacity-100"
                  value={localData.mainInput}
                  name="mainInput"
                  onChange={handleInputChange}
                />
              </div>
            </td>
          </tr>
          {/* Second row */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border-none" colSpan={3}>
              <div className="flex items-center w-full">
                <span className="text-left">fecha:</span>
                <input
                  type="text"
                  className="ml-2 flex-1 border-none focus:outline-none"
                  value={localData.date}
                  name="date"
                  onChange={handleInputChange}
                />
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
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
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
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.responsable1}
                onChange={handleInputChange}
                name="responsable1"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.cliente1}
                onChange={handleInputChange}
                name="cliente1"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.tipo1}
                onChange={handleInputChange}
                name="tipo1"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
          </tr>
          {/* Seventh row */}
          <tr style={{ height: rowSizes[6] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">2</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Informar Incidente y su clasificación a la Dirección</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.responsable2}
                onChange={handleInputChange}
                name="responsable2"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoClient}
                onChange={handleInputChange}
                name="autoClient"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.tipo2}
                onChange={handleInputChange}
                name="tipo2"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
          </tr>
          {/* Eighth row */}
          <tr style={{ height: rowSizes[7] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">3</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Enviar recopilación de antecedentes</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.responsable3}
                onChange={handleInputChange}
                name="responsable3"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoClient}
                onChange={handleInputChange}
                name="autoClient"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.tipo3}
                onChange={handleInputChange}
                name="tipo3"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
          </tr>
          {/* Ninth row */}
          <tr style={{ height: rowSizes[8] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">4</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Informar Incidente Ocurrido a Jefatura CGE</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.responsable4}
                onChange={handleInputChange}
                name="responsable4"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoClient}
                onChange={handleInputChange}
                name="autoClient"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.tipo4}
                onChange={handleInputChange}
                name="tipo4"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
          </tr>
          {/* Tenth row */}
          <tr style={{ height: rowSizes[9] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">5</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Generar Reporte Flash vía WhatsApp a Jefe de Área CGE y HSEQ</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.responsable5}
                onChange={handleInputChange}
                name="responsable5"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.autoClient}
                onChange={handleInputChange}
                name="autoClient"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input
                type="text"
                value={localData.tipo5}
                onChange={handleInputChange}
                name="tipo5"
                className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100"
              />
            </td>
          </tr>
          {/* Eleventh row */}
          <tr style={{ height: rowSizes[10] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">6</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Iniciar Proceso de Investigación Preliminar de Incidentes</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoDate}
                onChange={handleInputChange}
                name="autoDate"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.responsable6}
                onChange={handleInputChange}
                name="responsable6"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.autoClient}
                onChange={handleInputChange}
                name="autoClient"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#36BE52]">INMEDIATO</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300">
              <input
                type="text"
                value={localData.tipo6}
                onChange={handleInputChange}
                name="tipo6"
                className="w-full h-full border-none focus:outline-none text-center"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
        <ExportButton tableId="editTable" /> {/* Botón de exportación */}
      </div>
    </div>
  );
};

export default InmediateActionsEdit;
