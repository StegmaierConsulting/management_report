import React from 'react';

interface ImagesDisplayProps {
  imageUrls: string[];
}

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({ imageUrls }) => {
  return (
    <div className="p-4 mx-16 mb-4">
      <h2 className="text-lg font-bold mb-4">15. FOTOS EXPLICATIVAS:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="max-w-full max-h-96 w-auto h-auto border-2 border-gray-300"
                crossOrigin="anonymous"
              />
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">No hay imágenes para mostrar</div>
        )}
      </div>
    </div>
  );
};

export default ImagesDisplay;
