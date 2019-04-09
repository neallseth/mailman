var nodemailer = require('nodemailer');
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3010

app.post('/', function (req, res) {
    console.log(req.body);
    var sender = req.body.sender;
    var pass = req.body.pass;
    var recipient = req.body.recipient;
    var subject = req.body.subject;
    var body = req.body.body;



    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: pass
        }
    });

    var mailOptions = {
        from: sender,
        to: recipient,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send('Error: ' + error);
        } else {
            res.send('Email to ' + recipient + ' successfully sent!');
        }
    });

})


app.get('/', function (req, res) {
    res.send('<p>In order to send an email, turn off gmail <a href="https://www.google.com/settings/security/lesssecureapps">secure mode</a> and POST a JSON with the following keys: sender, pass, recipient, subject, body.</p>');
})




app.listen(port, () => console.log(`Example app listening on port ${port}!`))