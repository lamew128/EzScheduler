const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = ({ toEmails, eventInfo }) => {
  toEmails.map((email) => {
    const msg = {
      to: email,
      from: 'no-reply@ezscheduler.ca',
      subject: eventInfo.title,
      text: 'and easy to do anywhere, even with Node.js',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      });
  })
}

module.exports = { sendEmail };