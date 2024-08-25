import React, { useState, useEffect, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import ExportButton from '@/components/ExportButtonTable';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const columnSizes = [
  '6.71px', '30.84px', '30.84px', '20.40px', '20.40px', '18.40px', '23.73px', '13.73px', '16.48px', '18.40px', '11.28px'
];

const rowSizes = [
  '19.33px', '19.33px', '19.33px', '20px', '38.67px', '136px', '107px', '110px', '80px', '103px'
];

export interface FormValues {
  mainInput?: string;
  inicio1?: string;
  fin1?: string;
  medidasCorrectivas?: string;
  subtarea1?: string;
  responsable1?: string;
  cliente1?: string;
  tipo1?: string;
  [key: string]: any;
}

export interface DatosExtraidos extends FormValues {
  id: string;
  numeroDocumento: string;
  empresa: string;
  timestamp: Date;
}

interface CourseOfActionEditProps {
  formData: DatosExtraidos | null;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  selectedEmpresa: string;
}

const CourseOfActionEdit: React.FC<CourseOfActionEditProps> = ({ formData, handleChange, selectedEmpresa }) => {
  const [formValues, setFormValues] = useState<FormValues>(formData || {});
  const [rows, setRows] = useState<{ tarea: string; subtarea: string; inicio: string; fin: string; responsable: string; cliente: string; tipo: string; id: string; }[]>([]);
  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, key: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: e.target.value,
    }));
    handleChange(e);
  };

  const handleSave = async () => {
    if (formData?.id && formData?.empresa && formData?.numeroDocumento) {
      const docRef = doc(firestore, `USERAUTH/${formData.empresa}/CourseOfAction/${formData.numeroDocumento}`);
      try {
        await setDoc(docRef, { ...formValues }, { merge: true });
        alert('Documento actualizado exitosamente');
      } catch (error) {
        alert('Error al actualizar el documento: ' + error);
      }
    } else {
      alert('No se ha proporcionado un ID, empresa o número de documento válido para actualizar el documento.');
    }
  };

  const addNewRow = () => {
    const nextIndex = rows.length + 1;
    setRows((prevRows) => [
      ...prevRows,
      {
        id: String(nextIndex),
        tarea: '',
        subtarea: '',
        inicio: '',
        fin: '',
        responsable: '',
        cliente: '',
        tipo: '',
      },
    ]);
  };

  useEffect(() => {
    inputRefs.current.forEach(refs => {
      refs.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.height = `${ref.scrollHeight}px`;
        }
      });
    });
  }, [formValues, rows]);

  const setRef = (rowIndex: number, colIndex: number) => (el: HTMLTextAreaElement | null) => {
    if (!inputRefs.current[rowIndex]) {
      inputRefs.current[rowIndex] = [];
    }
    inputRefs.current[rowIndex][colIndex] = el;
  };

  const tareasDinamicas = Object.keys(formValues)
    .filter((key) => key.startsWith('tarea') && !key.includes('Final'))
    .map((key) => {
      const index = parseInt(key.replace('tarea', ''), 10);
      return {
        id: String(index),
        tarea: formValues[key],
        subtarea: formValues[`subtarea${index}`] || '',
        inicio: formValues[`inicio${index}`] || '',
        fin: formValues[`fin${index}`] || '',
        responsable: formValues[`responsable${index}`] || '',
        cliente: formValues[`cliente${index}`] || '',
        tipo: formValues[`tipo${index}`] || '',
      };
    })
    .filter((tarea) => tarea.tarea)
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));

  const totalRows = tareasDinamicas.length + rows.length;

  const exportPdf = async () => {
    const doc = new jsPDF('portrait');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const table = document.getElementById('viewTable');

    if (!table) {
      console.error('Table element not found');
      return;
    }

    let currentPageHeight = 0;
    const rowsPerPage = 5; // Ajusta este número según la altura de las filas y la página

    const totalRows = table.querySelectorAll('tbody tr').length;
    let rowsCaptured = 0;

    while (rowsCaptured < totalRows) {
      const canvas = await html2canvas(table, {
        useCORS: true,
        scale: 2,
        y: currentPageHeight,
        height: pageHeight, // Captura la altura de la página completa
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;

      doc.addImage(imgData, 'PNG', 0, 0, width, height);
      rowsCaptured += rowsPerPage;

      if (rowsCaptured < totalRows) {
        doc.addPage();
        currentPageHeight += pageHeight;
      }
    }

    doc.save('document.pdf');
  };

  return (
    <div className="overflow-x-auto mx-16 mb-4">
      <h2 className="text-2xl font-bold mb-4">13. ACCIONES CORRELATIVAS/PREVENTIVAS</h2>
      <table id="viewTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Primera fila (estática) */}
          <tr>
            <td colSpan={11} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Plan de Acción:</span>
                <input
                  className="ml-2 flex-1 border-none bg-[#00B0F0]"
                  value={formValues.mainInput || ''}
                  onChange={(e) => handleInputChange(e, 'mainInput')}
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </div>
            </td>
          </tr>
          {/* Segunda fila (estática) */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0] }} colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">Fecha:</span>
                <input
                  className="ml-2 flex-1 border-none"
                  value={formValues.inicio1 || ''}
                  onChange={(e) => handleInputChange(e, 'inicio1')}
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </div>
            </td>
            <td style={{ width: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">Duración</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">Inicio</span>
              </div>
            </td>
            <td style={{ width: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">Término</span>
              </div>
            </td>
            <td style={{ width: columnSizes[5] }} colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">%Avance Plan en Tiempo</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Tercera fila (estática) */}
          <tr style={{ height: rowSizes[2] }}>
            <td colSpan={2} className="border-none"></td>
            <td style={{ width: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">7 días</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300">
              <textarea
                value={formValues.inicio2 || ''}
                onChange={(e) => handleInputChange(e, 'inicio2')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300">
              <textarea
                value={formValues.fin2 || ''}
                onChange={(e) => handleInputChange(e, 'fin2')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td colSpan={2} className="border-none">
              <div className="flex items-center w-full">
                <span className="text-left">%Estatus Plan</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Cuarta fila (estática) */}
          <tr style={{ height: rowSizes[3] }}>
            <td colSpan={11} className="border-none"></td>
          </tr>
          {/* Cabecera dinámica */}
          <tr style={{ height: rowSizes[4] }} className='bg-[#00B0F0]'>
            <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">#</td>
            <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-center align-middle">Tarea</td>
            <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-center align-middle">Sub-Tarea</td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300 text-center align-middle">INICIO</td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300 text-center align-middle">FIN</td>
            <td style={{ width: columnSizes[5] }} className="border border-gray-300 text-center align-middle">Responsable</td>
            <td style={{ width: columnSizes[6] }} className="border border-gray-300 text-center align-middle">Cliente</td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">Avance Real</td>
            <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">Avance Programado</td>
            <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">III_ddmmm: Comentario</td>
            <td style={{ width: columnSizes[10] }} className="border border-gray-300 text-center align-middle">Tipo ACC-INC</td>
          </tr>
          {/* Fila de medidas correctivas (tarea1) */}
          <tr style={{ height: rowSizes[5] }} className="bg-[#D9E1F2]">
            <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">1</td>
            <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-left align-middle">
              <textarea
                ref={setRef(0, 0)}
                value={formValues.medidasCorrectivas || ''}
                onChange={(e) => handleInputChange(e, 'medidasCorrectivas')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea
                ref={setRef(0, 1)}
                value={formValues.subtarea1 || ''}
                onChange={(e) => handleInputChange(e, 'subtarea1')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300">
              <textarea
                ref={setRef(0, 2)}
                value={formValues.inicio2 || ''}
                onChange={(e) => handleInputChange(e, 'inicio2')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300">
              <textarea
                ref={setRef(0, 3)}
                value={formValues.fin2 || ''}
                onChange={(e) => handleInputChange(e, 'fin2')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[5] }} className="border border-gray-300">
              <textarea
                ref={setRef(1, 0)}
                value={formValues.responsable1 || ''}
                onChange={(e) => handleInputChange(e, 'responsable1')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[6] }} className="border border-gray-300">
              <textarea
                ref={setRef(2, 0)}
                value={formValues.cliente1 || ''}
                onChange={(e) => handleInputChange(e, 'cliente1')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10] }} className="border border-gray-300">
              <textarea
                ref={setRef(0, 4)}
                value={formValues.tipo1 || ''}
                onChange={(e) => handleInputChange(e, 'tipo1')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
          </tr>
          {/* Filas dinámicas */}
          {tareasDinamicas.map((tarea, index) => (
            <tr
              key={tarea.id}
              style={{ height: rowSizes[6 + index] || rowSizes[rowSizes.length - 1] }}
              className={index % 2 === 0 ? 'bg-white' : 'bg-[#D9E1F2]'}
            >
              <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">{index + 2}</td>
              <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-left align-middle">
                <textarea
                  ref={setRef(index + 1, 0)}
                  value={tarea.tarea}
                  onChange={(e) => handleInputChange(e, `tarea${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
              <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
                <textarea
                  ref={setRef(index + 1, 1)}
                  value={tarea.subtarea}
                  onChange={(e) => handleInputChange(e, `subtarea${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
              <td style={{ width: columnSizes[3] }} className="border border-gray-300">
                <textarea
                  ref={setRef(index + 1, 2)}
                  value={tarea.inicio}
                  onChange={(e) => handleInputChange(e, `inicio${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
              <td style={{ width: columnSizes[4] }} className="border border-gray-300">
                <textarea
                  ref={setRef(index + 1, 3)}
                  value={tarea.fin}
                  onChange={(e) => handleInputChange(e, `fin${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
              <td style={{ width: columnSizes[5] }} className="border border-gray-300">
                <textarea
                  ref={setRef(index + 1, 4)}
                  value={tarea.responsable}
                  onChange={(e) => handleInputChange(e, `responsable${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
              <td style={{ width: columnSizes[6] }} className="border border-gray-300">
                <textarea
                  ref={setRef(index + 1, 5)}
                  value={tarea.cliente}
                  onChange={(e) => handleInputChange(e, `cliente${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
              <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
              <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
              <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
              <td style={{ width: columnSizes[10] }} className="border border-gray-300">
                <textarea
                  ref={setRef(index + 1, 6)}
                  value={tarea.tipo}
                  onChange={(e) => handleInputChange(e, `tipo${tarea.id}`)}
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                />
              </td>
            </tr>
          ))}
          {/* Última fila fija (estática) */}
          <tr style={{ height: rowSizes[9] }} className="bg-[#D9E1F2]">
            <td style={{ width: columnSizes[0] }} className="border border-gray-300 text-center align-middle">{totalRows + 2}</td>
            <td style={{ width: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Reportar Avances de Plan de Acción</td>
            <td style={{ width: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea
                ref={setRef(rows.length + 2, 0)}
                value={formValues[`subtarea${totalRows + 2}`] || ''}
                onChange={(e) => handleInputChange(e, `subtarea${totalRows + 2}`)}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[3] }} className="border border-gray-300">
              <textarea
                ref={setRef(rows.length + 2, 1)}
                value={formValues[`inicio${totalRows + 2}`] || ''}
                onChange={(e) => handleInputChange(e, `inicio${totalRows + 2}`)}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[4] }} className="border border-gray-300">
              <textarea
                ref={setRef(rows.length + 2, 2)}
                value={formValues[`fin${totalRows + 2}`] || ''}
                onChange={(e) => handleInputChange(e, `fin${totalRows + 2}`)}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[5] }} className="border border-gray-300">
              <textarea
                ref={setRef(rows.length + 2, 3)}
                value={formValues[`responsable${totalRows + 2}`] || ''}
                onChange={(e) => handleInputChange(e, `responsable${totalRows + 2}`)}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[6] }} className="border border-gray-300">
              <textarea
                ref={setRef(rows.length + 2, 4)}
                value={formValues[`cliente${totalRows + 2}`] || ''}
                onChange={(e) => handleInputChange(e, `cliente${totalRows + 2}`)}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10] }} className="border border-gray-300">
              <textarea
                ref={setRef(rows.length + 2, 5)}
                value={formValues[`tipo${totalRows + 2}`] || ''}
                onChange={(e) => handleInputChange(e, `tipo${totalRows + 2}`)}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button onClick={addNewRow} className="p-2 bg-blue-500 text-white rounded ml-2">Agregar Fila</button>
        <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded ml-2">Guardar</button>
        <button onClick={exportPdf} className="p-2 bg-red-500 text-white rounded ml-2">Exportar PDF</button>
      </div>
      <ExportButton tableId="viewTable" />
    </div>
  );
};

export default CourseOfActionEdit;
