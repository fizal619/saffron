const AWS = require('aws-sdk');
const SES = new AWS.SES({ region: 'us-east-1' });
const htmlGen = require("./htmlGen");

exports.handler = async (event, context)  => {
  console.log("EVENT", event);
  console.log("CONTEXT", context);
  const {
    customer,
    email,
    type
  } = JSON.parse(event.body);
  const {
    from,
    reply_to: replyTo,
    subject,
  } = {
    from: "noreply@saffroncateringgy.com",
    reply_to:  "noreply@saffroncateringgy.com",
    subject: `Saffron Catering: ${type === "contact" ? "message from" : "Order for"} ${customer}`
  };
  const fromBase64 = Buffer.from(from).toString('base64');

  const htmlBody = htmlGen(event);

  const recipients = ["admin@saffroncateringgy.com", "supriya@saffroncateringgy.com"];

  if (type === "order") {
    recipients.push(email);
  }

  for (let index = 0; index < recipients.length; index++) {
    const to = recipients[index];
    const sesevent = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      ReplyToAddresses: [replyTo],
      Source: `=?utf-8?B?${fromBase64}?= <noreply@saffroncateringgy.com>`,
    };
    const response = await SES.sendEmail(sesevent).promise();
    console.log(to, response);
  }

  const response2 = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: 'It worked!',
  };
  return JSON.stringify(response2);

}


