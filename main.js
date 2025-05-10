// === Multiple Text Animation (Typing Effect) avec pause de 3 secondes ===
const multipleText = document.querySelector('.multiple-text');
const roles = ['UI/UX Developper', 'Frontend Developper', 'Content Creator', 'Web Marketer'];
let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

// Vitesse constante pour la saisie et la suppression (en millisecondes)
const delay = 150;

function typeAnimation() {
    if (!multipleText) return; // Sécurisation si l'élément n'existe pas

    if (isDeleting) {
        // Réduction progressive du texte
        currentText = roles[textIndex].substring(0, charIndex--);
    } else {
        // Affichage progressif du texte
        currentText = roles[textIndex].substring(0, charIndex++);
    }

    multipleText.textContent = currentText;

    // Si le texte est entièrement écrit, on attend 3 secondes avant de démarrer la suppression
    if (!isDeleting && charIndex === roles[textIndex].length) {
        setTimeout(() => {
            isDeleting = true;
            typeAnimation();
        }, 3000);
        return; // On arrête l'exécution pour attendre la pause
    }
    // Une fois le texte complètement supprimé, on passe au texte suivant
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % roles.length;
    }

    // Appel de la fonction avec un délai constant pour une vitesse linéaire
    setTimeout(typeAnimation, delay);
}
typeAnimation();


// === Scroll to Top Button ===
const scrollTopBtn = document.querySelector('.footer-iconTop a');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// === Sticky Navbar Highlight ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100; // Ajustement pour compenser la hauteur de la navbar
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Si la position de défilement se trouve dans la section
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                // On enlève la classe 'active' de tous les liens
                link.classList.remove('active');
                // Correction : utilisation de backticks pour l'interpolation
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});


// === Contact Form Validation ===
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération et nettoyage des valeurs du formulaire
        const fullName = contactForm.querySelector('input[placeholder="Full Name"]').value.trim();
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value.trim();
        const mobileNumber = contactForm.querySelector('input[placeholder="Mobile Number"]').value.trim();
        const subject = contactForm.querySelector('input[placeholder="Email Subject"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        // Optionnel : afficher un message d'erreur dans une div avec id "formError"
        const formError = document.getElementById('formError');

        if (!fullName || !email || !mobileNumber || !subject || !message) {
            if (formError) {
                formError.textContent = 'Veuillez remplir tous les champs avant de soumettre.';
            } else {
                alert('Veuillez remplir tous les champs avant de soumettre.');
            }
            return;
        }

        // Vérification d'une adresse email valide
        if (!/\S+@\S+\.\S+/.test(email)) {
            if (formError) {
                formError.textContent = 'Veuillez entrer une adresse email valide.';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
            return;
        }

        // Réinitialisation du message d'erreur si tout est correct
        if (formError) formError.textContent = '';

        alert('Merci pour votre message! Nous vous répondrons bientôt.');
        contactForm.reset();
    });
}


// === Portfolio Item Hover Effect ===
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

portfolioBoxes.forEach((box) => {
    // Vérifier que l'élément .portfolio-layer existe dans la box
    const layer = box.querySelector('.portfolio-layer');
    if (layer) {
        box.addEventListener('mouseover', () => {
            layer.style.opacity = 1;
        });

        box.addEventListener('mouseout', () => {
            layer.style.opacity = 0;
        });
    }
});


// === Slide-in Animation on Scroll ===
document.addEventListener("DOMContentLoaded", () => {
    const elementsLeft = document.querySelectorAll(".slide-left");
    const elementsRight = document.querySelectorAll(".slide-right");

    function handleScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        const triggerTop = window.innerHeight * 0.2;

        elementsLeft.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;

            // Vérifie si l'élément est visible dans la vue (de haut en bas ou de bas en haut)
            if (elementTop < triggerBottom && elementBottom > triggerTop) {
                el.classList.add("slide-in");
            } else {
                el.classList.remove("slide-in"); // Supprime l'animation si l'élément sort de la vue
            }
        });

        elementsRight.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;

            // Vérifie si l'élément est visible dans la vue (de haut en bas ou de bas en haut)
            if (elementTop < triggerBottom && elementBottom > triggerTop) {
                el.classList.add("slide-in");
            } else {
                el.classList.remove("slide-in"); // Supprime l'animation si l'élément sort de la vue
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Active l'animation au chargement de la page
});



