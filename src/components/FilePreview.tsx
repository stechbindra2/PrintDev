import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface FilePreviewProps {
  file: File & { preview?: string };
}

export function FilePreview({ file }: FilePreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (file.type.includes('image')) {
    return (
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={file.preview}
          alt={file.name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (file.type === 'application/pdf') {
    return (
      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        >
          <Page
            pageNumber={1}
            width={300}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    );
  }

  return (
    <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
      <p className="text-gray-500">Preview not available</p>
    </div>
  );
}