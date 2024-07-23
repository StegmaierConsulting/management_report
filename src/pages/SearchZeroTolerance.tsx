// pages/search.tsx
import React from 'react';
import SearchForms from '@/components/SearchFormZeroTolerance';
import '@/app/globals.css';
import { Header } from '@/components/header';

const SearchPage: React.FC = () => {
  return (
  <>
  <Header />
    <div className="p-4 mt-16">
      <h1 className="text-2xl text-center text-blue-400 p-2 font-bold mb-4">Buscar y Editar Formularios Tolerancia 0</h1>
      <SearchForms />
    </div>
    </>
  );
};

export default SearchPage;
