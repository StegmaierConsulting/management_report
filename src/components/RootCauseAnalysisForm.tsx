// components/RootCauseAnalysisForm.tsx
import React, { useState } from 'react';
import AuthSaveButton from '@/components/AuthSaveButton';
import ExportButton from '@/components/ExportButtonTable';
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea';

const RootCauseAnalysisForm: React.FC = () => {
  const [tables, setTables] = useState([
    { id: 1, inputText1: '', inputText2: '', inputText3: '', inputText4: '', inputText5: '' },
    { id: 2, inputText1: '', inputText2: '', inputText3: '', inputText4: '', inputText5: '' },
    { id: 3, inputText1: '', inputText2: '', inputText3: '', inputText4: '', inputText5: '' },
  ]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const newTables = [...tables];
    newTables[index] = { ...newTables[index], [field]: value };
    setTables(newTables);
  };

  return (
    <div className="overflow-x-auto">
      <div id="tables-container">
        {tables.map((table, index) => {
          const { ref: inputText1Ref } = useAutoResizeTextarea();
          const { ref: inputText5Ref } = useAutoResizeTextarea();
          
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
                      value={table.inputText1}
                      onChange={(e) => handleInputChange(index, 'inputText1', e.target.value)}
                      placeholder="Ingrese observación, causa inmediata o problema"
                      ref={inputText1Ref}
                    />
                  </td>
                  <td className="border px-4 bg-[#f2f2f2]">{`¿Por qué ${table.inputText1}?`}</td>
                  <td className="border px-4 bg-[#f2f2f2]">{`¿Por qué ${table.inputText2}?`}</td>
                  <td className="border px-4 bg-[#f2f2f2]">{`¿Por qué ${table.inputText3}?`}</td>
                  <td className="border px-4" rowSpan={2}>
                    <textarea
                      className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                      value={table.inputText5}
                      onChange={(e) => handleInputChange(index, 'inputText5', e.target.value)}
                      placeholder="Ingrese acción a incluir en plan de acción"
                      ref={inputText5Ref}
                    />
                  </td>
                </tr>
                <tr className="h-auto">
                  <td className="border px-4">
                    <input
                      type="text"
                      className="w-full p-2 border-none outline-none"
                      value={table.inputText2}
                      onChange={(e) => handleInputChange(index, 'inputText2', e.target.value)}
                      placeholder="Ingrese texto aquí"
                    />
                  </td>
                  <td className="border px-4">
                    <input
                      type="text"
                      className="w-full p-2 border-none outline-none"
                      value={table.inputText3}
                      onChange={(e) => handleInputChange(index, 'inputText3', e.target.value)}
                      placeholder="Ingrese texto aquí"
                    />
                  </td>
                  <td className="border px-4 bg-[#ffff00] bg-opacity-100">
                    <input
                      type="text"
                      className="w-full p-2 border-none outline-none bg-transparent"
                      value={table.inputText4}
                      onChange={(e) => handleInputChange(index, 'inputText4', e.target.value)}
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
      <div className="mt-4">
        <AuthSaveButton
          data={tables}
          collectionName="RootCauseAnalysis"
        />
        <ExportButton tableId="tables-container" />
      </div>
    </div>
  );
};

export default RootCauseAnalysisForm;
