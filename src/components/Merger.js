import { PDFDocument } from 'pdf-lib';
import { renderAsync } from 'docx-preview';
import html2canvas from 'html2canvas';

const convertDocxToImage = async (file) => {
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px'; // Standard A4 width approx
    container.style.backgroundColor = 'white';
    document.body.appendChild(container);

    try {
        const arrayBuffer = await file.arrayBuffer();
        await renderAsync(arrayBuffer, container);

        const canvas = await html2canvas(container, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
            logging: false,
        });

        const imageData = canvas.toDataURL('image/png');
        return imageData;
    } catch (error) {
        console.error('Error converting DOCX:', error);
        throw error;
    } finally {
        document.body.removeChild(container);
    }
};

export const mergeFiles = async (files) => {
    const mergedPdf = await PDFDocument.create();

    for (const fileItem of files) {
        const file = fileItem.file;

        if (file.type === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        } else if (
            file.type.includes('word') ||
            file.type.includes('docx') ||
            file.type.includes('officedocument') ||
            file.name.endsWith('.docx')
        ) {
            try {
                const imageUrl = await convertDocxToImage(file);
                const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
                const image = await mergedPdf.embedPng(imageBytes);

                // A4 size in points: 595.28 x 841.89
                const page = mergedPdf.addPage([595.28, 841.89]);

                // Scale image to fit page while maintaining aspect ratio
                const { width, height } = image.scaleToFit(595.28, 841.89);

                page.drawImage(image, {
                    x: (595.28 - width) / 2,
                    y: (841.89 - height) / 2,
                    width,
                    height,
                });
            } catch (e) {
                console.error("Failed to process DOCX", e);
            }
        } else if (file.type.startsWith('image/')) {
            const arrayBuffer = await file.arrayBuffer();
            let image;

            if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                image = await mergedPdf.embedJpg(arrayBuffer);
            } else if (file.type === 'image/png') {
                image = await mergedPdf.embedPng(arrayBuffer);
            }

            if (image) {
                const page = mergedPdf.addPage([image.width, image.height]);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                });
            }
        }
    }

    const pdfBytes = await mergedPdf.save();
    return pdfBytes;
};
