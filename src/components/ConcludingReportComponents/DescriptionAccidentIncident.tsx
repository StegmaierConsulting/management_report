import React, { useState, useEffect } from 'react';

interface CausesData {
  actoSubestand: string;
  condicionSubestand: string;
  condicionExterna: string;
  factoresPersonales: string;
  factoresTrabajo: string;
  factorExterno: string;
}

interface AccidentCausesFormProps {
  onDataChange: (data: CausesData) => void;
}

const AccidentCausesForm: React.FC<AccidentCausesFormProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState<CausesData>({
    actoSubestand: '',
    condicionSubestand: '',
    condicionExterna: '',
    factoresPersonales: '',
    factoresTrabajo: '',
    factorExterno: '',
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
    <div className="p-4 mx-14 mb-4">
      <h2 className="text-2xl font-bold mb-4">10. DESCRIPCIÓN DE LAS CAUSAS DEL ACCIDENTE/INCIDENTE</h2>
      
      <h3 className="text-xl font-bold mb-2 underline">Causas Inmediatas:</h3>
      <p className="mb-4 font-semibold text-lg">Las causas inmediatas de la ocurrencia de este accidente/incidente son:</p>
      <table className="table-auto w-full mb-8">
        <tbody>
          <tr>
            <td className="p-2 font-bold">Acto subestándar</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="actoSubestand"
                value={formData.actoSubestand}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2">Condición subestándar</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="condicionSubestand"
                value={formData.condicionSubestand}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2">Condición externa</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="condicionExterna"
                value={formData.condicionExterna}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-xl font-bold mb-2 underline">Causas Básicas:</h3>
      <p className="mb-4 text-lg font-semibold">Las causas básicas de la ocurrencia de este accidente/incidente son:</p>
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="p-2">Factores Personales</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="factoresPersonales"
                value={formData.factoresPersonales}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2">Factores del Trabajo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="factoresTrabajo"
                value={formData.factoresTrabajo}
                onChange={handleInputChange}
                className="w-full p-1 border-b border-gray-300 focus:outline-none text-[#0070c0] font-bold"
              />
            </td>
          </tr>
          <tr>
            <td className="p-2">Factor Externo</td>
            <td className="p-2">:</td>
            <td className="p-2">
              <input
                type="text"
                name="factorExterno"
                value={formData.factorExterno}
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

export default AccidentCausesForm;
