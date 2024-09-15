// ConclusionsForm.tsx

import React, { useState, useRef, useEffect } from 'react';

interface ConclusionsFormProps {
  title: string;
  conclusionText: string;
}

interface ConclusionsFormComponentProps {
  onDataChange: (data: ConclusionsFormProps) => void;
  initialData?: ConclusionsFormProps;
}

const ConclusionsForm: React.FC<ConclusionsFormComponentProps> = ({ onDataChange, initialData }) => {
  const [formData, setFormData] = useState<ConclusionsFormProps>({
    title: '11. CONCLUSIONES:',
    conclusionText: '',
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Efecto para inicializar formData con initialData cuando esté disponible
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.conclusionText]);

  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, conclusionText: value });
  };

  return (
    <div className="p-4 mx-14 mb-4">
      <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
      <textarea
        ref={textareaRef}
        value={formData.conclusionText}
        onChange={handleInputChange}
        placeholder="Ingrese la conclusión aquí"
        className="w-2/3 p-2 border-b border-gray-300 focus:outline-none resize-none overflow-hidden bg-transparent font-bold text-[#0070c0]"
        rows={1}
      />
    </div>
  );
};

export default ConclusionsForm;
