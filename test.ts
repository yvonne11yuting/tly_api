function testGetSheetsData() {
    const config = getSheetsData(SHEET_ID);
    console.log(config);
}

function testGetRangeByName() {
    const config = getRangeByName(SHEET_ID, "BNN-phrase");
    console.log(config);
}