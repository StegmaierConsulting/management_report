import React, { useState, useEffect } from 'react';
import { database } from '@/config/firebase';
import { ref, get } from 'firebase/database';

interface AuthProps {
  onAuthSuccess: (empresa: string, usuario: string) => void;
}

const AuthComponent: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [empresas, setEmpresas] = useState<string[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmpresas = async () => {
      const dbRef = ref(database, 'USERAUTH');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const empresasList = Object.keys(snapshot.val());
        setEmpresas(empresasList);
      } else {
        console.log("No data available");
      }
    };

    fetchEmpresas();
  }, []);

  const handleAuth = async () => {
    const dbRef = ref(database, `USERAUTH/${selectedEmpresa}`);
    const userSnapshot = await get(dbRef);
    if (userSnapshot.exists()) {
      const users = userSnapshot.val();
      if (users[username] === password) {
        onAuthSuccess(selectedEmpresa, username);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } else {
      setError('Empresa no encontrada');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Autenticación</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Empresa:</label>
          <select
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa} value={empresa}>{empresa}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Usuario:</label>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Autenticar
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AuthComponent;
