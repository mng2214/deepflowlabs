// Карусель (как в твоём файле)
document.addEventListener('DOMContentLoaded', function () {
    const track        = document.getElementById('carouselTrack');
    const slides       = document.querySelectorAll('.carousel-slide');
    const dotsContainer= document.getElementById('carouselDots');
    const prevBtn      = document.getElementById('prevBtn');
    const nextBtn      = document.getElementById('nextBtn');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slidesPerView = 3;

    // Точки
    for (let i = 0; i < Math.ceil(totalSlides / slidesPerView); i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer?.appendChild(dot);
    }

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 32; // включая gap
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        document.querySelectorAll('.carousel-dot')?.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
        currentIndex = (currentIndex + 1) % (maxIndex + 1);
        updateCarousel();
    }

    function prevSlide() {
        const maxIndex = Math.ceil(totalSlides / slidesPerView) - 1;
        currentIndex = (currentIndex - 1 + maxIndex + 1) % (maxIndex + 1);
        updateCarousel();
    }

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    setInterval(nextSlide, 5000);
});
