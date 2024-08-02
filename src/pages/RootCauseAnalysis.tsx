import React from 'react';
import RootCauseAnalysisForm from '@/components/RootCauseAnalysisForm';
import '@/app/globals.css';
import { Header } from '@/components/header';

const MainPage: React.FC = () => {
  return (
    <>
    <Header />
    <div className='px-32 py-28'>
      <h1 className="text-3xl text-center my-8">Investigacion de Causas</h1>
      <RootCauseAnalysisForm />
    </div>
    </>
  );
};

export default MainPage;
