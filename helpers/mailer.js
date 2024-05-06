const nodemailer = require("nodemailer");

exports.sendVerificationEmail = (email, name, url) => {
  //creating a object that will be able to send email
  const smtp = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  //contents of the email --common fields
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Facebook Clone Email Verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:'Roboto',sans-serif;font-weight:600;color:#3b5998">
    <img src="https://w7.pngwing.com/pngs/282/704/png-transparent-facebook-messenger-logo-icon-facebook-facebook-logo-blue-text-trademark.png" alt="facebook logo" style="width:30px">
    <span>Action required . Activate your facebook clone account </span>
    </div>
    <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:'Roboto',sans-serif">
    <span>Hello ${name}</span>
    <div style="padding:20px 0">
    <span style="padding:1.5rem 0">
    You have recently created an account on facebook . To complete registration , please confirm your
    account .
    </span>
    </div>
    <a href=${url} style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a>
    <br />
    <div style="padding:20px 0"><span style="margin:1.5rem 0;color:#898f9c">
    Facebook allows you to stay in touch with your friends , once refreshed on facebook, you can share
    photos, organize events and much more.
    </span> </div>
    <div>
    <span style="margin:1.5rem 0;color:#cc717a">Warning : This is not real facebook. Kindly do not share any sensitive information
    here.</span>
    </div>
    </div>`,
  };
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
};

exports.sendResetCode = (email, name, code) => {
  //creating a object that will be able to send email
  const smtp = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  //contents of the email --common fields
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset facebook password",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:'Roboto',sans-serif;font-weight:600;color:#3b5998">
    <img src="https://w7.pngwing.com/pngs/282/704/png-transparent-facebook-messenger-logo-icon-facebook-facebook-logo-blue-text-trademark.png" alt="facebook logo" style="width:30px">
    <span>Action required . Recover your facebook clone account </span>
    </div>
    <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:'Roboto',sans-serif">
    <span>Hello ${name}</span>
    <div style="padding:20px 0">
    <span style="padding:1.5rem 0">
    We have received your request to reset your facebook password. Please enter the following password reset Code.
    </span>
    </div>
    <p style="width:200px;padding:10px 15px;background:#4c649b;color:#fff;text-decoration:none;font-weight:600">${code}</p>
    <br />
    <div style="padding:20px 0"><span style="margin:1.5rem 0;color:#898f9c">
    Facebook allows you to stay in touch with your friends, after reseting the password , you can share
    photos, organize events and much more.
    </span> </div>
    <div>
    <span style="margin:1.5rem 0;color:#cc717a">Warning : This is not real facebook. Kindly do not share any sensitive information
    here.</span>
    </div>
    </div>`,
  };
  smtp.sendMail(mailOptions, (err, res) => {
    if (err) {
      return err;
    }
    return res;
  });
};
