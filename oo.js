var jogou;

var Bola = function () {
    this.dom = document.getElementById('bola');
    this.topWindow = 700;

    this.getTopWindow = function() {
        return this.topWindow;
    }

    this.setTopWindow = function(valor) {
        this.topWindow = valor
    }

    this.reset = function(){
        this.dom.style.top = `${700}px`;
        this.setTopWindow = 700;
        this.dom.style.left = "50%";
        this.dom.style.transform = "translateX(-50%)"
    }
}


var Jogador = function () {
    this.jogou = false;

    this.probability = function(n){
        return Math.random() > (n);
    }

    this.setJogou = function(valor) {
        this.jogou = valor;
    }

    this.getJogou = function() {
        return this.jogou 
    }

    this.ganhou = function (buraco, ganhouQuadro,jogarButton, bola, topWindow){
            const winInterval = setInterval(function(){
            if(topWindow <= 150) {
                buraco.style.width = '30px';
                buraco.style.height = '30px';
                clearInterval(winInterval)
                ganhouQuadro.style.display = "block";
                jogarButton.classList.remove('block-button')
        
                return
            }
            bola.style.top = `${topWindow}px`
            topWindow = topWindow - 5;
        }, 10)
    }

    this.perdeu = function(buraco, perdeuQuadro,jogarButton, bola, topWindow){
        const lostInterval = setInterval(function(){
            if(topWindow <= 150) {
                buraco.style.width = '30px';
                buraco.style.height = '30px';
                clearInterval(lostInterval)
                perdeuQuadro.style.display = "block";
                jogarButton.classList.remove('block-button')
                return
            }
            bola.style.top = `${topWindow}px`
            bola.style.left = `${topWindow * 0.1}px`
            topWindow = topWindow - 5;
        }, 10)
    }
}

var Elementos = function() {
    this.buraco = document.getElementById('buraco');
    this.ganhouQuadro = document.getElementById('ganhou');
    this.perdeuQuadro = document.getElementById('perdeu');
    this.jogarButton = document.getElementById('jogar');

    this.resetBuraco = function(){
        this.buraco.style.width = '10px';
        this.buraco.style.height = '10px';
    }

    this.resetQuadros = function() {
        this.ganhouQuadro.style.display = "none";
        this.perdeuQuadro.style.display = "none";
    }
}


var Seta = function () {
    var self = this;
    this.dom = document.getElementById('seta');
    this.deg = -90;
    this.side = 'left';
    this.timer;

    this.interval = function(){

        if(this.deg <= -90){
            this.side= 'right';
        }
        
        if(this.deg >= 90){
            this.side ='left';
        }
        
        if(this.side === 'left') {
            this.deg = this.deg-5;
        }else {
            this.deg = this.deg+5;
        }
        this.dom.style.transform = `rotate(${this.deg}deg)`;
    }.bind(this)

    this.comecar = function(jogou) {
        if(!jogou){
            self.timer = setInterval(self.interval, 10);
            return;
        }else {
            clearInterval(self.timer);
        }
    }

    this.getDeg = function(){
        return self.deg;
    }

    
}


var bola = new Bola();
var seta = new Seta();
var jogador = new Jogador();
var elementos = new Elementos();
seta.comecar(jogador.getJogou())

function main () {
    jogador.setJogou(!jogador.jogou);
    
    if(jogador.getJogou()){
        elementos.jogarButton.classList.add('block-button')
        seta.comecar(jogador.getJogou())

        const zeroToOne = seta.getDeg()/90;
        const valorPositivo = zeroToOne < 0 ? (zeroToOne * -1) +0.35 : zeroToOne + 0.45;

        if(jogador.probability(valorPositivo)){
            jogador.ganhou(
                elementos.buraco, 
                elementos.ganhouQuadro, 
                elementos.jogarButton, 
                bola.dom, 
                bola.getTopWindow()
            );

            console.log('****Ganhou****')
        }else {
            jogador.perdeu(
                elementos.buraco, 
                elementos.perdeuQuadro, 
                elementos.jogarButton, 
                bola.dom, 
                bola.getTopWindow()
            );

            console.log('****PErdeu****')
        }
        elementos.jogarButton.innerText = "Jogar novamente"
    }else {
        seta.comecar(jogador.getJogou())
        elementos.jogarButton.innerText = "Tacada"
        bola.reset()
        elementos.resetBuraco();
        elementos.resetQuadros();
    }
}
