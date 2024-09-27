class JohnemonMaster {
    constructor(name) {
        this.name = name; // Nom du maître Johnemon
        this.johnemonCollection = []; // Collection de Johnemons capturés
        this.healingItems = 5; // Nombre initial d'objets de soin
        this.reviveItems = 3; // Nombre initial d'objets de résurrection
        this.JOHNEBALLS = 10; // Nombre initial de JOHNEBALLS
        this.day = 1; // Jour initial
    }

    healJohnemon(johnemon) { 
        const healPoints = Math.floor(Math.random() * 11) + 5; // Génère un nombre aléatoire entre 5 et 15
        johnemon.currentHealth = Math.min(johnemon.currentHealth + healPoints, johnemon.healthPool); // Soigne sans dépasser la santé maximale
        console.log(`${johnemon.nameStudent} has been healed by ${healPoints} points! Current Health: ${johnemon.currentHealth}/${johnemon.healthPool}`);
        this.showCollection(); // Montre la collection après guérison
    }
    
    reviveJohnemon(johnemon) {
        if (johnemon.currentHealth === 0) { //que si 0 en santé
            johnemon.currentHealth = Math.floor(johnemon.healthPool / 2); 
            console.log(`${johnemon.nameStudent} has been revived with ${johnemon.currentHealth} health!`);
        } else {
            console.log(`${johnemon.nameStudent} cannot be revived because it still has health!`);
        }
    }

    catchJohnemon(johnemon) { 
        if (this.JOHNEBALLS > 0) {
            this.johnemonCollection.push(johnemon); // Ajoute le Johnemon à la collection
            this.JOHNEBALLS--;
            console.log(`${johnemon.nameStudent} has been caught! Remaining Johneballs: ${this.JOHNEBALLS}`);
        } else {
            console.log("No Johneballs left!");
        }
        this.showCollection(); // Montre la collection après capture
    }
    
    addJohnemon(johnemon) { 
        this.johnemonCollection.push(johnemon); 
        console.log(`${johnemon.nameStudent} has been added to your collection!`);
        this.showCollection(); // Montre la collection après ajout
    }
    
    releaseJohnemon(johnemon) {
        if (this.johnemonCollection.length === 1) { // Empêche de relâcher le dernier Johnemon
            console.log(`You cannot release ${johnemon.nameStudent} because it's the only Johnemon in your collection!`);
            return;
        }
        
        this.johnemonCollection = this.johnemonCollection.filter(j => j !== johnemon);
        console.log(`${johnemon.nameStudent} has been released from your collection!`);
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
