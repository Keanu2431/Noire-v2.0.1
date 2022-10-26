const nodemailer = require('nodemailer');
const pug = require('pug');
exports.orderConfirmEmail = async (order) => {
  // html
  const htmlCode = pug.renderFile(
    `${__dirname}/../views/emails/order-confirm.pug`,
    { order }
  );
  // transporter
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'noire.project.000@gmail.com', pass: 'yuacjbloqwnkegoe' },
  });
  let mailOptions = {
    from: 'noire.project.000@gmail.com', // sender address
    to: order.customerInfo.emailAddress, // list of receivers
    subject: 'Noire Order Confirmation', // Subject line
    text: 'Noire Order Confirmation', // plain text body
    html: htmlCode, // html body
  };
  const sending = await transport.sendMail(mailOptions);
};
exports.welcomeUserEmail = async (user) => {
  // html
  const htmlCode = pug.renderFile(
    `${__dirname}/../views/emails/welcome-user.pug`,
    { user }
  );
  // transporter
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'noire.project.000@gmail.com', pass: 'yuacjbloqwnkegoe' },
  });
  let mailOptions = {
    from: 'noire.project.000@gmail.com', // sender address
    to: user.emailAddress, // list of receivers
    subject: 'Welcome To Noire', // Subject line
    text: 'Welcome To Noire', // plain text body
    html: htmlCode, // html body
  };
  const sending = await transport.sendMail(mailOptions);
};
