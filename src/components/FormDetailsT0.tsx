// FormDetails.tsx
import React from 'react';

interface FormDetailsProps {
  usuario: string;
  timestamp: { seconds: number, nanoseconds: number };
}

const FormDetails: React.FC<FormDetailsProps> = ({ usuario, timestamp }) => {
  const formattedTimestamp = new Date(timestamp.seconds * 1000).toLocaleString();

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <p><strong>Usuario:</strong> {usuario}</p>
      <p><strong>Fecha y Hora:</strong> {formattedTimestamp}</p>
    </div>
  );
};

export default FormDetails;
