const formInputs = document.querySelectorAll(".form__field");
const submitButton = document.querySelector("#submit-button");
(function () {
  emailjs.init("user_bCXoTC83AQmbcQOnNKyuJ");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // generate the contact number value
      this.contact_number.value = (Math.random() * 100000) | 0;
      emailjs.sendForm("gmail", "contact_form", this);
      formInputs.forEach((input) => {
        input.value = "";
      });
      alert(
        "Your message sent successfully! I will reply as soon as possible :)"
      );
    });
};

// navbar collapsed ------------
const toggler = document.querySelector(".navbar-toggler");
const mainNav = document.querySelector(".navbar");
const smallNav = document.querySelector(".nav-smallscreen");

toggler.addEventListener("click", () => {
  smallNav.classList.toggle("fadeout");
  smallNav.classList.toggle("show");
});
