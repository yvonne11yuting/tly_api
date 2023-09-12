function doGet(e: GoogleAppsScript.Events.DoGet) {
    let resultResponse: ResultResponse;
    try {
        resultResponse = {
            code: 200,
            message: 'success',
            data: getSheetsData()
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

function getSheetsData() {
    const SHEET_ID = '1YI2Ip83TFsCA8K1Hbbaw2KwfoUtp0Y0736EUhuycMo0';
    const DB_TAB = 2;
    const sheets = SpreadsheetApp.openById(SHEET_ID).getSheets()
    if (sheets.length === 0 || !sheets[DB_TAB]) {
        throw new Error('SHEET_NOT_FOUND');
    }
    const data = sheets[DB_TAB].getDataRange().getValues();
    return data.slice(1); // remove header
}
