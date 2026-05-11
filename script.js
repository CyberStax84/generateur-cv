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
});