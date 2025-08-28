#!/usr/bin/env node

/**
 * Watermark System Test Runner - Phase 4.1
 * 
 * Run this script to validate the complete watermark implementation
 * Usage: node test-watermarks.js
 */

// Note: This would run in a Node.js environment, but our code is designed for browser
// For testing in the React app, we'll integrate this into our WatermarkTest component

import { validateWatermarkSystem, validateSerialNumbers, generateValidationReport } from '../src/utils/watermarkValidation.js';

async function runTests() {
  console.log('🚀 Starting Watermark System Tests...\n');

  try {
    // Test 1: System Validation
    console.log('=== TEST 1: System Validation ===');
    const systemResults = validateWatermarkSystem();
    console.log(`✅ System Overall Status: ${systemResults.overall ? 'PASS' : 'FAIL'}`);
    console.log(`📊 ${systemResults.summaryMessage}`);
    if (systemResults.errors.length > 0) {
      console.log('❌ Errors found:', systemResults.errors);
    }
    if (systemResults.warnings.length > 0) {
      console.log('⚠️  Warnings:', systemResults.warnings);
    }
    console.log('');

    // Test 2: Serial Number Validation
    console.log('=== TEST 2: Serial Number Validation ===');
    const serialResults = validateSerialNumbers();
    console.log(`✅ Serial Numbers Status: ${serialResults.valid ? 'PASS' : 'FAIL'}`);
    if (serialResults.duplicates.length > 0) {
      console.log('❌ Duplicate serials:', serialResults.duplicates);
    }
    if (serialResults.missing.length > 0) {
      console.log('❌ Missing serials:', serialResults.missing);
    }
    if (serialResults.outOfRange.length > 0) {
      console.log('❌ Out-of-range serials:', serialResults.outOfRange);
    }
    console.log('');

    // Test 3: Generate Full Report
    console.log('=== TEST 3: Full Validation Report ===');
    const fullReport = await generateValidationReport();
    console.log('📋 Report generated at:', fullReport.timestamp);
    console.log('🎯 Recommendations:');
    fullReport.recommendations.forEach(rec => console.log(`   • ${rec}`));

    console.log('\n🎉 Testing completed!');
    return fullReport;

  } catch (error) {
    console.error('❌ Test execution failed:', error);
    return null;
  }
}

// Export for use in React components
export { runTests };

// If running directly in Node.js
if (typeof window === 'undefined') {
  runTests().then(report => {
    if (report) {
      console.log('\n📄 Full report available in return value');
    } else {
      process.exit(1);
    }
  });
}
