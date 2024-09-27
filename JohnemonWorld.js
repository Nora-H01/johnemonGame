const JohnemonArena = require('./JohnemonArena'); // Import arena for fights
const Johnemon = require('./Johnemon'); // Import Johnemon for generating wild encounters


class JohnemonWorld {
    constructor(rl, gameLoop) {
        this.rl = rl;  // Stocke l'interface readline
        this.day = 1; // compte jours
        this.logs = []; // Log actions/events
        this.gameLoop = gameLoop; // Stocke le callback
    }
    

    oneDayPasses(johnemonMaster) {
        this.day++;
        this.addLog(`Day ${this.day}: A new day has begun.`);
        console.log(`Day ${this.day} has passed.`);

        this.askUserAction(johnemonMaster); //avoir option de ce qu'on veut faire
    }

    askUserAction(johnemonMaster) {
        console.log("What would you like to do today?");
        console.log("1. Heal a Johnemon™");
        console.log("2. Revive a Johnemon™");
        console.log("3. Release a Johnemon™");
        console.log("4. Rename a Johnemon™");
        console.log("5. Nothing");
    
        this.rl.question("Enter your action (1-5): ", (choice) => {
            const action = parseInt(choice, 10);
    
            if (action >= 1 && action <= 4) {
                // Appelle la fonction pour choisir un Johnemon
                this.chooseJohnemon(johnemonMaster, action);
            } else if (action === 5) {
                this.nothingPassed(johnemonMaster);
            } else {
                console.log("Invalid choice.");
                this.askUserAction(johnemonMaster); // Redemander si le choix est invalide
            }
        });
    }
    
    chooseJohnemon(johnemonMaster, action) {
        johnemonMaster.showCollection(); // Affiche la collection de Johnemons
    
        this.rl.question("Choose a Johnemon™ by number: ", (index) => {
            const johnemonIndex = parseInt(index, 10) - 1; 
            const selectedJohnemon = johnemonMaster.johnemonCollection[johnemonIndex];
    
            if (!selectedJohnemon) {
                console.log("Invalid Johnemon™ selection.");
                this.chooseJohnemon(johnemonMaster, action); // Redemander si la sélection est invalide
                return;
            }
    
            // Appelle la fonction correspondante selon l'action choisie
            switch (action) {
                case 1:
                    johnemonMaster.healJohnemon(selectedJohnemon);
                    break;
                case 2:
                    johnemonMaster.reviveJohnemon(selectedJohnemon);
                    break;
                case 3:
                    johnemonMaster.releaseJohnemon(selectedJohnemon);
                    break;
                case 4:
                    this.renameJohnemon(johnemonMaster, selectedJohnemon);
                    break;
            }
    
            // Après l'action, déclencher un événement aléatoire
            this.chooseJohnemon(johnemonMaster, action);
        });
    }
    
    renameJohnemon(johnemonMaster, selectedJohnemon) {
        this.rl.question(`Enter a new name for ${selectedJohnemon.nameStudent}: `, (newName) => {
            selectedJohnemon.nameStudent = newName;
            console.log(`Johnemon™ has been renamed to ${newName}.`);
            this.saveGame(johnemonMaster);
            this.gameLoop(johnemonMaster); // Retourne à la boucle de jeu après avoir renommé
        });
    }
    
    nothingPassed(johnemonMaster) {
        this.rl.question("Are you sure you don't want to do anything? (yes/no): ", (answer) => {
            if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                console.log("Doing nothing today...");
                this.oneDayPasses(johnemonMaster);
            } else {
                this.askUserAction(johnemonMaster); // Retourne aux actions
            }
        });
    }
    

    randomEvent(johnemonMaster) {
        console.log("A random event is happening!");

        const event = Math.random() < 0.5 ? 'nothing' : 'wildJohnemon';

        if (event === 'nothing') {
            console.log("Nothing happens today. The day passes.");
            this.addLog(`Day ${this.day}: It's boring...Nothing happened today.`);
            this.saveGame(johnemonMaster);

            // Appel de oneDayPasses() après l'événement
            this.oneDayPasses(johnemonMaster);
        } else if (event === 'wildJohnemon') {
            console.log("A wild Johnemon™ appears!");
            this.rl.question("Do you want to fight it? (yes/no): ", (answer) => {
                if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                    const wildJohnemon = new Johnemon(); // Génére un Johnemon sauvage
                    const arena = new JohnemonArena(johnemonMaster, wildJohnemon); // Lance la bataille
                    arena.startBattle();
                } else if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n')  {
                    console.log("You chose not to fight. The day passes.");
                    this.addLog(`Day ${this.day}: A wild Johnemon™ appeared, but the Master chose not to fight.`);
                    this.saveGame(johnemonMaster);
                }else {
                    console.log("Invalid answer...");
                    this.randomEvent(johnemonMaster);
                }

                // Appel de oneDayPasses() après l'événement
                this.oneDayPasses(johnemonMaster);
            });
        }
    }

    addLog(log) {
        this.logs.push(log);
        console.log(log);
    }
    

    saveGame(johnemonMaster) {
        const gameData = {
            saved_on: new Date(),
            day: this.day,
            JohnemonMaster: {
                name: johnemonMaster.name,
                johnemonCollection: johnemonMaster.johnemonCollection.map(j => ({
                    nameStudent: j.nameStudent,
                    level: j.level,
                    attackRange: j.attackRange,
                    defenseRange: j.defenseRange,
                    healthPool: j.healthPool,
                    currentHealth: j.currentHealth,
                    catchPhrase: j.catchPhrase
                })),
                healingItems: johnemonMaster.healingItems,
                reviveItems: johnemonMaster.reviveItems,
                JOHNEBALLS: johnemonMaster.JOHNEBALLS
            },
            logs: this.logs
        };

        const fs = require('fs');
        fs.writeFileSync('save.json', JSON.stringify(gameData, null, 2));
        console.log("Game saved successfully.");
    }
}

module.exports = JohnemonWorld;
