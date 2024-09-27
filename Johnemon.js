const students = [
  'Oli', 'via',
  'No', 'ra',
  'Di', 'ana',
  'Mo', 'hab',
  'Ly', 'ne',
  'Ja', 'son',
  'Sébas', 'tien',
  'Cris', 'telle',
  'Fa', 'rid',
  'Thi', 'baut',
  'Edou', 'ard',
  'mbo', 'gle',
  'Ben', 'jamin',
  'Mat', 'teo',
  'Re', 'da',
  'Dona', 'tien',
  'Ren', 'aud',
  'An', 'toine',
  'Nahi', 'mana',
  'Sté', 'phen',
  'Moha', 'med',
  'Hak', 'im',
  'Pier', 're',
  'Hu', 'go',
  'Thé', 'o',
  'Max', 'ime'
];

class Johnemon {
  constructor() {
    this.nameStudent = this.generateRandomName(); // Génère un nom aléatoire
    this.level = 1; // Niveau de départ
    this.experienceMeter = 0; // Compteur d'expérience
    this.attackRange = this.getRandomNumber(1, 8); // Plage d'attaque aléatoire
    this.defenseRange = this.getRandomNumber(1, 3); // Plage de défense aléatoire
    this.healthPool = this.getRandomNumber(10, 30); // Points de vie aléatoires
    this.currentHealth = this.healthPool; // Santé actuelle initialisée à la santé maximale
    this.catchPhrase = this.generateCatchPhrase(); // Phrase d'accroche aléatoire
  }
  
  formatName(nameStudent) { //avoir minuscule sauf première lettre
    return nameStudent.charAt(0).toUpperCase() + nameStudent.slice(1).toLowerCase();
  }

  generateRandomName() { //Génère un nom aléatoire
    let randomStudent1, randomStudent2;
    do {
      randomStudent1 = students[Math.floor(Math.random() * students.length)];
      randomStudent2 = students[Math.floor(Math.random() * students.length)];
    } while (randomStudent1 === randomStudent2); // Assure que les noms sont différents

    return this.formatName(`${randomStudent1}${randomStudent2}`); //formater nom
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateCatchPhrase() {
    const phrases = [
      "I choose you!", 
      "Let the battle begin!", 
      "Johnemon, go!",
      "Let's go, team!",
      "I'm ready to battle!",
      "You can't catch me!",
      "Time to show my strength!"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)]; // Choisit une phrase aléatoire
  }

  attack(defender) { // Calcule les dégâts en fonction de l'attaque et de la défense
    const damage = Math.max(0, this.attackRange * this.level - defender.defenseRange); // Évite les dégâts négatifs
    defender.currentHealth -= damage; // Réduit la santé du défenseur
    console.log(`${this.nameStudent} attacked ${defender.name} and causes ${damage} damage!`); // Affiche les détails de l'attaque
  }

  gainExperience(opponentLevel) {
    const experienceGain = this.getRandomNumber(1, 5) * opponentLevel; // Gagne de l'expérience aléatoire
    this.experienceMeter += experienceGain; // Ajoute l'expérience gagnée
    console.log(`${this.nameStudent} gained ${experienceGain} experience points!`); // Affiche l'expérience gagnée
    // Vérifie si le Johnemon peut évoluer
    if (this.experienceMeter >= this.level * 100) {
      this.evolve(); // Appelle la méthode d'évolution
    }
  }

  evolve() {
    this.level++; // Augmente le niveau
    this.attackRange += this.getRandomNumber(1, 5);
    this.defenseRange += this.getRandomNumber(1, 5);
    this.healthPool += this.getRandomNumber(1, 5);
    this.currentHealth = this.healthPool; // Restauration de la santé maximale

    console.log(`${this.nameStudent} evolved into a higher level! New stats: Level ${this.level}, Attack Range ${this.attackRange}, Defense Range ${this.defenseRange}, Health Pool ${this.healthPool}`); // Affiche les nouvelles statistiques
  }

  sayCatchPhrase() {
    console.log(`${this.nameStudent} says: "${this.catchPhrase}"`); 
  }
}

module.exports = Johnemon; 