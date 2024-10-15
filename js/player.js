class Player {
    constructor() {
        this.width = 3;
        this.height = 4.5;
        this.positionX = 50 - Math.floor( this.width / 2);
        this.positionY = 50 - Math.floor(this.height / 2);
        this.createDomElements();
    }
    createDomElements() {
        this.domElement = document.createElement("div");
        this.domElement.id = "player";
        this.domElement.style.width = this.width + "vw";
        this.domElement.style.height = this.height + "vh";
        this.domElement.style.left = this.positionX + "vw";
        this.domElement.style.bottom = this.positionY + "vh";

        const game = document.getElementById("gameBoard");
        game.appendChild(this.domElement);
    }


    moveUp() {
        if(this.positionY < 100 - this.height){
        this.positionY++;
        this.domElement.style.bottom = this.positionY + "vh";
        }
    }

    moveDown() {
        if(this.positionY > 0){
        this.positionY--;
        this.domElement.style.bottom = this.positionY + "vh";
        }
    }
    moveLeft() {
        if(this.positionX > 0){
            this.positionX--;
            this.domElement.style.left = this.positionX + "vw";
            }

    }
    moveRight() {
        if(this.positionX < 100 - this.width){
            this.positionX++;
            this.domElement.style.left = this.positionX + "vw";
            }
    }
}