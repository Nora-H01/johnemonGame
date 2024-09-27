const JohnemonMaster = require('./JohnemonMaster'); // Import the JohnemonMaster class
const Johnemon = require('./Johnemon'); // Import the Johnemon class
const JohnemonWorld = require('./JohnemonWorld'); // Import the JohnemonWorld class

const randomWildNames = [
  "Zorak",
  "Fluffybear",
  "Spiky",
  "Fireclaw",
  "Bubblegump",
  "Thunderstrike",
  "Leafy"
];

// Déclaration des variables
let johnemonMaster;
let johnemon2;

// Déclaration de la classe JohnemonArena
class JohnemonArena {
  constructor(johnemon_1, johnemon_2, wildJohnemonNames) {
    this.johnemonMaster = johnemon_1;
    this.wildJohnemon = this.createWildJohnemon(wildJohnemonNames);
  }

  createWildJohnemon(wildJohnemonNames) {
    const randomName = wildJohnemonNames[Math.floor(Math.random() * wildJohnemonNames.length)];
    const level = Math.floor(Math.random() * 5) + 1; // Random level between 1 and 5
    return {
      nameStudent: randomName,
      level: level,
      healthPool: level * 20, // Example: 20 health per level
      maxHealth: level * 20,
      attackRange: 10, // Example attack range
    };
  }

  startBattle() {
    console.log(`A wild level ${this.wildJohnemon.level} ${this.wildJohnemon.nameStudent} appears!`);
    console.log(`It has ${this.wildJohnemon.healthPool} health.`);

    this.chooseJohnemon();
  }

  chooseJohnemon() {
    console.log("Choose a Johnemon™ from your collection to fight:");
    this.johnemonMaster.showCollection();
  }

  battleRound(selectedJohnemon) {
    console.log(`Your Johnemon™ ${selectedJohnemon.nameStudent} has ${selectedJohnemon.healthPool} health.`);
    console.log(`The wild ${this.wildJohnemon.nameStudent} has ${this.wildJohnemon.healthPool} health.`);

    console.log("Choose your action:");
    console.log("1. Attack");
    console.log("2. Try to catch");
    console.log("3. Run away");
  }

  // Ajoute d'autres méthodes ici
  startRound(selectedJohnemon) {
    // Logique de démarrage de round
  }

  playerAction(selectedJohnemon) {
    // Logique d'action du joueur
  }

  attack(selectedJohnemon) {
    // Logique d'attaque
  }

  tryToCatch() {
    // Logique pour essayer d'attraper
  }

  calculateDamage(attackRange, defenseRange) {
    // Logique de calcul des dégâts
  }

  wildJohnemonAction() {
    // Logique d'action du Johnemon sauvage
  }

  checkBattleStatus() {
    // Vérification de l'état de la bataille
  }

  startNewRound() {
    // Logique de démarrage d'un nouveau round
  }

  endBattle() {
    // Logique de fin de bataille
  }
}

// Création de l'instance de JohnemonArena après la déclaration de la classe
const johnemonArena = new JohnemonArena(johnemonMaster, johnemon2, randomWildNames);

// Exportation de la classe
module.exports = JohnemonArena;
