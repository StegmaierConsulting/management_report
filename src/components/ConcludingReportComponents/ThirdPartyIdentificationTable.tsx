import React, { useState, useEffect } from 'react';

interface ThirdPartyIdentificationTableProps {
  onDataChange: (data: {
    nombre: string;
    rut: string;
    edad: string;
    lesiones: string;
    tipoVehiculo: string;
    danosMateriales: string;
    patente: string;
  }) => void;
}

const ThirdPartyIdentificationTable: React.FC<ThirdPartyIdentificationTableProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    edad: '',
    lesiones: '',
    tipoVehiculo: '',
    danosMateriales: '',
    patente: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  return (
    <div className="border border-gray-300 p-4 mx-20 mb-6 border-dotted">
      <h2 className="font-bold mb-4">4. IDENTIFICACION DE TERCEROS RELACIONADOS CON EL ACCIDENTE/INCIDENTE:</h2>
      <table className="table-auto w-full">
        <tbody>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Nombre</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-dotted border-gray-300 focus:outline-none font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Rut</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none border-dotted text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Edad</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="edad"
                value={formData.edad}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none border-dotted font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Lesiones</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="lesiones"
                value={formData.lesiones}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none border-dotted font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Tipo de Vehículo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="tipoVehiculo"
                value={formData.tipoVehiculo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none border-dotted font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Daños Materiales</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="danosMateriales"
                value={formData.danosMateriales}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none border-dotted font-bold text-[#0070c0]"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Patente</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="patente"
                value={formData.patente}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none border-dotted font-bold text-[#0070c0]"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ThirdPartyIdentificationTable;
