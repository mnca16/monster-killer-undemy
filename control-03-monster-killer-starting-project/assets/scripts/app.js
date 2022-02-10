alert('you will have your first tech job this year');
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MOSNTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // || MODE_ATTACK = 0; if you're using numbers
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // || MODE_STRONG_ATTACK = 1;
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
    const enteredValue = prompt('Maximun life for you and the mosnter.', '100');

    const parsedVlue = parseInt(enteredValue);

    if (isNaN(parsedVlue) || parsedVlue <= 0) {
        //the throw statement (it works by itself)
        throw {message: 'Ivalid user input, not a number'}
    }
    return parsedVlue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
    console.log(error)
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was used.');
} 

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(ev, val, monsterHealt, playerHealth) {
    let logEntry  = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealt,
        finalPlayerHealth: playerHealth
    };
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry;
            break;
        default:
            logEntry = {};
    }

    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MOSNTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
        
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You WON!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You LOST!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
        //reset();
    }
    /*We can call the reset function after each if statement as we did above or we can just use one if statement 
    we the current life of the player and the mosnter*/

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(attackMode) {
    const maxDamage = attackMode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent =
       attackMode === MODE_ATTACK
          ? LOG_EVENT_PLAYER_ATTACK
          : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't to more than your max initial health");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    ); 
    endRound();
}

    /*
       Loops with diferent examples
       1.- example of for loop:
       for (i = 0; i < battleLog.length; i++) {
           console.log(battle.Log[i]);
       } 
       2.- example of "for of" loop:
       for(const logEntry of battleLog) {
           console.log(logEntry);
       }
       3.- example of "for in" loop (nested, using the index):
       let i = 0;
        for(const logEntry of battleLog) {
           console.log(`#${i}`);
           for(const key in logEntry) {
               console.log(`${key} => ${logEntry[key]}`);
           }
           i++;
       }
       4.- example of a while loop and do while with labels:
       let j = 0;
       outerWhile: do {
           console.log('Outer', j);
           innerFor: for (let k = 0; k < 5; k++) {
               if (k === 3) {
                   break outerWhile;
               }
               console.log('Inner', k);
           }
           j++;
       } while (j < 3);
    */

function printLogHandler() {
    //the console.log bellow shows the object.
    console.log(battleLog);

    //the nested loop bellow shows the object organized and the index 
    let i = 0;
    for(const logEntry of battleLog) {
        if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i) {
            console.log(`#${i}`);
            for(const key in logEntry) {
                console.log(`${key} => ${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            break;
        }   
         i++;
       
   }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);


