import { useState } from 'react';
import { Info, X } from 'lucide-react';

/**
 * WatermarkInfo Component - Phase 3.2
 * 
 * Provides user information about the PDF watermarking functionality
 */
const WatermarkInfo = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleInfo = () => setIsVisible(!isVisible);

  return (
    <div className={`relative ${className}`}>
      {/* Info Button */}
      <button
        onClick={toggleInfo}
        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
        title="Learn about PDF watermarks"
      >
        <Info size={14} />
        <span>PDF Watermarks</span>
      </button>

      {/* Info Modal/Popup */}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={toggleInfo}>
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                 PDF Watermarks
              </h3>
              <button
                onClick={toggleInfo}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                All downloaded PDFs now include <strong>dynamic watermarks</strong> for proper identification and authenticity:
              </p>
              
              <div className="bg-yellow-800 p-3 rounded">
                <h4 className="font-medium text-gray-800 mb-2">Watermark Components:</h4>
                <ul className="space-y-1">
                  <li><strong>Serial Number</strong> - Top-left corner </li>
                  <li><strong>Issue/Volume</strong> - Top-right corner </li>
                  <li><strong>Publication Date</strong> - Below issue info </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <h4 className="font-medium text-blue-800 mb-1">Benefits:</h4>
                <ul className="text-blue-700 text-xs space-y-1">
                  <li>• Prevents document forgery and misattribution</li>
                  <li>• Enables easy identification of article versions</li>
                  <li>• Maintains academic integrity standards</li>
                  <li>• Provides clear publication tracking</li>
                </ul>
              </div>

              <p className="text-xs text-gray-500">
                Watermarks are automatically generated based on article metadata and do not affect content readability.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleInfo}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatermarkInfo;
