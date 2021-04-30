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

// window.onscroll = function () {
//   console.log(window.pageYOffset);
//   if (window.pageYOffset > 300) {
//     mainNav.classList.remove("top");
//   } else {
//     mainNav.classList.add("top");
//   }
// };

getQuote();

$(document).ready(function () {
  $("#getMessage").on("click", function () {
    getQuote();
  });
});

function getQuote() {
  $.getJSON(
    "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
    function (data) {
      $("#quote").html(data.quoteText);
      $("#author").html(data.quoteAuthor);
      $("#tweetQuote")
        .attr(
          "href",
          "https://twitter.com/intent/tweet?text=" +
            data.quoteText +
            "- " +
            data.quoteAuthor
        )
        .attr("target", "_blank");
    }
  );
}
