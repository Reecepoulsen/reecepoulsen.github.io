var slideIndex = 1;
var numSlides = document.getElementsByClassName("slideshow-img").length;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += (n % numSlides));
}

function currentSlide(n){
  showSlides(slideIndex = (n % numSlides));
}

function showSlides(n){
  let slides = document.getElementsByClassName("slideshow-img");
  let dots = document.getElementsByClassName("dot");

  // set all the slides to display none
  for (let i = 0; i < slides.length; i++){
    slides[i].style.display = "none";
  }

  // make all of the dots inactive
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active-dot", "");
  }

  if (n < 1){
    slideIndex = numSlides;
  }

  if (n > numSlides){
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex -1 ].classList.toggle("active-dot");
}