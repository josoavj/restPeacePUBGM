// --- Gestion du formulaire d'inscription avec validation ---

// Fonction pour afficher les messages à l'utilisateur
function showMessage(message, type = 'info') {
  const messageDiv = document.getElementById('form-message');
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';

    // Cache le message après 5 secondes
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  } else {
    console.log(`Message (${type}): ${message}`);
  }
}

// Validation des données du formulaire
function validateForm(formData) {
  const errors = [];

  // Validation du nom complet
  if (!formData.full_name || formData.full_name.trim().length < 3) {
    errors.push('Le nom complet doit contenir au moins 3 caractères.');
  }

  // Validation de la date de naissance
  const birthDate = new Date(formData.birth_date);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today.getMonth() < birthDate.getMonth() || 
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 13) {
    errors.push('Vous devez avoir au moins 13 ans pour rejoindre la team.');
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    errors.push('Veuillez entrer une adresse email valide.');
  }

  // Validation du pseudo PUBG
  if (!formData.pubgm_pseudo || formData.pubgm_pseudo.trim().length < 3) {
    errors.push('Le pseudo PUBG doit contenir au moins 3 caractères.');
  }

  // Validation de l'ID PUBG
  if (!formData.pubgm_id || formData.pubgm_id.trim().length !== 10) {
    errors.push('L\'ID PUBG doit contenir exactement 10 chiffres.');
  } else if (!/^\d{10}$/.test(formData.pubgm_id)) {
    errors.push('L\'ID PUBG ne doit contenir que des chiffres.');
  }

  // Validation du nom d'utilisateur
  if (!formData.username || formData.username.trim().length < 3) {
    errors.push('Le nom d\'utilisateur doit contenir au moins 3 caractères.');
  }

  // Validation du mot de passe
  if (!formData.password || formData.password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères.');
  }

  // Validation de la confirmation du mot de passe
  if (formData.password !== formData.confirm_password) {
    errors.push('Les mots de passe ne correspondent pas.');
  }

  return errors;
}

// --- Point d'entrée de l'application après le chargement du DOM ---
document.addEventListener('DOMContentLoaded', () => {
  // Sélection du formulaire et des boutons
  const registrationForm = document.querySelector('.registration-form-section form');

  // Gestion de la soumission du formulaire
  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Récupération des données du formulaire
      const formData = new FormData(registrationForm);
      const data = Object.fromEntries(formData);

      // Validation du formulaire
      const errors = validateForm(data);

      if (errors.length > 0) {
        showMessage(errors.join(' '), 'error');
        return;
      }

      // Simulation de l'envoi des données (en production, envoyer vers un backend)
      console.log('Données du formulaire soumises:', data);
      
      // Message de succès
      showMessage('Merci ! Votre inscription a été enregistrée. Nous vous contacterons bientôt.', 'success');
      registrationForm.reset();

      // Redirection après 3 secondes
      setTimeout(() => {
        window.location.href = './index.html';
      }, 3000);
    });
  }

  // Validation en temps réel pour le champ d'ID PUBG
  const pubgmIdInput = document.getElementById('pubgm_id');
  if (pubgmIdInput) {
    pubgmIdInput.addEventListener('input', (e) => {
      // Autoriser uniquement les chiffres
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  // Validation en temps réel pour la confirmation du mot de passe
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm_password');

  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('input', (e) => {
      if (passwordInput.value !== e.target.value) {
        confirmPasswordInput.style.borderColor = '#ef4444';
      } else {
        confirmPasswordInput.style.borderColor = '';
      }
    });
  }
});
