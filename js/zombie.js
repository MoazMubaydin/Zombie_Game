class Zombies {
    constructor(playerX, playerY) {
        this.width = 3;
        this.height = 4.5;
        this.positionX;
        this.positionY;
        this.spawnZombie(playerX, playerY);
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

    spawnZombie(playerX, playerY) {
        //spawning at a random location on the gameboard
        const spawnRadius = 10; //area around player

        do {
            //keep trying to find a suitable spawn point 
            let positionX = Math.floor(Math.random() * (100 - this.width + 1));
            let positionY = Math.floor(Math.random() * (100 - this.height + 1));
            const distanceX = playerX - positionX;
            const distanceY = playerY - positionY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance > spawnRadius + this.width / 2) { // if spawn is away from player. spawn zombie
                this.positionX = positionX;
                this.positionY = positionY
                this.createDomElements();

            }
        } while (this.positionX === undefined)


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