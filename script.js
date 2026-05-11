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

// Compteur pour donner un identifiant unique à chaque expérience ajoutée
let experienceCount = 0;

// Récupérer le bouton "Ajouter une expérience"
const addExperienceBtn = document.getElementById('addExperienceBtn');
// Récupérer le conteneur où on ajoutera les blocs
const experiencesList = document.getElementById('experiencesList');

// Quand on clique sur le bouton, on ajoute un nouveau bloc d'expérience
addExperienceBtn.addEventListener('click', () => {
    experienceCount++;
    const id = experienceCount;

    // On crée un nouvel élément HTML (un "bloc d'expérience")
    const block = document.createElement('div');
    block.className = 'experience-item';
    block.id = `experience-${id}`;

    // On définit son contenu (les champs du formulaire)
    block.innerHTML = `
        <div class="experience-item-header">
            <span class="experience-item-title">Expérience ${id}</span>
            <button type="button" class="btn-remove" data-target="experience-${id}">×</button>
        </div>

        <div class="form-field">
            <label>Poste</label>
            <input type="text" placeholder="Développeur Web Senior">
        </div>

        <div class="form-field">
            <label>Entreprise</label>
            <input type="text" placeholder="Nom de l'entreprise">
        </div>

        <div class="form-row">
            <div class="form-field">
                <label>Date de début</label>
                <input type="text" placeholder="Janvier 2020">
            </div>
            <div class="form-field">
                <label>Date de fin</label>
                <input type="text" placeholder="Présent">
            </div>
        </div>

        <div class="form-field">
            <label>Description</label>
            <textarea rows="3" placeholder="Vos missions et réalisations..."></textarea>
        </div>
    `;

    // On ajoute le bloc dans la page
    experiencesList.appendChild(block);
});