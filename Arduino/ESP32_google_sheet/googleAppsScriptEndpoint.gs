// https://iotdesignpro.com/articles/esp32-data-logging-to-google-sheets-with-google-scripts
// https://ramblings.mcpher.com/gassnippets2/cryptojs-libraries-for-google-apps-script/#The_library

// to add auth, follow the steps and activate the token checking present at the start of the doGet function

// step 2 : put the hash of your token
// const HASHED_TOKEN = "put the hash of your token";
const HASHED_TOKEN =
  "7ed8eda08e2d4a11a5459cc3453f54171591c0a39a113eaacc1f421deb5a";

function doGet(event) {
  // uncomment to activate the token checking
  // var requestHash = hash(event.parameter.token);
  // if(requestHash != HASHED_TOKEN){
  //   throw "Invalid or absent token";
  // }

  // step 4 : use the correct id and sheet name
  var sheet_id = "102p2c8YeRj8ymksAjEXsetA7o80uZyWycOqHh0dNkJo";
  var sheet_name = "Sheet1";

  var ss = SpreadsheetApp.openById(sheet_id);
  var sheet = ss.getSheetByName(sheet_name);
  var date = Date.now().toString();
  var label = String(event.parameter.label);
  var value = Number(event.parameter.value);
  sheet.appendRow([date, label, value]);

  return "OK";
}

function getHashedToken() {
  // step 1 : insert your token in clear here
  // ... and then use the menu bar at the top of the screen to Run the getHashedToken function
  // step 3 : remove your token from here and don't share it!
  var hToken = hash("pouet");
  Logger.log(hToken); // grab the hash of your token in the logger
}

// https://gist.github.com/KEINOS/78cc23f37e55e848905fc4224483763d
function hash(input, isShortMode) {
  var isShortMode = !!isShortMode; // Ensure to be bool for undefined type
  var txtHash = "";
  var rawHash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    input
  );

  if (!isShortMode) {
    for (i = 0; i < rawHash.length; i++) {
      var hashVal = rawHash[i];

      if (hashVal < 0) {
        hashVal += 256;
      }
      if (hashVal.toString(16).length == 1) {
        txtHash += "0";
      }
      txtHash += hashVal.toString(16);
    }
  } else {
    for (j = 0; j < 16; j += 8) {
      hashVal =
        (rawHash[j] + rawHash[j + 1] + rawHash[j + 2] + rawHash[j + 3]) ^
        (rawHash[j + 4] + rawHash[j + 5] + rawHash[j + 6] + rawHash[j + 7]);

      if (hashVal < 0) {
        hashVal += 1024;
      }
      if (hashVal.toString(36).length == 1) {
        txtHash += "0";
      }

      txtHash += hashVal.toString(36);
    }
  }

  // change below to "txtHash.toUpperCase()" if needed
  return txtHash;
}
