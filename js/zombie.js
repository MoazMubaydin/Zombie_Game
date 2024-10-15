class Zombies {
    constructor() {
        this.width = 3;
        this.height = 4.5;
        this.positionX;
        this.positionY;
        this.spawnZombie();
        this.createDomElements();
    }
    createDomElements() {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("zombie");
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const game = document.getElementById("gameBoard");
        game.appendChild(this.domElement);
    }
    spawnZombie() {
        //spawning at a random location on the gameboard
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

}