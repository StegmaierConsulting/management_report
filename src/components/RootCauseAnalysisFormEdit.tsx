// components/RootCauseAnalysisFormEdit.tsx
import React, { ReactNode, useEffect, useRef } from 'react';
import { firestore } from '@/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import ExportButton from '@/components/ExportButtonTable';

export interface TableData {
  id: number;
  inputText1: string;
  inputText2: string;
  inputText3: string;
  inputText4: string;
  inputText5: string;
}

export interface DatosExtraidos {
  numeroDocumento: ReactNode;
  tables: { [key: string]: TableData };
}

interface RootCauseAnalysisFormEditProps {
  formData: { [key: string]: TableData }; // Se recibe solo las tablas
  selectedEmpresa: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tableId: string) => void;
  onFileChange: () => void;
}

const RootCauseAnalysisFormEdit: React.FC<RootCauseAnalysisFormEditProps> = ({
  formData,
  selectedEmpresa,
  handleChange,
  onFileChange,
}) => {
  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([]);

  useEffect(() => {
    if (!formData) return;
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
    if (selectedEmpresa && formData) {
      // Seleccionar el primer documento para usar su ID como referencia
      const firstKey = Object.keys(formData)[0];
      const docRef = doc(firestore, `USERAUTH/${selectedEmpresa}/RootCauseAnalysis`, firstKey);

      // Preparar los datos para la actualización
      const updatedData = { ...formData };

      await updateDoc(docRef, { tables: updatedData });
      onFileChange();
    }
  };

  if (!formData) {
    return <div>No se ha seleccionado ningún formulario para editar.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div id="tables-container">
        {Object.keys(formData).map((key, index) => {
          const table = formData[key];
          return (
            <table key={table.id} className="table-auto border-collapse w-full bg-white mb-4">
              <thead>
                <tr className="bg-[#00b0f0]">
                  <th className="border px-4 py-2 w-[228px]">Hecho, Observación, Causa Inmediata o Problema</th>
                  <th className="border px-4 py-2 w-[281px]">1er Por qué</th>
                  <th className="border px-4 py-2 w-[266px]">2do Por qué</th>
                  <th className="border px-4 py-2 w-[266px]">3ro Por qué</th>
                  <th className="border px-4 py-2 w-[266px]">Acción a Incluir en Plan de Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-auto">
                  <td className="border px-4" rowSpan={2}>
                    <textarea
                      className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                      value={table.inputText1 || ''}
                      onChange={(e) => handleChange(e, key)}
                      name="inputText1"
                      placeholder="Ingrese observación, causa inmediata o problema"
                      ref={(el) => {
                        if (!inputRefs.current[index]) {
                          inputRefs.current[index] = [];
                        }
                        inputRefs.current[index][0] = el;
                      }}
                    />
                  </td>
                  <td className="border px-4 bg-[#f2f2f2]">{`¿Por qué ${table.inputText1}?`}</td>
                  <td className="border px-4 bg-[#f2f2f2]">{`¿Por qué ${table.inputText2}?`}</td>
                  <td className="border px-4 bg-[#f2f2f2]">{`¿Por qué ${table.inputText3}?`}</td>
                  <td className="border px-4" rowSpan={2}>
                    <textarea
                      className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                      value={table.inputText5 || ''}
                      onChange={(e) => handleChange(e, key)}
                      name="inputText5"
                      placeholder="Ingrese acción a incluir en plan de acción"
                      ref={(el) => {
                        if (!inputRefs.current[index]) {
                          inputRefs.current[index] = [];
                        }
                        inputRefs.current[index][1] = el;
                      }}
                    />
                  </td>
                </tr>
                <tr className="h-auto">
                  <td className="border px-4">
                    <input
                      type="text"
                      className="w-full p-2 border-none outline-none"
                      value={table.inputText2 || ''}
                      onChange={(e) => handleChange(e, key)}
                      name="inputText2"
                      placeholder="Ingrese texto aquí"
                    />
                  </td>
                  <td className="border px-4">
                    <input
                      type="text"
                      className="w-full p-2 border-none outline-none"
                      value={table.inputText3 || ''}
                      onChange={(e) => handleChange(e, key)}
                      name="inputText3"
                      placeholder="Ingrese texto aquí"
                    />
                  </td>
                  <td className="border px-4 bg-[#ffff00] bg-opacity-100">
                    <input
                      type="text"
                      className="w-full p-2 border-none outline-none bg-transparent"
                      value={table.inputText4 || ''}
                      onChange={(e) => handleChange(e, key)}
                      name="inputText4"
                      placeholder="Ingrese texto aquí"
                    />
                  </td>
                </tr>
                <tr className="h-[19px]">
                  <td className="border px-4" colSpan={5}></td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
        <ExportButton tableId="tables-container" />
      </div>
    </div>
  );
};

export default RootCauseAnalysisFormEdit;
