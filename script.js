document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll handling with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-mesh');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                
                // Add special animations for specific elements
                if (entry.target.classList.contains('card-hover')) {
                    entry.target.style.transitionDelay = '0.2s';
                }
                if (entry.target.classList.contains('hexagon')) {
                    entry.target.style.transitionDelay = '0.3s';
                }
            }
        });
    }, observerOptions);

    // Observe all sections and animated elements
    document.querySelectorAll('section, .card-hover, .hexagon').forEach(element => {
        element.classList.add('transition', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(element);
    });

    // Enhanced form handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const inputs = {
                name: document.getElementById('name'),
                email: document.getElementById('email'),
                company: document.getElementById('company'),
                message: document.getElementById('message')
            };

            // Reset previous states
            Object.values(inputs).forEach(input => {
                input.classList.remove('border-red-500', 'bg-red-50');
                input.classList.remove('border-green-500', 'bg-green-50');
            });
            formMessage.className = 'hidden';

            // Validate inputs
            let isValid = true;
            let errorMessage = '';

            // Name validation
            if (!inputs.name.value.trim()) {
                inputs.name.classList.add('border-red-500', 'bg-red-50');
                errorMessage = 'Por favor ingresa tu nombre';
                isValid = false;
            } else {
                inputs.name.classList.add('border-green-500', 'bg-green-50');
            }

            // Email validation
            if (!inputs.email.value.trim()) {
                inputs.email.classList.add('border-red-500', 'bg-red-50');
                errorMessage = errorMessage || 'Por favor ingresa tu email';
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(inputs.email.value.trim())) {
                    inputs.email.classList.add('border-red-500', 'bg-red-50');
                    errorMessage = 'Por favor ingresa un email válido';
                    isValid = false;
                } else {
                    inputs.email.classList.add('border-green-500', 'bg-green-50');
                }
            }

            // Company validation
            if (!inputs.company.value.trim()) {
                inputs.company.classList.add('border-red-500', 'bg-red-50');
                errorMessage = errorMessage || 'Por favor ingresa el nombre de tu empresa';
                isValid = false;
            } else {
                inputs.company.classList.add('border-green-500', 'bg-green-50');
            }

            // Message validation
            if (!inputs.message.value.trim()) {
                inputs.message.classList.add('border-red-500', 'bg-red-50');
                errorMessage = errorMessage || 'Por favor describe qué te gustaría transformar';
                isValid = false;
            } else {
                inputs.message.classList.add('border-green-500', 'bg-green-50');
            }

            if (!isValid) {
                showFormMessage(errorMessage, 'error');
                return;
            }

            // Simulate form submission with loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            submitButton.disabled = true;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showFormMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                
                // Reset success states after 3 seconds
                setTimeout(() => {
                    Object.values(inputs).forEach(input => {
                        input.classList.remove('border-green-500', 'bg-green-50');
                    });
                }, 3000);
            } catch (error) {
                console.error('Error submitting form:', error);
                showFormMessage('Hubo un error al enviar el formulario. Por favor intenta nuevamente.', 'error');
            } finally {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    function showFormMessage(message, type) {
        formMessage.className = `mt-4 p-4 rounded-lg text-center ${
            type === 'error' 
                ? 'text-red-700 bg-red-100' 
                : 'text-green-700 bg-green-100'
        }`;
        formMessage.textContent = message;
        
        // Scroll to message if it's not in view
        if (!isElementInViewport(formMessage)) {
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add hover effects to feature cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
});
