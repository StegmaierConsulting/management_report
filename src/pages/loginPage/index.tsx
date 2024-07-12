'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import Image from 'next/image';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(authentication, email, password);
      router.push('/main');
    } catch (error: any) {
      console.error('Error de autenticación:', error.message);
      setShowAlert(true);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white rounded-3xl -mt-20">
      <div className="container mx-auto">
        <div className="lg:flex lg:justify-center lg:border lg:p-8 lg:rounded-3xl bg-glass">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg px-8 py-10 max-w-md w-full lg:w-auto mb-4 lg:mb-0 lg:mr-4"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Bienvenido a Management Docs de Stegmaier Consulting
            </h2>
            <p className="text-gray-600 mb-4">
              Esta es nuestra plataforma de gestion de documentos correspondiente a seguridad
            </p>
            <p className="text-gray-600">
              Si necesitas ayuda por favor contactarse a{' '}
              <a
                className="text-blue-400"
                href="mailto:contacto@stegmaierconsulting.cl"
              >
                contacto@stegmaierconsulting.cl
              </a>{' '}
              o visite nuestra página web{' '}
              <a
                className="text-blue-400"
                href="https://www.stegmaierconsulting.cl"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.stegmaierconsulting.cl
              </a>
            </p>
            <div className="flex justify-center py-5">
              <Image 
                src="/stegmaier.png" 
                alt="Stegmaier Consulting" 
                width={400} 
                height={400} 
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="glass-window rounded-3xl shadow-lg px-8 py-10 max-w-md w-full lg:w-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-400">
              Gestor de Documentacion Stegmaier
            </h2>
            <p className="text-gray-600 mb-4">
              Por favor, para continuar, ingrese su email y contraseña.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border border-gray-300 p-2 w-full block text-black"
                  placeholder="Ingrese su email"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-black mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border border-gray-300 p-2 w-full block text-black"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              >
                Ingresar
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Error de autenticación</h2>
            <p className="text-gray-600">El correo o la contraseña ingresados son incorrectos. Por favor, inténtelo nuevamente.</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4" onClick={() => setShowAlert(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
