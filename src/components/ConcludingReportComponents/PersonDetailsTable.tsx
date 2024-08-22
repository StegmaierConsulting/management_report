import React, { useState, useEffect } from 'react';

interface PersonDetailsTableProps {
  onDataChange: (data: any) => void;
}

const PersonDetailsTable: React.FC<PersonDetailsTableProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState([
    {
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
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };

  const addPerson = () => {
    setFormData([
      ...formData,
      {
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
      },
    ]);
  };

  const removePerson = (index: number) => {
    const updatedFormData = formData.filter((_, i) => i !== index);
    setFormData(updatedFormData);
  };

  // Usar useEffect para enviar los datos actualizados al componente padre
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  return (
    <div>
      {formData.map((person, index) => (
        <div key={index} className="border border-gray-300 p-4 mx-6 mb-6 border-dotted">
          <h2 className="font-semibold mb-4">
            2. INDIVIDUALIZACION DE LA PERSONA ACCIDENTADA {index + 1} (*)
          </h2>
          <table className="table-auto w-full">
            <tbody>
              <tr className="border-t border-dotted">
                <td className="p-2 font-semibold">Nombre</td>
                <td className="p-2">:</td>
                <td className="p-2">
                  <input
                    type="text"
                    name="nombre"
                    value={person.nombre}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.rut}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.edad}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.cargo}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.antiguedad}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.areaTrabajo}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.actividad}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.parteCuerpo}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.tipoLesion}
                    onChange={(e) => handleInputChange(e, index)}
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
                    value={person.lugarAtencion}
                    onChange={(e) => handleInputChange(e, index)}
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
                        checked={person.hospitalizacion === 'Si'}
                        onChange={(e) => handleInputChange(e, index)}
                        className="mr-1"
                      />
                      Si
                    </label>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="hospitalizacion"
                        value="No"
                        checked={person.hospitalizacion === 'No'}
                        onChange={(e) => handleInputChange(e, index)}
                        className="mr-1"
                      />
                      No
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="hospitalizacion"
                        value="No Aplica"
                        checked={person.hospitalizacion === 'No Aplica'}
                        onChange={(e) => handleInputChange(e, index)}
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
                    value={person.testigo}
                    onChange={(e) => handleInputChange(e, index)}
                    className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {formData.length > 1 && (
            <button
              onClick={() => removePerson(index)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded no-print"
            >
              Eliminar esta persona
            </button>
          )}
        </div>
      ))}
      {formData.length < 2 && (
        <button
          onClick={addPerson}
          className="mx-6 mb-6 px-4 py-2 bg-blue-500 text-white rounded no-print"
        >
          Añadir otra persona accidentada
        </button>
      )}
    </div>
  );
};

export default PersonDetailsTable;
