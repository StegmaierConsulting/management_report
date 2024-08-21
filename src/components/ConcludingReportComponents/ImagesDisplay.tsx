import React from 'react';

interface ImagesDisplayProps {
  imageUrls: string[];
}

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({ imageUrls }) => {
  return (
    <div className="p-4 mx-16 mb-4">
      <h2 className="text-lg font-bold mb-4">15. FOTOS EXPLICATIVAS:</h2>
      <div
        className={`grid ${imageUrls.length === 2 ? 'grid-cols-1 gap-8' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}`}
      >
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                style={{
                  width: imageUrls.length === 2 ? '100%' : '100%',
                  height: imageUrls.length === 2 ? 'auto' : 'auto',
                  maxHeight: imageUrls.length === 2 ? '600px' : '300px',
                }}
                className="border-2 border-gray-300"
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
