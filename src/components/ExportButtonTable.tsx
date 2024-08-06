// components/ExportButton.tsx
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  tableId: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ tableId }) => {
  const exportToPdf = async () => {
    // Reemplazar inputs y textareas con spans temporales
    const inputElements = document.querySelectorAll(`#${tableId} input, #${tableId} textarea`);
    const inputValues: { [key: string]: string } = {};

    inputElements.forEach((input, index) => {
      inputValues[index] = (input as HTMLInputElement).value || (input as HTMLTextAreaElement).value;
      const textNode = document.createElement('span');
      textNode.innerText = (input as HTMLInputElement).value || (input as HTMLTextAreaElement).value;
      textNode.style.whiteSpace = 'pre-wrap';

      // Copiar estilos relevantes del input/textarea al span
      const inputStyle = window.getComputedStyle(input as HTMLElement);
      textNode.style.cssText = inputStyle.cssText;
      textNode.style.width = inputStyle.width;
      textNode.style.height = inputStyle.height; // Asegurar que se respete la altura
      textNode.style.overflow = 'hidden'; // Manejar overflow
      textNode.style.display = 'inline-block';

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

    // Restaurar inputs y textareas originales
    document.querySelectorAll('.temp-text').forEach((text, index) => {
      const originalInput = inputElements[index] as HTMLInputElement | HTMLTextAreaElement;
      if (originalInput.tagName.toLowerCase() === 'input') {
        const input = document.createElement('input');
        input.value = inputValues[index];
        input.style.width = (text as HTMLElement).style.width;
        text.replaceWith(input);
      } else if (originalInput.tagName.toLowerCase() === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.value = inputValues[index];
        textarea.style.width = (text as HTMLElement).style.width;
        textarea.style.height = (text as HTMLElement).style.height;
        text.replaceWith(textarea);
      }
    });
  };

  return (
    <button onClick={exportToPdf} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
      Exportar a PDF
    </button>
  );
};

export default ExportButton;

