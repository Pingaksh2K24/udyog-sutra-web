import { FaFileExcel, FaFilePdf } from 'react-icons/fa';
import './ReportButtons.css';

export default function ReportButtons({ onExcelClick, onPdfClick, excelText = "Excel Report", pdfText = "PDF Report" }) {
  return (
    <div className="report-buttons">
      <button className="excel-btn" onClick={onExcelClick}>
        <FaFileExcel size={16} />
        {excelText}
      </button>
      <button className="pdf-btn" onClick={onPdfClick}>
        <FaFilePdf size={16} />
        {pdfText}
      </button>
    </div>
  );
}