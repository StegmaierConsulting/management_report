import React, { useState, useEffect, useRef } from 'react';
import { firestore } from '@/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import ExportButton from '@/components/ExportButtonTable';

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
  tipo1: string;
  tipo2: string;
  tipo3: string;
  tipo4: string;
  tipo5: string;
  subtarea1: string;
  subtarea2: string;
  subtarea3: string;
  subtarea4: string;
  subtarea5: string;
  responsable1: string;
  responsable2: string;
  responsable3: string;
  responsable4: string;
  responsable5: string;
  cliente1: string;
  cliente2: string;
  cliente3: string;
  cliente4: string;
  cliente5: string;
  inicio1: string;
  inicio2: string;
  inicio3: string;
  inicio4: string;
  inicio5: string;
  inicio6: string;
  fin1: string;
  fin2: string;
  fin3: string;
  fin4: string;
  fin5: string;
  fin6: string;
}

const CourseOfActionEdit: React.FC<{ formData: DatosExtraidos; selectedEmpresa: string; handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }> = ({ formData, selectedEmpresa, handleChange }) => {
  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([[], [], [], [], [], [], []]);

  useEffect(() => {
    inputRefs.current.forEach(refs => {
      refs.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.height = `${ref.scrollHeight}px`;
        }
      });
    });
  }, [formData]);

  const handleSave = async () => {
    try {
      await setDoc(doc(firestore, `USERAUTH/${selectedEmpresa}/CourseOfAction`, formData.id), formData);
      alert('Datos actualizados exitosamente');
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const setRef = (rowIndex: number, colIndex: number) => (el: HTMLTextAreaElement | null) => {
    inputRefs.current[rowIndex][colIndex] = el;
  };

  if (!formData) {
    return <div>No data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table id="myTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* First row */}
          <tr>
            <td colSpan={11} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Plan de Acción:</span>
                <input type="text" value={formData.mainInput} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="numeroDocumento" className="ml-2 flex-1 border-none focus:outline-none bg-[#00B0F0] bg-opacity-100" />
              </div>
            </td>
          </tr>
          {/* Second row */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border-none" colSpan={2}>
              <div className="flex items-center w-full">
                <span className="text-left">fecha:</span>
                <input type="text" value={formData.inicio1} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio1" className="ml-2 flex-1 border-none focus:outline-none" />
              </div>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">duracion</span>
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
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Third row */}
          <tr style={{ height: rowSizes[2] }}>
            <td colSpan={2} className="border-none"></td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">7 dias</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={formData.inicio1} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio1" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={formData.fin1} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="fin1" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">%Estatus Plan</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Fourth row */}
          <tr style={{ height: rowSizes[3] }}>
            <td colSpan={11} className="border-none"></td>
          </tr>
          {/* Fifth row */}
          <tr style={{ height: rowSizes[4] }} className='bg-[#00B0F0]'>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">#</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-center align-middle">Tarea</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-center align-middle">Sub-Tarea</td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 text-center align-middle">INICIO</td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 text-center align-middle">FIN</td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 text-center align-middle">Responsable</td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">Cliente</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">Avance Real</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">Avance Programado</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">III_ddmmm: Comentario</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 text-center align-middle">Tipo ACC-INC</td>
          </tr>
          {/* Sixth row */}
          <tr style={{ height: rowSizes[5] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">1</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Desarrollar Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">
              <textarea ref={setRef(0, 0)} value={formData.subtarea1} onChange={(e) => handleChange(e)} name="subtarea1" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.inicio2} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio2" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.fin2} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="fin2" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(1, 0)} value={formData.responsable1} onChange={(e) => handleChange(e)} name="responsable1" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(2, 0)} value={formData.cliente1} onChange={(e) => handleChange(e)} name="cliente1" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.tipo1} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="tipo1" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Seventh row */}
          <tr style={{ height: rowSizes[6] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">2</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Implementación de Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea ref={setRef(0, 1)} value={formData.subtarea2} onChange={(e) => handleChange(e)} name="subtarea2" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={formData.inicio3} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio3" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={formData.fin3} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="fin3" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <textarea ref={setRef(1, 1)} value={formData.responsable2} onChange={(e) => handleChange(e)} name="responsable2" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
              <textarea ref={setRef(2, 1)} value={formData.cliente2} onChange={(e) => handleChange(e)} name="cliente2" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
              <input type="text" value={formData.tipo2} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="tipo2" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
          {/* Eighth row */}
          <tr style={{ height: rowSizes[7] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">3</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Implementación de Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">
              <textarea ref={setRef(0, 2)} value={formData.subtarea3} onChange={(e) => handleChange(e)} name="subtarea3" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.inicio4} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio4" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.fin4} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="fin4" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(1, 2)} value={formData.responsable3} onChange={(e) => handleChange(e)} name="responsable3" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(2, 2)} value={formData.cliente3} onChange={(e) => handleChange(e)} name="cliente3" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.tipo3} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="tipo3" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Ninth row */}
          <tr style={{ height: rowSizes[8] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">4</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Implementación de Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea ref={setRef(0, 3)} value={formData.subtarea4} onChange={(e) => handleChange(e)} name="subtarea4" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={formData.inicio5} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio5" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={formData.fin5} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="fin5" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <textarea ref={setRef(1, 3)} value={formData.responsable4} onChange={(e) => handleChange(e)} name="responsable4" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
              <textarea ref={setRef(2, 3)} value={formData.cliente4} onChange={(e) => handleChange(e)} name="cliente4" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
              <input type="text" value={formData.tipo4} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="tipo4" className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
          {/* Tenth row */}
          <tr style={{ height: rowSizes[9] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">5</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Reportar Avances de Plan de Acción</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(0, 4)} value={formData.subtarea5} onChange={(e) => handleChange(e)} name="subtarea5" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.inicio6} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="inicio6" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.fin6} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="fin6" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(1, 4)} value={formData.responsable5} onChange={(e) => handleChange(e)} name="responsable5" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(2, 4)} value={formData.cliente5} onChange={(e) => handleChange(e)} name="cliente5" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={formData.tipo5} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="tipo5" className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
        </tbody>
      </table>
      <ExportButton tableId="myTable" />
      <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded mt-4">
        Guardar Cambios
      </button>
    </div>
  );
};

export default CourseOfActionEdit;
