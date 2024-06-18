const initSlider = () => {
  const sliderContainer = document.querySelector('.slider__container');
  const slider = sliderContainer.querySelector('.slider');
  const slides = slider.querySelectorAll('.slide');
  const parentWidth = sliderContainer.offsetWidth;

  sliderContainer.style.maxWidth = parentWidth + 'px';

  slides.forEach((e) => {
    e.style.display = 'flex';
  });
};

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slider');

  if (!slider) return

  const slides = slider.querySelectorAll('.slide');
  const prevButton = slider.previousElementSibling;
  const nextButton = slider.nextElementSibling;
  const gap = parseInt(getComputedStyle(slider).gap) || 0; // Получаем размер gap

  let activeSlideIndex = 0;
  let isEndContainer = false;

  function setActiveSlide(index) {
    let scroll = index * (slides[index].offsetWidth + gap);

    if (slider.scrollWidth < scroll + slides[index].offsetWidth) {
      scroll = slider.scrollWidth;
      isEndContainer = true;
    } else {
      isEndContainer = false;
    }

    slider.scrollTo({
      left: scroll,
      behavior: 'smooth',
    });

    activeSlideIndex = index;
  }

  function prevSlide() {
    if (activeSlideIndex > 0) {
      setActiveSlide(activeSlideIndex - 1);
    }
  }

  function nextSlide() {
    if (activeSlideIndex < slides.length - 1 && !isEndContainer) {
      setActiveSlide(activeSlideIndex + 1);
    }
  }

  initSlider();

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);


  const activeSlide = slider.querySelector('.slide.active');
  if (activeSlide) {
    let currentIndex = 0;
    let currentScroll = 0;
    while (currentIndex < activeSlideIndex && currentScroll < activeSlide.offsetLeft) {
      currentScroll += slides[currentIndex].offsetWidth + gap;
      setActiveSlide(currentIndex);
      currentIndex++;
    }
  }
});
