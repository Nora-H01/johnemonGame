class JohnemonMaster {
    constructor(name) {
        this.name = name; // Nom du maître Johnemon
        this.johnemonCollection = []; // Collection de Johnemons capturés
        this.healingItems = 5; // Nombre initial d'objets de soin
        this.reviveItems = 3; // Nombre initial d'objets de résurrection
        this.JOHNEBALLS = 10; // Nombre initial de JOHNEBALLS
        this.day = 1; // Jour initial
    }

    healJohnemon(johnemon) { // soigner 
        johnemon.currentHealth = johnemon.healthPool; // Rétablit la santé actuelle à la santé maximale
        console.log(`${johnemon.nameStudent} has been healed!`); // Affiche un message de confirmation
    }

    reviveJohnemon(johnemon) { // faire revivre
        johnemon.currentHealth = johnemon.healthPool / 2; // Rétablit la santé actuelle à la moitié de la santé maximale
        console.log(`${johnemon.nameStudent} has been revived!`); // Affiche un message de confirmation
    }

    catchJohnemon(johnemon) { // capturer et ajouter à la collection
        if (this.JOHNEBALLS > 0) {
          this.johnemonCollection.push(johnemon); // Ajoute le Johnemon à la collection
          this.JOHNEBALLS--;
          console.log(`${johnemon.nameStudent} has been caught! Remaining Johneballs: ${this.JOHNEBALLS}`);
        } else {
          console.log("No Johneballs left!");
        }
      }
    
    addJohnemon(johnemon) { 
        this.johnemonCollection.push(johnemon); 
        console.log(`${johnemon.nameStudent} has been added to your collection!`); // Affiche un message de confirmation
    }

    releaseJohnemon(johnemon) { // libérer un Johnemon de la collection
        // Filtre la collection pour retirer le Johnemon libéré
        this.johnemonCollection = this.johnemonCollection.filter(j => j !== johnemon);
        console.log(`${johnemon.nameStudent} has been released!`); // Affiche un message de confirmation
    }

    showCollection() { // afficher la collection de Johnemons
        console.log("Your Johnemon™ Collection: "); // Titre de la collection
        this.johnemonCollection.forEach((j, index) => {    // Affiche les détails

        console.log(`${index + 1}. ${j.nameStudent} 
            Level: ${j.level}
            Stats : - Attack Range: ${j.attackRange}
                    - Defense Range : ${j.defenseRange} 
                    - Health: ${j.healthPool}`);
    });
      
    }
    
}

module.exports = JohnemonMaster;
