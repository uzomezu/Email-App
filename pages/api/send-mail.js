import mailer from '../../mailer';
const fs = require('fs');
import templates from '../../templates';

export default async (req,res) => {
    // we are on homepage and sending a thank you for joining the newsletter
    if(req.method == "POST" && !req.body.body) {
        // db interaction
        // user joins the db with email
        //const emailBody = fs.readFileSync('../../templates/welcome.html', 'utf8');
        let emailBody = templates.welcome();
        mailer(req.body.subject, emailBody, req.body.recipients);
        res.status(201).send({message: "Success!: User has joined the newsletter"})
    } else {
        if (req.body.recipients && req.body.subject && req.body.body) {
            //console.log(req.body);
            const subject = req.body.subject;
            const body = req.body.body;
            const recipients = req.body.recipients;
            const result = mailer(subject, body, recipients);
            res.status(200).send({message: "Success Messages Sent", result});
        } else {
            res.status(401).send({message: "Error!: Must have an array of emails to send"});
        }
    }
}