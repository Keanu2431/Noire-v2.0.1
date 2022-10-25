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
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '142a354a9d97da',
      pass: '5187f6aea1d93b',
    },
  });
  let mailOptions = {
    from: 'noire_order_no_reply@gmail.com', // sender address
    to: order.customerInfo.emailAddress, // list of receivers
    subject: 'Noire Order Confirmation', // Subject line
    text: 'Noire Order Confirmation', // plain text body
    html: htmlCode, // html body
  };
  const sending = await transport.sendMail(mailOptions);
  console.log(sending);
};
