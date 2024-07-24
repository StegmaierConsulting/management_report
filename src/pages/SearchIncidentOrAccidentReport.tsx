import React from 'react';
import SearchForms from '@/components/SearchFormIncidentOrAccident';
import '@/app/globals.css';

const MainPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl text-center my-8">Búsqueda y Edición de Formularios</h1>
      <SearchForms />
    </div>
  );
};

export default MainPage;
