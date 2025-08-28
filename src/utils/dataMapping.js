// Utility functions for managing article and edition data relationships
// Created for Phase 1 of Dynamic PDF Watermarking Implementation

import articles from '../data/articles.js';
import editions from '../data/editions.js';

/**
 * Get edition data by issue number and volume
 * @param {number} issue - Issue number
 * @param {number} volume - Volume number
 * @returns {Object|null} Edition object or null if not found
 */
export const getEditionByIssueVolume = (issue, volume) => {
  return editions.find(edition => 
    edition.issue === issue && edition.volume === volume
  ) || null;
};

/**
 * Get article by its serial number
 * @param {number} serialNumber - Serial number of the article
 * @returns {Object|null} Article object or null if not found
 */
export const getArticleBySerialNumber = (serialNumber) => {
  return articles.find(article => 
    article.serialNumber === serialNumber
  ) || null;
};

/**
 * Get all articles for a specific issue and volume
 * @param {number} issue - Issue number
 * @param {number} volume - Volume number
 * @returns {Array} Array of articles for the specified issue/volume
 */
export const getArticlesByIssueVolume = (issue, volume) => {
  return articles.filter(article => 
    article.issue === issue && article.volume === volume
  );
};

/**
 * Format date for display in PDF watermarks
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatPublicationDate = (dateString) => {
  if (!dateString) return 'Date not available';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Get article metadata for PDF watermarking
 * @param {Object} article - Article object
 * @returns {Object} Metadata object with all required watermark information
 */
export const getArticleMetadata = (article) => {
  if (!article) return null;
  
  const edition = getEditionByIssueVolume(article.issue, article.volume);
  
  return {
    serialNumber: article.serialNumber,
    issue: article.issue,
    volume: article.volume,
    title: article.title,
    author: article.author,
    releaseDate: edition?.releaseDate,
    formattedDate: formatPublicationDate(edition?.releaseDate)
  };
};

/**
 * Validate article data consistency
 * @returns {Object} Validation results
 */
export const validateArticleData = () => {
  const results = {
    valid: true,
    errors: [],
    warnings: []
  };
  
  // Check for duplicate serial numbers
  const serialNumbers = articles.map(a => a.serialNumber);
  const duplicateSerials = serialNumbers.filter((serial, index) => 
    serialNumbers.indexOf(serial) !== index
  );
  
  if (duplicateSerials.length > 0) {
    results.valid = false;
    results.errors.push(`Duplicate serial numbers found: ${duplicateSerials.join(', ')}`);
  }
  
  // Check for missing serial numbers
  const articlesWithoutSerial = articles.filter(a => !a.serialNumber);
  if (articlesWithoutSerial.length > 0) {
    results.valid = false;
    results.errors.push(`Articles missing serial numbers: ${articlesWithoutSerial.map(a => a.id).join(', ')}`);
  }
  
  // Check for articles without corresponding editions
  const orphanedArticles = articles.filter(article => {
    return !editions.find(edition => 
      edition.issue === article.issue && edition.volume === article.volume
    );
  });
  
  if (orphanedArticles.length > 0) {
    results.warnings.push(`Articles without corresponding editions: ${orphanedArticles.map(a => `Article ${a.id} (Issue ${a.issue}, Volume ${a.volume})`).join(', ')}`);
  }
  
  return results;
};
