const contactForm = document.getElementById("contact-form");
let sending = false;
contactForm.addEventListener("submit", function(e){
  e.preventDefault();
  if (sending) return;
  const body = {
    customer: e.target.name.value,
    email: e.target.email.value,
    body: e.target.message.value,
    type: "contact"
  }
  sending = true;
  fetch("https://6hk1ho7jw9.execute-api.us-east-1.amazonaws.com/prod/contact", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(function(r) { return r.json() })
    .then(function(data) {
      console.log(data);
      Toastify({
        text: "Message Sent. We'll Be in touch! 📧",
        duration: 2000,
        stopOnFocus: false,
        backgroundColor: "linear-gradient(to right, #b095db, #9A7DCA)"
      }).showToast();
      e.target.reset();
      sending = false;
    })
    .catch(function() {
      Toastify({
        text: "Message Not Sent. Something went wrong.",
        duration: 2000,
        stopOnFocus: false,
        backgroundColor: "linear-gradient(to right, #b095db, #9A7DCA)"
      }).showToast();
      sending = false;
    });
});
