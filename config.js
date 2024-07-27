const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
  //For Enabling Commands Like AUTO_STATUS_RED Type true For Disenabling Type false
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  //_________________________________________________________________________________________________________________________________
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  //_________________________________________________________________________________________________________________________________
  AUTO_REACT: process.env.AUTO_REACT || 'false',
  //_________________________________________________________________________________________________________________________________
  AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || 'true',
  //_________________________________________________________________________________________________________________________________
  AUTO_BIO: process.env.AUTO_BIO || 'false',
  //_________________________________________________________________________________________________________________________________
  AUTO_READ_MSG: process.env.AUTO_READ_MSG || 'false',
  //_________________________________________________________________________________________________________________________________
  AUDIO_DATA: process.env.AUDIO_DATA || "Phoenix-MD;Abhishek Suresh;https://graph.org/file/8976892f2f615077b48cd.jpg",
  //_________________________________________________________________________________________________________________________________
  BRANCH: "main",
  //_________________________________________________________________________________________________________________________________
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0gxYzFlL3F2VkdCMUQzRGZDVkZ4SDAxOXZydkFVOUZHbHBYWWg3MVpHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVNTQlI5SUd0UDR2RWNjemZ6RU5EbFNmYUtrbnJxRHBOenR6TkQweEQzaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQ1BKYk9leTBFQ0ljNktFSVU0Z0JMQ1YvZC9xSXNVRlVQMGZFZVRoMGtBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFeGdDZG9vRkQ2RjY0VVcrVVdrTitNZ3IrTmF0M2x5QVhLQ1Q5ZjVuNmxJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJDM1Z2VmVHOWg3Rkc2NkcvZnB2UndmWER6YzR2V0xMLzZsTEhUcFRkbGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJLSUgydnBWdmdOYjRVb1FYMVBOWkUzV3pVSERlNmhEZ3ZjZ205d2tDUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtyajhwNXhtOTdvby9ZS3V1SFJGNm5SK1BDWlZ0dmJDdWt4UjVMVEcxbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWZnZFpQWEYvdFJreVFKamh6RE8vRStTMzdXZ3dnUXVTOXhNa3Z1QzBoRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikg0YVhVWlFRaGZjVVpORXBvYkdMSmg5NlFldmJLcnFWaHM4ZmVyR0lsMk1IZXh3QnpZWUsveG4wck15cUkvcjFaRVRNRDR4Wi8zZU5UNzlMOEI5M0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI2LCJhZHZTZWNyZXRLZXkiOiJ1U0ZNU2V6MVZ3SG1BWGtjT1lheFJSVXdSeUlyMVlZMk9NL0JZck84VWRBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY4NDQxOTI4MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0RjM1MEUxNDY4NUY3NURCODAwMkU5NTNDOTlFNEFGNSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMDA1NDc5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2ODQ0MTkyODJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTg1MUI4M0VBMEQ2MEY4M0U5QjU0NTM2QzBENjE2QjYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjAwNTQ3OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiaWY3LWt6VjRRLVc0ZFZqeWNjVlpHdyIsInBob25lSWQiOiI1OTUwMWI1Ny01MjExLTQzN2UtOTU4ZS1hYWU0ODU1ZDg2MDMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMitCZEtVWVV3cDlNY3YvaVFkMDFycG1USzY0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNXNm5xSkNKZEpYSXpOK0tZWjZkTVhSRzAzND0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJaWFdBTVROTCIsIm1lIjp7ImlkIjoiMjU1Njg0NDE5MjgyOjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoidGVzaGFlbW1hbnVlbDcxMiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTzNRcnZZREVOZnZqclVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVEkvd0pvUHMxZWNPRFJ3WVhiVW5UVHpwNmExQmd4bXVZb0RhT0J2RnRtdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUkg0MFVDcGZTekRxQVlJVjkxeXlmcTRUa0hqVjI5dHJRQ3M1T3k3Y0ZYZzNqbEIyMWcvZ2tNSWNQU1dmYXZITzNGM0pXM3Z5U2RkSGFlVHBZTmVhQVE9PSIsImRldmljZVNpZ25hdHVyZSI6InltblQ5MUNrdnVZbkwwQUx6UXFQZHY5NDFrcUUxMEh1RFdvaVVlMXg1YnJUQjhhYTJoa0M5MzhnelJOeUlwYW5QMEtTenE1YVF5dUxsajVWa3I4RUJRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njg0NDE5MjgyOjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVXlQOENhRDdOWG5EZzBjR0YyMUowMDg2ZW10UVlNWnJtS0EyamdieGJacyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMjAwNTQ3NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMTmwifQ==", //Enter Your Session Id Here
  //_________________________________________________________________________________________________________________________________
  SUDO: process.env.SUDO || "919074692450",
  //_________________________________________________________________________________________________________________________________
  SPAM_COUNT: process.env.SPAM_COUNT || "10",
  //_________________________________________________________________________________________________________________________________
  LANG: process.env.LANG || "EN",
  //_________________________________________________________________________________________________________________________________
  LOGS: toBool(process.env.LOGS) || true,
  //_________________________________________________________________________________________________________________________________
  MENTION_DATA: process.env.MENTION_DATA || "01:43 ━━━●───── 03:50;⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆;919074692450;https://graph.org/file/63942461d4b8d78b360d3.jpg",
  //_________________________________________________________________________________________________________________________________
  MENTION_AUDIO: process.env.MENTION_AUDIO || "https://i.imgur.com/NCifJWe.mp4;https://graph.org/file/ecf0772cb95111796848c.mp4",
  //_________________________________________________________________________________________________________________________________
  MENTION: process.env.MENTION || 'false',
  //_________________________________________________________________________________________________________________________________
  HANDLERS: process.env.PREFIX || '.',
  //_________________________________________________________________________________________________________________________________
  RMBG_KEY: process.env.RMBG_KEY || false,
  //_________________________________________________________________________________________________________________________________
  STICKER_DATA: "🎯𝙿𝚑𝚘𝚎𝚗𝚒𝚡-𝙼𝙳;𝙰𝚋𝚑𝚒𝚜𝚑𝚎𝚔 𝚂𝚞𝚛𝚎𝚜𝚑☘️",
  //_________________________________________________________________________________________________________________________________
  WELCOME_MSG: process.env.WELCOME_MSG || "👋 Hello *@user* Welcome To Our Group *@gname*\n*Total Members:* @count\n*Group Description:*\n@gdesc {pp}",
  //_________________________________________________________________________________________________________________________________
  GOODBYE_MSG: process.env.GOODBYE_MSG || "👋 GoodBye *@user* From *@gname*\n*Total Members:* @count {pp}",
  //_________________________________________________________________________________________________________________________________
  DATABASE_URL: DATABASE_URL,
  //_________________________________________________________________________________________________________________________________
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  //_________________________________________________________________________________________________________________________________
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  //_________________________________________________________________________________________________________________________________
  OWNER_NAME: process.env.OWNER_NAME || "Kingston tech",
  //_________________________________________________________________________________________________________________________________
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255756519282",
  //_________________________________________________________________________________________________________________________________
  BOT_NAME: process.env.BOT_NAME || "Kinston-MD",
  //_________________________________________________________________________________________________________________________________
  WORK_TYPE: process.env.MODE || "public",
  //_________________________________________________________________________________________________________________________________
  BASE_URL: "https://abhi-appi-9a0e16f0ca75.herokuapp.com/",
  //_________________________________________________________________________________________________________________________________
  //Database
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
