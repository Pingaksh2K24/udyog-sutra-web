import { useState } from 'react';
import './Table.css';

export default function Table({ 
  data = [], 
  columns = [], 
  paginationFlag = true, 
  recordsPerPage = 10 
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = paginationFlag ? data.slice(startIndex, endIndex) : data;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const gridColumns = columns.map(col => col.width || '1fr').join(' ');

  return (
    <div className="table-container">
      <div className="table">
        <div className="table-header" style={{gridTemplateColumns: gridColumns}}>
          {columns.map((column, index) => (
            <span key={index} className="table-header-cell">
              {column.header}
            </span>
          ))}
        </div>
        
        {currentData.map((row, rowIndex) => (
          <div key={rowIndex} className="table-row" style={{gridTemplateColumns: gridColumns}}>
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="table-cell">
                {column.render ? column.render(row) : row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>

      {paginationFlag && totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => goToPage(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={() => goToPage(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}