const rulesButton = document.querySelector('.rules'),
rulesCortain      = document.querySelector('.rulesCortain'),
rulesBox          = document.querySelector('.rulesBox'),
closeRules        = document.querySelector('.rulesBox__header-close'),
mainTriangle      = document.querySelector('.main__triangle'),
step1Div          = document.querySelector('.main__step1'),
statusText        = document.querySelector('.main__step1-status-text'),
pointsP           = document.querySelector('.score-points-real'),
playAgainBtn      = document.querySelector('.main__step1-status-button'),
statusDiv         = document.querySelector('.main__step1-status'),
choiceCointainer  = document.querySelectorAll('.main__step1-choice-container');

let points        = 0;

const play = (choice) => {
    mainTriangle.classList.add('hideDiv');
    step1Div.classList.remove('hideDiv');
    const computerChoice = playComputer();

    
    setTimeout(() => {
        changeHTML(0, choice);

        setTimeout(() => {

            changeHTML(1, computerChoice);

            setTimeout(() => {
                winner(choice, computerChoice);
                statusDiv.classList.add('statusActive');
                saveLocalStorage();

    
            }, 500);

        }, 500);

    }, 500);
    

    
}

const playComputer = () => {
    let choice = Math.floor(Math.random() * (3 - 1)) + 1;
    return choice;
}

const changeHTML = (player, choice) => {
    const choices = ['paper', 'rock', 'scissors'];

    choiceCointainer[player].innerHTML = `
    <div class="main__triangle-${choices[choice]}-bg-border">
        <div class="main__triangle-${choices[choice]}-border">
            <div class="main__triangle-${choices[choice]}-front-bg">
                <div class="main__triangle-${choices[choice]}-front">
                    <img class="${choices[choice]}" src="/src/assets/icon-${choices[choice]}.svg" alt="">
                </div>
            </div>
        </div>
    </div>`
}

const winner = (player, pc) => {

    if( player === pc ){
        statusText.innerText = 'SAME'
    } else if ( (player === 0 && pc === 1) || (player === 1 && pc === 2) || (player === 2 && pc === 0) ) {
        statusText.innerText = 'YOU WIN'
        points++;
        pointsP.innerText = points;
    } else {
        statusText.innerText = 'YOU LOSE'
    }

}

const saveLocalStorage = () => {

    localStorage.setItem('points', JSON.stringify(points));

}

const loadLocalStorage = () => {

    points = ( localStorage.getItem('points') )
    ? JSON.parse(localStorage.getItem('points'))
    : points = 0;

    pointsP.innerText = points;

}

const playAgain = () => {
    mainTriangle.classList.remove('hideDiv');
    step1Div.classList.add('hideDiv');
    choiceCointainer[0].innerHTML = '';
    choiceCointainer[1].innerHTML = '';
    statusDiv.classList.remove('statusActive');
}

rulesButton.addEventListener('click', () => {
    rulesCortain.classList.add('rulesCortainShown');
    rulesBox.classList.add('rulesBoxShown');
})

closeRules.addEventListener('click', () => {
    rulesCortain.classList.remove('rulesCortainShown');
    rulesBox.classList.remove('rulesBoxShown');
})

mainTriangle.addEventListener('click', () => {

    const elemento = event.target.className;

    if ( elemento.includes('paper') ){
        play(0);

    } else if( elemento.includes('rock') ){
        play(1);

    } else if( elemento.includes('scissors') ){
        play(2);
    }

})

playAgainBtn.addEventListener('click', () => {
    console.log('click');
    playAgain();
});

loadLocalStorage();





