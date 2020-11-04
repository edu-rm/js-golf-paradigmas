// Setando todas os elementos da dom necessários

var seta = document.getElementById('seta');
var bola = document.getElementById('bola');
var buraco = document.getElementById('buraco');
var ganhouQuadro = document.getElementById('ganhou');
var perdeuQuadro = document.getElementById('perdeu');
var jogarButton = document.getElementById('jogar');

//Setando algumas variáveis 

var setaInterval = null;
var winOrLostInterval = null;
var jogou = false;
let deg = -90;
let topWindow = 700;

// Função responsável por retornar um boolen que dirá se o número gerado é maior que o recebido.
function probability(n){
    return Math.random() > (n);
}

// Função responsável, juntamente com o interval, de fazer a seta se mover no "velocímetro"
let side = 'left';
function setaVariacao() {
    if(jogou) {
        clearInterval(setaInterval);
        return
    }
    // Se ele for menor ou igual que -90º ele seta o sentido para a direita;
    if(deg <= -90){
        side= 'right';
    }
    
    // Se ele for maior ou igual que 90º ele seta o sentido para a esquerda;
    if(deg >= 90){
        side ='left';
    }
    
    // Se o sentido setado for esquerda ele diminui a inclinação da seta
    // caso contrário aumenta
    if(side === 'left') {
        deg = deg-5;
    }else {
        deg = deg+5;
    }
    
    // Seta a propriedade rotate da seta com o valor atual de deg.
    seta.style.transform = `rotate(${deg}deg)`;
    
}

// Função responsável por executar a animação de vitória 
function winAnimation() {
    // Basicamente:
    // Enquanto a distância da bola do topo não for menor ou igual que 150,
    // seta a sua distância com o valor de topWindow (que começa com  700) e
    // diminui 5 do seu valor
    if(topWindow <= 150) {
        // Se for menor aumenta o tamanho do buraco e limpa o interval alem de mostrar 
        // o quadro de anunciação de vitória e desbloqueando o botão de tacada
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

// Função responsável por executar a animação de perda 
function lostAnimation() {
    // Basicamente:
    // Enquanto a distância da bola do topo não for menor ou igual que 150,
    // seta a sua distância com o valor de topWindow (que começa com  700) e
    // diminui 5 do seu valor.
    // Além disso seta a bola com topWindow * 0.1 fazendo com que ela incline para a esquerda,
    // representando que errou o buraco
    if(topWindow <= 150) {
        // Se for menor aumenta o tamanho do buraco e limpa o interval alem de mostrar 
        // o quadro de anunciação de perda e desbloqueando o botão de tacada
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

// Função responsável por ativar o loop da seta
function loop() {
    setaInterval = setInterval(setaVariacao, 10);
}
// chama a funcção
loop();

// Executa a animação de vitória em um loop
function ganhou(){
    winOrLostInterval = setInterval(winAnimation, 10);
}

// Executa a animação de perdeu em um loop
function perdeu(){
    winOrLostInterval = setInterval(lostAnimation, 10);    
}


// Função que será chamada quando o ele clicar no botão tacada
// Ela está na propriedade onclick do botão no index html
function jogar() {
    // A variável controladora jogou mudará de valor a cada click
    // alternando entre true e false
    jogou = !jogou;
    if(jogou){
        // Se ele jogou
        // Boqueia o botão colocando uma classe que remove os pointers events
        jogarButton.classList.add('block-button')
        // divide o valor da inclinação da seta por 90 para o valor ficar entre 0 e 1
        const zeroToOne = deg/90;
        // Transforma o valor em positivo caso seja negativo.
        // o valor somado é para diminuir as chances de vitória
        const valorPositivo = zeroToOne < 0 ? (zeroToOne * -1) +0.35 : zeroToOne+0.35;
        // Chama a função de probabilidade
        // Se o valor conseguido for menor que o gerado é considerado que ele ganhou,
        // caso contrário ele perde
        if(probability(valorPositivo)){
            ganhou();
        }else {
            perdeu();
        }
        // Coloca o texto jogar novamente no botão 
        jogarButton.innerText = "Jogar novamente"
        
    }else {
        // Se ele não jogou, ou seja se está prestes a clicar em tacada
        // Essa parte ocorrerá uma espécie de reset dos elementos.

        // altera o texto do botão para tacada
        jogarButton.innerText = "Tacada"
        //seta a distância do topo da bola em 700
        topWindow = 700;
        // altera a posição da bola para 700px do topo
        bola.style.top = `${700}px`;
        // reseta o tamanho do buraco
        buraco.style.width = '10px';
        buraco.style.height = '10px';
        // reseta a posição da bola para o meio 
        bola.style.left = "50%";
        bola.style.transform = "translateX(-50%)"
        // apaga os quadros da dom 
        ganhouQuadro.style.display = "none";
        perdeuQuadro.style.display = "none";

        // chama a função loop de volta.
        loop()
        
    }
}
