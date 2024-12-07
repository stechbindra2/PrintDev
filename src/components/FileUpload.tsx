import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Plus, X, FileText, Image as ImageIcon } from 'lucide-react';
import { FilePreview } from './FilePreview';
import { PrintSettings } from './PrintSettings';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILES = 15;

interface UploadedFile extends File {
  preview?: string;
  id: string;
}

export function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(7)
      })
    );
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: MAX_FILES - files.length,
    maxSize: MAX_FILE_SIZE,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Printout preview</h1>
        <button
          {...getRootProps()}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add files
          <input {...getInputProps()} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {files.map((file) => (
            <div key={file.id} className="relative">
              <FilePreview file={file} />
              <button
                onClick={() => removeFile(file.id)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="mt-2 text-sm text-gray-600">
                File {files.indexOf(file) + 1} ({file.name}) • {file.type.includes('pdf') ? '1 page' : 'Image'}
              </div>
            </div>
          ))}

          {files.length === 0 && (
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400"
            >
              <input {...getInputProps()} />
              <Plus className="w-8 h-8 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Click to upload or drag and drop files here</p>
              <p className="text-sm text-gray-500 mt-2">PDF, DOCX, JPG, PNG (max 50MB)</p>
            </div>
          )}
        </div>

        {files.length > 0 && (
          <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-700">
                We will delete your files once delivered
              </p>
            </div>
            <PrintSettings files={files} />
          </div>
        )}
      </div>
    </div>
  );
}