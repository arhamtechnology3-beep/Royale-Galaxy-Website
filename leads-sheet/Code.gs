/**
 * Royale Galaxy — Google Sheet Lead Capture
 *
 * YOUR SHEET: Royale Galaxy Website Leads
 * SHEET ID: 1J2t-G8VGbE9QO4z-blkCL3MkR-1ldQV1bxMTii6zZFI
 *
 * UPDATE STEPS (required after any Code.gs change):
 * 1. Paste this full file into Apps Script → Save
 * 2. Deploy → Manage deployments → Edit (pencil)
 * 3. Version: New version → Deploy
 * 4. Optional: select fixExistingPhoneErrors → Run (repairs old #ERROR! cells)
 */

const SPREADSHEET_ID = '1J2t-G8VGbE9QO4z-blkCL3MkR-1ldQV1bxMTii6zZFI';
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = parsePayload_(e);
    const sheet = getOrCreateSheet_();
    ensurePhoneColumnIsText_(sheet);

    const row = sheet.getLastRow() + 1;
    const phone = toSafePhoneText_(data.phone);

    sheet.getRange(row, 1).setValue(
      data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    );
    sheet.getRange(row, 2).setValue(data.name || '');
    sheet.getRange(row, 3).setValue(data.email || '');

    // CRITICAL: format as plain text BEFORE writing, never leading +/=
    sheet.getRange(row, 4).setNumberFormat('@').setValue(phone);

    sheet.getRange(row, 5).setValue(data.configuration || '');
    sheet.getRange(row, 6).setValue(data.intent || '');
    sheet.getRange(row, 7).setValue(data.project || 'Royale Galaxy Kalyan East');
    sheet.getRange(row, 8).setValue(data.source || 'Website Form');

    return jsonResponse_({ result: 'success', phone: phone });
  } catch (err) {
    return jsonResponse_({ result: 'error', message: String(err) });
  }
}

/**
 * Converts any phone input into sheet-safe plain text.
 * Example: "+91 9999999999" → "91 9999999999"
 */
function toSafePhoneText_(phone) {
  var raw = String(phone || '').trim();

  // Strip formula markers Sheets misreads
  raw = raw.replace(/^['=]+/, '').trim();

  // Normalize "+91 ..." / "91 ..." / bare 10-digit
  var digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.indexOf('91') === 0) {
    return '91 ' + digits.slice(2);
  }
  if (digits.length === 10) {
    return '91 ' + digits;
  }
  if (digits.length > 0) {
    return digits;
  }
  return raw.replace(/^\+/, '');
}

function ensurePhoneColumnIsText_(sheet) {
  sheet.getRange('D:D').setNumberFormat('@');
}

/** One-time: Run this to repair existing #ERROR! phone cells */
function fixExistingPhoneErrors() {
  const sheet = getOrCreateSheet_();
  ensurePhoneColumnIsText_(sheet);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  for (var row = 2; row <= lastRow; row++) {
    var cell = sheet.getRange(row, 4);
    var formula = cell.getFormula();
    var display = String(cell.getDisplayValue() || '');
    var recovered = '';

    if (formula) {
      recovered = formula.replace(/^=/, '').trim();
    } else if (display && display !== '#ERROR!') {
      recovered = display;
    }

    cell.setNumberFormat('@').setValue(toSafePhoneText_(recovered));
  }
}

function doGet() {
  return jsonResponse_({
    status: 'ok',
    service: 'Royale Galaxy Leads Sheet',
    spreadsheetId: SPREADSHEET_ID,
    sheet: SHEET_NAME,
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
    ensurePhoneColumnIsText_(sheet);
  }

  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
