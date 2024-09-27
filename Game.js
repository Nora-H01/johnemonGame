const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster'); // Importation de la classe JohnemonMaster
const Johnemon = require('./Johnemon'); // Importation de la classe Johnemon
const JohnemonWorld = require('./JohnemonWorld'); // Importation de la classe JohnemonWorld
const fs = require('fs'); // Importation du module fs pour la gestion des fichiers

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let johnemonWorld;
let johnemonMaster;

const saveFile = './save.json';

// Fonction pour démarrer le jeu
function startGame() {
   
    rl.question("What's your name ? ", (name) => {
        johnemonMaster = new JohnemonMaster(name); 
        //console.log( `Hello ${johnemonMaster.name}`)
        johnemonWorld = new JohnemonWorld(rl, gameLoop); // Passe rl au constructeur de JohnemonWorld
        presentJohnemons(); // Appel de la fonction pour présenter les Johnemons
    });
}

const johnemons = Array.from({ length: 3 }, () => new Johnemon()); // Crée 3 nouveaux Johnemons
function presentJohnemons() {
    console.log("Choose your first Johnemon™:"); 

    johnemons.forEach((j, index) => {    // Affiche les détails

        console.log(`${index + 1}. ${j.nameStudent} 
            Level: ${j.level}
            Stats : - Attack Range: ${j.attackRange}
                    - Defense Range : ${j.defenseRange} 
                    - Health: ${j.healthPool}`);
    });
    choiseNbr();
}

function choiseNbr(){
    rl.question("Enter the number of the Johnemon™ you want to choose: ", (choice) => {
        const choiceNumber = parseInt(choice, 10);
        if (choiceNumber >= 1 && choiceNumber <= 3) {
            const selectedJohnemon = johnemons[choiceNumber - 1]; // Sélectionne le Johnemon choisi
            johnemonMaster.addJohnemon(selectedJohnemon); // Ajoute le Johnemon à la collection
            saveGame();
            console.log("You've chosen your Johnemon™!");
            gameLoop();
        } else if (/^[a-zA-Z]+$/.test(choice)) {
            console.log("Invalid input: Please enter a number, not a letter.");
            choiseNbr();
        } else {
            console.log("Invalid number: Please enter a number between 1 and 3.");   
            choiseNbr();
        }
 });

 function saveGame() {
    const gameData = {
        saved_on: new Date(),
        JohnemonMaster: {
            name: johnemonMaster.name,
            johnemonCollection: johnemonMaster.johnemonCollection.map(johnemon => ({
                name: johnemon.nameStudent, // Nom du Johnemon
                level: johnemon.level, // Niveau du Johnemon
                experienceMeter: johnemon.experienceMeter, // Barre d'expérience
                attackRange: johnemon.attackRange, // Attaque du Johnemon
                defenseRange: johnemon.defenseRange, // Défense du Johnemon
                healthPool: johnemon.healthPool, // Santé maximale
                catchPhrase: johnemon.catchPhrase // Phrase fétiche
            })),
            healingItems: johnemonMaster.healingItems,
            reviveItems: johnemonMaster.reviveItems,
            JOHNEBALLS: johnemonMaster.JOHNEBALLS
        },
        day: johnemonMaster.day
    };
    fs.writeFileSync('save.json', JSON.stringify(gameData, null, 2));// données-> 'save.json'
    console.log("Game saved successfully.");
  }
}

function loadGame() {
    if (fs.existsSync(saveFile)) {
        rl.question("A saved game was found. Do you want to load it? (yes/no) ", (answer) => {
            if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                const data = fs.readFileSync(saveFile);
                const gameData = JSON.parse(data);

                // Charger les données dans johnemonMaster
                johnemonMaster = new JohnemonMaster(gameData.JohnemonMaster.name);
                johnemonMaster.johnemonCollection = gameData.JohnemonMaster.johnemonCollection.map(j => {
                    const johnemon = new Johnemon();
                    johnemon.nameStudent = j.name;
                    johnemon.level = j.level;
                    johnemon.experienceMeter = j.experienceMeter;
                    johnemon.attackRange = j.attackRange;
                    johnemon.defenseRange = j.defenseRange;
                    johnemon.healthPool = j.healthPool;
                    johnemon.catchPhrase = j.catchPhrase;
                    return johnemon;
                });
                johnemonMaster.healingItems = gameData.JohnemonMaster.healingItems;
                johnemonMaster.reviveItems = gameData.JohnemonMaster.reviveItems;
                johnemonMaster.JOHNEBALLS = gameData.JohnemonMaster.JOHNEBALLS;
                johnemonMaster.day = gameData.day;

                console.log("Game loaded successfully.");
                console.log(`Hello ${gameData.JohnemonMaster.name}`);
                johnemonMaster.showCollection();
                gameLoop();            
            } else if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n'){
                console.log("Starting a new game...");
                startGame();
            } else {
                console.log("Invalid answer...");
                loadGame();
            }
        });
    } else {
        console.log("No saved game found. Starting a new game...");
        startGame();
    }
}

function gameLoop() {
    rl.question("Do you want to continue the aventure ? (yes/no): ", (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        console.log("Random event will be triggered.");
        johnemonWorld.randomEvent(johnemonMaster); 
        gameLoop();// Relancer gameLoop() pour continuer l'aventure après l'événement
        } else if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n') {
            console.log("Thanks for playing! The game has ended.");
            rl.close(); 
        } else {
            console.log("Invalid answer...");
            gameLoop();
        }
    
    });
}
loadGame();
module.exports = { gameLoop, loadGame, startGame };
