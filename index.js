var seta = document.getElementById('seta');
var bola = document.getElementById('bola');
var buraco = document.getElementById('buraco');
var ganhouQuadro = document.getElementById('ganhou');
var perdeuQuadro = document.getElementById('perdeu');



var setaInterval = null;
var winOrLostInterval = null;

var jogarButton = document.getElementById('jogar');

var jogou = false;
let deg = -90;
let topWindow = 700;


function probability(n){

    return Math.random() > (n);
}

let side = 'left';
function setaVariacao() {
    if(jogou) {
        clearInterval(setaInterval);
        return
    }
    if(deg <= -90){
        side= 'right';
    }
    
    if(deg >= 90){
        side ='left';
    }
    
    if(side === 'left') {
        deg = deg-5;
    }else {
        deg = deg+5;
    }
    
    
    seta.style.transform = `rotate(${deg}deg)`;
    
}

function winAnimation() {
    if(topWindow <= 150) {
        buraco.style.width = '30px';
        buraco.style.height = '30px';
        clearInterval(winOrLostInterval)
        ganhouQuadro.style.display = "block";
        jogarButton.classList.remove('block-button')

        return
    }
    bola.style.top = `${topWindow}px`
    topWindow = topWindow - 5;
}

function lostAnimation() {
    if(topWindow <= 150) {
        buraco.style.width = '30px';
        buraco.style.height = '30px';
        clearInterval(winOrLostInterval)
        perdeuQuadro.style.display = "block";
        jogarButton.classList.remove('block-button')

        return
    }
    bola.style.top = `${topWindow}px`
    bola.style.left = `${topWindow * 0.1}px`
    topWindow = topWindow - 5;
}

function loop() {
    setaInterval = setInterval(setaVariacao, 10);
}
loop();


function ganhou(){
    winOrLostInterval = setInterval(winAnimation, 10);
}


function jogar() {
    jogou = !jogou;
    if(jogou){
        jogarButton.classList.add('block-button')
        const zeroToOne = deg/90;
        console.log(zeroToOne);
        const valorPositivo = zeroToOne < 0 ? (zeroToOne * -1) +0.45 : zeroToOne+0.45;
        if(probability(valorPositivo)){
            ganhou();
        }else {
            perdeu();
        }
        jogarButton.innerText = "Jogar novamente"
        
    }else {
        jogarButton.innerText = "Tacada"
        topWindow = 700;
        bola.style.top = `${700}px`;
        buraco.style.width = '10px';
        buraco.style.height = '10px';
        bola.style.left = "50%";
        bola.style.transform = "translateX(-50%)"
        ganhouQuadro.style.display = "none";
        perdeuQuadro.style.display = "none";

        loop()
        
    }
}



function perdeu(){
    winOrLostInterval = setInterval(lostAnimation, 10);    
}


