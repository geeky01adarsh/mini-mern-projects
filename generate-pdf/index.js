const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

const createPDF = async (filename) => {
    const pdfDoc = await PDFDocument.create();

    const pageWidth = 595;
    const pageHeight = 842;

    const page = pdfDoc.addPage([pageWidth, pageHeight]);


    const fontSize = 20;
    const x = pageWidth / 2;
    const y = pageHeight / 2;
    const text = "Hello, World!";

    const textWidth = fontSize * text.length;
    const textX = x - textWidth / 2;

    page.drawText(text, {
        x: textX,
        y,
        size: fontSize,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filename, pdfBytes);
};

createPDF("index.pdf");
