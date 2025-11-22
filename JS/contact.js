// JavaScript pour la page contact.html

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Ouvrir/Fermer le courant
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Récupération des données
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation basique
            if (!data.full_name || !data.email || !data.subject || !data.message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Simulation d'envoi (en production, utiliser un service backend)
            console.log('Données du formulaire:', data);
            
            // Message de succès
            showMessage('Merci ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.', 'success');
            contactForm.reset();

            // Masquer le message après 5 secondes
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll vers le message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});
