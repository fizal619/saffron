function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
          <hr/>
          <h4>${customer} (${email}, ${phone})</h4>
          <p>${address}</p>
          <hr/>
          <h3>Order Summary</h3>
          ${items.reduce((p,c) => {
            runningTotal += c.qty * c.price
            return p + `
              <p><b>${c.qty}</b> x ${c.name} <i>${c.option}</i> <b>$${commas(c.qty * c.price)}</b><p>
              <p>${c.instructions ? `Special instructions: ${c.instructions}` : ""}</p>
            `
          }, "")}
          <br>
          <p><b>Total:</b> $${commas(runningTotal)}</p>
          <p><b>Pickup/Delivery Date:</b> ${date}</p>
          <hr/>
          <p>A representative will call you soon to confirm your order.</p>
          <p>This message was sent from a unmonitored mailbox.</p>
          <p>Please do not reply to this email. Contact supriya@saffroncateringgy.com with any concerns</p>
        </body>
      </html>
    `;
  }


}