import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DatosExtraidos } from './stopWork';
import nspell from 'nspell';
import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import 'react-quill/dist/quill.snow.css';

// Carga dinámica de ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface VisualizacionReporteStopWorkProps {
  datos: DatosExtraidos;
  imagenes: string[];
}

const VisualizacionReporteStopWork: React.FC<VisualizacionReporteStopWorkProps> = ({ datos, imagenes }) => {
  const [correctedData, setCorrectedData] = useState<DatosExtraidos>(datos);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch('/api/load-dictionary');
        const { aff, dic } = await response.json();
        const spell = nspell({ aff, dic });

        const correctText = (text: string): string => {
          const words = text.split(/(\s+|[,.])/);
          return words
            .map(word => {
              if (word.length < 4 || spell.correct(word) || /[,.]/.test(word)) {
                return word;
              } else {
                const suggestions = spell.suggest(word);
                return suggestions.length > 0 ? suggestions[0] : word;
              }
            })
            .join(' ')
            .replace(/(\s*[,.]\s*)/g, '$1')
            .replace(/\s+/g, ' ')
            .trim();
        };

        const correctDescription = () => {
          const updatedData: DatosExtraidos = { ...datos };

          if (typeof updatedData.descripcion === 'string') {
            updatedData.descripcion = correctText(updatedData.descripcion);
          }

          setCorrectedData(updatedData);
        };

        correctDescription();
      } catch (error: any) {
        console.error('Failed to load dictionary:', error);
      }
    };

    loadDictionary();
  }, [datos]);

  const fetchImageData = async (src: string): Promise<Blob> => {
    const response = await fetch(src);
    return response.blob();
  };

  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const generateWord = async () => {
    const children = [
      new Paragraph({
        children: [
          new TextRun({
            text: "Reporte de Condición Stop Works",
            bold: true,
            size: 24, // Título más grande (equivalente a 12pt)
            font: "Calibri",
          }),
        ],
        spacing: {
          after: 200,
        },
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "1. Suceso: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.suceso || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "2. Tipo: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.tipo || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "3. Lugar, Comuna: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.lugar || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "4. Fecha y Hora: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.fechaHora || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "5. Área, Zona: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.areaZona || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "6. Empresa: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.empresa || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "7. Supervisor CGE: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.supervisor || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "8. Descripción: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: correctedData.descripcion || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "9. Número Prosafety: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
          new TextRun({
            text: correctedData.numeroProsafety || '',
            color: "0070c0",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: "10. Fotografías: ",
            size: 22, // Tamaño de letra 11pt
            font: "Calibri",
          }),
        ],
      }),
    ];

    for (const src of imagenes) {
      const imageBlob = await fetchImageData(src);
      const base64 = await convertBlobToBase64(imageBlob);
      children.push(new Paragraph({
        children: [
          new ImageRun({
            data: base64.split(",")[1],
            transformation: {
              width: 400,
              height: 300,
            },
          }),
        ],
      }));
    }

    const doc = new Document({
      sections: [{
        properties: {},
        children,
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "reporte.docx");
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">Reporte de Condición Stop Works</h1>
        <div className="space-y-4">
          <div>
            <strong className="text-black">1. Suceso: </strong>
            <span className="text-[#0070c0]">{correctedData.suceso || ''}</span>
          </div>
          <div>
            <strong className="text-black">2. Tipo: </strong>
            <span className="text-[#0070c0]">{correctedData.tipo || ''}</span>
          </div>
          <div>
            <strong className="text-black">3. Lugar, Comuna: </strong>
            <span className="text-[#0070c0]">{correctedData.lugar || ''}</span>
          </div>
          <div>
            <strong className="text-black">4. Fecha y Hora: </strong>
            <span className="text-[#0070c0]">{correctedData.fechaHora || ''}</span>
          </div>
          <div>
            <strong className="text-black">5. Área, Zona: </strong>
            <span className="text-[#0070c0]">{correctedData.areaZona || ''}</span>
          </div>
          <div>
            <strong className="text-black">6. Empresa: </strong>
            <span className="text-[#0070c0]">{correctedData.empresa || ''}</span>
          </div>
          <div>
            <strong className="text-black">7. Supervisor CGE: </strong>
            <span className="text-[#0070c0]">{correctedData.supervisor || ''}</span>
          </div>
          <div>
            <strong className="text-black">8. Descripción: </strong>
            <ReactQuill className="text-[#0070c0]" value={correctedData.descripcion || ''} readOnly={true} theme="bubble" />
          </div>
          <div>
            <strong className="text-black">9. Número Prosafety: </strong>
            <span className="text-[#0070c0]">{correctedData.numeroProsafety || ''}</span>
          </div>
          <div>
            <strong className="text-black">10. Fotografías: </strong>
            <span className="text-[#0070c0]">{correctedData.fotografias || ''}</span>
            <div className="flex flex-wrap">
              {imagenes.map((src, index) => (
                <img key={index} src={src} alt={`Imagen ${index}`} className="max-w-xs m-2 rounded-md shadow-md" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={generateWord}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none"
      >
        Descargar Word
      </button>
    </div>
  );
};

export default VisualizacionReporteStopWork;
