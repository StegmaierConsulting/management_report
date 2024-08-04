// DamagedEquipmentTable.tsx

import React, { useState } from 'react';

const DamagedEquipmentTable: React.FC = () => {
  const [formData, setFormData] = useState({
    equipo: '',
    baja: '',
    trabajo: '',
    tipoDano: '',
    conductor: '',
    rut: '',
    cargo: '',
    antiguedadCargo: '',
    area: '',
    constanciaPolicial: '',
    unidadPolicial: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="border border-dotted border-gray-300 p-4 mx-6 mb-6">
      <h2 className="font-bold mb-4">3. EQUIPO DAÑADO O PROCESO AFECTADO (*)</h2>
      <table className="table-auto w-full">
        <tbody>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Equipo Dañado o Proceso afectado</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="equipo"
                value={formData.equipo}
                onChange={handleInputChange}
                className="w-full p-1 border-b focus:outline-none border-dotted border-gray-300 font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">¿Se dio de baja?</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="baja"
                    value="Sí"
                    checked={formData.baja === 'Sí'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Sí
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="baja"
                    value="No"
                    checked={formData.baja === 'No'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="baja"
                    value="No Aplica"
                    checked={formData.baja === 'No Aplica'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  No Aplica
                </label>
              </div>
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">¿Siguió en trabajo?</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="trabajo"
                    value="Sí"
                    checked={formData.trabajo === 'Sí'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Sí
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="trabajo"
                    value="No"
                    checked={formData.trabajo === 'No'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="trabajo"
                    value="No Aplica"
                    checked={formData.trabajo === 'No Aplica'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  No Aplica
                </label>
              </div>
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Tipo de daño</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="tipoDano"
                value={formData.tipoDano}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Nombre del conductor u Operador</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="conductor"
                value={formData.conductor}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">RUT</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Cargo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Antigüedad en el cargo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="antiguedadCargo"
                value={formData.antiguedadCargo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Área</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Constancia policial o notarial</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="constanciaPolicial"
                value={formData.constanciaPolicial}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Unidad policial o notaría</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="unidadPolicial"
                value={formData.unidadPolicial}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DamagedEquipmentTable;
