document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slider__slide");
    let currentSlide = 0;
  
    function showSlide(index) {
      slides.forEach(slide => slide.style.display = "none");
      slides[index].style.display = "block";
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
  
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
  
    document.querySelector(".slider__next").addEventListener("click", nextSlide);
    document.querySelector(".slider__prev").addEventListener("click", prevSlide);
  
    setInterval(nextSlide, 4000); // Cambia la imagen cada 5 segundos
  });