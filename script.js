const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 60;
gameOverNumber = 40;
loopPlay = false;


function start(){
    let count = 0;
    let getFaster = 6000;
    let daysRemaining = daysLeft;

    canvas.innerHTML = '';
    score.innerHTML = count;
    days.innerHTML = daysRemaining;

//Make sure to not play loop several times
    loopPlay ? '' : game();
    loopPlay =true;

    function game(){
        let randomTime = Math.round(Math.random() * getFaster);
        getFaster > 700 ? getFaster = (getFaster *0.90) : '';

        setTimeout(()=> {
            if (daysRemaining === 0){
                youWin();
            }else if (canvas.childElementCount < gameOverNumber){
                virusPop();
                game();
            }else{
                gameOver();
            }
        }, randomTime);
    }
    const gameOver = () => {
        endScreen.innerHTML = `<div class="gameOver">Game over <br>Score : ${count}</div>`;
        endScreen.style.visibility = 'visible'
        endScreen.style.opacity = '1';
        loopPlay = false;
    }

    const  youWin = () => {
        let accuracy = Math.round(count/daysLeft * 100);
        endScreen.innerHTML = `<div class ="youWin">Bravo !! tu es un DIEU !!<br>
<span>précision : ${accuracy}%</span></div>`
        endScreen.style.visibility = 'visible'
        endScreen.style.opacity = '1';
        loopPlay = false;
    }


    document.addEventListener('click',function(e){
        let targetElement = e.target || e.srcElement;

        if(targetElement.classList.contains('virus')){
            targetElement.remove();
            count++;
            score.innerHTML = count;
        }
    })

    canvas.addEventListener('click', ()=> {
        if (daysRemaining > 0){
            daysRemaining--;
            days.innerHTML = daysRemaining;
        }
    })
}

function virusPop(){
    let virus = new Image();

    virus.src="./media/basic-pics/pngwave.png";

    virus.classList.add('virus');
    virus.style.top = Math.random() * 800 + "px";
    virus.style.left = Math.random() * 800 + "px";

    let x, Y;
    x = y = (Math.random() * 45) + 30;

    virus.style.setProperty('--x',`${ x }px`);
    virus.style.setProperty('--y',`${ y }px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 800 * plusMinus;
    let trY = Math.random() * 800 * plusMinus;
    virus.style.setProperty('--trX',`${ trX }%`);
    virus.style.setProperty('--trY',`${ trY }%`);

    canvas.appendChild(virus);
}

endScreen.addEventListener('click', () => {
    setTimeout(()=> {
        start();
        endScreen.style.opacity = '0'
        endScreen.style.visibility ='hidden';

    },3500)
})

