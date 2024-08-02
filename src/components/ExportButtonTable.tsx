// components/ExportButton.tsx
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  tableId: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ tableId }) => {
  const exportToPdf = async () => {
    // Seleccionar todos los elementos input y textarea
    const inputElements = document.querySelectorAll(`#${tableId} input, #${tableId} textarea`);
    const inputValues: { [key: string]: string } = {};

    // Guardar los valores de los inputs y reemplazarlos por nodos de texto
    inputElements.forEach((input, index) => {
      inputValues[index] = (input as HTMLInputElement).value || (input as HTMLTextAreaElement).value;
      const textNode = document.createElement('span');
      textNode.innerText = (input as HTMLInputElement).value || (input as HTMLTextAreaElement).value;
      textNode.style.whiteSpace = 'pre-wrap'; // Mantener los saltos de línea
      textNode.style.display = 'inline-block';
      textNode.style.width = window.getComputedStyle(input).width;
      textNode.classList.add('temp-text');
      input.replaceWith(textNode);
    });

    const inputContainers = document.querySelectorAll('.temp-text') as NodeListOf<HTMLElement>;

    inputContainers.forEach((text, index) => {
      const textStyle = (text as HTMLElement).style;
      const inputStyle = window.getComputedStyle(inputElements[index] as HTMLElement);

      Object.assign(textStyle, {
        ...inputStyle,
        display: 'inline-block',
        width: inputStyle.width,
      });
    });

    const input = document.getElementById(tableId) as HTMLDivElement;
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('table.pdf');
    }

    // Revertir los nodos de texto a los inputs originales
    inputContainers.forEach((text, index) => {
      const originalInput = inputElements[index] as HTMLInputElement | HTMLTextAreaElement;
      if (originalInput.tagName.toLowerCase() === 'input') {
        const input = document.createElement('input');
        input.value = inputValues[index];
        input.style.width = (text as HTMLElement).style.width;
        input.style.display = 'inline-block';
        text.replaceWith(input);
      } else if (originalInput.tagName.toLowerCase() === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.value = inputValues[index];
        textarea.style.width = (text as HTMLElement).style.width;
        textarea.style.height = (text as HTMLElement).style.height;
        textarea.style.display = 'inline-block';
        text.replaceWith(textarea);
      }
    });
  };

  return (
    <button onClick={exportToPdf} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
      Export to PDF
    </button>
  );
};

export default ExportButton;
