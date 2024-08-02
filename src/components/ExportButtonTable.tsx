// components/ExportButton.tsx
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  tableId: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ tableId }) => {
  const exportToPdf = async () => {
    const inputElements = document.querySelectorAll('input');
    const inputValues: { [key: string]: string } = {};

    // Save the input values and replace them with text nodes
    inputElements.forEach((input, index) => {
      inputValues[index] = (input as HTMLInputElement).value;
      const textNode = document.createElement('span');
      textNode.innerText = (input as HTMLInputElement).value;
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

    const input = document.getElementById(tableId) as HTMLTableElement;
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

    // Replace the text nodes with the original inputs
    inputContainers.forEach((text, index) => {
      const input = document.createElement('input');
      input.value = inputValues[index];
      input.style.width = (text as HTMLElement).style.width;
      input.style.display = 'inline-block';
      text.replaceWith(input);
    });
  };

  return (
    <button onClick={exportToPdf} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
      Export to PDF
    </button>
  );
};

export default ExportButton;
