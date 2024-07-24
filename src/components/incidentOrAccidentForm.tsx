import React, { useState, useRef, useEffect } from 'react';
import PptxGenJS from 'pptxgenjs';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import AuthSaveButton from '@/components/AuthSaveButton';

export interface DatosExtraidos {
  suceso: string;
  tipo: string;
  lugar: string;
  fechaHora: string;
  fecha: string;
  hora: string;
  areaZona: string;
  empresa: string;
  supervisor: string;
  descripcion: string;
  numeroProsafety: string;
  fotografias: string;
  accionesInmediatas: string;
  controlesInmediatos: string;
  factoresRiesgo: string;
  zonal: string;
  conBajaIL: boolean;
  incidenteIndustrial: boolean;
  sinBajaIL: boolean;
  incidenteLaboral: boolean;
}

interface IncidentFormProps {
  formData: DatosExtraidos;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ formData, handleChange }) => {
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImageFiles(files);
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setLogo(logoURL);
    }
  };

  const exportToPPTX = async () => {
    if (tableRef.current) {
      const dataUrl = await toPng(tableRef.current);

      const pptx = new PptxGenJS();
      const slide = pptx.addSlide();

      slide.addImage({ data: dataUrl, x: 0.5, y: 0.5, w: 9, h: 5 });

      pptx.writeFile({ fileName: `Reporte_${formData.suceso}_${formData.tipo}.pptx` });
    }
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    if (tableRef.current) {
      const dataUrl = await toPng(tableRef.current);
      doc.addImage(dataUrl, 'PNG', 10, 10, 190, 0);
      doc.save(`Reporte_${formData.suceso}_${formData.tipo}.pdf`);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    handleChange({
      target: {
        name,
        value: checked,
      },
    } as any);
  };

  const handleBulletChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const lines = value.split('\n');
    const bulletedLines = lines.map(line => {
      if (line.startsWith('• ')) {
        return line;
      } else if (line === '') {
        return '';
      } else {
        return `• ${line}`;
      }
    });
    const newValue = bulletedLines.join('\n');

    handleChange({
      ...e,
      target: {
        ...e.target,
        name: name,
        value: newValue
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      const target = e.target as HTMLTextAreaElement;
      const { selectionStart, value } = target;

      if (selectionStart > 0 && value[selectionStart - 1] === '•' && (selectionStart === 1 || value[selectionStart - 2] === '\n')) {
        e.preventDefault();
        const newValue = value.slice(0, selectionStart - 2) + value.slice(selectionStart);
        handleChange({
          ...e,
          target: {
            ...target,
            value: newValue
          }
        });
      }
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
  };

  const handleZonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: e.target.value.toUpperCase()
      }
    });
  };

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, []);

  return (
    <div className="container-sm w-full p-4 bg-gray-100">
      <div ref={tableRef}>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#004165]">REPORTE FLASH / {formData.suceso.toUpperCase()} {formData.tipo.toUpperCase()}</h1>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#004165] mr-2">ZONAL:</h2>
              <input
                type="text"
                name="zonal"
                value={formData.zonal}
                onChange={handleZonalChange}
                className="text-2xl font-bold text-[#004165] bg-transparent"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>
          {logo && (
            <div className="flex justify-end items-center">
              <img src={logo} alt="Logo" className="max-w-xs max-h-20 object-contain" />
            </div>
          )}
        </div>
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-[#004165] text-white text-left">
              <th className="p-2 border-r-4 border-b-4 border-white" colSpan={2}>Antecedentes Generales:</th>
              <th className="p-2 border-l-4 border-b-4 border-white">Fotografías:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b-2 border-r-4 border-white w-3/5 bg-[#cacdd2]" colSpan={2}>
                <div className="flex">
                  <label className="w-1/4 text-[#004165] font-bold border-white border-r-2 p-5">Fecha:</label>
                  <input
                    type="text"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className="w-1/4 text-[#004165] bg-[#cacdd2] bg-opacity-100 pl-2"
                  />
                  <label className="w-1/4 text-[#004165] font-bold border-white border-r-2 border-l-2 p-5">Hora:</label>
                  <input
                    type="text"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className="w-1/4 text-[#004165] bg-[#cacdd2] bg-opacity-100 pl-2"
                  />
                </div>
              </td>
              <td className="p-2 border-b-8 border-l-4 border-r-4 border-white" rowSpan={7}>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((image, index) => (
                    <img key={index} src={image} alt={`Fotografía ${index + 1}`} className="w-full h-auto" />
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b-2 border-r-4 border-white bg-[#e6e8ea]" colSpan={2}>
                <div className="flex">
                  <label className="w-1/4 text-[#004165] font-bold border-r-2 border-white p-3">Lugar, Comuna, Región:</label>
                  <input
                    type="text"
                    name="lugar"
                    value={formData.lugar}
                    onChange={handleChange}
                    className="w-3/4 text-[#004165] p-1 bg-[#e6e8ea] bg-opacity-100 pl-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b-2 border-r-4 border-white bg-[#cacdd2]" colSpan={2}>
                <div className="flex">
                  <label className="w-1/4 text-[#004165] font-bold border-white border-r-2 p-3">Empresa:</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-3/4 text-[#004165] bg-[#cacdd2] bg-opacity-100 pl-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b-2 border-r-4 border-white bg-[#e6e8ea]" colSpan={2}>
                <div className="flex">
                  <label className="w-1/4 text-[#004165] font-bold border-r-2 border-white p-3">Área:</label>
                  <input
                    type="text"
                    name="areaZona"
                    value={formData.areaZona}
                    onChange={handleChange}
                    className="w-3/4 text-[#004165] bg-[#e6e8ea] bg-opacity-100 pl-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b-2 border-r-4 border-white bg-[#cacdd2]" colSpan={2}>
                <div className="flex">
                  <label className="w-1/4 text-[#004165] font-bold border-r-2 border-white p-3">Jefatura que reporta:</label>
                  <input
                    type="text"
                    name="supervisor"
                    value={formData.supervisor}
                    onChange={handleChange}
                    className="w-3/4 text-[#004165] bg-[#cacdd2] bg-opacity-100 pl-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b-2 border-r-4 border-white bg-[#e6e8ea]" colSpan={2}>
                <div className="flex pr-3 pl-1">
                  <label className="w-1/4 text-[#004165] font-bold border-r-2 border-white p-3">Tipo de Incidente/Accidente:</label>
                  <div className="w-3/4 grid grid-cols-2 gap-4 pl-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-[#004165] ">Con Baja IL</span>
                      <input
                        type="checkbox"
                        name="conBajaIL"
                        checked={formData.conBajaIL}
                        onChange={handleCheckboxChange}
                        className="custom-checkbox"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-[#004165]">{formData.suceso} Industrial</span>
                      <input
                        type="checkbox"
                        name="incidenteIndustrial"
                        checked={formData.incidenteIndustrial}
                        onChange={handleCheckboxChange}
                        className="custom-checkbox"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-[#004165]">Sin Baja IL</span>
                      <input
                        type="checkbox"
                        name="sinBajaIL"
                        checked={formData.sinBajaIL}
                        onChange={handleCheckboxChange}
                        className="custom-checkbox"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-[#004165]">{formData.suceso} Laboral</span>
                      <input
                        type="checkbox"
                        name="incidenteLaboral"
                        checked={formData.incidenteLaboral}
                        onChange={handleCheckboxChange}
                        className="custom-checkbox"
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b-8 border-r-4 border-white bg-[#e6e8ea]" colSpan={2}>
                <div className="flex">
                  <label className="w-1/4 text-[#004165] font-bold border-r-2 border-white p-3">N° PROSAFETY:</label>
                  <input
                    type="text"
                    name="numeroProsafety"
                    value={formData.numeroProsafety}
                    onChange={handleChange}
                    className="w-3/4 text-[#004165] bg-[#e6e8ea] bg-opacity-100 pl-2"
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr className="bg-[#004165] text-white text-left">
              <th className="p-2 border-b-4 border-t-8 border-r-4 border-white" colSpan={2}>Descripción del Accidente e Incidente:</th>
              <th className="p-2 border-b-4 border-t-8 border-r-4 border-white">Acciones Inmediatas:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b-4 border-r-4 border-white bg-[#cacdd2]" colSpan={2}>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleDescriptionChange}
                  className="w-full text-[#004165] text-lg bg-[#cacdd2] bg-opacity-100 pl-2 resize-none"
                  rows={4}
                  onInput={adjustTextareaHeight}
                />
              </td>
              <td className="p-2 border-b-4 border-r-4 border-white bg-[#cacdd2]" rowSpan={3}>
                <textarea
                  name="accionesInmediatas"
                  value={formData.accionesInmediatas}
                  onChange={handleBulletChange}
                  onKeyDown={handleKeyDown}
                  onInput={adjustTextareaHeight}
                  className="w-full text-[#004165] text-lg bg-[#cacdd2] bg-opacity-100 pl-2 resize-none"
                  rows={4}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr className="bg-[#004165] text-white text-left">
              <th className="p-2 border-b-4 border-r-4 border-white" colSpan={2}>Controles Inmediatos:</th>
              <th className="p-2 border-b-4 border-r-4 border-white">Factores de Riesgos Principal:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b-4 border-r-4 border-white bg-[#cacdd2]" colSpan={2}>
                <textarea
                  name="controlesInmediatos"
                  value={formData.controlesInmediatos}
                  onChange={handleBulletChange}
                  onKeyDown={handleKeyDown}
                  onInput={adjustTextareaHeight}
                  className="w-full text-[#004165] text-lg bg-[#cacdd2] bg-opacity-100 pl-2 resize-none"
                  rows={4}
                />
              </td>
              <td className="p-2 border-b-4 border-r-4 border-white bg-[#cacdd2]" rowSpan={3}>
                <textarea
                  name="factoresRiesgo"
                  value={formData.factoresRiesgo}
                  onChange={handleBulletChange}
                  onKeyDown={handleKeyDown}
                  onInput={adjustTextareaHeight}
                  className="w-full text-[#004165] text-lg bg-[#cacdd2] bg-opacity-100 pl-2 resize-none"
                  rows={4}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center">
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
        <label htmlFor="image-upload" className="cursor-pointer p-2 bg-green-500 text-white rounded mr-4">Subir Imágenes</label>
        <button onClick={exportToPPTX} className="p-2 bg-blue-500 text-white rounded mr-4 hover:bg-blue-600 transition-colors duration-300">Exportar a PPTX</button>
        <button onClick={exportToPDF} className="p-2 bg-blue-500 text-white rounded mr-4 hover:bg-blue-600 transition-colors duration-300">Exportar a PDF</button>
        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
        <label htmlFor="logo-upload" className="cursor-pointer p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300">Subir Logo</label>
        <AuthSaveButton data={formData} images={imageFiles} collectionName="Flash" />
      </div>
    </div>
  );
};

export default IncidentForm;
