import React from 'react';
import SearchForms from '@/components/SearchInmediateActions';
import '@/app/globals.css';
import { Header } from '@/components/header';

const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <h1 className="text-3xl text-center my-8">Búsqueda y Edición de Formularios</h1>
        <SearchForms />
      </div>
    </>
  );
};

export default MainPage;
