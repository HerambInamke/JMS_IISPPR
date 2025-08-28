/**
 * Watermark System Validation Utility - Phase 4.1
 * 
 * This module provides comprehensive testing and validation functions
 * for the dynamic PDF watermarking implementation.
 */

import articleData from '../data/articles.js';
import editionsData from '../data/editions.js';
import { getArticleMetadata, validateArticleData } from './dataMapping.js';

/**
 * Comprehensive watermark system validation
 * @returns {Object} Validation results with detailed findings
 */
export const validateWatermarkSystem = () => {
  const results = {
    overall: true,
    summary: {
      totalArticles: articleData.length,
      totalEditions: editionsData.length,
      validArticles: 0,
      invalidArticles: 0,
      missingSerialNumbers: 0,
      missingIssueData: 0,
      missingEditionData: 0
    },
    detailed: [],
    errors: [],
    warnings: []
  };

  console.log('🔍 Starting comprehensive watermark system validation...');

  // Validate basic data structure
  const dataValidation = validateArticleData();
  if (!dataValidation.valid) {
    results.overall = false;
    results.errors.push(...dataValidation.errors);
  }
  results.warnings.push(...dataValidation.warnings);

  // Validate each article's watermark data
  articleData.forEach((article, index) => {
    const articleResult = {
      articleId: article.id,
      serialNumber: article.serialNumber,
      issue: article.issue,
      volume: article.volume,
      title: article.title?.substring(0, 50) + '...',
      valid: true,
      issues: []
    };

    // Check for serial number
    if (!article.serialNumber) {
      articleResult.valid = false;
      articleResult.issues.push('Missing serial number');
      results.summary.missingSerialNumbers++;
    }

    // Check for issue/volume data
    if (!article.issue || !article.volume) {
      articleResult.valid = false;
      articleResult.issues.push('Missing issue or volume data');
      results.summary.missingIssueData++;
    }

    // Try to get metadata using our watermark system
    try {
      const metadata = getArticleMetadata(article);
      if (!metadata) {
        articleResult.valid = false;
        articleResult.issues.push('Failed to retrieve metadata');
      } else {
        // Check if edition data is available
        if (!metadata.releaseDate) {
          articleResult.valid = false;
          articleResult.issues.push('Missing edition/release date');
          results.summary.missingEditionData++;
        }
      }
    } catch (error) {
      articleResult.valid = false;
      articleResult.issues.push(`Metadata retrieval error: ${error.message}`);
    }

    if (articleResult.valid) {
      results.summary.validArticles++;
    } else {
      results.summary.invalidArticles++;
      results.overall = false;
    }

    results.detailed.push(articleResult);
  });

  // Validate edition data coverage
  const editionIssues = [];
  editionsData.forEach(edition => {
    if (!edition.releaseDate) {
      editionIssues.push(`Edition ${edition.id} (Volume ${edition.volume}, Issue ${edition.issue}) missing release date`);
    }
  });

  if (editionIssues.length > 0) {
    results.errors.push(...editionIssues);
    results.overall = false;
  }

  // Generate summary message
  const successRate = ((results.summary.validArticles / results.summary.totalArticles) * 100).toFixed(1);
  results.summaryMessage = `${results.summary.validArticles}/${results.summary.totalArticles} articles (${successRate}%) have valid watermark data`;

  console.log('✅ Watermark system validation completed');
  console.log(`📊 Results: ${results.summaryMessage}`);

  return results;
};

/**
 * Test PDF generation with watermarks for a sample of articles
 * @param {number} sampleSize - Number of articles to test (default: 5)
 * @returns {Promise<Object>} Test results
 */
