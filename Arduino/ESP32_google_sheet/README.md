---
template: true
title: Recording data into a google sheet using an ESP32
thumbnail: thumbnail.jpg
language: en
tags:
  - ESP32
---

# Recording data into a google sheet using an ESP32

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This uses a "google apps script"(`.gs`) to create a HTTP endopoint (a "url") which you can then use with your ESP32 to send data. The `.gs` will then timestamp that data and insert it into a google sheet.

## What hardware is needed ? 💾 🔌

- an ESP32
- a router with internet access

## Software dependencies 🌈 📂

- a Google™ account

## How to run ? 🚀

1. create a blank google sheet and open it
2. go into `Extensions >  Apps Script`
3. inside this template you will have a `googleAppsScriptEndpoint.gs` file, paste its content into the automatically generated `Code.gs`
4. Inside the url of your google sheet you will find its id, for example  
   `1p7Bo8z9aC3FG7HiytJiOzF2Nri0Efc9hn4c69zhF6XE` is the ID inside of
   `https://docs.google.com/spreadsheets/d/1p7Bo8z9aC3FG7HiytJiOzF2Nri0Efc9hn4c69zhF6XE/edit#gid=0`

5. Enter that ID of your google sheet into the `sheet_id` variable
6. In the "Apps Script" editor, hit the "Deploy > New Deployment" button in the top right corner
7. Select the type "Web app"
8. in "who has access" select "Anyone"
9. copy the "deployment ID" and put it in the ESP32 code, the variable is called `GOOGLE_DEPLOYEMENT_ID`
10. Enter the proper credential for your router inside the `ssid` and `password` variables
11. Upload the code on your ESP32
12. 🎉🎉🎉

## How to modify ? 🔩 🔨

For basic use, you won't need to change the `.gs`.

Built as it is, you just need to call the `send(String label, String value)` function to send the value of your sensor. The label is used to differenciate between two sensors.

### enabling super basic authentication (very optional) 🔒

If you're like me, you won't like that your endpoint has to be accessible to "Anyone". In which case you can look into the comments of the `.gs` to learn how to enable a simplistic API token. The endpoint will only accept requests accompanied by that token.  
Once you are done setting the token into the `.gs` (don't forget to re-deploy) enter the token into your ESP32 code (not the hash).  
This is still not perfect because the url of your endpoint and the token are both stored in your ESP32 code. Ideally we would need the ESP32 to ask for the token when it starts, that way getting the ESP32 code won't be enough for "Anybody" to be able to inject data into your dataset.

## Be Careful ⚠️

If you change stuff in the `.gs` you will need to re-deploy it to apply the changes to your endpoint. This will change the deployement ID and you'll have to paste the new deployment ID into your ESP32 code and then re-upload it onto your board.

## Additional resources 📄 📗

- https://developers.google.com/apps-script/reference?hl=fr
