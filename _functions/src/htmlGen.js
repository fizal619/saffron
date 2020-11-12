module.exports = (event) => {
  const {
    customer,
    email,
    date = "",
    phone = "",
    bag = {},
    body = "",
    address = "",
    type
  } = JSON.parse(event.body);

  if (type === "contact") {
    return `
    <!DOCTYPE html>
    <html>
      <style>
        body {
          font-family: sans-serif;
          margin: 25px 50px;
        }
        h2 {
          text-transform: capitalize;
        }
      </style>
      <head></head>
      <body>
        <h2>${type}</h2>
        <h4>${customer} (${email}) said:</h4>
        <p>${body}</p>
        <br>
        <p>This message was sent from a unmonitored mailbox.</p>
        <p>Please do not reply to this email. Contact supriya@saffroncateringgy.com with any concerns</p>
      </body>
    </html>
  `;
  }

  if (type === "order") {
    const items = Object.values(bag);
    let runningTotal = 0;
    return `
      <!DOCTYPE html>
      <html>
        <style>
          body {
            font-family: sans-serif;
            margin: 25px 50px;
          }
          h2 {
            text-transform: capitalize;
          }
        </style>
        <head></head>
        <body>
          <h2>${type}</h2>
          <h4>${customer} (${email}, ${phone})</h4>
          <p>${address}</p>
          <hr/>
          ${items.reduce((p,c) => {
            runningTotal += c.qty * c.price
            return p + `
              <p><b>${c.qty}</b> x ${c.name} <i>${c.option}</i> <b>$${c.qty * c.price}</b><p>
              <p>${c.instructions ? `Special instructions: ${c.instructions}` : ""}</p>
            `
          }, "")}
          <p>Total: $${runningTotal}</p>
          <p>Pickup/Delivery Date: ${date}</p>
          <p>A representative will call you soon to confirm your order.</p>
          <p>This message was sent from a unmonitored mailbox.</p>
          <p>Please do not reply to this email. Contact supriya@saffroncateringgy.com with any concerns</p>
        </body>
      </html>
    `;
  }


}