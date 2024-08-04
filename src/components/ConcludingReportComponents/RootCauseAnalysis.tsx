import React, { useEffect, useRef } from 'react';

export interface TableData {
  id: number;
  inputText1: string;
  inputText2: string;
  inputText3: string;
  inputText4: string;
  inputText5: string;
}

interface RootCauseAnalysisFormEditProps {
  data: TableData[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tableId: string) => void;
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

  return (
    <div className="overflow-x-auto p-4 mx-16">
      <h2 className="text-2xl font-bold mb-4">9. ANÁLISIS DE LAS CAUSAS DEL ACCIDENTE/INCIDENTE</h2>
      <h3 className="text-xl font-semibold mb-6">METODOLOGÍA 5 POR QUÉ</h3>
      <div id="table-container">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((table, index) => (
            <Table
              key={index}
              table={table}
              tableId={table.id.toString()}
              handleChange={handleChange}
              inputRefs={inputRefs}
            />
          ))
        ) : (
          <div>No se han encontrado datos de análisis de causas.</div>
        )}
      </div>
    </div>
  );
};

interface TableProps {
  table: TableData;
  tableId: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tableId: string) => void;
  inputRefs: React.MutableRefObject<(HTMLTextAreaElement | null)[][]>;
}

const Table: React.FC<TableProps> = ({ table, tableId, handleChange, inputRefs }) => (
  <table className="table-auto border-collapse w-full bg-white mb-4 -ml-2">
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
            onChange={(e) => handleChange(e, tableId)}
            name="inputText1"
            placeholder="Ingrese observación, causa inmediata o problema"
            ref={(el) => {
              if (!inputRefs.current[table.id]) {
                inputRefs.current[table.id] = [];
              }
              inputRefs.current[table.id][0] = el;
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
            onChange={(e) => handleChange(e, tableId)}
            name="inputText5"
            placeholder="Ingrese acción a incluir en plan de acción"
            ref={(el) => {
              if (!inputRefs.current[table.id]) {
                inputRefs.current[table.id] = [];
              }
              inputRefs.current[table.id][1] = el;
            }}
          />
        </td>
      </tr>
      <tr className="h-auto">
        <td className="border px-4">
          <textarea
            className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
            value={table.inputText2 || ''}
            onChange={(e) => handleChange(e, tableId)}
            name="inputText2"
            placeholder="Ingrese texto aquí"
            ref={(el) => {
              if (!inputRefs.current[table.id]) {
                inputRefs.current[table.id] = [];
              }
              inputRefs.current[table.id][2] = el;
            }}
          />
        </td>
        <td className="border px-4">
          <textarea
            className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
            value={table.inputText3 || ''}
            onChange={(e) => handleChange(e, tableId)}
            name="inputText3"
            placeholder="Ingrese texto aquí"
            ref={(el) => {
              if (!inputRefs.current[table.id]) {
                inputRefs.current[table.id] = [];
              }
              inputRefs.current[table.id][3] = el;
            }}
          />
        </td>
        <td className="border px-4 bg-[#ffff00] bg-opacity-100">
          <textarea
            className="w-full p-2 border-none outline-none resize-none overflow-hidden bg-transparent"
            value={table.inputText4 || ''}
            onChange={(e) => handleChange(e, tableId)}
            name="inputText4"
            placeholder="Ingrese texto aquí"
            ref={(el) => {
              if (!inputRefs.current[table.id]) {
                inputRefs.current[table.id] = [];
              }
              inputRefs.current[table.id][4] = el;
            }}
          />
        </td>
      </tr>
      <tr className="h-[19px]">
        <td className="border px-4" colSpan={5}></td>
      </tr>
    </tbody>
  </table>
);

export default RootCauseAnalysis;
