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
  const inputRefs = useRef<(HTMLTextAreaElement | null)[][]>([[], [], [], [], [], [], []]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setDate(dateValue);

    // Convertir la fecha de 'dd/mm/yyyy' a 'mm/dd/yyyy' para usar en Date()
    const [day, month, year] = dateValue.split('/');
    const formattedDate = `${month}/${day}/${year}`;
    const startDate = new Date(formattedDate);

    if (!isNaN(startDate.getTime())) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      // Formatear la fecha de fin a 'dd/mm/yyyy'
      const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

      const newInputValues = {
        ...inputValues,
        inicio1: dateValue,
        fin1: formattedEndDate,
        inicio2: dateValue,
        fin2: formattedEndDate,
        inicio3: dateValue,
        fin3: formattedEndDate,
        inicio4: dateValue,
        fin4: formattedEndDate,
        inicio5: dateValue,
        fin5: formattedEndDate,
        inicio6: dateValue,
        fin6: formattedEndDate
      };
      setInputValues(newInputValues);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, name: string) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const handleMainInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMainInput(e.target.value);
  };

  useEffect(() => {
    let newInputValues = { ...inputValues };
    const keyword = mainInput.toLowerCase();
    if (keyword.includes('accidente')) {
      newInputValues = { ...newInputValues, tipo1: 'ACC', tipo2: 'ACC', tipo3: 'ACC', tipo4: 'ACC', tipo5: 'ACC' };
    } else if (keyword.includes('incidente')) {
      newInputValues = { ...newInputValues, tipo1: 'INC', tipo2: 'INC', tipo3: 'INC', tipo4: 'INC', tipo5: 'INC' };
    }
    setInputValues(newInputValues);
  }, [mainInput]);

  useEffect(() => {
    inputRefs.current.forEach(refs => {
      refs.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.height = `${ref.scrollHeight}px`;
        }
      });
    });
  }, [inputValues]);

  const getTableData = () => {
    return {
      mainInput,
      date,
      ...inputValues
    };
  };

  const setRef = (rowIndex: number, colIndex: number) => (el: HTMLTextAreaElement | null) => {
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
                <input type="text" className="ml-2 flex-1 border-none focus:outline-none bg-[#00B0F0] bg-opacity-100" onChange={handleMainInputChange} />
              </div>
            </td>
          </tr>
          {/* Second row */}
          <tr style={{ height: rowSizes[1] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border-none" colSpan={2}>
              <div className="flex items-center w-full">
                <span className="text-left">fecha:</span>
                <input type="text" className="ml-2 flex-1 border-none focus:outline-none" onChange={handleDateChange} />
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
              <input type="text" value={inputValues['inicio1'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio1')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin1'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin1')} className="w-full h-full border-none focus:outline-none text-center" />
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
          <tr style={{ height: rowSizes[3] }}>
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
          {/* Sixth row */}
          <tr style={{ height: rowSizes[5] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">1</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Desarrollar Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">
              <textarea ref={setRef(0, 0)} value={inputValues['subtarea1'] || ''} onChange={(e) => handleInputChange(e, 'subtarea1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['inicio2'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio2')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['fin2'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin2')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(1, 0)} value={inputValues['responsable1'] || ''} onChange={(e) => handleInputChange(e, 'responsable1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(2, 0)} value={inputValues['cliente1'] || ''} onChange={(e) => handleInputChange(e, 'cliente1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['tipo1'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo1')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Seventh row */}
          <tr style={{ height: rowSizes[6] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">2</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Implementación de Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea ref={setRef(0, 1)} value={inputValues['subtarea2'] || ''} onChange={(e) => handleInputChange(e, 'subtarea2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={inputValues['inicio3'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio3')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin3'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin3')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <textarea ref={setRef(1, 1)} value={inputValues['responsable2'] || ''} onChange={(e) => handleInputChange(e, 'responsable2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
              <textarea ref={setRef(2, 1)} value={inputValues['cliente2'] || ''} onChange={(e) => handleInputChange(e, 'cliente2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
              <input type="text" value={inputValues['tipo2'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo2')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
          {/* Eighth row */}
          <tr style={{ height: rowSizes[7] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">3</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Implementación de Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">
              <textarea ref={setRef(0, 2)} value={inputValues['subtarea3'] || ''} onChange={(e) => handleInputChange(e, 'subtarea3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['inicio4'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio4')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['fin4'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin4')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(1, 2)} value={inputValues['responsable3'] || ''} onChange={(e) => handleInputChange(e, 'responsable3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(2, 2)} value={inputValues['cliente3'] || ''} onChange={(e) => handleInputChange(e, 'cliente3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['tipo3'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo3')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
          {/* Ninth row */}
          <tr style={{ height: rowSizes[8] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle">4</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle">Implementación de Medidas Correctivas</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 text-left align-middle">
              <textarea ref={setRef(0, 3)} value={inputValues['subtarea4'] || ''} onChange={(e) => handleInputChange(e, 'subtarea4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300">
              <input type="text" value={inputValues['inicio5'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio5')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300">
              <input type="text" value={inputValues['fin5'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin5')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300">
              <textarea ref={setRef(1, 3)} value={inputValues['responsable4'] || ''} onChange={(e) => handleInputChange(e, 'responsable4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300">
              <textarea ref={setRef(2, 3)} value={inputValues['cliente4'] || ''} onChange={(e) => handleInputChange(e, 'cliente4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300">
              <input type="text" value={inputValues['tipo4'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo4')} className="w-full h-full border-none focus:outline-none text-center" />
            </td>
          </tr>
          {/* Tenth row */}
          <tr style={{ height: rowSizes[9] }}>
            <td style={{ width: columnSizes[0], minWidth: columnSizes[0], maxWidth: columnSizes[0] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">5</td>
            <td style={{ width: columnSizes[1], minWidth: columnSizes[1], maxWidth: columnSizes[1] }} className="border border-gray-300 text-left align-middle bg-[#D9E1F2]">Reportar Avances de Plan de Acción</td>
            <td style={{ width: columnSizes[2], minWidth: columnSizes[2], maxWidth: columnSizes[2] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(0, 4)} value={inputValues['subtarea5'] || ''} onChange={(e) => handleInputChange(e, 'subtarea5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[3], minWidth: columnSizes[3], maxWidth: columnSizes[3] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['inicio6'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'inicio6')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[4], minWidth: columnSizes[4], maxWidth: columnSizes[4] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['fin6'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'fin6')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[5], minWidth: columnSizes[5], maxWidth: columnSizes[5] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(1, 4)} value={inputValues['responsable5'] || ''} onChange={(e) => handleInputChange(e, 'responsable5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[6], minWidth: columnSizes[6], maxWidth: columnSizes[6] }} className="border border-gray-300 bg-[#D9E1F2]">
              <textarea ref={setRef(2, 4)} value={inputValues['cliente5'] || ''} onChange={(e) => handleInputChange(e, 'cliente5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
            <td style={{ width: columnSizes[7], minWidth: columnSizes[7], maxWidth: columnSizes[7] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[8], minWidth: columnSizes[8], maxWidth: columnSizes[8] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">100%</td>
            <td style={{ width: columnSizes[9], minWidth: columnSizes[9], maxWidth: columnSizes[9] }} className="border border-gray-300 text-center align-middle bg-[#D9E1F2]">INMEDIATO</td>
            <td style={{ width: columnSizes[10], minWidth: columnSizes[10], maxWidth: columnSizes[10] }} className="border border-gray-300 bg-[#D9E1F2]">
              <input type="text" value={inputValues['tipo5'] || ''} onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>, 'tipo5')} className="w-full h-full border-none focus:outline-none text-center bg-[#D9E1F2] bg-opacity-100" />
            </td>
          </tr>
        </tbody>
      </table>
      <ExportButton tableId="myTable" />
      <AuthSaveButton data={getTableData()} collectionName="CourseOfAction" />
    </div>
  );
};

export default CourseOfActionForm;