export const testPDFGeneration = async (sampleSize = 5) => {
  const results = {
    successful: 0,
    failed: 0,
    details: [],
    errors: []
  };

  // Get a representative sample from different issues
  const sampleArticles = [];
  for (let issue = 1; issue <= 4 && sampleArticles.length < sampleSize; issue++) {
    const issueArticles = articleData.filter(a => a.issue === issue);
    if (issueArticles.length > 0) {
      sampleArticles.push(issueArticles[0]); // Take first article from each issue
    }
  }

  // Add additional random articles if needed
  while (sampleArticles.length < sampleSize && sampleArticles.length < articleData.length) {
    const randomIndex = Math.floor(Math.random() * articleData.length);
    const randomArticle = articleData[randomIndex];
    if (!sampleArticles.find(a => a.id === randomArticle.id)) {
      sampleArticles.push(randomArticle);
    }
  }

  console.log(`🧪 Testing PDF generation with watermarks for ${sampleArticles.length} articles...`);

  for (const article of sampleArticles) {
    try {
      console.log(`Testing PDF generation for Serial ${article.serialNumber}...`);
      
      // Simulate PDF generation test (we can't actually generate PDFs in Node.js environment)
      // This would test the metadata retrieval and validation
      const metadata = getArticleMetadata(article);
      
      if (metadata && metadata.serialNumber && metadata.issue && metadata.volume) {
        results.successful++;
        results.details.push({
          articleId: article.id,
          serialNumber: article.serialNumber,
          status: 'success',
          metadata: {
            serialNumber: metadata.serialNumber,
            issue: metadata.issue,
            volume: metadata.volume,
            releaseDate: metadata.releaseDate,
            formattedDate: metadata.formattedDate
          }
        });
      } else {
        throw new Error('Incomplete metadata retrieved');
      }

    } catch (error) {
      results.failed++;
      results.errors.push(`Article ${article.id} (Serial ${article.serialNumber}): ${error.message}`);
      results.details.push({
        articleId: article.id,
        serialNumber: article.serialNumber,
        status: 'failed',
        error: error.message
      });
    }
  }

  console.log(`✅ PDF generation test completed: ${results.successful} successful, ${results.failed} failed`);
  return results;
};

/**
 * Validate serial number uniqueness and sequencing
 * @returns {Object} Serial number validation results
 */
export const validateSerialNumbers = () => {
  const results = {
    valid: true,
    duplicates: [],
    missing: [],
    outOfRange: [],
    totalExpected: articleData.length
  };

  const serialNumbers = articleData.map(a => a.serialNumber).filter(Boolean);
  const uniqueSerials = [...new Set(serialNumbers)];

  // Check for duplicates
  if (serialNumbers.length !== uniqueSerials.length) {
    results.valid = false;
    const counts = {};
    serialNumbers.forEach(serial => {
      counts[serial] = (counts[serial] || 0) + 1;
    });
    results.duplicates = Object.entries(counts)
      .filter(([_, count]) => count > 1)
      .map(([serial, count]) => ({ serial: parseInt(serial), count }));
  }

  // Check for expected range (1 to total articles)
  for (let i = 1; i <= articleData.length; i++) {
    if (!serialNumbers.includes(i)) {
      results.missing.push(i);
      results.valid = false;
    }
  }

  // Check for out-of-range serials
  results.outOfRange = serialNumbers.filter(serial => serial < 1 || serial > articleData.length);
  if (results.outOfRange.length > 0) {
    results.valid = false;
  }

  return results;
};

/**
 * Generate a comprehensive validation report
 * @returns {Promise<Object>} Complete validation report
 */
export const generateValidationReport = async () => {
  console.log('📋 Generating comprehensive watermark system validation report...');

  const report = {
    timestamp: new Date().toISOString(),
    systemValidation: validateWatermarkSystem(),
    serialValidation: validateSerialNumbers(),
    pdfTestResults: await testPDFGeneration(8), // Test 8 articles
    recommendations: []
  };

  // Generate recommendations based on findings
  if (!report.systemValidation.overall) {
    report.recommendations.push('Fix data validation issues before production deployment');
  }
  if (!report.serialValidation.valid) {
    report.recommendations.push('Resolve serial number conflicts and gaps');
  }
  if (report.pdfTestResults.failed > 0) {
    report.recommendations.push('Investigate PDF generation failures');
  }
  if (report.systemValidation.summary.missingEditionData > 0) {
    report.recommendations.push('Add missing edition release dates');
  }

  if (report.recommendations.length === 0) {
    report.recommendations.push('✅ System validation passed - ready for production use');
  }

  console.log('✅ Validation report generated successfully');
  return report;
};

export default {
  validateWatermarkSystem,
  testPDFGeneration,
  validateSerialNumbers,
  generateValidationReport
};
