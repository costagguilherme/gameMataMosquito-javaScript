var altura = 0
var largura = 0


// Dificuldade: Definindo o tempo de aparição dos mosquitos para lesma/moderado/ninja
var dificuldade = window.location.search
dificuldade = dificuldade.replace('?','')
var tempoDificuldade = 0

if (dificuldade === 'lesma') {
    tempoDificuldade = 1500

} else if (dificuldade === 'moderado') {
    tempoDificuldade = 1000


} else if (dificuldade === 'ninja') {
    tempoDificuldade = 750

}


//Recuperando valores de altura e largura em tempo real, a fim de definir a área de aparição dos mosquistos.
function ajustaTela() { 

    altura = window.innerHeight
    largura = window.innerWidth
}
ajustaTela()



// Criação de um cronômetro, o qual se chegar em 0, o jogador vence
var tempo_restante = 30
var cronometro = setInterval(function() {

    tempo_restante = tempo_restante - 1

    if (tempo_restante < 0) {
        clearInterval(cronometro) // Limpando execução da função cronometro e criaMosquito
        clearInterval(criaMosquito)
        window.location.href = 'win.html'  
    }
    else {
        document.getElementById('tempo_total').innerHTML = tempo_restante
    }
}, 1000)




// Configurações relacionadas à posição aleatória do mosquito

var vidas = 1
function posicaoRandomica() {

    //Remover um mosquito quando outro aparecer automaticamente , ou seja, quando o jogador não consegue matar
    if (document.getElementById('id_do_mosquito')) {
            document.getElementById('id_do_mosquito').remove()
    
            // Logo, se o jogador não onseguiu matar, remove-se uma vida.

            if (vidas > 3) {
                window.location.href = 'game_over.html'
            }
            else {
                document.getElementById('coracao' + vidas).src = "../imagens/coracao_vazio.png"
                vidas = vidas + 1

            }          
    }

    // Delimitando posição nos eixos X e Y.
    var posicaoX = Math.floor(Math.random() * largura) - 110
    var posicaoY = Math.floor(Math.random() * altura) - 110

    if (posicaoX < 0) {
        posicaoX = 0
    }
    else {
        posicaoX = posicaoX
    }

    if (posicaoY < 0) {
        posicaoY = 0
    }
    else {
        posicaoY = posicaoY
    }

    var mosquito = document.createElement('img') // Criando imagem do mosquito no body
    mosquito.src = '../imagens/mosquito.png'
    document.body.appendChild(mosquito)

    mosquito.className = tamanhoAleatorioMosquito() + ' ' + ladoAleatorio() // Tamanho e lado aleatório

    mosquito.style.left = posicaoX + 'px' // Define posicionamento do mosquito 
    mosquito.style.top = posicaoY + 'px' 
    mosquito.style.position = 'absolute'

    mosquito.id = 'id_do_mosquito'      // Definindo id para removê-lo após 1000ms

    mosquito.onclick = function() {
        document.getElementById('id_do_mosquito').remove()
    }
    
}


// Tamanho do mosquito sendo definido de acordo com o resultado que pode ser 0, 1 ou 2
function tamanhoAleatorioMosquito() {

    var nivel = Math.floor((Math.random()) * 3) 

    if (nivel == 0) {
       return 'mosquito0'
   }
   
    if (nivel == 1) {
       return 'mosquito1'
   }

    if (nivel==2) {
       return 'mosquito2'
   }

}



// Definindo se o mosquito irá "olhar" para esquerda ou direita
function ladoAleatorio() {


    var lado = Math.floor(Math.random() * 2)

    if (lado == 0) {
        return 'paraEsquerda'
    }

    if (lado == 1) {
        return 'paraDireita'
    }
}

