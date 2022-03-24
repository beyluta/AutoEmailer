const { Console } = require("console");
const nodemailer = require("nodemailer");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let email, password, subject, body, receivers;
let transporter, mailOptions;
const delay = 0;

readline.question("Email: ", (answer) => {
  email = answer;
  readline.question("Password: ", (answer) => {
    password = answer;
    readline.question("Subject: ", (answer) => {
      subject = answer;
      readline.question("Body: ", (answer) => {
        body = answer;
        readline.question(
          "Receivers (emails separated by commas): ",
          (answer) => {
            receivers = answer.replace(/\s/g, "");
            sendEmail();
            readline.close();
          }
        );
      });
    });
  });
});

function sendEmail() {
  console.log(
    `Emails will be sent in ${delay} seconds. Press and hold CTRL+ C to cancel`
  );
  receivers.split(",").forEach((receiver) => {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    mailOptions = {
      from: email,
      to: receiver,
      subject: subject,
      text: subject,
      html: body,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
}
