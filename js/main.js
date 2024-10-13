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

class Zombies{
    constructor(){
        this.width = 2;
        this.height = 2;
        this.positionX;
        this.positionY;
        this.spawnZombie();
        this.createDomElements();
    }
    createDomElements() {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("zombie") ;
        this.domElement.style.width = this.width + "em";
        this.domElement.style.height = this.height + "em";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const game = document.getElementById("gameBoard");
        game.appendChild(this.domElement);
    }
    spawnZombie(){
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1) );
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1) );
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

    zombieMovment(playerPositionX, playerPosistionY){
        if(this.positionX > playerPositionX){
            this.moveLeft();
        }else if (this.positionX < playerPositionX){
            this.moveRight();
        }


    }
}


let player = new Player;
let zombie = [];

let spawn = setInterval(() => {
    if (zombie.length < 100) {
        zombie.push(new Zombies)
    } else {
        clearInterval(spawn)
    }
}, 100);






document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        player.moveLeft();
    } else if (e.code === "ArrowRight"  ) {
        player.moveRight();

    }else if(e.code === "ArrowUp"){
        player.moveUp();
        
    }else if(e.code === "ArrowDown"){
        player.moveDown();
    }
});