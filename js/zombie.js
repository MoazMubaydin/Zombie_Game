class Zombies {
    constructor(playerX, playerY, type) {
        this.width = 3;
        this.height = 6;
        this.positionX;
        this.positionY;
        this.spawnZombie(playerX, playerY, type);

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
    createDomElements2() {
        this.domElement = document.createElement("div");
        this.domElement.classList.add("zombie2");
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";
        const game = document.getElementById("gameBoard");
        game.appendChild(this.domElement);
    }

    spawnZombie(playerX, playerY, type) {
        //spawning at a random location on the gameboard
        const spawnRadius = 10; //area around player

        do {
            //keep trying to find a suitable spawn point 
            let positionX = Math.floor(Math.random() * (90 - this.width + 1));
            let positionY = Math.floor(Math.random() * (90 - this.height + 1));
            const distanceX = playerX - positionX;
            const distanceY = playerY - positionY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance > spawnRadius + this.width / 2) { // if spawn is away from player. spawn zombie
                this.positionX = positionX;
                this.positionY = positionY
                if (type === 1) {
                    this.createDomElements();

                } else if (type === 2) {
                    this.createDomElements2();
                }

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