import React, { useState, useEffect, useRef } from 'react';
import ExportButton from '@/components/ExportButtonTable';
import AuthSaveButton from '@/components/AuthSaveButton';

const columnSizes = [
  '6.71px', '27.84px', '27.84px', '14.40px', '14.40px', '18.40px', '23.73px', '13.73px', '16.48px', '18.40px', '11.28px'
];

const rowSizes = [
  '19.33px', '19.33px', '19.33px', '20px', '38.67px', '136px', '107px', '110px', '80px', '103px'
];

const CourseOfActionForm: React.FC = () => {
  const [date, setDate] = useState('');
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [mainInput, setMainInput] = useState('');
  const [rows, setRows] = useState<string[]>([]);
  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([[], [], [], [], [], [], []]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setDate(dateValue);

    const [day, month, year] = dateValue.split('/').map(Number);
    const startDate = new Date(year, month - 1, day);

    if (!isNaN(startDate.getTime())) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      const formattedEndDate = `${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${endDate.getFullYear()}`;

      // Actualizar fechas de inicio y fin para todas las filas
      const newInputValues = { ...inputValues };
      for (let i = 1; i <= rows.length + 1; i++) {
        newInputValues[`inicio${i}`] = dateValue;
        newInputValues[`fin${i}`] = formattedEndDate;
      }
      setInputValues(newInputValues);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, name: string) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const handleMainInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainInput(e.target.value);
  };

  const addNewRow = () => {
    if (rows.length < 25) {
      setRows([...rows, `newRow${rows.length + 1}`]);
      inputRefs.current.push([null, null, null, null]);

      // Actualizar fechas de inicio y fin para la nueva fila
      const newRowIndex = rows.length + 1;
      setInputValues(prevValues => ({
        ...prevValues,
        [`inicio${newRowIndex + 1}`]: date,
        [`fin${newRowIndex + 1}`]: inputValues.fin1 // Usamos la fecha de fin de la primera fila como referencia
      }));
    }
  };

  useEffect(() => {
    let newInputValues = { ...inputValues };
    const keyword = mainInput.toLowerCase();
    let tipoValue = '';

    if (keyword.includes('accidente')) {
      tipoValue = 'ACC';
    } else if (keyword.includes('incidente')) {
      tipoValue = 'INC';
    }

    if (tipoValue) {
      // Actualizar todos los tipos existentes y nuevos con la misma clave
      for (let i = 1; i <= rows.length + 1; i++) {
        newInputValues[`tipo${i}`] = tipoValue;
      }
    }

    setInputValues(newInputValues);
  }, [mainInput, rows.length]);

  useEffect(() => {
    inputRefs.current.forEach(refs => {
      refs.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.height = `${ref.scrollHeight}px`;
        }
      });
    });
  }, [inputValues, rows]);

  const getTableData = () => {
    return {
      mainInput,
      date,
      ...inputValues
    };
  };

  const setRef = (rowIndex: number, colIndex: number) => (el: HTMLTextAreaElement | null) => {
    if (!inputRefs.current[rowIndex]) {
      inputRefs.current[rowIndex] = [];
    }
    inputRefs.current[rowIndex][colIndex] = el;
  };

  return (
    <div className="overflow-x-auto">
      <table id="myTable" className="table-fixed min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {/* First row */}
          <tr>
            <td colSpan={11} className="bg-[#00B0F0]">
              <div className="flex items-center w-full">
                <span className="text-left font-bold text-sm">Anexo 1 Plan de Acción:</span>
                <input 
                  type="text" 
                  className="ml-2 flex-1 border-none focus:outline-none bg-transparent"
                  onChange={handleMainInputChange}
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </div>
            </td>
          </tr>
          {/* Second row */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border-none" colSpan={2}>
              <div className="flex items-center w-full">
                <span className="text-left">fecha:</span>
                <input 
                  type="text" 
                  className="ml-2 flex-1 border-none focus:outline-none bg-transparent"
                  onChange={handleDateChange}
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </div>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">duracion</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">inicio</span>
              </div>
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-left">termino</span>
              </div>
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border-none" colSpan={2}>
              <div className="flex items-center w-full">
                <span className="text-left">%Avance Plan en Tiempo</span>
              </div>
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Third row */}
          <tr style={{ height: rowSizes[2] }}>
            <td colSpan={2} className="border-none"></td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border-none">
              <div className="flex items-center w-full h-full">
                <span className="text-center">7 dias</span>
              </div>
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['inicio1'] || ''} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio1')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['fin1'] || ''} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin1')} 
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
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300">
              <span className="text-left">100%</span>
            </td>
            <td colSpan={3} className="border-none"></td>
          </tr>
          {/* Fourth row */}
          <tr style={{ height: rowSizes[3] }} className="bg-white">
            <td colSpan={11} className="border-none"></td>
          </tr>
          {/* Fifth row */}
          <tr style={{ height: rowSizes[4] }} className='bg-[#00B0F0]'>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">#</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-center align-middle">Tarea</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-center align-middle">Sub-Tarea</td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 text-center align-middle">INICIO</td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 text-center align-middle">FIN</td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 text-center align-middle">Responsable</td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 text-center align-middle">Cliente</td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">Avance Real</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">Avance Programado</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">III_ddmmm: Comentario</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 text-center align-middle">Tipo ACC-INC</td>
          </tr>
          {/* Original Tasks Rows */}
          <tr style={{ height: rowSizes[5] }} className="bg-[#D9E1F2]">
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">1</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">
              <textarea
                ref={setRef(0, 0)}
                value={inputValues['medidasCorrectivas'] || ''}
                onChange={(e) => handleInputChange(e, 'medidasCorrectivas')}
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
              />
            </td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea ref={setRef(0, 1)} value={inputValues['subtarea1'] || ''} onChange={(e) => handleInputChange(e, 'subtarea1')} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['inicio2'] || ''} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio2')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['fin2'] || ''} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin2')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <textarea ref={setRef(1, 0)} value={inputValues['responsable1'] || ''} onChange={(e) => handleInputChange(e, 'responsable1')} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
              <textarea ref={setRef(2, 0)} value={inputValues['cliente1'] || ''} onChange={(e) => handleInputChange(e, 'cliente1')} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['tipo1'] || ''} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo1')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
          </tr>
          {/* New Rows */}
          {rows.map((row, index) => (
            <tr key={index} style={{ height: rowSizes[6] }} className={`bg-opacity-100 ${(index + 2) % 2 === 0 ? 'bg-white' : 'bg-[#D9E1F2]'}`}>
              <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">{index + 2}</td>
              <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">
                <textarea ref={setRef(index + 3, 0)} value={inputValues[`tarea${index + 2}`] || ''} onChange={(e) => handleInputChange(e, `tarea${index + 2}`)} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
              </td>
              <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
                <textarea ref={setRef(index + 3, 1)} value={inputValues[`subtarea${index + 2}`] || ''} onChange={(e) => handleInputChange(e, `subtarea${index + 2}`)} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
              </td>
              <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
                <input 
                  type="text" 
                  value={inputValues[`inicio${index + 3}`] || date} 
                  onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, `inicio${index + 3}`)} 
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </td>
              <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
                <input 
                  type="text" 
                  value={inputValues[`fin${index + 3}`] || inputValues.fin1} 
                  onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, `fin${index + 3}`)} 
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </td>
              <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
                <textarea ref={setRef(index + 3, 2)} value={inputValues[`responsable${index + 2}`] || ''} onChange={(e) => handleInputChange(e, `responsable${index + 2}`)} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
              </td>
              <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
                <textarea ref={setRef(index + 3, 3)} value={inputValues[`cliente${index + 2}`] || ''} onChange={(e) => handleInputChange(e, `cliente${index + 2}`)} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
              </td>
              <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
              <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
              <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
              <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
                <input 
                  type="text" 
                  value={inputValues[`tipo${index + 2}`] || ''} 
                  onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, `tipo${index + 2}`)} 
                  className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                  style={{ 
                    minHeight: '30px', 
                    height: 'auto',
                  }}
                />
              </td>
            </tr>
          ))}
          {/* Existing Row: Reportar Avances de Plan de Acción */}
          <tr style={{ height: rowSizes[9] }} className={(rows.length + 2) % 2 === 0 ? 'bg-white' : 'bg-[#D9E1F2]'}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">{rows.length + 2}</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Reportar Avances de Plan de Acción</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300">
              <textarea ref={setRef(rows.length + 3, 0)} value={inputValues['subtarea5'] || ''} onChange={(e) => handleInputChange(e, 'subtarea5')} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['inicio6'] || date} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio6')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['fin6'] || inputValues.fin1} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin6')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <textarea ref={setRef(rows.length + 3, 1)} value={inputValues['responsable5'] || ''} onChange={(e) => handleInputChange(e, 'responsable5')} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
              <textarea ref={setRef(rows.length + 3, 2)} value={inputValues['cliente5'] || ''} onChange={(e) => handleInputChange(e, 'cliente5')} className="w-full h-full border-none focus:outline-none text-center bg-transparent" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
              <input 
                type="text" 
                value={inputValues['tipo5'] || ''} 
                onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo5')} 
                className="w-full h-full border-none focus:outline-none text-center bg-transparent"
                style={{ 
                  minHeight: '30px', 
                  height: 'auto',
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button onClick={addNewRow} className="p-2 bg-blue-500 text-white rounded ml-2">Agregar Fila</button>
      </div>
      <ExportButton tableId="myTable" />
      <AuthSaveButton data={getTableData()} collectionName="CourseOfAction" />
    </div>
  );
};

export default CourseOfActionForm;
