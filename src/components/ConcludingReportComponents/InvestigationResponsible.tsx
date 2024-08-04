import React from 'react';

const InvestigationResponsible: React.FC = () => {
  return (
    <div className="p-4 mx-16">
      <h2 className="text-lg font-bold mb-4">16. RESPONSABLE INVESTIGACIÓN (*):</h2>
      
      {/* Sección de Investigación */}
      <div className="mb-8 ">
        <h3 className="font-bold">INVESTIGACIÓN</h3>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Nombre</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none text-[#0070c0] font-bold" />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none text-[#0070c0] font-bold"/>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3 ">
            <input type="text" className="w-full border-none focus:outline-none" placeholder="______________________________" />
          </div>
        </div>
      </div>
      
      {/* Sección de Revisión */}
      <div className="mb-8">
        <h3 className="font-bold">REVISIÓN Y V° B° EXPERTO EN PREVENCIÓN DE RIESGOS</h3>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Nombre</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none text-[#0070c0] font-bold"/>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none text-[#0070c0] font-bold" />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none" placeholder="______________________________" />
          </div>
        </div>
      </div>

      {/* Sección de Gerente Empresa */}
      <div className="mb-8">
        <h3 className="font-bold">GERENTE EMPRESA</h3>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Nombre</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none text-[#0070c0] font-bold"/>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none text-[#0070c0] font-bold"/>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <input type="text" className="w-full border-none focus:outline-none" placeholder="______________________________" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationResponsible;
