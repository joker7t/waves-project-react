const nodemailer = require('nodemailer');

const sendMail = async (mailTo) => {
    try {
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "wavesnbt@gmail.com", // generated ethereal user
                pass: "waves1234", // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: `Waves wavesnbt@gmail.com`, // sender address
            to: `${mailTo}`, // list of receivers
            subject: "Hello", // Subject line
            text: "Welcome to Waves", // plain text body
            html: "<b>Welcome to Waves</b>", // html body
        });

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        console.log(error);
    }

}



module.exports = { sendMail };