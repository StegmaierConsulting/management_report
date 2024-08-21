import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '@/app/globals.css';
import { Header } from '@/components/header';
import TypeAccidentIncidentTable from '@/components/ConcludingReportComponents/TypeAccidentIncidentTable';
import CompanyField from '@/components/ConcludingReportComponents/CompanyField';
import PersonDetailsTable from '@/components/ConcludingReportComponents/PersonDetailsTable';
import DamagedEquipmentTable from '@/components/ConcludingReportComponents/DamagedEquipmentTable';
import ThirdPartyIdentificationTable from '@/components/ConcludingReportComponents/ThirdPartyIdentificationTable';
import AccidentDetailsForm from '@/components/ConcludingReportComponents/AccidentDetailsForm';
import RootCauseAnalysis, { TableData } from '@/components/ConcludingReportComponents/RootCauseAnalysis';
import DescriptionAccidentIncident from '@/components/ConcludingReportComponents/DescriptionAccidentIncident';
import ConclusionsForm from '@/components/ConcludingReportComponents/ConclusionsForm';
import InmediateActions from '@/components/ConcludingReportComponents/InmediateActions';
import CourseOfActions from '@/components/ConcludingReportComponents/CourseOfActions';
import CostsTable from '@/components/ConcludingReportComponents/CostTable';
import ImagesDisplay from '@/components/ConcludingReportComponents/ImagesDisplay';
import InvestigationResponsible from '@/components/ConcludingReportComponents/InvestigationResponsible';
import AuthComponent from '@/auth/authComponent';
import { firestore } from '@/config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import LogoUploader from '@/components/ConcludingReportComponents/LogoUploader';

