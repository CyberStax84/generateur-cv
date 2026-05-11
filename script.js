// === Connecter chaque champ du formulaire à sa zone du CV ===

// On définit les "ponts" : pour chaque champ, on indique
// quel élément du CV doit afficher son contenu
const connexions = [
    { champ: 'firstName', cible: 'cvName', secondChamp: 'lastName' },
    { champ: 'lastName',  cible: 'cvName', secondChamp: 'firstName' },
    { champ: 'jobTitle',  cible: 'cvJobTitle' },
    { champ: 'email',     cible: 'cvEmail' },
    { champ: 'phone',     cible: 'cvPhone' },
    { champ: 'city',      cible: 'cvCity' },
    { champ: 'linkedin',  cible: 'cvLinkedin' },
    { champ: 'profile',   cible: 'cvProfile' }
];

// Pour chaque connexion, on "écoute" les modifications du champ
// et on met à jour la zone correspondante du CV
connexions.forEach(({ champ, cible, secondChamp }) => {
    const inputElement = document.getElementById(champ);

    inputElement.addEventListener('input', () => {
        if (secondChamp) {
            // Cas spécial : nom complet (prénom + nom dans la même zone)
            const valeur1 = document.getElementById(champ).value;
            const valeur2 = document.getElementById(secondChamp).value;
            const nomComplet = champ === 'firstName'
                ? `${valeur1} ${valeur2}`.trim()
                : `${valeur2} ${valeur1}`.trim();
            document.getElementById(cible).textContent = nomComplet || 'Votre Nom';
        } else {
            // Cas normal : un champ = une zone du CV
            const valeur = inputElement.value;
            document.getElementById(cible).textContent = valeur;
        }
    });
});// === GESTION DES EXPÉRIENCES PROFESSIONNELLES ===

let experienceCount = 0;

const addExperienceBtn = document.getElementById('addExperienceBtn');
const experiencesList = document.getElementById('experiencesList');
const cvExperiencesSection = document.getElementById('cvExperiencesSection');
const cvExperiencesList = document.getElementById('cvExperiencesList');

// Quand on clique sur "+ Ajouter une expérience"
addExperienceBtn.addEventListener('click', () => {
    experienceCount++;
    const id = experienceCount;

    const block = document.createElement('div');
    block.className = 'experience-item';
    block.dataset.id = id;
    block.innerHTML = `
        <div class="experience-item-header">
            <span class="experience-item-title">Expérience ${id}</span>
            <button type="button" class="btn-remove">×</button>
        </div>

        <div class="form-field">
            <label>Poste</label>
            <input type="text" class="exp-job" placeholder="Développeur Web Senior">
        </div>

        <div class="form-field">
            <label>Entreprise</label>
            <input type="text" class="exp-company" placeholder="Nom de l'entreprise">
        </div>

        <div class="form-row">
            <div class="form-field">
                <label>Date de début</label>
                <input type="text" class="exp-start" placeholder="Janvier 2020">
            </div>
            <div class="form-field">
                <label>Date de fin</label>
                <input type="text" class="exp-end" placeholder="Présent">
            </div>
        </div>

        <div class="form-field">
            <label>Description</label>
            <textarea class="exp-description" rows="3" placeholder="Vos missions et réalisations..."></textarea>
        </div>
    `;

    experiencesList.appendChild(block);

    // À chaque modification dans ce bloc, on redessine la section du CV
    block.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', renderExperiences);
    });

    renderExperiences();
});

// Fonction qui redessine entièrement la section "Expériences" du CV
function renderExperiences() {
    const blocks = experiencesList.querySelectorAll('.experience-item');

    // Si aucun bloc, on masque la section dans le CV
    if (blocks.length === 0) {
        cvExperiencesSection.style.display = 'none';
        return;
    }

    cvExperiencesSection.style.display = 'block';

    // On vide la liste actuelle dans le CV
    cvExperiencesList.innerHTML = '';

    // On reconstruit la liste à partir des blocs du formulaire
    blocks.forEach(block => {
        const job = block.querySelector('.exp-job').value || 'Poste';
        const company = block.querySelector('.exp-company').value || 'Entreprise';
        const start = block.querySelector('.exp-start').value;
        const end = block.querySelector('.exp-end').value;
        const description = block.querySelector('.exp-description').value;

        const dates = [start, end].filter(d => d).join(' — ');

        const item = document.createElement('div');
        item.className = 'cv-experience';
        item.innerHTML = `
            <div class="cv-experience-header">
                <span class="cv-experience-title">${escapeHtml(job)}</span>
                <span class="cv-experience-dates">${escapeHtml(dates)}</span>
            </div>
            <div class="cv-experience-company">${escapeHtml(company)}</div>
            <div class="cv-experience-description">${escapeHtml(description)}</div>
        `;

        cvExperiencesList.appendChild(item);
    });
}

// Petite fonction de sécurité pour éviter les bugs si l'utilisateur tape des caractères spéciaux
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}// === SUPPRESSION D'UNE EXPÉRIENCE ===

// On écoute les clics sur le conteneur de tous les blocs d'expérience
experiencesList.addEventListener('click', (event) => {
    // On vérifie si le clic vient bien d'un bouton de suppression
    if (event.target.classList.contains('btn-remove')) {
        // On remonte jusqu'au bloc parent (.experience-item) et on le supprime
        const block = event.target.closest('.experience-item');
        block.remove();

        // On redessine le CV pour refléter la suppression
        renderExperiences();
    }
});