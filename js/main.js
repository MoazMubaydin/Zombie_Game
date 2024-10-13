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




let player = new Player;

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