/**
 * @fileoverview Funcionalidad principal del portafolio
 * @author Marcos Castro
 * @version 1.0.0
 * 
 * @example
 * // Inicialización del portafolio
 * document.addEventListener('DOMContentLoaded', () => {
 *     // El código se ejecuta cuando el DOM está listo
 * });
 * 
 * @flowchart
 * graph TD
 *     A[Usuario ingresa a la página] --> B{¿Es primera visita?}
 *     B -->|Sí| C[Mostrar animación de bienvenida]
 *     B -->|No| D[Cargar contenido normal]
 *     C --> D
 *     D --> E[Inicializar navegación]
 *     D --> F[Inicializar formulario]
 *     D --> G[Inicializar proyectos]
 */

// Implementación del desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efecto de desplazamiento del encabezado
const header = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Efectos hover en las tarjetas de proyectos
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Funcionalidad del menú móvil
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('show');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('show');
        });
    });
});

/**
 * Valida un campo de formulario
 * @param {HTMLInputElement|HTMLTextAreaElement} field - Campo a validar
 * @returns {boolean} - true si el campo es válido
 * 
 * @example
 * // Validar un campo de email
 * const emailField = document.querySelector('#email');
 * const isValid = validateField(emailField);
 * 
 * @flowchart
 * graph TD
 *     A[Inicio validación] --> B{Obtener valor}
 *     B --> C{¿Tipo de campo?}
 *     C -->|Email| D[Validar formato email]
 *     C -->|Texto| E[Validar longitud]
 *     C -->|Textarea| F[Validar longitud]
 *     D --> G{¿Válido?}
 *     E --> G
 *     F --> G
 *     G -->|Sí| H[Limpiar error]
 *     G -->|No| I[Mostrar error]
 *     H --> J[Fin]
 *     I --> J
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Por favor, ingresa un email válido';
            break;
        case 'text':
            isValid = value.length >= 2;
            errorMessage = 'Este campo debe tener al menos 2 caracteres';
            break;
        case 'textarea':
            isValid = value.length >= 10;
            errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

/**
 * Muestra un mensaje de error para un campo
 * @param {HTMLInputElement|HTMLTextAreaElement} field - Campo con error
 * @param {string} message - Mensaje de error
 */
function showFieldError(field, message) {
    const errorDiv = field.parentElement.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.classList.add('error');
    if (!field.parentElement.querySelector('.error-message')) {
        field.parentElement.appendChild(errorDiv);
    }
}

/**
 * Limpia el mensaje de error de un campo
 * @param {HTMLInputElement|HTMLTextAreaElement} field - Campo a limpiar
 */
function clearFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('error');
}

/**
 * Muestra un mensaje de feedback
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje ('success' o 'error')
 */
function showFeedback(message, type) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `feedback-message ${type}`;
    feedbackDiv.textContent = message;
    document.body.appendChild(feedbackDiv);

    setTimeout(() => {
        feedbackDiv.remove();
    }, 3000);
}

// Funcionalidad del modal de contacto
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const openModalBtn = document.querySelector('.open-modal-btn');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const contactForm = document.querySelector('.contact-form');

    // Abrir modal
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    });

    // Cerrar modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Validación en tiempo real
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validar todos los campos
        const fields = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFeedback('Por favor, corrige los errores en el formulario', 'error');
            return;
        }

        try {
            // Simulación de envío
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showFeedback('Mensaje enviado con éxito', 'success');
            closeModal();
            contactForm.reset();
        } catch (error) {
            showFeedback('Error al enviar el mensaje', 'error');
        }
    });
});
