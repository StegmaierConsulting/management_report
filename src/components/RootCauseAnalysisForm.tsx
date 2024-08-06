// components/RootCauseAnalysisForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import AuthSaveButton from '@/components/AuthSaveButton';
import ExportButton from '@/components/ExportButtonTable';

const RootCauseAnalysisForm: React.FC = () => {
  const [tables, setTables] = useState([
    { id: 1, inputText1: '', inputText5: '', porques: [''] },
    { id: 2, inputText1: '', inputText5: '', porques: [''] },
    { id: 3, inputText1: '', inputText5: '', porques: [''] },
  ]);

  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([]);

  useEffect(() => {
    inputRefs.current.forEach(refs => {
      refs.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.height = `${ref.scrollHeight}px`;
        }
      });
    });
  }, [tables]);

  const handleInputChange = (index: number, field: string, value: string, porqueIndex?: number) => {
    const newTables = [...tables];
    if (field === 'porques' && porqueIndex !== undefined) {
      newTables[index].porques[porqueIndex] = value;
    } else {
      newTables[index] = { ...newTables[index], [field]: value };
    }
    setTables(newTables);
  };

  const addPorqueColumn = (index: number) => {
    const newTables = [...tables];
    if (newTables[index].porques.length < 7) {
      newTables[index].porques.push('');
    }
    setTables(newTables);
  };

  const ordinalSuffix = (number: number) => {
    switch (number) {
      case 1: return '1er';
      case 2: return '2do';
      case 3: return '3er';
      case 4: return '4to';
      case 5: return '5to';
      case 6: return '6to';
      case 7: return '7to';
      default: return `${number}º`;
    }
  };

  return (
    <div className="overflow-x-auto">
      <div id="tables-container">
        {tables.map((table, index) => (
          <div key={table.id} className="mb-4">
            <table className="table-auto border-collapse w-full bg-white">
              <thead>
                <tr className="bg-[#00b0f0]">
                  <th className="border px-4 py-2 w-[228px]">Hecho, Observación, Causa Inmediata o Problema</th>
                  {table.porques.map((_, porqueIndex) => (
                    <th key={porqueIndex} className="border px-4 py-2 w-[266px]">{`${ordinalSuffix(porqueIndex + 1)} Por qué`}</th>
                  ))}
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
                      ref={(el) => {
                        if (!inputRefs.current[index]) {
                          inputRefs.current[index] = [];
                        }
                        inputRefs.current[index][0] = el;
                      }}
                    />
                  </td>
                  {table.porques.map((_, porqueIndex) => (
                    <td key={porqueIndex} className="border px-4 bg-[#f2f2f2] py-3">
                      {porqueIndex === 0 ? (
                        <span>{`¿Por qué ${table.inputText1}?`}</span>
                      ) : (
                        <span>{`¿Por qué ${table.porques[porqueIndex - 1]}?`}</span>
                      )}
                    </td>
                  ))}
                  <td className="border px-4" rowSpan={2}>
                    <textarea
                      className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                      value={table.inputText5}
                      onChange={(e) => handleInputChange(index, 'inputText5', e.target.value)}
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
                  {table.porques.map((porque, porqueIndex) => (
                    <td
                      key={porqueIndex}
                      className={`border px-4 ${porqueIndex === table.porques.length - 1 ? 'bg-[#ffff00]' : 'bg-[#f2f2f2]'} bg-opacity-100`}
                    >
                      <textarea
                        className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                        value={porque}
                        onChange={(e) => handleInputChange(index, 'porques', e.target.value, porqueIndex)}
                        placeholder="Ingrese texto aquí"
                      />
                    </td>
                  ))}
                </tr>
                <tr className="h-[19px]">
                  <td className="border px-4" colSpan={table.porques.length + 2}></td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-4">
        {tables.map((table, index) => (
          <div key={table.id} className="mb-2">
            {table.porques.length < 7 && (
              <div className="flex justify-end">
                <button
                  onClick={() => addPorqueColumn(index)}
                  className="px-4 py-2 bg-[#00b0f0] text-white rounded"
                >
                  {`Agregar Por qué T${index + 1}`}
                </button>
              </div>
            )}
          </div>
        ))}
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
