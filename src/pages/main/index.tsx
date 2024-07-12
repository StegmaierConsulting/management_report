import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Header } from '@/components/header';
import '@/app/globals.css';
import ProtectedRoute from '@/auth/protectedRoute';

const Main: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      router.push('/');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <ProtectedRoute>
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center bg-transparent">
          <div className="container mx-auto flex flex-col lg:flex-row py-18 px-24 gap-2 mt-10">
            {/* Contenedor Izquierdo */}
            <div className="lg:w-1/2 flex justify-center items-center mb-8 mt-2 bg-white rounded-3xl">
              <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-glass w-64 h-64 relative"
              >
                <Image 
                  src="/stegmaier.png"
                  alt="stegmaier logo"
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
            </div>
            {/* Contenedor Derecho */}
            <div className="lg:w-1/2 lg:pl-8 mt-2 mb-8 bg-white py-2 px-2 rounded-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-blue-400 mb-2">¡Bienvenido a Management Docs de Stegmaier Consulting!</h1>
                <p className="text-lg text-gray-700">Gestor de Documentacion enfocados a la Seguridad</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Características principales:</h2>
                <ul className="text-center">
                  <li>Soon...</li>
                  <li>Soon...</li>
                  <li>Soon...</li>
                  <li>Soon...</li>
                  <li>Soon...</li>
                  <li>Soon...</li>
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                >
                  Cerrar sesión
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Main;
