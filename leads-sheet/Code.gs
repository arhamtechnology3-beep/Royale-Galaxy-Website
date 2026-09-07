/**
 * Royale Galaxy — Google Sheet Lead Capture
 *
 * YOUR SHEET: Royale Galaxy Website Leads
 * SHEET ID: 1J2t-G8VGbE9QO4z-blkCL3MkR-1ldQV1bxMTii6zZFI
 *
 * NEXT STEPS:
 * 1. Replace all code in Apps Script with this file → Save (Ctrl/Cmd+S)
 * 2. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Copy the Web App URL (ends with /exec)
 * 4. That URL is the value for:
 *    VITE_GOOGLE_SHEET_WEBHOOK=<paste URL here>
 */

// Bound to your "Royale Galaxy Website Leads" spreadsheet
const SPREADSHEET_ID = '1J2t-G8VGbE9QO4z-blkCL3MkR-1ldQV1bxMTii6zZFI';
// Use the main tab the client is viewing (Sheet1)
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const data = parsePayload_(e);
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.configuration || '',
      data.intent || '',
      data.project || 'Royale Galaxy Kalyan East',
      data.source || 'Website Form'
    ]);

    return jsonResponse_({ result: 'success' });
  } catch (err) {
    return jsonResponse_({ result: 'error', message: String(err) });
  }
}

function doGet() {
  return jsonResponse_({
    status: 'ok',
    service: 'Royale Galaxy Leads Sheet',
    spreadsheetId: SPREADSHEET_ID,
    message: 'POST form leads to this URL.'
  });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Empty request body');
  }

  const raw = e.postData.contents;
  const type = (e.postData.type || '').toLowerCase();

  if (
    type.indexOf('application/json') !== -1 ||
    type.indexOf('text/plain') !== -1 ||
    raw.trim().charAt(0) === '{'
  ) {
    return JSON.parse(raw);
  }

  const params = e.parameter || {};
  return {
    name: params.name,
    email: params.email,
    phone: params.phone,
    configuration: params.configuration,
    intent: params.intent,
    project: params.project,
    submittedAt: params.submittedAt,
    source: params.source
  };
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Configuration',
      'Intent',
      'Project',
      'Source'
    ]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  }

  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
