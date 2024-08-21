import React from 'react';

const InvestigationResponsible: React.FC = () => {
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
            <textarea className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <textarea className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"/>
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <textarea className="w-full h-16 border-none focus:outline-none resize-none" placeholder="______________________________" />
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
            <textarea className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"/>
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <textarea className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none" />
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <textarea className="w-full h-16 border-none focus:outline-none resize-none" placeholder="______________________________" />
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
            <textarea className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"/>
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Cargo</span> : 
          </div>
          <div className="w-2/3">
            <textarea className="w-full h-12 border-none focus:outline-none text-[#0070c0] font-bold resize-none"/>
          </div>
        </div>
        <div className="flex flex-wrap mb-4">
          <div className="w-1/3 text-lg font-semibold">
            <span>Firma</span> : 
          </div>
          <div className="w-2/3">
            <textarea className="w-full h-16 border-none focus:outline-none resize-none" placeholder="______________________________" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigationResponsible;
