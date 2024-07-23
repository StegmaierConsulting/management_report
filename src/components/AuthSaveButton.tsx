import React, { useState } from 'react';
import { database, storage, firestore } from '@/config/firebase';
import { ref, get } from 'firebase/database';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import SaveModal from '@/components/saveModal';
import AuthComponent from '@/auth/authComponent';

interface AuthSaveButtonProps {
  data: any;
  images?: FileList | null;
  collectionName: string;
}

const AuthSaveButton: React.FC<AuthSaveButtonProps> = ({ data, images, collectionName }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState('');

  const cleanData = (data: any) => {
    // Limpieza de los datos
    const cleanedData = { ...data };
    if (cleanedData.areaZona) {
      cleanedData.areaZona = cleanedData.areaZona.replace(/rea, Zona: /, '');
    }
    return cleanedData;
  };

  const saveData = async (numeroDocumento: string, usuario: string) => {
    if (selectedEmpresa && data) {
      const cleanedData = cleanData(data);
      const documentData = {
        ...cleanedData,
        numeroDocumento,
        usuario: authenticatedUser, // Guardar solo el nombre de usuario
        empresaGuardado: selectedEmpresa,
        timestamp: serverTimestamp(),
      };

      const newDocRef = doc(firestore, `USERAUTH/${selectedEmpresa}/${collectionName}`, numeroDocumento);
      await setDoc(newDocRef, documentData);

      const imageLinks: string[] = [];

      if (images) {
        const uploadPromises = Array.from(images).map(async (file) => {
          const imageRef = storageRef(storage, `${selectedEmpresa}/${newDocRef.id}/${file.name}`);
          await uploadBytes(imageRef, file);
          const downloadURL = await getDownloadURL(imageRef);
          imageLinks.push(downloadURL);
        });

        await Promise.all(uploadPromises);

        // Actualizar el documento con los enlaces de las imágenes
        await setDoc(newDocRef, { imageLinks }, { merge: true });
      }

      setShowSaveModal(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowAuthModal(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
        Guardar en DB
      </button>
      {showAuthModal && (
        <AuthComponent onAuthSuccess={(empresa, usuario) => { setSelectedEmpresa(empresa); setAuthenticatedUser(usuario); setShowAuthModal(false); setShowSaveModal(true); }} />
      )}
      {showSaveModal && (
        <SaveModal
          onSave={(numeroDocumento) => saveData(numeroDocumento, authenticatedUser)}
          onCancel={() => setShowSaveModal(false)}
          empresa={selectedEmpresa}
        />
      )}
    </div>
  );
}

export default AuthSaveButton;
