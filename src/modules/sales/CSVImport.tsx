import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, AlertCircle, Check, ArrowRight } from 'lucide-react';
import { CSVMapping, LeadFormData } from '@/types/leads';

interface CSVImportProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (leads: LeadFormData[]) => void;
}

export const CSVImport: React.FC<CSVImportProps> = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<CSVMapping>({});
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview'>('upload');
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<LeadFormData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const leadFields: Array<{ key: keyof LeadFormData; label: string }> = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company' },
    { key: 'source', label: 'Source' },
    { key: 'notes', label: 'Notes' },
  ];

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  const resetState = () => {
    setFile(null);
    setCsvData([]);
    setHeaders([]);
    setMapping({});
    setStep('upload');
    setError(null);
    setPreviewData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }
    
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }
    
    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = parseCSV(text);
        
        if (rows.length < 2) {
          setError('CSV file must contain headers and at least one data row');
          return;
        }
        
        const csvHeaders = rows[0];
        setCsvData(rows.slice(1));
        setHeaders(csvHeaders);
        
        // Initialize mapping with best guesses based on header names
        const initialMapping: CSVMapping = {};
        csvHeaders.forEach(header => {
          const lowerHeader = header.toLowerCase();
          
          if (lowerHeader.includes('name')) {
            initialMapping[header] = 'name';
          } else if (lowerHeader.includes('email')) {
            initialMapping[header] = 'email';
          } else if (lowerHeader.includes('phone')) {
            initialMapping[header] = 'phone';
          } else if (lowerHeader.includes('company')) {
            initialMapping[header] = 'company';
          } else if (lowerHeader.includes('source')) {
            initialMapping[header] = 'source';
          } else if (lowerHeader.includes('note')) {
            initialMapping[header] = 'notes';
          } else {
            initialMapping[header] = null;
          }
        });
        
        setMapping(initialMapping);
        setStep('mapping');
      } catch (err) {
        setError('Failed to parse CSV file. Please check the format.');
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read the file');
    };
    
    reader.readAsText(selectedFile);
  };

  const parseCSV = (text: string): string[][] => {
    // Simple CSV parser - handles quoted fields and commas within quotes
    const rows: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let currentField = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Handle escaped quotes (double quotes)
          currentField += '"';
          i++; // Skip the next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        row.push(currentField);
        currentField = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        // End of line
        if (currentField !== '' || row.length > 0) {
          row.push(currentField);
          rows.push(row);
          row = [];
          currentField = '';
        }
        
        // Skip the \n if we just processed \r\n
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        currentField += char;
      }
    }
    
    // Add the last field and row if there's any
    if (currentField !== '' || row.length > 0) {
      row.push(currentField);
      rows.push(row);
    }
    
    return rows;
  };

  const handleMappingChange = (header: string, value: keyof LeadFormData | null) => {
    setMapping(prev => ({
      ...prev,
      [header]: value
    }));
  };

  const validateMapping = (): boolean => {
    // Check if required fields are mapped
    const hasNameMapping = Object.values(mapping).includes('name');
    const hasEmailMapping = Object.values(mapping).includes('email');
    
    if (!hasNameMapping || !hasEmailMapping) {
      setError('Name and Email fields must be mapped');
      return false;
    }
    
    setError(null);
    return true;
  };

  const generatePreview = () => {
    if (!validateMapping()) {
      return;
    }
    
    try {
      const preview: LeadFormData[] = csvData.slice(0, 5).map(row => {
        const lead: Partial<LeadFormData> = {
          tags: []
        };
        
        headers.forEach((header, index) => {
          const fieldMapping = mapping[header];
          if (fieldMapping) {
            (lead[fieldMapping] as any) = row[index] || '';
          }
        });
        
        // Validate required fields
        if (!lead.name || !lead.email) {
          throw new Error('Some rows are missing required fields (name or email)');
        }
        
        return lead as LeadFormData;
      });
      
      setPreviewData(preview);
      setStep('preview');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleImport = () => {
    try {
      const importedLeads: LeadFormData[] = csvData.map((row, rowIndex) => {
        const lead: Partial<LeadFormData> = {
          tags: []
        };
        
        headers.forEach((header, index) => {
          const fieldMapping = mapping[header];
          if (fieldMapping) {
            (lead[fieldMapping] as any) = row[index] || '';
          }
        });
        
        // Validate required fields
        if (!lead.name || !lead.email) {
          throw new Error(`Row ${rowIndex + 2} is missing required fields (name or email)`);
        }
        
        return lead as LeadFormData;
      });
      
      onImport(importedLeads);
      onClose();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Import Leads from CSV</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          {/* Steps indicator */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 'upload' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step === 'upload' ? 'bg-gray-200' : 'bg-blue-600'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 'mapping' ? 'bg-blue-600 text-white' : step === 'preview' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              step === 'preview' ? 'bg-blue-600' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Your CSV should include columns for lead information (name, email, etc.)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-file-input"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Select CSV File
                </button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <h3 className="text-sm font-medium text-blue-800 mb-1">CSV Format Tips</h3>
                <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                  <li>Include headers in the first row</li>
                  <li>Required fields: Name, Email</li>
                  <li>Optional fields: Phone, Company, Source, Notes</li>
                  <li>Make sure your CSV is properly formatted</li>
                </ul>
              </div>
            </div>
          )}
          
          {step === 'mapping' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">
                Map your CSV columns to lead fields. Required fields are marked with an asterisk (*).
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CSV Column
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sample Data
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Map To Field
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {headers.map((header, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {header}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {csvData[0]?.[index] || ''}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value={mapping[header] || ''}
                            onChange={(e) => handleMappingChange(
                              header, 
                              e.target.value ? e.target.value as keyof LeadFormData : null
                            )}
                            className="block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="">Do not import</option>
                            {leadFields.map((field) => (
                              <option 
                                key={field.key} 
                                value={field.key}
                                disabled={Object.values(mapping).includes(field.key) && mapping[header] !== field.key}
                              >
                                {field.label}{field.key === 'name' || field.key === 'email' ? ' *' : ''}
                                {Object.values(mapping).includes(field.key) && mapping[header] !== field.key ? ' (already mapped)' : ''}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>Name and Email fields are required. Make sure to map these fields correctly.</span>
                </p>
              </div>
            </div>
          )}
          
          {step === 'preview' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-2">
                Preview of the first {Math.min(previewData.length, 5)} leads to be imported. 
                Total: {csvData.length} leads will be imported.
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.values(mapping).filter(Boolean).map((field) => (
                        <th 
                          key={field} 
                          scope="col" 
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {previewData.map((lead, index) => (
                      <tr key={index}>
                        {Object.values(mapping).filter(Boolean).map((field) => (
                          <td key={field} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {lead[field as keyof LeadFormData]?.toString() || '-'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <p className="text-sm text-green-800">
                  Your data looks good! Click "Import Leads" to add these leads to your system.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          {step !== 'upload' ? (
            <button
              onClick={() => setStep(step === 'preview' ? 'mapping' : 'upload')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step === 'upload' && file && (
            <button
              onClick={() => setStep('mapping')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              Continue to Mapping <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
          
          {step === 'mapping' && (
            <button
              onClick={generatePreview}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              Preview Data <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
          
          {step === 'preview' && (
            <button
              onClick={handleImport}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Import {csvData.length} Leads
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVImport; 