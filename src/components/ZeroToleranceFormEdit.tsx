// ZeroToleranceFormEdit.tsx
import React, { useState, ChangeEvent, useEffect, ReactNode } from 'react';
import { Document, ImageRun, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import ImageModal from '@/utils/ImageModal';
import FormDetails from '@/components/FormDetailsT0';
import { firestore } from '@/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export interface DatosExtraidos {
  numeroDocumento: ReactNode;
  suceso?: string;
  tipo?: string;
  lugar?: string;
  fechaHora?: string;
  areaZona?: string;
  empresa?: string;
  supervisor?: string;
  descripcion?: string;
  numeroProsafety?: string;
  imageLinks?: string[];
  timestamp?: { seconds: number, nanoseconds: number };
  usuario?: string; // Agregar usuario aquí
  id?: string; // Añadir id para actualizar el documento específico
}

interface ZeroToleranceProps {
  datos: DatosExtraidos;
  onDatosChange: (updatedDatos: DatosExtraidos) => void;
  onFileChange: (nuevasPrevias: string[]) => void; // Nueva prop para manejar los cambios en las imágenes
  selectedEmpresa: string; // Recibimos selectedEmpresa como prop
}

function ZeroToleranceFormEdit({ datos, onDatosChange, onFileChange, selectedEmpresa }: ZeroToleranceProps) {
  const [valores, setValores] = useState(datos);
  const [imagenes, setImagenes] = useState<FileList | null>(null); // Estado para las imágenes seleccionadas
  const [previas, setPrevias] = useState<string[]>([]); // Estado para las vistas previas de las imágenes
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setValores(datos);
    setPrevias(datos.imageLinks || []);
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
      setPrevias((prev) => [...prev, ...nuevasPrevias]);
      onFileChange(nuevasPrevias); // Propagar las nuevas vistas previas hacia arriba
    }
  };

  const downloadDoc = async () => {
    const paragraphs = [
      new Paragraph({
        children: [
          new TextRun({
            text: "1. Suceso: ",
            font: "Calibri",
            size: 22, // 11 points * 2 (since docx uses half-points)
            color: "000000",
          }),
          new TextRun({
            text: valores.suceso || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480, // 24 points * 20 (since docx uses twips)
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2. Tipo: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.tipo || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "3. Lugar, Comuna: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.lugar || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "4. Fecha y Hora: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.fechaHora || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "5. Área, Zona: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.areaZona || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "6. Empresa: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.empresa || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "7. Supervisor CGE: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.supervisor || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "8. Descripción: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.descripcion || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "9. Número Prosafety: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: valores.numeroProsafety || '',
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "10. Fotografías: ",
            font: "Calibri",
            size: 22,
            color: "000000",
          }),
          new TextRun({
            text: (Array.isArray(valores.imageLinks) ? valores.imageLinks : []).join(', '),
            font: "Calibri",
            size: 22,
            color: "0070c0",
          }),
        ],
        spacing: {
          line: 480,
        },
      }),
    ];

    if (imagenes) {
      const imagePromises = Array.from(imagenes).map(async (file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const imageBase64s = await Promise.all(imagePromises);

      const rows = [];
      for (let i = 0; i < imageBase64s.length; i += 2) {
        const cells = [];

        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBase64s[i].split(",")[1], // Remove the data URL part
                    transformation: {
                      width: 300,
                      height: 200,
                    },
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
            width: {
              size: 50,
              type: WidthType.PERCENTAGE,
            },
          })
        );

        if (i + 1 < imageBase64s.length) {
          cells.push(
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: imageBase64s[i + 1].split(",")[1], // Remove the data URL part
                      transformation: {
                        width: 300,
                        height: 200,
                      },
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
              width: {
                size: 50,
                type: WidthType.PERCENTAGE,
              },
            })
          );
        } else {
          cells.push(
            new TableCell({
              children: [],
              width: {
                size: 50,
                type: WidthType.PERCENTAGE,
              },
            })
          );
        }

        rows.push(
          new TableRow({
            children: cells,
          })
        );
      }

      const table = new Table({
        rows: rows,
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
      });

      // Asegúrate de agregar la tabla al documento directamente en la sección, no como un párrafo.
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [...paragraphs, table], // Agregar la tabla directamente a la sección.
          },
        ],
      });

      const buffer = await Packer.toBlob(doc);
      saveAs(buffer, 'ZeroToleranceForm.docx');
    } else {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs, // Sin la tabla si no hay imágenes.
          },
        ],
      });

      const buffer = await Packer.toBlob(doc);
      saveAs(buffer, 'ZeroToleranceForm.docx');
    }
  };

  const openModal = (src: string) => {
    setSelectedImage(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  const updateDocument = async () => {
    if (!valores.id) return;

    const docRef = doc(firestore, `USERAUTH/${selectedEmpresa}/ZeroToleranceReports/${valores.id}`);
    const updatedData = {
      ...valores,
      fotografias: imagenes ? 'si' : 'no',
      imageLinks: previas,
    };

    try {
      await updateDoc(docRef, updatedData);
      alert('Documento actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el documento:', error);
      alert('Error al actualizar el documento');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl">
        <FormDetails usuario={valores.usuario || 'Usuario desconocido'} timestamp={valores.timestamp || { seconds: 0, nanoseconds: 0 }} />

        <form className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl text-center text-blue-400 p-2 font-bold mb-4">Reporte Tolerancia Cero</h2>

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
              <label htmlFor="lugar" className="block text-sm font-medium text-gray-700">Lugar, comuna:</label>
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
                value={(Array.isArray(valores.imageLinks) ? valores.imageLinks : []).join(', ')}
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
            {(Array.isArray(previas) ? previas : []).map((src, index) => (
              <div key={index} className="relative">
                <img src={src} alt={`Vista previa ${index}`} className="rounded-md shadow-md cursor-pointer" onClick={() => openModal(src)} />
              </div>
            ))}
          </div>
        </form>
        <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} imageUrl={selectedImage || ''} />
        <button onClick={updateDocument} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Actualizar en DB
        </button>
        <button onClick={downloadDoc} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
          Download as Word
        </button>
      </div>
    </div>
  );
}

export default ZeroToleranceFormEdit;
