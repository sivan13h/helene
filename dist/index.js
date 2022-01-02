const sliderImages = document.querySelectorAll(".slide-in-image");

// sliding images ------------
function debounce(func, wait = 5, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  sliderImages.forEach((sliderImage) => {
    // half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2 - 20;
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add("active");
    } else {
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));

// navbar collapsed ------------
const toggler = document.querySelector(".navbar-toggler");
const mainNav = document.querySelector(".navbar");
const smallNav = document.querySelector(".nav-smallscreen");

toggler.addEventListener("click", () => {
  smallNav.classList.toggle("fadeout");
  smallNav.classList.toggle("show");
});

// contact --------------------------
const formInputs = document.querySelectorAll(".form__field");
const submitButton = document.querySelector("#submit-button");
const contactForm = document.querySelector("#contact-form");

(function () {
  emailjs.init("user_bCXoTC83AQmbcQOnNKyuJ");
})();

if (contactForm) {
  window.onload = function () {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // generate the contact number value
      this.contact_number.value = (Math.random() * 100000) | 0;
      emailjs.sendForm("gmail", "contact_form", this);
      formInputs.forEach((input) => {
        input.value = "";
      });
      alert(
        "Vielen Dank für deine E-Mail, ich werde mich so bald wie möglich bei dir melden"
      );
    });
  };
}
