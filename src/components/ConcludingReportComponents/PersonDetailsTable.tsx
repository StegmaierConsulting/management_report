// PersonDetailsTable.tsx

import React, { useState } from 'react';

const PersonDetailsTable: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    edad: '',
    cargo: '',
    antiguedad: '',
    areaTrabajo: '',
    actividad: '',
    parteCuerpo: '',
    tipoLesion: '',
    lugarAtencion: '',
    hospitalizacion: '',
    testigo: '',
    segundaAreaTrabajo: '',
    segundaRut: '',
    segundoCargo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="border border-gray-300 p-4 mx-6 mb-6 border-dotted">
      <h2 className="font-semibold mb-4">2. INDIVIDUALIZACION DE LA PERSONA ACCIDENTADA (*)</h2>
      <table className="table-auto w-full">
        <tbody>
          <tr className="border-t border-dotted">
            <td className="p-2 font-semibold">Nombre</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
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
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
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
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
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
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Antigüedad en el cargo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="antiguedad"
                value={formData.antiguedad}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Área de trabajo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="areaTrabajo"
                value={formData.areaTrabajo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Actividad que realizaba</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="actividad"
                value={formData.actividad}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Parte del Cuerpo Lesionada</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="parteCuerpo"
                value={formData.parteCuerpo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Tipo de lesión</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="tipoLesion"
                value={formData.tipoLesion}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Lugar de atención médica</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="lugarAtencion"
                value={formData.lugarAtencion}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Hospitalización</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="hospitalizacion"
                    value="Si"
                    checked={formData.hospitalizacion === 'Si'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  Si
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="hospitalizacion"
                    value="No"
                    checked={formData.hospitalizacion === 'No'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  No
                </label>
                <label>
                  <input
                    type="radio"
                    name="hospitalizacion"
                    value="No Aplica"
                    checked={formData.hospitalizacion === 'No Aplica'}
                    onChange={handleInputChange}
                    className="mr-1"
                  />
                  No Aplica
                </label>
              </div>
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Acompañantes y/o testigo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="testigo"
                value={formData.testigo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Área de trabajo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="segundaAreaTrabajo"
                value={formData.segundaAreaTrabajo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Rut</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="segundaRut"
                value={formData.segundaRut}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr className="border-t border-dotted border-gray-300">
            <td className="p-2 font-semibold">Cargo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="segundoCargo"
                value={formData.segundoCargo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PersonDetailsTable;
