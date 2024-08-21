import React, { useState } from 'react';

interface LogoUploaderProps {
  leftLogo: string | null;
  rightLogo: string | null;
  setLeftLogo: (logo: string | null) => void;
  setRightLogo: (logo: string | null) => void;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ leftLogo, rightLogo, setLeftLogo, setRightLogo }) => {
  const [leftLogoUploaded, setLeftLogoUploaded] = useState(false);
  const [rightLogoUploaded, setRightLogoUploaded] = useState(false);

  const handleLeftLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result !== undefined) {
          setLeftLogo(result as string);
          setLeftLogoUploaded(true);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRightLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result !== undefined) {
          setRightLogo(result as string);
          setRightLogoUploaded(true);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="flex justify-between items-start p-4">
      <div className="flex flex-col items-start">
        {!leftLogoUploaded && (
          <input
            type="file"
            accept="image/*"
            onChange={handleLeftLogoChange}
            className="mb-2 logo-input"
          />
        )}
        {leftLogo && (
          <img
            src={leftLogo}
            alt="Left Logo"
            style={{ width: '300px', height: '250px', objectFit: 'contain' }} // Ancho y alto fijos
          />
        )}
      </div>

      <div className="flex flex-col items-end ml-auto">
        {!rightLogoUploaded && (
          <input
            type="file"
            accept="image/*"
            onChange={handleRightLogoChange}
            className="mb-2 logo-input"
          />
        )}
        {rightLogo && (
          <img
            src={rightLogo}
            alt="Right Logo"
            style={{ width: '300px', height: '250px', objectFit: 'contain' }} // Ancho y alto fijos
          />
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
