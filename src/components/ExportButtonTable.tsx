// components/ExportButton.tsx
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  tableId: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ tableId }) => {
  const exportToPdf = async () => {
    // Reemplazar textareas con spans temporales
    const inputElements = document.querySelectorAll(`#${tableId} textarea`);
    const inputValues: { [key: string]: string } = {};

    inputElements.forEach((input, index) => {
      inputValues[index] = (input as HTMLTextAreaElement).value;

      const textNode = document.createElement('span');
      textNode.innerText = inputValues[index];
      textNode.style.whiteSpace = 'pre-wrap'; // Mantener saltos de línea y espacios en blanco
      textNode.style.display = 'block'; // Asegurar que el texto se muestre en bloque completo

      // Copiar estilos relevantes del textarea al span
      const inputStyle = window.getComputedStyle(input as HTMLElement);
      textNode.style.cssText = inputStyle.cssText;
      textNode.style.width = inputStyle.width; // Ajustar el ancho al tamaño de la celda
      textNode.style.height = 'auto'; // Ajustar la altura según el contenido
      textNode.style.overflow = 'hidden'; // Asegurar que no se salga del contenedor
      textNode.style.wordWrap = 'break-word'; // Ajustar el texto para que no se desborde horizontalmente
      textNode.classList.add('temp-text');
      input.replaceWith(textNode);
    });

    // Capturar la tabla con html2canvas
    const input = document.getElementById(tableId) as HTMLDivElement;
    if (input) {
      const canvas = await html2canvas(input, {
        scale: 2, // Aumentar la resolución
        useCORS: true,
        logging: true, // Activar logs para depuración
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('table.pdf');
    }

    // Restaurar los textareas originales
    document.querySelectorAll('.temp-text').forEach((text, index) => {
      const textarea = document.createElement('textarea');
      textarea.value = inputValues[index];
      text.replaceWith(textarea);
    });
  };

  return (
    <button onClick={exportToPdf} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
      Exportar a PDF
    </button>
  );
};

export default ExportButton;

