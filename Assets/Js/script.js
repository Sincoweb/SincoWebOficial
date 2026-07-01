document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide');

    let currentIndex = 0;
    let autoScrollTimer;

    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }

    function startAutoScroll() {
        autoScrollTimer = setInterval(nextSlide, 3000); 
    }

    function resetAutoScroll() {
        clearInterval(autoScrollTimer);
        startAutoScroll();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoScroll();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        updateSlider();
        resetAutoScroll();
    });

    startAutoScroll();


    /*Lugar de codigo de aparicion*/
    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null, // Usa la pantalla del navegador como referencia
        rootMargin: "0px",
        threshold: 0.20 // Se dispara cuando el 15% de la sección ya es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la sección entra en la pantalla, le clavamos la clase visible
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejamos de observarla para que la animación se ejecute una sola vez
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Le activamos el sensor a cada sección que encontramos con esa clase
    sections.forEach(section => {
        sectionObserver.observe(section);
    });




    const counterElement = document.getElementById("speedCounter");
    if (counterElement) {
        const targetNumber = 99;
        const duration = 1500; // Duración en milisegundos (1.5 segundos)

        const startCounting = () => {
            let startTimestamp = null;
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                // Efecto de desaceleración matemática (Ease-Out) para que frene suave al final
                const easeOutQuad = progress * (2 - progress);
                
                counterElement.innerText = Math.floor(easeOutQuad * targetNumber);
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            
            window.requestAnimationFrame(step);
        };

        // Ponemos un sensor para que cuente solo cuando la tarjeta de performance aparezca
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.unobserve(entry.target); // Se ejecuta una sola vez
                }
            });
        }, { threshold: 0.3 }); // Se dispara cuando se ve el 30% de la tarjeta

        observer.observe(document.querySelector('.performance-card'));
    }
});

