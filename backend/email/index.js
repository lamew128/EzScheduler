const sgMail = require('@sendgrid/mail')

const sendEmail = (email,title,description) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: `${email}`,
      from: 'no-reply@ezscheduler.ca',
      subject: `${title}`,
      text: `${description}`
    }
    sgMail
      .send(msg)
      .then(() => {
      })
      .catch((error) => {
        console.error(error.response.body.errors)
      });
}

module.exports = { sendEmail };