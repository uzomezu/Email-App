import mailer from '../../mailer';
const fs = require('fs');
export default async (req,res) => {
    if (req.body.recipients) {
        console.log(req.body);
        const subject = "Google Cloud Test Email: Kevin Mezu";
        const body = `<h1>Blah Blah Blah</h1>`;
        const recipients = req.body.recipients;
        mailer(subject, body, recipients);
        res.status(200).send({message: "Success Messages Sent"})

    } else {
        res.status(401).send({message: "Error!: Must have an array of emails to send"});
    }
}