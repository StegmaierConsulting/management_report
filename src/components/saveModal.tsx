import React, { useState } from 'react';

interface SaveModalProps {
  onSave: (numeroDocumento: string, usuario: string) => void;
  onCancel: () => void;
  empresa: string;
}

const SaveModal: React.FC<SaveModalProps> = ({ onSave, onCancel, empresa }) => {
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [usuario, setUsuario] = useState('');

  const handleSave = () => {
    onSave(numeroDocumento, usuario);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Guardar Datos</h2>
        <div className="mb-4">
          <label htmlFor="numeroDocumento" className="block text-sm font-medium text-gray-700">Número de Documento:</label>
          <input
            type="text"
            id="numeroDocumento"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Empresa:</label>
          <input
            type="text"
            value={empresa}
            readOnly
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Cancelar</button>
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
