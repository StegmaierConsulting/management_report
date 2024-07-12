// src/components/Warning.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Warning: React.FC = () => {
  const router = useRouter();
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push('/');
    }, 10000); // Redirige después de 10 segundos

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [router]);

  useEffect(() => {
    if (counter === 0) {
      router.push('/');
    }
  }, [counter, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Acceso denegado</h2>
        <p className="text-gray-600">No está autenticado. Por favor, inicie sesión para acceder a esta página.</p>
        <p className="text-gray-600 mt-4">Será redirigido a la página de inicio en {counter} segundos.</p>
        <div className="flex justify-center py-5">
              <Image 
                src="/stegmaier.png" 
                alt="Stegmaier Consulting" 
                width={400} 
                height={400} 
              />
            </div>
      </div>
    </div>
  );
};

export default Warning;
