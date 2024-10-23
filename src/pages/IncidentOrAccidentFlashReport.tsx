import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import NSpell from 'nspell';
import { automaticLanguageChecker } from '@/utils/automaticLanguageCheckerIncidentOrAccident';
import IncidentForm, { DatosExtraidos } from '@/components/incidentOrAccidentForm';
import '@/app/globals.css';
import ProtectedRoute from '@/auth/protectedRoute';
import { Header } from '@/components/header';

interface Dictionary {
  aff: string;
  dic: string;
}

async function loadDictionary(): Promise<Dictionary> {
  const res = await fetch('/api/load-dictionary');
  const data = await res.json();
  return data;
}

const IncidentOrAccident: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      router.push('/');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  
  const [texto, setTexto] = useState('');
  const [spellChecker, setSpellChecker] = useState<NSpell | null>(null);
  const [formData, setFormData] = useState<DatosExtraidos>({
    suceso: '',
    tipo: '',
    lugar: '',
    fechaHora: '',
    fecha: '',
    hora: '',
    areaZona: '',
    empresa: '',
    supervisor: '',
    descripcion: '',
    numeroProsafety: '',
    fotografias: '',
    accionesInmediatas: '',
    controlesInmediatos: '',
    factoresRiesgo: '',
    zonal: '',
    conBajaIL: false,
    incidenteIndustrial: false,
    sinBajaIL: false,
    incidenteLaboral: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    loadDictionary().then(({ aff, dic }) => {
      const spellCheckerInstance = NSpell(`${aff}\n${dic}`);
      setSpellChecker(spellCheckerInstance);
    });
  }, []);

  useEffect(() => {
    if (spellChecker && texto) {
      const correctedData: DatosExtraidos = automaticLanguageChecker({ texto, spellChecker });
      setFormData(correctedData);
    }
  }, [texto, spellChecker]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [texto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTexto(e.target.value);
  };

  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <ProtectedRoute>
      <>
        <Header />
        <div className="p-8 mt-32 h-screen overflow-y-auto">
          <textarea
            ref={textareaRef}
            value={texto}
            onChange={handleTextareaChange}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-black resize-none overflow-hidden"
            placeholder="Ingrese el texto aquí..."
            style={{ minHeight: '4rem', lineHeight: '1.5' }}
          />
          <div ref={tableRef} className="container-sm w-full p-4 bg-gray-100">
            <IncidentForm formData={formData} handleChange={handleChange} />
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default IncidentOrAccident;
