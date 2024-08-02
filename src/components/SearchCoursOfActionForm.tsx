import React, { useState } from 'react';
import { firestore } from '@/config/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import AuthComponent from '@/auth/authComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CourseOfActionEdit, { DatosExtraidos } from '@/components/CourseOfActionEdit';


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

    const collectionPath = `USERAUTH/${selectedEmpresa}/CourseOfAction`;

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
    } else if (typeof searchTerm === 'string') {
      q = query(
        collection(firestore, collectionPath),
        where(searchBy, '==', searchTerm)
      );
    }

    if (q) {
      const querySnapshot = await getDocs(q);
      const forms: DatosExtraidos[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Omit<DatosExtraidos, 'id'>;
        forms.push({
          ...data,
          id: doc.id
        });
      });
      setResults(forms);
    }
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
                  <div><strong>Tipo:</strong> {result.tipo1}</div>
                </div>
              ))}
            </div>
          </div>

          {selectedForm && (
            <div className="mt-4">
              <h2 className="text-2xl text-center text-blue-400 p-2 font-bold mb-4">Editar Formulario</h2>
              <CourseOfActionEdit
                formData={selectedForm}
                handleChange={(e) => {
                  const { name, value } = e.target;
                  setSelectedForm((prevForm: any) => ({
                    ...prevForm!,
                    [name]: value,
                  }));
                }}
                selectedEmpresa={selectedEmpresa}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForms;
