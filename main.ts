function doGet(e: GoogleAppsScript.Events.DoGet) {
    let resultResponse: ResultResponse;
    try {
        const { sheetId, tabName } = e?.parameter || {};
        const openSheetId =
          sheetId ?? SHEET_ID;
        resultResponse = {
          code: 200,
          message: "success",
          data: tabName
            ? getRangeByName(openSheetId, tabName)
            : getSheetsData(openSheetId),
        };

    } catch (e) {
        const err = e.code ? e : new Error('GENERAL_ERROR');
        resultResponse = { ...err };
    }
    // output JSON API response
    return apiResponse(resultResponse);
}

function apiResponse(response: ResultResponse) {
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function getSheetsData(sheetId: string) {
    const DB_TAB = 2;
    const sheets = SpreadsheetApp.openById(sheetId).getSheets();
    if (sheets.length === 0 || !sheets[DB_TAB]) {
        throw new Error('SHEET_NOT_FOUND');
    }
    const rawData = sheets[DB_TAB].getDataRange().getValues();
    const data = rawData.slice(1); // remove header
    const formatData = data.map(([question, answer]) => ({ question, answer }));
    return formatData;
}

function getRangeByName(sheetId: string, sheetName: string) {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`找不到名稱為 ${sheetName} 的工作表`);
  }
  const range = sheet.getDataRange();
  const tableValues = range.getValues();
  const formatData = tableValues.filter(([q, a]) => q && a).map(([question, answer, note]) => ({
    question,
    answer,
    note,
  }));
  return formatData;
}
