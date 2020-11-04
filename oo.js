var jogou;

var Bola = function () {
    this.dom = document.getElementById('bola');
}
Bola.prototype.changeTop = function(valor) {
    this.dom.style.top = `${valor}px`;
}

var Jogador = function () {
    this.jogou = false;
}


var Seta = function () {
    var self = this;
    this.dom = document.getElementById('seta');
    this.deg = -90;
    this.side = 'left';
    this.timer;

    this.interval = function(){
        // if(jogou) {
        //     return
        // }
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

    this.comecar = function(status) {
        if(status){
            self.timer = setInterval(self.interval, 10);
            return;
        }else {
            console.log('else')
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
function main () {
    seta.comecar(jogador.jogou)
    
    if(jogador.jogou){
        // jogarButton.classList.add('block-button')
        // const zeroToOne = deg/90;
        // console.log(zeroToOne);
        // const valorPositivo = zeroToOne < 0 ? (zeroToOne * -1) +0.45 : zeroToOne+0.45;
        // if(probability(valorPositivo)){
        //     ganhou();
        // }else {
        //     perdeu();
        // }
        // jogarButton.innerText = "Jogar novamente"
        // clearInterval(seta.setaInterval)
        console.log('jogou')
    }else {
        console.log('n jogou')

        // jogarButton.innerText = "Tacada"
        // topWindow = 700;
        // bola.style.top = `${700}px`;
        // buraco.style.width = '10px';
        // buraco.style.height = '10px';
        // bola.style.left = "50%";
        // bola.style.transform = "translateX(-50%)"
        // ganhouQuadro.style.display = "none";
        // perdeuQuadro.style.display = "none";

        // loop()
    }
    jogador.jogou = !jogador.jogou;
}

// main()