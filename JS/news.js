// JavaScript pour la page news.html

document.addEventListener('DOMContentLoaded', () => {
    // Filtrage des actualités
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Mettre à jour le bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filtrer les articles
            newsCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Expansion des articles (lire la suite)
    const readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.news-card');
            const isExpanded = card.classList.contains('expanded');

            if (isExpanded) {
                card.classList.remove('expanded');
                link.textContent = 'Lire la suite';
            } else {
                card.classList.add('expanded');
                link.textContent = 'Réduire';
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Merci de vous être abonné avec: ${email}`);
                newsletterForm.reset();
            }
        });
    }
});
