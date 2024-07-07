import { useState, ChangeEvent, useEffect } from 'react';

export interface DatosExtraidos {
  suceso?: string;
  tipo?: string;
  lugar?: string;
  fechaHora?: string;
  areaZona?: string;
  empresa?: string;
  supervisor?: string;
  descripcion?: string;
  numeroProsafety?: string;
  fotografias?: string;
}

interface SubstandardConditionProps {
  datos: DatosExtraidos;
  onDatosChange: (updatedDatos: DatosExtraidos) => void;
  onFileChange: (nuevasPrevias: string[]) => void; // Nueva prop para manejar los cambios en las imágenes
}

function SubstandardCondition({ datos, onDatosChange, onFileChange }: SubstandardConditionProps) {
  const [valores, setValores] = useState(datos);
  const [imagenes, setImagenes] = useState<FileList | null>(null); // Estado para las imágenes seleccionadas
  const [previas, setPrevias] = useState<string[]>([]); // Estado para las vistas previas de las imágenes

  useEffect(() => {
    setValores(datos);
  }, [datos]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValues = { ...valores, [event.target.id]: event.target.value };
    setValores(newValues);
    onDatosChange(newValues); // Propagar los cambios hacia arriba
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setImagenes(files);

    if (files) {
      const nuevasPrevias = Array.from(files).map((file) => URL.createObjectURL(file));
      setPrevias(nuevasPrevias);
      onFileChange(nuevasPrevias); // Propagar las nuevas vistas previas hacia arriba
    } else {
      setPrevias([]);
      onFileChange([]); // Propagar una lista vacía hacia arriba
    }
  };

  return (
    <form className="max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-medium text-gray-800 mb-4">Reporte de Condición Subestándar</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="suceso" className="block text-sm font-medium text-gray-700">Suceso:</label>
          <input
            type="text"
            id="suceso"
            value={valores.suceso || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo:</label>
          <input
            type="text"
            id="tipo"
            value={valores.tipo || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="lugar" className="block text-sm font-medium text-gray-700">Lugar:</label>
          <input
            type="text"
            id="lugar"
            value={valores.lugar || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="fechaHora" className="block text-sm font-medium text-gray-700">Fecha y Hora:</label>
          <input
            type="text"
            id="fechaHora"
            value={valores.fechaHora || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="areaZona" className="block text-sm font-medium text-gray-700">Área, Zona:</label>
          <input
            type="text"
            id="areaZona"
            value={valores.areaZona || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Empresa:</label>
          <input
            type="text"
            id="empresa"
            value={valores.empresa || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">Supervisor CGE:</label>
          <input
            type="text"
            id="supervisor"
            value={valores.supervisor || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            id="descripcion"
            value={valores.descripcion || ''}
            onChange={handleChange}
            rows={10}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="numeroProsafety" className="block text-sm font-medium text-gray-700">Número Prosafety:</label>
          <input
            type="text"
            id="numeroProsafety"
            value={valores.numeroProsafety || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="fotografias" className="block text-sm font-medium text-gray-700">Fotografías:</label>
          <input
            type="text"
            id="fotografias"
            value={valores.fotografias || ''}
            onChange={handleChange}
            className="text-black mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Seleccionar Imágenes:</label>
        <input type="file" id="imagenes" multiple onChange={handleFileChange} className="mt-1" />
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {previas.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Vista previa ${index}`}
            className="rounded-md shadow-md"
          />
        ))}
      </div>
    </form>
  );
}

export default SubstandardCondition;
