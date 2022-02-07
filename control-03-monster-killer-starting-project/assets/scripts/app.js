alert('you will have your first tech job this year');
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MOSNTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK'; // || MODE_ATTACK = 0; if you're using numbers
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // || MODE_STRONG_ATTACK = 1;

const enteredValue = prompt('Maximun life for you and the mosnter.', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MOSNTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
        
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You WON!');
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You LOST!');
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        //reset();
    }
    /*We can call the reset function after each if statement as we did above or we can just use one if statement 
    we the current life of the player and the mosnter*/

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(attackMode) {
    let maxDamage;
    if (attackMode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
    } else if (attackMode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
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
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);



