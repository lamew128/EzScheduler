const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.REACT_APP_API_KEY_SENDGRID)
console.log(process.env);
const msg = {
  to: 'dwu233@gmail.com', // Change to your recipient
  from: 'dwu233@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })