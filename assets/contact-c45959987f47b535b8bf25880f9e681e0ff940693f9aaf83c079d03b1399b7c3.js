const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(e){
  e.preventDefault();
  const body = {
    value1: e.target.name.value,
    value2: e.target.email.value,
    value3: e.target.message.value
  }

  fetch("", {
    method: "POST",
    body: body
  })
    .then(function() {
      Toastify({
        text: "Message Sent. We'll Be in touch! 📧",
        duration: 2000,
        stopOnFocus: false,
        backgroundColor: "linear-gradient(to right, #b095db, #9A7DCA)"
      }).showToast();
      e.target.reset();
    })
    .catch(function() {
      Toastify({
        text: "Message Not Sent. Something went wrong.",
        duration: 2000,
        stopOnFocus: false,
        backgroundColor: "linear-gradient(to right, #b095db, #9A7DCA)"
      }).showToast();
    });

});
