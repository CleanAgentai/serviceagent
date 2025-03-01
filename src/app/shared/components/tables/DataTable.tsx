import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';

export interface DataTableColumn {
  key: string;
  header: string;
  format?: (value: any) => string | React.ReactNode;
}

export interface DataTableProps {
  data: Record<string, any>[];
  columns: DataTableColumn[];
  title?: string;
  pageSize?: number;
  exportFilename?: string;
  className?: string;
}

/**
 * Reusable DataTable component with pagination and export functionality
 */
export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title = 'Data',
  pageSize = 10,
  exportFilename = 'export',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const currentData = data.slice(startIndex, endIndex);

  // Handle pagination
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    // Create CSV header row
    const headers = columns.map(col => `"${col.header}"`).join(',');
    
    // Create CSV data rows
    const csvRows = data.map(row => {
      return columns.map(col => {
        const value = row[col.key];
        // Handle strings with commas by wrapping in quotes
        return typeof value === 'string' ? `"${value}"` : value;
      }).join(',');
    });
    
    // Combine header and rows
    const csvContent = [headers, ...csvRows].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${exportFilename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF (simplified - in a real app, you'd use a library like jsPDF)
  const exportToPDF = () => {
    alert('PDF export would be implemented with a library like jsPDF');
    // In a real implementation, you would:
    // 1. Use jsPDF or similar library
    // 2. Format the data into a PDF
    // 3. Trigger the download
  };

  if (!isExpanded) {
    return (
      <div className={`mt-4 ${className}`}>
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <ChevronDown className="h-4 w-4 mr-1" />
          Expand Raw Data
        </button>
      </div>
    );
  }

  return (
    <div className={`mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-500 hover:text-gray-700 mr-2"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={exportToCSV}
            className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
            title="Export as CSV"
          >
            <FileText className="h-4 w-4 mr-1" />
            CSV
          </button>
          <button
            onClick={exportToPDF}
            className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
            title="Export as PDF"
          >
            <Download className="h-4 w-4 mr-1" />
            PDF
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {column.format ? column.format(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  // Show pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 