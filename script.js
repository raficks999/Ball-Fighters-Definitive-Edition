const canvas = document.getElementById("gameCanvas")

const ctx = canvas.getContext("2d")

const startBtn = document.getElementById("startBtn")

const vida1Text = document.getElementById("vida1")

const vida2Text = document.getElementById("vida2")

let gameRunning = false;

let cpuMode = null;

function ativarCPU() {
    cpuMode = true;
}

function ativarP2() {
    cpuMode = false;
}

window.ativarCPU = ativarCPU;
window.ativarP2 = ativarP2;

let player1Type = null;
let player2Type = null;

function selectP1(tipo) {
    player1Type = tipo;
}

function selectP2(tipo) {
    player2Type = tipo;
}

window.selectP1 = selectP1;
window.selectP2 = selectP2;

const player1 = {
    x: 120,
    y: 250,
    width: 120,
    height: 120,
    color: "lime",
    speed: 5,
    vida: 100,
};

const player2 = {
    x: 880,
    y: 250,
    width: 120,
    height: 120,
    color: "red",
    speed: 5,
    vida: 100,
};

const keys = {};

document.addEventListener("keydown", (e) => {

    keys[e.code] = true;

    if (e.code === "Space"){

        e.preventDefault(); 

        specialAttackPlayer1();
    }

    if (e.code === "Enter"){

        e.preventDefault(); 

        specialAttackPlayer2();
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

function drawPlayer(player) {

   ctx.fillStyle = player.color;

   ctx.beginPath();

   ctx.arc(
    player.x,
    player.y,
    40,
    0,
    Math.PI * 2
   );

   ctx.fill();
}

function movePlayers() {
    
    if (keys["KeyW"] && player1.y > 0) {
        player1.y -= player1.speed;
    }

    if (
        keys["KeyS"] && 
        player1.y < canvas.height - player1.height
    ) {
        player1.y += player1.speed;
    }

    if (keys ["KeyA"] && player1.x > 0) {
        player1.x -= player1.speed;
    }

    if (keys ["KeyD"] &&
        player1.x < canvas.width - player1.width
    ) {
        player1.x += player1.speed;
    }


if (cpuMode === false) {

    if (keys["ArrowUp"] && player2.y > 0) {
        player2.y -= player2.speed;
    }

    if (
        keys["ArrowDown"] && 
        player2.y < canvas.height - player2.height
    ) {
        player2.y += player2.speed;
    }

    if (keys ["ArrowLeft"] && player1.x > 0) {
        player2.x -= player2.speed;
    }

    if (keys ["ArrowRight"] &&
        player2.x < canvas.width - player2.width
    ) {
        player2.x += player2.speed;
    }
}

if (cpuMode === true) {

    if (player2.x > player1.x) {
        player2.x -= 3;
    }

    if (player2.x < player1.x) {
        player2.x += 3;
    }

    if (player2.y > player1.y) {
        player2.y -= 3;
    }

    if (player2.x < player1.y) {
        player2.y += 3;
    }

    const distanciaCPU_X = player2.x - player1.x;
    const distanciaCPU_Y = player2.y - player1.y;

    const distanciaCPU = Math.sqrt(
        distanciaCPU_X * distanciaCPU_X +
        distanciaCPU_Y * distanciaCPU_Y
    );

    if (distanciaCPU < 55) {

        player1.vida -= 1;

        atualizarVida();
    }
}

}

function specialAttackPlayer1() {

    console.log("Especial P1")

    if (!gameRunning) {
        return;
    }

    const distanciaX = player1.x - player2.x;
    const distanciaY = player1.y - player2.y;

    const distancia = Math.sqrt(
        distanciaX * distanciaX +
        distanciaY * distanciaY
    );

    if (distancia < 300) {


        if (player1Type === "lime") {

            if (player1.speed === 5) {

                player1.speed = 12;

                setTimeout(() => {
                    player1.speed = 5;
                }, 1000)

                player2.vida -= 3;

            }
        }


        if (player1Type === "red") {
            
            player2.vida -= 5;
        }


        if (player1Type === "cyan") {

            player2.speed = 2;

            setTimeout(() => {
                player2.speed = 5;
            }, 3000)

            player2.vida -= 4;
        }


        if (player1Type === "purple") {

            player1.x += 150;

            player2.vida -= 6;
        }

        atualizarVida();

    }
}

function specialAttackPlayer2() {

    console.log("Especial P2")

    if (!gameRunning) {
        return;
    }

    const distanciaX = player2.x - player1.x;
    const distanciaY = player2.y - player1.y;

    const distancia = Math.sqrt(
        distanciaX * distanciaX +
        distanciaY * distanciaY
    );

    if (distancia < 300) {


        if (player2Type === "lime") {

            if (player2.speed === 5) {

                player2.speed = 8;

                setTimeout(() => {
                    player2.speed = 5;
                }, 500)

                player1.vida -= 3;
                
            }
        }


        if (player2Type === "red") {
            
            player1.vida -= 5;
        }


        if (player2Type === "cyan") {

            player1.speed = 2;

            setTimeout(() => {
                player1.speed = 5;
            }, 3000)

            player1.vida -= 4;
        }


        if (player1Type === "purple") {

            player2.x += 150;

            player1.vida -= 6;
        }

        atualizarVida();
    }
}

function atualizarVida() {

    if (player1.vida < 0) {
        player1.vida = 0;
    }

    if (player2.vida < 0) {
        player2.vida = 0;
    }

    vida1Text.innerText =
    "Vida P1: " + player1.vida;

    vida2Text.innerText =
    "Vida P2: " + player2.vida;

    if (player1.vida <= 0) {

        gameRunning = false;

        alert("P2 venceu!");
    }

    if (player2.vida <= 0) {

        gameRunning = false;

        alert("Jogador venceu!")
    }
}

function update() {

    if(!gameRunning) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayers();

    drawPlayer(player1);

    drawPlayer(player2);

    setTimeout(() => {
        requestAnimationFrame(update);
    }, 30);
}

function startGame () {

    if (cpuMode === null) {

        alert("Escolha o modo de jogo!");

        return;
    }

    if (player1Type === null) {

        alert("Escolha o personagem do P1");

        return;
    }

    if (cpuMode === false && player2Type === null) {

        alert("Escolha o personagem do P2");

        return;
    }
 
    if (cpuMode === true && player2Type === null) {

        player2Type = "red"
    }

    if (gameRunning) {
        return;
    }

    player1.color = player1Type;
    player2.color = player2Type;

    player1.vida = 100;
    player2.vida = 100;

    player1.x = 120;
    player1.y = 250;

    player2.x = 880;
    player2.y = 250;

    player1.color = player1Type;
    player2.color = player2Type;

    atualizarVida();

    gameRunning = true;

    update();
}

startBtn.addEventListener("click", startGame)