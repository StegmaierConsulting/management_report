import React, { useState, useEffect } from 'react';

interface InvestigationResponsibleProps {
  onDataChange: (data: {
    investigation: {
      nombre: string;
      cargo: string;
      firma: string;
    };
    revision: {
      nombre: string;
      cargo: string;
      firma: string;
    };
    gerente: {
      nombre: string;
      cargo: string;
      firma: string;
    };
  }) => void;
}

const InvestigationResponsible: React.FC<InvestigationResponsibleProps> = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    investigation: {
      nombre: '',
      cargo: '',
      firma: '',
    },
    revision: {
      nombre: '',
      cargo: '',
      firma: '',
    },
    gerente: {
      nombre: '',
      cargo: '',
      firma: '',
    },
  });

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (section: 'investigation' | 'revision' | 'gerente', field: 'nombre' | 'cargo' | 'firma', value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  return (
    <div className="p-8 mx-32">
      <h2 className="text-2xl font-bold mb-6">16. RESPONSABLE INVESTIGACIÓN (*):</h2>
      
      {/* Sección de Investigación */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">INVESTIGACIÓN</h3>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Nombre</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.investigation.nombre}
              onChange={(e) => handleInputChange('investigation', 'nombre', e.target.value)}
              className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.investigation.cargo}
              onChange={(e) => handleInputChange('investigation', 'cargo', e.target.value)}
              className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.investigation.firma}
              onChange={(e) => handleInputChange('investigation', 'firma', e.target.value)}
              className="w-full h-16 border-none focus:outline-none resize-none"
              placeholder="______________________________"
            />
          </div>
        </div>
      </div>
      
      {/* Sección de Revisión */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">REVISIÓN Y V° B° EXPERTO EN PREVENCIÓN DE RIESGOS</h3>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Nombre</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.revision.nombre}
              onChange={(e) => handleInputChange('revision', 'nombre', e.target.value)}
              className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.revision.cargo}
              onChange={(e) => handleInputChange('revision', 'cargo', e.target.value)}
              className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.revision.firma}
              onChange={(e) => handleInputChange('revision', 'firma', e.target.value)}
              className="w-full h-16 border-none focus:outline-none resize-none"
              placeholder="______________________________"
            />
          </div>
        </div>
      </div>

      {/* Sección de Gerente Empresa */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">GERENTE EMPRESA</h3>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Nombre</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.gerente.nombre}
              onChange={(e) => handleInputChange('gerente', 'nombre', e.target.value)}
              className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.gerente.cargo}
              onChange={(e) => handleInputChange('gerente', 'cargo', e.target.value)}
              className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <textarea
              value={formData.gerente.firma}
              onChange={(e) => handleInputChange('gerente', 'firma', e.target.value)}
              className="w-full h-16 border-none focus:outline-none resize-none"
              placeholder="______________________________"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationResponsible;
