const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../config/your-google-creds.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});



const appendToSheet = async (dataRow) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A1", // change sheet name if needed
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [dataRow],
    },
  });
};

module.exports = appendToSheet;
