const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = () => {
  console.log("send email called")
    const msg = {
      to: `dwu233@gmail.com`,
      from: 'no-reply@ezscheduler.ca',
      subject: `sup`,
      text: `yo`
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      });
}

sendEmail();