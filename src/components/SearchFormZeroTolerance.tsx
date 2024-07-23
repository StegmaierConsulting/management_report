import React, { useState } from 'react';
import { firestore } from '@/config/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import AuthComponent from '@/auth/authComponent';
import ZeroToleranceFormEdit, { DatosExtraidos } from './ZeroToleranceFormEdit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchForms: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string | Date | null>(null);
  const [searchBy, setSearchBy] = useState<'numeroDocumento' | 'timestamp'>('numeroDocumento');
  const [results, setResults] = useState<DatosExtraidos[]>([]);
  const [selectedForm, setSelectedForm] = useState<DatosExtraidos | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState('');

  const handleSearch = async () => {
    if (!selectedEmpresa) return;

    const collectionPath = `USERAUTH/${selectedEmpresa}/ZeroToleranceReports`;

    let q;
    if (searchBy === 'timestamp' && searchTerm instanceof Date) {
      const startOfDay = new Date(searchTerm);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(searchTerm);
      endOfDay.setHours(23, 59, 59, 999);

      q = query(
        collection(firestore, collectionPath),
        where('timestamp', '>=', Timestamp.fromDate(startOfDay)),
        where('timestamp', '<=', Timestamp.fromDate(endOfDay))
      );
    } else {
      q = query(
        collection(firestore, collectionPath),
        where(searchBy, '==', searchTerm)
      );
    }

    const querySnapshot = await getDocs(q);
    const forms: DatosExtraidos[] = [];
    querySnapshot.forEach((doc) => {
      forms.push({ ...doc.data(), id: doc.id } as unknown as DatosExtraidos);
    });
    setResults(forms);
  };

  return (
    <div>
      {showAuthModal && (
        <AuthComponent onAuthSuccess={(empresa, usuario) => { setSelectedEmpresa(empresa); setAuthenticatedUser(usuario); setShowAuthModal(false); }} />
      )}
      {!showAuthModal && (
        <div>
          <div className="flex justify-center mb-4">
            {searchBy === 'timestamp' ? (
              <DatePicker
                selected={searchTerm as Date | null}
                onChange={(date: Date | null) => setSearchTerm(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
                className="p-2 border rounded"
              />
            ) : (
              <input
                type="text"
                placeholder={`Buscar por ${searchBy}`}
                value={searchTerm as string}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded"
              />
            )}
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value as 'numeroDocumento' | 'timestamp')}
              className="p-2 border rounded ml-2"
            >
              <option value="numeroDocumento">Número de Documento</option>
              <option value="timestamp">Fecha y Hora</option>
            </select>
            <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded ml-2">
              Buscar
            </button>
          </div>

          <div className="flex justify-center">
            <div className="mt-4 w-1/2 bg-white rounded-lg mx-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border rounded mb-2 cursor-pointer"
                  onClick={() => setSelectedForm(result)}
                >
                  <div><strong>Número de Documento:</strong> {result.numeroDocumento}</div>
                  <div><strong>Tipo:</strong> {result.tipo}</div>
                </div>
              ))}
            </div>
          </div>

          {selectedForm && (
            <div className="mt-4">
              <h2 className="text-2xl text-center text-blue-400 p-2 font-bold mb-4">Editar Formulario</h2>
              <ZeroToleranceFormEdit
                datos={selectedForm}
                onDatosChange={(updatedDatos: DatosExtraidos) => setSelectedForm(updatedDatos)}
                onFileChange={() => { }}
                selectedEmpresa={selectedEmpresa} // Pasamos selectedEmpresa como prop
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForms;
