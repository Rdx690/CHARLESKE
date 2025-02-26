
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFB1UHhjRjJHUUZqUEFwMm4wYmx6TWJrTm9VS2FSOHkwelpGTysvQUtsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUx6QVhyY1pvN0FFd1p6L0lsT0xYZVArRThkT25jVlUxencyMkZxbHhtYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS09GenUzdDd0TEhUSlZ4Umw1MTZzRkNoTHBYR1dWWWtFdklBYXJzMkhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtU1VKaW4xdGdLRFdyUmxWZWNDbHNJaWhDRFdpS0JsTmcyaFVaa1pOZ1ZzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitLZlExaHI0Q3hjdCsxWlNRU1c1bTZWNnZqdVVqRURtRkJ0bXh1T0EzVUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iko2eUZBdWwvVzRFR3JSNkMyUkF6cnd2T0ZtRGl1VzZZNjBsdEw5SndIaVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZ1RmptUVJvZThkWjdzVkRhbW1GNWYrVUp0Wm9aZmp4enVtYi90Y0RIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFZmb0g0amFRSXFrdW50ZytYNU1DRmxmWG9Bb1dMdUNRM1g1QStGUUF6ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlFc1kvRlFUUzRCV1kyL1JzcU85YksreTd3akg2c29LeU9JT0xydDVldFpxU1JnSHp6Z0h4V1R3WDg3eXExVXV3TXl1aEdHSG9pN0FwZmRnNFJrNmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUzLCJhZHZTZWNyZXRLZXkiOiJUVFFPekZLTE5PdjRHbVQraHgwdUxGbnA2VVl0SjU5UStWbnlldGExWVVzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyMEcwTnktaVNONmU4eGNYWGRRaUt3IiwicGhvbmVJZCI6IjQ5M2EzMTg0LTRhMWYtNDMyNy04YmNiLWViNGY0MWNhYmMwMiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5L29sY1p5ZzErU1RZQTg0Y2lSRG8rU2pwcUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkhzYUlyMG1lWm9GaGJDUXJVblVwZENnYVhnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFTQUQ1Q0JQIiwibWUiOnsiaWQiOiI5MTY5MDk5NTA1ODI6NDlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t2enNmWUNFUE9QKzcwR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjcvL0NlN0hJSWZzWkhyb0plajF5KzFJQitidFZwMTFMenJqaEVKTDNNQzQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBzK3kreWFOU3RPK1RuTjBEVm1jeXYvbVhGbEdKQ3dKK0IxMCtnZ2xkeE4zQkFKUGtTUUV0MjZKbERkYW1PS3FENm95bnNsQ2l1blJ5V0pyTWZzMkRBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJieFRMRGNlQzFSS3lIMnNGU29VNm5yYzR0TUpIQU5UN3FndVZ6b3NhdHRGMFI2SEhMdjR5emNHSkRCbnk4ckZmOFBBaHNHb3NVQzF5Yk16d2VORHFpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNjkwOTk1MDU4Mjo0OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlLy93bnV4eUNIN0dSNjZDWG85Y3Z0U0FmbTdWYWRkUzg2NDRSQ1M5ekF1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNTU2Mjg4fQ==',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/y16skc.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
