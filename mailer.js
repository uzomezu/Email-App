const nodemailer = require('nodemailer');
const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const google_client = JSON.parse(fs.readFileSync('./client_secrect_kev_portfolio.json', 'utf8'));
console.log(process.env.PORT);
// console.log(google_client);
/**
 * 
 * @param {string} subject - subject of email in string form
 * @param {string} body - body of the email (usually HTML file in string form)
 * @param {Object[]} recipients - array of recipients
 */
const mailer = (subject, body, recipients) => {
    const oauth2Client = new OAuth2(
        google_client.web.client_id, // Client ID goes here
        google_client.web.client_secret, // Client Secret goes here
        google_client.web.redirect_uris[0] // Redirect URI
    );
    
    oauth2Client.setCredentials(
        {refresh_token : google_client.refresh_token}
    );
    const access_token = oauth2Client.getAccessToken();
    
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        tls: {
            rejectUnauthorized: false
        },
        auth : {
            type: "OAUTH2",
            user: "uzomezu@gmail.com",
            clientId: google_client.web.client_id,
            clientSecret: google_client.web.client_secret,
            refreshToken: google_client.refresh_token,
            accessToken: access_token,
        }
    });
    
    const mailOptions = {
        from: "uzomezu@gmail.com", 
        to: recipients.join(), // will be dynamic later on as function parameter
        subject: subject, // will be dynamic as well
        generateTextFromHTML: true,
        html: body // input HTML file here
    }
    
    smtpTransport.sendMail(mailOptions, (err, response)=>{
        if(err) {
            throw err
        }
        console.log(response)
        smtpTransport.close();
        
        
    })
}

//mailer("HELLO WORLD: TEST EMAIL", `<h1>Hello World!</h1>`, ['uzomezu@icloud.com', 'kmezu1@student.umgc.edu'])
module.exports = mailer