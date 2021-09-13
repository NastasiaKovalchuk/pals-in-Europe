const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'nastya1263@mail.ru',
      pass: 'Nodemailer'
    },
  },
  {
    from: 'MailerTest <nastya1263@mail.ru>'
  }
);

export const mailer = (message: object) => {
  transporter.sendMail(message, (err: any, info: any) => {
    if (err) return console.log(err);
    console.log('Email sent: ', info);
  })

};
