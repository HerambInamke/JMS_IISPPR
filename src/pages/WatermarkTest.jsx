import { useState } from 'react';
import { Download, CheckCircle, AlertCircle, Play, FileText } from 'lucide-react';
import { generateArticlePDF, downloadPDF } from '../utils/pdfExport';
import { validateWatermarkSystem, validateSerialNumbers, testPDFGeneration } from '../utils/watermarkValidation';
import articleData from '../data/articles';

/**
 * Watermark Test Component - Phase 3.1
 * 
 * This component tests the dynamic watermark functionality
 * and provides verification that watermarks are being applied correctly.
 */
const WatermarkTest = () => {
  const [testResults, setTestResults] = useState([]);
  const [validationResults, setValidationResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Test with first few articles from different issues
  const testArticles = [
    articleData.find(a => a.issue === 1 && a.volume === 1 && a.serialNumber === 1),
    articleData.find(a => a.issue === 2 && a.volume === 1 && a.serialNumber === 11),
    articleData.find(a => a.issue === 3 && a.volume === 1 && a.serialNumber === 21),
    articleData.find(a => a.issue === 4 && a.volume === 1 && a.serialNumber === 31),
  ].filter(Boolean);

  const runWatermarkTest = async (article) => {
    try {
      console.log('Testing watermark for article:', {
        id: article.id,
        serialNumber: article.serialNumber,
        issue: article.issue,
        volume: article.volume,
        title: article.title.substring(0, 50) + '...'
      });

      const pdf = await generateArticlePDF(article);
      
      const sanitizedTitle = article.title
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_")
        .substring(0, 30);

      const filename = `TEST_Watermark_${article.serialNumber}_${sanitizedTitle}.pdf`;
      downloadPDF(pdf, filename);

      return {
        success: true,
        message: `✅ Successfully generated PDF with watermarks for Serial ${article.serialNumber}`,
        details: {
          serialNumber: article.serialNumber,
          issue: article.issue,
          volume: article.volume,
          filename
        }
      };
    } catch (error) {
      console.error('Test failed for article:', article.id, error);
      return {
        success: false,
        message: `❌ Failed to generate PDF for Serial ${article.serialNumber}`,
        error: error.message,
        details: {
          serialNumber: article.serialNumber,
          issue: article.issue,
          volume: article.volume
        }
      };
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    for (const article of testArticles) {
      const result = await runWatermarkTest(article);
      setTestResults(prev => [...prev, result]);
      
      // Add small delay between downloads
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsRunning(false);
  };

  const runSingleTest = async (article) => {
    setIsRunning(true);
    const result = await runWatermarkTest(article);
    setTestResults(prev => [...prev, result]);
    setIsRunning(false);
  };

  const runSystemValidation = async () => {
    setIsValidating(true);
    try {
      console.log('🔍 Running comprehensive system validation...');

      const systemValidation = validateWatermarkSystem();
      const serialValidation = validateSerialNumbers();
      const pdfTestResults = await testPDFGeneration(6);

      const results = {
        timestamp: new Date().toISOString(),
        systemValidation,
        serialValidation,
        pdfTestResults,
        overallStatus: systemValidation.overall && serialValidation.valid && pdfTestResults.failed === 0
      };

      setValidationResults(results);
      console.log('✅ System validation completed:', results);

    } catch (error) {
      console.error('❌ Validation failed:', error);
      setValidationResults({
        error: error.message,
        overallStatus: false
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            🔖 Watermark Testing Suite
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This page tests the dynamic PDF watermarking functionality. 
            Each test downloads a PDF with watermarks including: Serial Number (top-left), 
            Issue/Volume info (top-right), and Publication Date (below issue info).
          </p>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          
          <div className="flex gap-4 mb-4">
            <button
              onClick={runAllTests}
              disabled={isRunning || isValidating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Download size={16} />
              {isRunning ? 'Running Tests...' : 'Test All Watermarks'}
            </button>

            <button
              onClick={runSystemValidation}
              disabled={isRunning || isValidating}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              <Play size={16} />
              {isValidating ? 'Validating...' : 'Run System Validation'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testArticles.map((article) => (
              <div key={article.id} className="border rounded p-3">
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Serial {article.serialNumber}</strong> | Issue {article.issue}, Volume {article.volume}
                </div>
                <div className="text-sm font-medium mb-2">
                  {article.title.substring(0, 60)}...
                </div>
                <button
                  onClick={() => runSingleTest(article)}
                  disabled={isRunning || isValidating}
                  className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  Test This Article
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System Validation Results */}
        {validationResults && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} />
              System Validation Results
            </h2>
            
            <div className={`p-4 rounded-lg border-l-4 mb-4 ${
              validationResults.overallStatus ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {validationResults.overallStatus ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <AlertCircle className="text-red-600" size={20} />
                )}
                <span className="font-medium">
                  Overall System Status: {validationResults.overallStatus ? 'PASSED' : 'FAILED'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Validated at: {new Date(validationResults.timestamp).toLocaleString()}
              </div>
            </div>

            {/* Detailed Results */}
            {validationResults.systemValidation && (
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-medium text-blue-800 mb-2">Article Data</h4>
                  <div className="text-sm text-blue-700">
                    <div>Total Articles: {validationResults.systemValidation.summary.totalArticles}</div>
                    <div>Valid: {validationResults.systemValidation.summary.validArticles}</div>
                    <div>Invalid: {validationResults.systemValidation.summary.invalidArticles}</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded">
                  <h4 className="font-medium text-purple-800 mb-2">Serial Numbers</h4>
                  <div className="text-sm text-purple-700">
                    <div>Status: {validationResults.serialValidation.valid ? '✅ Valid' : '❌ Issues Found'}</div>
                    {validationResults.serialValidation.duplicates.length > 0 && (
                      <div>Duplicates: {validationResults.serialValidation.duplicates.length}</div>
                    )}
                    {validationResults.serialValidation.missing.length > 0 && (
                      <div>Missing: {validationResults.serialValidation.missing.length}</div>
                    )}
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded">
                  <h4 className="font-medium text-orange-800 mb-2">PDF Generation</h4>
                  <div className="text-sm text-orange-700">
                    <div>Successful: {validationResults.pdfTestResults.successful}</div>
                    <div>Failed: {validationResults.pdfTestResults.failed}</div>
                    <div>Success Rate: {
                      ((validationResults.pdfTestResults.successful / 
                        (validationResults.pdfTestResults.successful + validationResults.pdfTestResults.failed)) * 100).toFixed(1)
                    }%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Errors and Warnings */}
            {validationResults.systemValidation?.errors?.length > 0 && (
              <div className="bg-red-50 p-3 rounded mb-3">
                <h5 className="font-medium text-red-800 mb-2">❌ Errors Found:</h5>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {validationResults.systemValidation.errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {validationResults.systemValidation?.warnings?.length > 0 && (
              <div className="bg-yellow-50 p-3 rounded">
                <h5 className="font-medium text-yellow-800 mb-2">⚠️ Warnings:</h5>
                <ul className="text-sm text-yellow-700 list-disc list-inside">
                  {validationResults.systemValidation.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            
            <div className="space-y-3">
              {testResults.map((result) => (
                <div 
                  key={`${result.details?.serialNumber || 'unknown'}-${Date.now()}`} 
                  className={`p-4 rounded-lg border-l-4 ${
                    result.success ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {result.success ? (
                      <CheckCircle className="text-green-600 mt-1" size={20} />
                    ) : (
                      <AlertCircle className="text-red-600 mt-1" size={20} />
                    )}
                    <div className="flex-1">
                      <div className="font-medium">{result.message}</div>
                      {result.details && (
                        <div className="text-sm text-gray-600 mt-2">
                          Serial: {result.details.serialNumber} | 
                          Issue: {result.details.issue} | 
                          Volume: {result.details.volume}
                          {result.details.filename && (
                            <span className="block">File: {result.details.filename}</span>
                          )}
                        </div>
                      )}
                      {result.error && (
                        <div className="text-sm text-red-600 mt-2">
                          Error: {result.error}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expected Watermark Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Expected Watermark Layout</h2>
          <div className="bg-gray-50 p-4 rounded">
            <div className="font-mono text-sm">
              <div className="mb-2">📄 PDF Page Header:</div>
              <div className="ml-4 space-y-1">
                <div>🔢 <strong>Top-Left:</strong> "Serial X" (where X is the article's serial number)</div>
                <div>📊 <strong>Top-Right:</strong> "Issue X: Volume Y" (where X,Y are article's issue/volume)</div>
                <div>📅 <strong>Below Issue Info:</strong> "Published: [Date]" (formatted publication date)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatermarkTest;
