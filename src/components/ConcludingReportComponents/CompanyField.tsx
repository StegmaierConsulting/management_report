// CompanyField.tsx

import React, { useState, useEffect } from 'react';

interface CompanyFieldProps {
  onDataChange: (data: { companyName: string }) => void;
}

const CompanyField: React.FC<CompanyFieldProps> = ({ onDataChange }) => {
  const [companyName, setCompanyName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  // Actualiza los datos en MainPage cada vez que companyName cambie
  useEffect(() => {
    onDataChange({ companyName });
  }, [companyName, onDataChange]);

  return (
    <div className="border border-black my-4 mx-6">
      <div className="grid grid-cols-2">
        <div className="p-2 border-r border-black font-bold">EMPRESA</div>
        <div className="p-2">
          <input
            type="text"
            value={companyName}
            onChange={handleInputChange}
            className="w-full p-1  text-[#0070c0] font-bold underline"
            placeholder="Ingrese el nombre de la empresa"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyField;
