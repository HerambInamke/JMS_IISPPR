/**
 * PDF Watermark Utility Functions
 * Created for Dynamic PDF Watermarking Implementation - Phase 2.1
 * 
 * This module provides reusable watermark functions for PDF generation
 */

import { getArticleMetadata } from './dataMapping.js';

/**
 * Watermark configuration constants
 */
export const WATERMARK_CONFIG = {
  topLeft: {
  x: 20,   // keep near left margin
  y: 80,  // moved down below author section (adjust as needed)
  fontSize: 10,
  color: [100, 100, 100], // Yellow
  fontWeight: 'bold'
},
topRight: {
  x: null, // align with right side
  y: 80,  // same vertical position as topLeft
  fontSize: 10,
  color: [100, 100, 100], // Yellow
  fontWeight: 'bold'
},
datePosition: {
  x: null, // align with right side (below Issue/Volume)
  y: 90,  // a bit below the issue/volume
  fontSize: 10,
  color: [100, 100, 100], // softer gray
  fontWeight: 'normal'
}

};

/**
 * Calculate dynamic X position for right-aligned watermarks
 * @param {Object} pdf - jsPDF instance
 * @param {string} text - Text to be positioned
 * @param {number} rightMargin - Margin from right edge (default: 20mm)
 * @returns {number} X position for right alignment
 */
export const calculateRightAlignedX = (pdf, text, rightMargin = 20) => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const textWidth = pdf.getTextWidth(text);
  return pageWidth - textWidth - rightMargin;
};

/**
 * Add serial number watermark to PDF (top-left)
 * @param {Object} pdf - jsPDF instance
 * @param {number} serialNumber - Article serial number
 */
export const addSerialWatermark = (pdf, serialNumber) => {
  if (!serialNumber) {
    console.warn('Serial number not provided for watermark');
    return;
  }

  const config = WATERMARK_CONFIG.topLeft;
  const text = `Serial ${serialNumber}`;
  
  // Save current PDF state
  const currentFontSize = pdf.internal.getFontSize();
  const currentFont = pdf.internal.getFont();
  
  // Apply watermark styling
  pdf.setFontSize(config.fontSize);
  pdf.setFont('helvetica', config.fontWeight);
  pdf.setTextColor(...config.color);
  
  // Add watermark text
  pdf.text(text, config.x, config.y);
  
  // Restore previous PDF state
  pdf.setFontSize(currentFontSize);
  pdf.setFont(currentFont.fontName, currentFont.fontStyle);
};

/**
 * Add issue and volume watermark to PDF (top-right)
 * @param {Object} pdf - jsPDF instance
 * @param {number} issue - Issue number
 * @param {number} volume - Volume number
 */
export const addIssueVolumeWatermark = (pdf, issue, volume) => {
  if (!issue || !volume) {
    console.warn('Issue or volume not provided for watermark');
    return;
  }

  const config = WATERMARK_CONFIG.topRight;
  const text = `Issue ${issue}: Volume ${volume}`;
  
  // Calculate right-aligned position
  const xPosition = calculateRightAlignedX(pdf, text);
  
  // Save current PDF state
  const currentFontSize = pdf.internal.getFontSize();
  const currentFont = pdf.internal.getFont();
  
  // Apply watermark styling
  pdf.setFontSize(config.fontSize);
  pdf.setFont('helvetica', config.fontWeight);
  pdf.setTextColor(...config.color);
  
  // Add watermark text
  pdf.text(text, xPosition, config.y);
  
  // Restore previous PDF state
  pdf.setFontSize(currentFontSize);
  pdf.setFont(currentFont.fontName, currentFont.fontStyle);
};

/**
 * Add publication date watermark to PDF (below issue/volume, right-aligned)
 * @param {Object} pdf - jsPDF instance
 * @param {string} releaseDate - Publication date in YYYY-MM-DD format
 */