const MainPage: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [rootCauseData, setRootCauseData] = useState<TableData[]>([]);
  const [inmediateActionsData, setInmediateActionsData] = useState<any>(null);
  const [flashData, setFlashData] = useState<any>(null);
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  // State for logos
  const [leftLogo, setLeftLogo] = useState<string | null>(null);
  const [rightLogo, setRightLogo] = useState<string | null>(null);
  const [sideImage, setSideImage] = useState<string | null>(null); // Nuevo estado para la imagen lateral

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);
  const page5Ref = useRef<HTMLDivElement>(null);
  const page6Ref = useRef<HTMLDivElement>(null);
  const page7Ref = useRef<HTMLDivElement>(null);
  const page8Ref = useRef<HTMLDivElement>(null);
  const page9Ref = useRef<HTMLDivElement>(null);

  const collectionNames = ['CourseOfAction', 'InmediateActions', 'RootCauseAnalysis', 'Flash'];

  const handleSearch = async () => {
    if (!selectedEmpresa || !searchTerm) return;

    const forms: any[] = [];
    let images: string[] = [];

    for (const collectionName of collectionNames) {
      const collectionPath = `USERAUTH/${selectedEmpresa}/${collectionName}`;
      const q = query(collection(firestore, collectionPath), where('numeroDocumento', '==', searchTerm));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (collectionName === 'RootCauseAnalysis') {
          const tables = data;
          if (tables && tables['0']) {
            setRootCauseData([tables['0']]);
          }
        } else if (collectionName === 'InmediateActions') {
          setInmediateActionsData(data);
        } else if (collectionName === 'Flash') {
          setFlashData(data);
          if (data.imageLinks) {
            images = data.imageLinks;
          }
        } else {
          forms.push({ ...data, id: doc.id, collectionName });
        }
      });
    }

    setResults(forms);
    setImageLinks(images);
  };

  const handleExportPdf = async () => {
    const doc = new jsPDF('portrait');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Ocultar inputs de carga de logos antes de generar el PDF
    const logoInputs = document.querySelectorAll('.logo-input');
    logoInputs.forEach(input => {
      (input as HTMLInputElement).style.display = 'none';
    });

    const inputElements = document.querySelectorAll(
      `#main-container input:not([type="radio"]):not([type="checkbox"]), #main-container textarea`
    );
    const inputValues: { [key: string]: string } = {};

    inputElements.forEach((input, index) => {
      inputValues[index] = (input as HTMLInputElement).value || (input as HTMLTextAreaElement).value;
      const textNode = document.createElement('span');
      textNode.innerText = inputValues[index];
      textNode.style.whiteSpace = 'pre-wrap';
      textNode.style.display = 'inline-block';
      textNode.style.width = window.getComputedStyle(input).width;
      textNode.classList.add('temp-text');

      // Copiar estilos calculados al nodo de texto
      const computedStyle = window.getComputedStyle(input);
      Object.assign(textNode.style, {
        fontWeight: computedStyle.fontWeight,
        color: computedStyle.color,
        fontSize: computedStyle.fontSize,
        fontFamily: computedStyle.fontFamily,
        backgroundColor: computedStyle.backgroundColor,
        border: computedStyle.border,
        borderRadius: computedStyle.borderRadius,
        padding: computedStyle.padding,
        margin: computedStyle.margin,
        textAlign: computedStyle.textAlign,
      });

      input.replaceWith(textNode);
    });

    const inputContainers = document.querySelectorAll('.temp-text') as NodeListOf<HTMLElement>;

    // Función para añadir páginas al PDF
    const addPageToPdf = async (pageRef: React.RefObject<HTMLDivElement>, isLastPage = false) => {
      if (pageRef.current) {
        const canvas = await html2canvas(pageRef.current, {
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        // Si la imagen lateral está disponible, agregarla al PDF
        if (sideImage) {
          doc.addImage(sideImage, 'PNG', 0, 0, 30, pageHeight); // 30 es el ancho de la imagen en el PDF
        }

        doc.addImage(imgData, 'PNG', 30, 0, width - 30, height); // Desplaza el contenido a la derecha para la imagen lateral
        if (!isLastPage) doc.addPage();
      }
    };

    await addPageToPdf(page1Ref);
    await addPageToPdf(page2Ref);
    await addPageToPdf(page3Ref);
    await addPageToPdf(page4Ref);
    await addPageToPdf(page5Ref);
    await addPageToPdf(page6Ref);
    await addPageToPdf(page7Ref);
    await addPageToPdf(page8Ref);
    await addPageToPdf(page9Ref, true);

    doc.save('report.pdf');

    // Restaurar los elementos originales
    inputContainers.forEach((text, index) => {
      const originalInput = inputElements[index] as HTMLInputElement | HTMLTextAreaElement;
      if (originalInput.tagName.toLowerCase() === 'input') {
        const input = document.createElement('input');
        input.value = inputValues[index];
        input.style.width = text.style.width;
        input.style.display = 'inline-block';
        text.replaceWith(input);
      } else if (originalInput.tagName.toLowerCase() === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.value = inputValues[index];
        textarea.style.width = text.style.width;
        textarea.style.height = text.style.height;
        textarea.style.display = 'inline-block';
        text.replaceWith(textarea);
      }
    });

    // Restaurar la visibilidad de los inputs de carga de logos
    logoInputs.forEach(input => {
      (input as HTMLInputElement).style.display = '';
    });
  };

  // Función para manejar la carga de la imagen lateral
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSideImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      {showAuthModal ? (
        <AuthComponent
          onAuthSuccess={(empresa, usuario) => {
            setSelectedEmpresa(empresa);
            setAuthenticatedUser(usuario);
            setShowAuthModal(false);
          }}
        />
      ) : (
        <div id="main-container" className="relative px-32 py-28 bg-white">
          {/* Input para cargar la imagen lateral */}
          <div className="mb-4">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {/* Lateral Image */}
          {sideImage && (
            <div
              className="absolute top-0 left-0 h-full w-24 bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${sideImage})` }}
            />
          )}

          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Buscar por Número de Documento"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded"
            />
            <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded ml-2">
              Buscar
            </button>
            <button onClick={handleExportPdf} className="p-2 bg-blue-500 text-white rounded ml-2">
              Exportar a PDF
            </button>
          </div>

          {results.length > 0 || rootCauseData.length > 0 || flashData ? (
            <>
              <div ref={page1Ref} className='mx-16'>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <h1 className="text-3xl text-center my-8 font-bold underline">INFORME DE ACCIDENTE/INCIDENTE</h1>
                <CompanyField />
                <TypeAccidentIncidentTable />
                <PersonDetailsTable />
                <DamagedEquipmentTable />
              </div>
              <div ref={page2Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <ThirdPartyIdentificationTable />
                <AccidentDetailsForm data={flashData} />
              </div>
              <div ref={page3Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <RootCauseAnalysis data={rootCauseData} handleChange={() => { }} />
              </div>
              <div ref={page4Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <DescriptionAccidentIncident />
                <ConclusionsForm />
              </div>
              <div ref={page5Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <InmediateActions formData={inmediateActionsData} />
              </div>
              <div ref={page6Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <CourseOfActions formData={results.find(r => r.collectionName === 'CourseOfAction')} />
              </div>
              <div ref={page7Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <CostsTable />
              </div>
              <div ref={page8Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <ImagesDisplay imageUrls={imageLinks} />
              </div>
              <div ref={page9Ref}>
                <LogoUploader
                  leftLogo={leftLogo}
                  rightLogo={rightLogo}
                  setLeftLogo={setLeftLogo}
                  setRightLogo={setRightLogo}
                />
                <InvestigationResponsible />
              </div>
            </>
          ) : (
            <div>No se encontraron resultados para el número de documento ingresado.</div>
          )}
        </div>
      )}
    </>
  );
};

export default MainPage;
