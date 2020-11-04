var jogou;

// Declaração da classe Bola
var Bola = function () {
    // Referênciando a bola na dom
    this.dom = document.getElementById('bola');
    // Setando a distância dela de 700
    this.topWindow = 700;

    // funções getters e setters
    this.getTopWindow = function() {
        return this.topWindow;
    }

    this.setTopWindow = function(valor) {
        this.topWindow = valor
    }

    // função reset da bola na dom
    this.reset = function(){
        this.dom.style.top = `${700}px`;
        this.setTopWindow = 700;
        this.dom.style.left = "50%";
        this.dom.style.transform = "translateX(-50%)"
    }
}

// Classe jogador
var Jogador = function () {
    //Variável controladora
    this.jogou = false;

    // Função de probabilidade 
    this.probability = function(n){
        return Math.random() > (n);
    }

    // Getters e Setters
    this.setJogou = function(valor) {
        this.jogou = valor;
    }

    this.getJogou = function() {
        return this.jogou 
    }

    // Função que executa a animação de ganhar
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

    // Função que executa a função de perder
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

// Declarando a classe elementos
var Elementos = function() {
    this.buraco = document.getElementById('buraco');
    this.ganhouQuadro = document.getElementById('ganhou');
    this.perdeuQuadro = document.getElementById('perdeu');
    this.jogarButton = document.getElementById('jogar');

    // Reset do buraco na dom 
    this.resetBuraco = function(){
        this.buraco.style.width = '10px';
        this.buraco.style.height = '10px';
    }

    // Reseta os quadros escondendo-os
    this.resetQuadros = function() {
        this.ganhouQuadro.style.display = "none";
        this.perdeuQuadro.style.display = "none";
    }
}

// Declaração da classe Seta
var Seta = function () {
    var self = this;
    this.dom = document.getElementById('seta');
    this.deg = -90;
    this.side = 'left';
    this.timer;

    // Função responsável por executar a lógica de movimento (já explicada na versão não orientada a objeto)
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

    // Função que controla a movimentação da seta, se o jogador não jogou ela ativa
    // se jogou para 
    this.comecar = function(jogou) {
        if(!jogou){
            self.timer = setInterval(self.interval, 10);
            return;
        }else {
            clearInterval(self.timer);
        }
    }

    // get de deg
    this.getDeg = function(){
        return self.deg;
    }

    
}

// Declaração de objetos
var bola = new Bola();
var seta = new Seta();
var jogador = new Jogador();
var elementos = new Elementos();
//iniciando a seta
seta.comecar(jogador.getJogou())

// Quando ele clicar em tacada essa função será chamada
function main () {
    // Inverte o valor do atributo jogou
    jogador.setJogou(!jogador.jogou);
    
    // Se ele jogou
    if(jogador.getJogou()){
        //Bloqueia o botão
        elementos.jogarButton.classList.add('block-button')
        // A seta é desativada
        seta.comecar(jogador.getJogou())
        // pega a inclinação da seta e divide por 90 para conseguir um valor entre 0-1
        const zeroToOne = seta.getDeg()/90;
        // Se o valor é negativo o transforma para positivo
        // em ambos adiciona 0.35 para diminuir mais ainda as chances de vitória
        const valorPositivo = zeroToOne < 0 ? (zeroToOne * -1) +0.35 : zeroToOne + 0.35;

        // Se o número randomico é maior que o valor gerado pelo jogador ao clicar em tacada
        if(jogador.probability(valorPositivo)){
            // Chama a função de animação de ganhou passando tudo o que for necessário
            jogador.ganhou(
                elementos.buraco, 
                elementos.ganhouQuadro, 
                elementos.jogarButton, 
                bola.dom, 
                bola.getTopWindow()
            );
        }else {
            // Chama a função de animação de perda passando tudo o que for necessário
            jogador.perdeu(
                elementos.buraco, 
                elementos.perdeuQuadro, 
                elementos.jogarButton, 
                bola.dom, 
                bola.getTopWindow()
            );
        }
        // Seta o texto do botão para jogar novamente
        elementos.jogarButton.innerText = "Jogar novamente"
    }else {
        // Se ele estiver jogando
        // começa a seta 
        seta.comecar(jogador.getJogou())
        // reseta o botão
        elementos.jogarButton.innerText = "Tacada"
        // reseta a bola
        bola.reset()
        // reseta os elementos de buraco e quadro
        elementos.resetBuraco();
        elementos.resetQuadros();
    }
}
