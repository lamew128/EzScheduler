const sgMail = require('@sendgrid/mail')

const sendEmail = (email,title,description) => {
  console.log(process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  console.log(email)
  console.log(title)
  console.log(description)
  console.log("send email called")
    const msg = {
      to: `${email}`,
      from: 'no-reply@ezscheduler.ca',
      subject: `${title}`,
      text: `${description}`
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error.response.body.errors)
      });
}

module.exports = { sendEmail };