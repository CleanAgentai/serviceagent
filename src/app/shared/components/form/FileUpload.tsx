import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { FormField } from './FormField';
import { Upload, File, X, Check } from 'lucide-react';

export interface FileUploadProps {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxFileSize?: number; // in bytes
  maxFiles?: number;
  className?: string;
  containerClassName?: string;
  dropzoneClassName?: string;
  value?: File | File[];
  onChange?: (files: File | File[] | null) => void;
  onError?: (error: string) => void;
}

/**
 * FileUpload component with drag and drop support
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  helperText,
  error,
  success = false,
  required = false,
  disabled = false,
  multiple = false,
  accept,
  maxFileSize,
  maxFiles = 5,
  className = '',
  containerClassName = '',
  dropzoneClassName = '',
  value,
  onChange,
  onError,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>(
    value ? (Array.isArray(value) ? value : [value]) : []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Validate files
  const validateFiles = (fileList: FileList | File[]): File[] => {
    const validFiles: File[] = [];
    const currentFiles = files.length;
    
    // Create array from FileList
    const newFiles = Array.from(fileList);
    
    // Check max files limit
    if (!multiple && newFiles.length > 0) {
      // If not multiple, just take the first file
      newFiles.splice(1);
    } else if (currentFiles + newFiles.length > maxFiles) {
      onError?.(`You can upload a maximum of ${maxFiles} files`);
      newFiles.splice(0, maxFiles - currentFiles);
    }
    
    // Validate each file
    for (const file of newFiles) {
      // Check file type if accept is specified
      if (accept) {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const fileType = file.type;
        
        // Check if the file type is accepted
        const isAccepted = acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            // Check file extension
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          } else if (type.includes('*')) {
            // Handle wildcards like 'image/*'
            return fileType.startsWith(type.split('/')[0]);
          } else {
            // Exact match
            return fileType === type;
          }
        });
        
        if (!isAccepted) {
          onError?.(`File type not accepted: ${file.name}`);
          continue;
        }
      }
      
      // Check file size if maxFileSize is specified
      if (maxFileSize && file.size > maxFileSize) {
        onError?.(`File too large: ${file.name} (${formatFileSize(file.size)})`);
        continue;
      }
      
      validFiles.push(file);
    }
    
    return validFiles;
  };

  // Handle file changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      
      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(newFiles);
        onChange?.(multiple ? newFiles : newFiles[0]);
      }
    }
    
    // Reset the input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle drag events
  const handleDrag = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      
      if (validFiles.length > 0) {
        const newFiles = multiple ? [...files, ...validFiles] : validFiles;
        setFiles(newFiles);
        onChange?.(multiple ? newFiles : newFiles[0]);
      }
    }
  };

  // Remove a file
  const removeFile = (indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onChange?.(multiple ? newFiles : newFiles.length > 0 ? newFiles[0] : null);
  };

  // Trigger file input click
  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <FormField
      id={id}
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      className={containerClassName}
      success={success && !error}
      disabled={disabled}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id={id}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
        required={required && files.length === 0}
        aria-hidden="true"
      />
      
      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          border-2 border-dashed rounded-md p-6
          transition-colors duration-200 ease-in-out
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500 bg-red-50' : ''}
          ${success && !error ? 'border-green-500 bg-green-50' : ''}
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
          ${className}
          ${dropzoneClassName}
        `}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Upload 
            className={`mb-2 h-10 w-10 ${error ? 'text-red-500' : dragActive ? 'text-blue-500' : 'text-gray-400'}`} 
          />
          <p className="text-sm font-medium text-gray-700">
            {dragActive ? 'Drop files here' : 'Drag and drop files here or click to browse'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {multiple 
              ? `Upload up to ${maxFiles} file${maxFiles !== 1 ? 's' : ''}` 
              : 'Upload a file'}
            {accept && ` (${accept.replace(/,/g, ', ')})`}
            {maxFileSize && ` up to ${formatFileSize(maxFileSize)}`}
          </p>
        </div>
      </div>
      
      {/* File List */}
      {files.length > 0 && (
        <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md">
          {files.map((file, index) => (
            <li 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between py-2 px-3 text-sm"
            >
              <div className="flex items-center">
                <File className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium truncate max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>
              
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </FormField>
  );
}; 