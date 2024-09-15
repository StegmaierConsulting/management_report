// CostsTable.tsx

import React, { useState, useEffect } from 'react';

interface CostsTableProps {
  onDataChange: (data: {
    directCosts: { [key: string]: string };
    indirectCosts: { [key: string]: string };
    totalDirect: string;
    totalIndirect: string;
  }) => void;
  initialData?: {
    directCosts: { [key: string]: string };
    indirectCosts: { [key: string]: string };
    totalDirect: string;
    totalIndirect: string;
  };
}

const CostsTable: React.FC<CostsTableProps> = ({ onDataChange, initialData }) => {
  const [directCosts, setDirectCosts] = useState<{ [key: string]: string }>({
    repair: '',
    replacement: '',
    productionLoss: '',
    rental: '',
    lostProfit: '',
    others: '',
  });

  const [indirectCosts, setIndirectCosts] = useState<{ [key: string]: string }>({
    overtime: '',
    investigation: '',
    legal: '',
    indemnifications: '',
    displacement: '',
    others: '',
  });

  // Efecto para inicializar directCosts e indirectCosts con initialData cuando esté disponible
  useEffect(() => {
    if (initialData) {
      if (initialData.directCosts) {
        setDirectCosts(initialData.directCosts);
      }
      if (initialData.indirectCosts) {
        setIndirectCosts(initialData.indirectCosts);
      }
    }
  }, [initialData]);

  const calculateTotal = (costs: { [key: string]: string }) => {
    return Object.values(costs)
      .reduce((acc, value) => acc + (parseFloat(value) || 0), 0)
      .toFixed(2);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setCosts: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
    costs: { [key: string]: string }
  ) => {
    const { name, value } = e.target;
    const updatedCosts = { ...costs, [name]: value };
    setCosts(updatedCosts);
  };

  const totalDirect = calculateTotal(directCosts);
  const totalIndirect = calculateTotal(indirectCosts);

  useEffect(() => {
    onDataChange({
      directCosts,
      indirectCosts,
      totalDirect,
      totalIndirect,
    });
  }, [directCosts, indirectCosts, totalDirect, totalIndirect, onDataChange]);

  return (
    <div className="overflow-x-auto mx-16 mb-4">
      <h2 className="text-lg font-bold mb-4">14. COSTOS ASOCIADOS AL ACCIDENTE/ INCIDENTE:</h2>
      <table className="table-auto border-collapse w-full bg-white mb-4 border border-black">
        <thead>
          <tr>
            <th className="border px-4 py-2 w-1/3 text-left border-black">Costos Directos</th>
            <th className="border px-4 py-2 w-1/6 text-center border-black">UF</th>
            <th className="border px-4 py-2 w-1/3 text-left border-black">Costos Indirectos</th>
            <th className="border px-4 py-2 w-1/6 text-center border-black">UF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 border-black">Reparación</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="repair"
                value={directCosts.repair}
                onChange={(e) => handleInputChange(e, setDirectCosts, directCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
            <td className="border px-4 py-2 border-black">Sobre tiempo</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="overtime"
                value={indirectCosts.overtime}
                onChange={(e) => handleInputChange(e, setIndirectCosts, indirectCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 border-black">Reposición</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="replacement"
                value={directCosts.replacement}
                onChange={(e) => handleInputChange(e, setDirectCosts, directCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
            <td className="border px-4 py-2 border-black">Investigación de accidente</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="investigation"
                value={indirectCosts.investigation}
                onChange={(e) => handleInputChange(e, setIndirectCosts, indirectCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 border-black">Pérdida de Producción</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="productionLoss"
                value={directCosts.productionLoss}
                onChange={(e) => handleInputChange(e, setDirectCosts, directCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
            <td className="border px-4 py-2 border-black">Gastos legales</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="legal"
                value={indirectCosts.legal}
                onChange={(e) => handleInputChange(e, setIndirectCosts, indirectCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 border-black">Arriendo equipo reemplazo</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="rental"
                value={directCosts.rental}
                onChange={(e) => handleInputChange(e, setDirectCosts, directCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
            <td className="border px-4 py-2 border-black">Ayudas o Indemnizaciones</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="indemnifications"
                value={indirectCosts.indemnifications}
                onChange={(e) => handleInputChange(e, setIndirectCosts, indirectCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 border-black">Lucro cesante</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="lostProfit"
                value={directCosts.lostProfit}
                onChange={(e) => handleInputChange(e, setDirectCosts, directCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
            <td className="border px-4 py-2 border-black">Desplazamiento</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="displacement"
                value={indirectCosts.displacement}
                onChange={(e) => handleInputChange(e, setIndirectCosts, indirectCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 border-black">Otros</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="others"
                value={directCosts.others}
                onChange={(e) => handleInputChange(e, setDirectCosts, directCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
            <td className="border px-4 py-2 border-black">Otros</td>
            <td className="border px-4 py-2 border-black">
              <input
                type="text"
                name="others"
                value={indirectCosts.others}
                onChange={(e) => handleInputChange(e, setIndirectCosts, indirectCosts)}
                className="w-full border-none focus:outline-none text-center text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold border-black">TOTAL</td>
            <td className="border px-4 py-2 border-black">{totalDirect}</td>
            <td className="border px-4 py-2 font-bold border-black">TOTAL</td>
            <td className="border px-4 py-2 border-black">{totalIndirect}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CostsTable;

