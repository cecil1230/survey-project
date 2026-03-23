/**
 * Google Apps Script - Survey Analysis Dashboard
 * 
 * Instructions:
 * 1. Create a Google Form for each survey (parent, teacher, student)
 * 2. Go to Form > Script editor
 * 3. Paste this code
 * 4. Deploy as Web App
 * 5. Access the dashboard URL
 */

function doGet() {
  return HtmlService.createTemplateFromFile('Dashboard')
    .evaluate()
    .setTitle('Survey Analysis | 调查分析报告')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSheetData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const surveyTypes = ['Parent', 'Teacher', 'Student'];
  const result = {};
  
  surveyTypes.forEach(type => {
    try {
      const sheetData = sheet.getSheetByName(type) || sheet.getSheets()[0];
      const data = sheetData.getDataRange().getValues();
      result[type] = {
        total: data.length - 1, // minus header
        responses: data.slice(1),
        headers: data[0]
      };
    } catch(e) {
      result[type] = { total: 0, responses: [], error: e.message };
    }
  });
  
  return result;
}

function calculateAnalysis(responses, headers) {
  if (!responses || responses.length === 0) return null;
  
  const questionCount = headers.length - 1; // exclude timestamp
  const stats = {
    average: 0,
    distribution: {},
    questionAvg: []
  };
  
  // Calculate overall average
  let grandTotal = 0;
  let grandCount = 0;
  
  // Distribution counts
  const distCounts = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
  
  responses.forEach(row => {
    for (let i = 1; i <= questionCount; i++) {
      const val = parseInt(row[i]);
      if (!isNaN(val) && val >= 1 && val <= 5) {
        grandTotal += val;
        grandCount++;
        if (distCounts[val] !== undefined) {
          distCounts[val]++;
        }
      }
    }
  });
  
  stats.average = grandCount > 0 ? (grandTotal / grandCount).toFixed(2) : 0;
  stats.distribution = distCounts;
  
  // Per-question averages
  for (let i = 1; i <= questionCount; i++) {
    let qTotal = 0, qCount = 0;
    responses.forEach(row => {
      const val = parseInt(row[i]);
      if (!isNaN(val)) {
        qTotal += val;
        qCount++;
      }
    });
    stats.questionAvg.push({
      question: headers[i] || `Q${i}`,
      average: qCount > 0 ? (qTotal / qCount).toFixed(2) : 0,
      count: qCount
    });
  }
  
  // Rating interpretation
  const avg = parseFloat(stats.average);
  if (avg >= 4.5) stats.rating = 'Excellent | 优秀';
  else if (avg >= 3.5) stats.rating = 'Good | 良好';
  else if (avg >= 2.5) stats.rating = 'Average | 一般';
  else stats.rating = 'Needs Improvement | 需要改进';
  
  return stats;
}
