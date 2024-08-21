import React, { useEffect, useRef } from 'react';

export interface TableData {
  id: number;
  inputText1: string;
  inputText2: string;
  inputText3: string;
  inputText4: string;
  inputText5: string;
  porques: string[]; // Asegúrate de que esto esté en los datos de Firebase
}

interface RootCauseAnalysisFormEditProps {
  data: TableData[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tableId: string, porqueIndex?: number) => void;
}

const RootCauseAnalysis: React.FC<RootCauseAnalysisFormEditProps> = ({ data, handleChange }) => {
  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([]);

  useEffect(() => {
    if (data.length === 0) return;
    inputRefs.current.forEach(refs => {
      refs.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.height = `${ref.scrollHeight}px`;
        }
      });
    });
  }, [data]);

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
    <div className="overflow-x-auto p-4 mx-16">
      <h2 className="text-2xl font-bold mb-4">9. ANÁLISIS DE LAS CAUSAS DEL ACCIDENTE/INCIDENTE</h2>
      <h3 className="text-xl font-semibold mb-6">METODOLOGÍA 5 POR QUÉ</h3>
      <div id="table-container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((table, index) => (
            <div key={index} className="mb-4">
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
                  {/* Fila de preguntas */}
                  <tr className="h-auto">
                    <td className="border px-4" rowSpan={2}>
                      <textarea
                        className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                        value={table.inputText1 || ''}
                        onChange={(e) => handleChange(e, table.id.toString())}
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
                        value={table.inputText5 || ''}
                        onChange={(e) => handleChange(e, table.id.toString())}
                        name="inputText5"
                        placeholder="Ingrese acción a incluir en plan de acción"
                        ref={(el) => {
                          if (!inputRefs.current[index]) {
                            inputRefs.current[index] = [];
                          }
                          inputRefs.current[index][table.porques.length + 1] = el;
                        }}
                      />
                    </td>
                  </tr>
                  {/* Fila de respuestas */}
                  <tr className="h-auto">
                    {table.porques.map((porque, porqueIndex) => (
                      <td
                        key={porqueIndex}
                        className={`border px-4 ${porqueIndex === table.porques.length - 1 ? 'bg-[#ffff00]' : 'bg-[#f2f2f2]'} bg-opacity-100`}
                      >
                        <textarea
                          className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
                          value={porque}
                          onChange={(e) => handleChange(e, table.id.toString(), porqueIndex)}
                          name={`porque${porqueIndex + 1}`}
                          placeholder="Ingrese texto aquí"
                          ref={(el) => {
                            if (!inputRefs.current[index]) {
                              inputRefs.current[index] = [];
                            }
                            inputRefs.current[index][porqueIndex + 1] = el; // porqueIndex + 1 para saltar el inputText1
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div>No se han encontrado datos de análisis de causas.</div>
        )}
      </div>
    </div>
  );
};

export default RootCauseAnalysis;