export const addDateWatermark = (pdf, releaseDate) => {
  if (!releaseDate) {
    console.warn('Release date not provided for watermark');
    return;
  }

  const config = WATERMARK_CONFIG.datePosition;
  const formattedDate = formatDateForWatermark(releaseDate);
  const text = `Published: ${formattedDate}`;
  
  // Calculate right-aligned position
  const xPosition = calculateRightAlignedX(pdf, text);
  
  // Save current PDF state
  const currentFontSize = pdf.internal.getFontSize();
  const currentFont = pdf.internal.getFont();
  
  // Apply watermark styling
  pdf.setFontSize(config.fontSize);
  pdf.setFont('helvetica', config.fontWeight);
  pdf.setTextColor(...config.color);
  
  // Add watermark text
  pdf.text(text, xPosition, config.y);
  
  // Restore previous PDF state
  pdf.setFontSize(currentFontSize);
  pdf.setFont(currentFont.fontName, currentFont.fontStyle);
};

/**
 * Format date for watermark display
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatDateForWatermark = (dateString) => {
  if (!dateString) return 'Date not available';
  
  try {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.warn('Invalid date format for watermark:', dateString);
    return 'Invalid date';
  }
};

/**
 * Add complete watermark set to PDF (all three watermarks)
 * @param {Object} pdf - jsPDF instance
 * @param {Object} article - Article object with metadata
 * @param {Object} options - Optional configuration overrides
 */
export const addDynamicWatermark = (pdf, article, options = {}) => {
  try {
    // Get article metadata using our data mapping utility
    const metadata = getArticleMetadata(article);
    
    if (!metadata) {
      console.warn('Could not retrieve article metadata for watermarking');
      return false;
    }

    // Add serial number watermark (top-left)
    if (metadata.serialNumber) {
      addSerialWatermark(pdf, metadata.serialNumber);
    }

    // Add issue/volume watermark (top-right)
    if (metadata.issue && metadata.volume) {
      addIssueVolumeWatermark(pdf, metadata.issue, metadata.volume);
    }

    // Add date watermark (below issue/volume, right-aligned)
    if (metadata.releaseDate) {
      addDateWatermark(pdf, metadata.releaseDate);
    }

    return true;
  } catch (error) {
    console.error('Error adding dynamic watermark:', error);
    return false;
  }
};

/**
 * Add watermarks to all pages of a PDF
 * @param {Object} pdf - jsPDF instance
 * @param {Object} article - Article object with metadata
 * @param {Object} options - Optional configuration
 */
export const addWatermarkToAllPages = (pdf, article, options = {}) => {
  const totalPages = pdf.internal.getNumberOfPages();
  const currentPage = pdf.internal.getCurrentPageInfo().pageNumber;
  
  // Apply watermark to all pages
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    pdf.setPage(pageNum);
    addDynamicWatermark(pdf, article, options);
  }
  
  // Return to the original page
  pdf.setPage(currentPage);
};

/**
 * Validate watermark prerequisites
 * @param {Object} article - Article object
 * @returns {Object} Validation result
 */
export const validateWatermarkData = (article) => {
  const result = {
    valid: true,
    warnings: [],
    errors: []
  };

  if (!article) {
    result.valid = false;
    result.errors.push('Article object is required for watermarking');
    return result;
  }

  if (!article.serialNumber) {
    result.warnings.push('Serial number missing - serial watermark will be skipped');
  }

  if (!article.issue || !article.volume) {
    result.warnings.push('Issue or volume missing - issue/volume watermark will be skipped');
  }

  // Check if we can get edition data
  const metadata = getArticleMetadata(article);
  if (!metadata?.releaseDate) {
    result.warnings.push('Release date not found - date watermark will be skipped');
  }

  return result;
};

export default {
  addDynamicWatermark,
  addWatermarkToAllPages,
  addSerialWatermark,
  addIssueVolumeWatermark,
  addDateWatermark,
  validateWatermarkData,
  WATERMARK_CONFIG
};
