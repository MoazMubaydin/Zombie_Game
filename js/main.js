class Player {
    constructor() {
        this.width = 1;
        this.height = 1.5;
        this.positionX = 50 - this.width / 2;
        this.positionY = 50 - this.height / 2;
        this.createDomElements();
    }
    createDomElements() {
        this.domElement = document.createElement("div");
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "em";
        this.domElement.style.height = this.height + "em";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const game = document.getElementById("gameBoard");
        game.appendChild(this.domElement);
    }


    moveUp() {
        this.positionY++;
        this.domElement.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";

    }
    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }
}

class Zombies {
    constructor() {
        this.width = 1;
        this.height = 1.5;
        this.positionX;
        this.positionY;
        this.spawnZombie();
        this.createDomElements();
    }
    createDomElements() {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("zombie");
        this.domElement.style.width = this.width + "em";
        this.domElement.style.height = this.height + "em";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const game = document.getElementById("gameBoard");
        game.appendChild(this.domElement);
    }
    spawnZombie() {
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1));
    }
    moveUp() {
        this.positionY++;
        this.domElement.style.bottom = this.positionY + "vh";
    }

    moveDown() {
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
    }
    moveLeft() {
        this.positionX--;
        this.domElement.style.left = this.positionX + "vw";

    }
    moveRight() {
        this.positionX++;
        this.domElement.style.left = this.positionX + "vw";
    }

    /*zombieMovment(playerPositionX, playerPositionY) {
        if (playerPositionX < this.positionX) {
            this.moveLeft();
        } else if (playerPositionX > this.positionX) {
            this.moveRight();
        } else if (playerPositionY < this.positionY) {
            
            this.moveDown();
        } else if (playerPositionY > this.positionY) {
            this.moveUp();
        }
    }*/
}


let player = new Player;
let zombies = [];

let spawn = setInterval(() => {
    if (zombies.length < 500) {
        zombies.push(new Zombies)
    } else {
        clearInterval(spawn)
    }
    
}, 100);


function updateZombie() {

        zombies.forEach((zombie) => {
            
            if (player.positionX < zombie.positionX && player.positionY < zombie.positionY) {
                zombie.moveLeft();
                zombie.moveDown();
            } if (player.positionX > zombie.positionX && player.positionY < zombie.positionY) {
                zombie.moveRight();
                zombie.moveDown();

            } if (player.positionX < zombie.positionX && player.positionY > zombie.positionY) {
                zombie.moveLeft();
                zombie.moveUp();
            } if (player.positionX > zombie.positionX && player.positionY > zombie.positionY) {
                zombie.moveRight();
                zombie.moveUp();
            }
            if (
                player.positionX < zombie.positionX + zombie.width &&
                player.positionX + player.width > zombie.positionX &&
                player.positionY < zombie.positionY + zombie.height &&
                player.positionY + player.height > zombie.positionY
            ){
                console.log("game over");
                location.href = "gameover.html";
            }
        
     
    })
    setTimeout(() => {
            requestAnimationFrame(updateZombie)

    }, (100));
}


const keysPressed = {};

// Track key states
document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keysPressed[e.code] = false;
});

// Function to update player position
function updatePlayer() {
    if (keysPressed["ArrowLeft"] && player.positionX > 0) {
        player.moveLeft();
    }
    if (keysPressed["ArrowRight"] && player.positionX < 100) {
        player.moveRight();
    }
    if (keysPressed["ArrowUp"]&& player.positionY < 100) {
        player.moveUp();
    }
    if (keysPressed["ArrowDown"]&& player.positionY > 0) {
        player.moveDown();
    }

    // Request the next animation frame
    setTimeout(() => {
        requestAnimationFrame(updatePlayer)

}, (50));}
requestAnimationFrame(updatePlayer);

requestAnimationFrame(updateZombie);
