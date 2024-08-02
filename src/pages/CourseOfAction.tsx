// src/pages/CourseOfAction.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import NSpell from 'nspell'; // Asegúrate de que NSpell esté importado correctamente
import '@/app/globals.css';
import ProtectedRoute from '@/auth/protectedRoute';
import { Header } from '@/components/header';
import CourseOfActionForm from '@/components/CourseOfActionForm'
interface Dictionary {
    aff: string;
    dic: string;
}

async function loadDictionary(): Promise<Dictionary> {
    const res = await fetch('/api/load-dictionary');
    const data = await res.json();
    return data;
}

const CourseOfAction: React.FC = () => {
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


    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        loadDictionary().then(({ aff, dic }) => {
            const spellCheckerInstance = NSpell(`${aff}\n${dic}`);
            setSpellChecker(spellCheckerInstance);
        });
    }, []);


    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [texto]);



    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTexto(e.target.value);
    };

    return (
        <ProtectedRoute>
            <>
                <Header />
                <div className="container mx-auto p-12 mt-24">
                    <h1 className="text-2xl font-bold mb-4">Plan de Accion</h1>
                    <CourseOfActionForm />
                </div>
            </>
        </ProtectedRoute>
    );
};

export default CourseOfAction;
