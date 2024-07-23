import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import AutomaticLanguageChecker from '../utils/automaticLanguageCheckerZeroTolerance';
import ZeroToleranceForm, { DatosExtraidos } from '../components/ZeroToleranceForm';
import { Header } from '@/components/header';
import '@/app/globals.css';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/auth/protectedRoute';

export default function ZeroTolerance() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      router.push('/');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const [textoPegado, setTextoPegado] = useState('');
  const [datosExtraidos, setDatosExtraidos] = useState<DatosExtraidos>({
    timestamp: null,
    numeroDocumento: '',
    suceso: '',
    tipo: '',
    lugar: '',
    fechaHora: '',
    areaZona: '',
    empresa: '',
    supervisor: '',
    descripcion: '',
    numeroProsafety: '',
    fotografias: ''
  });
  const [previas, setPrevias] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const texto = event.target.value;
    setTextoPegado(texto);
    setDatosExtraidos(AutomaticLanguageChecker({ texto }));
  };

  const handleDatosChange = (updatedDatos: DatosExtraidos) => {
    setDatosExtraidos(updatedDatos);
  };

  const handleFileChange = (nuevasPrevias: string[]) => {
    setPrevias(nuevasPrevias);
  };

  return (
    <ProtectedRoute>
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4 -mt-8">
          <motion.div
            className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mt-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-2xl text-center text-blue-400 p-2 font-bold">
                Ingrese texto a Formatear
              </h1>
            </div>
            <div className="flex justify-center">
              <textarea
                placeholder="Pega o escribe el texto aquí"
                value={textoPegado}
                onChange={handleInputChange}
                rows={5}
                className="text-black w-full h-80 p-4 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <ZeroToleranceForm datos={datosExtraidos} onDatosChange={handleDatosChange} onFileChange={handleFileChange} />
          </motion.div>
        </div>
      </>
    </ProtectedRoute>
  );
}
