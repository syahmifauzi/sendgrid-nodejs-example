require('dotenv').config();
const fetch = require('node-fetch');

(async function () {
  const htmlData = `
    <p>
      <strong>Full Name</strong>: Syahmi Fauzi<br />
      <strong>Email</strong>: brosyahmifauzi@gmail.com<br />
      <strong>Message</strong>:<br />Hola!
    </p>
  `;

  const emailBody = {
    personalizations: [
      {
        to: [
          {
            email: process.env.SG_RECIPIENT_EMAIL,
            name: process.env.SG_RECIPIENT_NAME,
          },
        ],
        subject: process.env.SG_SUBJECT,
      },
    ],
    content: [{ type: 'text/html', value: htmlData }],
    from: {
      email: process.env.SG_SENDER_EMAIL,
      name: process.env.SG_SENDER_NAME,
    },
    reply_to: {
      email: process.env.SG_SENDER_EMAIL,
      name: process.env.SG_SENDER_NAME,
    },
  };

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailBody),
  });

  console.log(emailBody);
  console.log(res);

  if (res.status === 202) {
    console.log(`The form has been submitted successfully.`);
  } else {
    console.log(`There was an error submitting the form`);
  }
})();
