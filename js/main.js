// Function to update player position
function updatePlayer() {

    if (frames % 4 === 0) {


        if (keysPressed["ArrowLeft"] && player.positionX > 0) {
            player.moveLeft();
        }
        if (keysPressed["ArrowRight"] && player.positionX < 100 - player.width) {
            player.moveRight();
        }
        if (keysPressed["ArrowUp"] && player.positionY < 100) {
            player.moveUp();
        }
        if (keysPressed["ArrowDown"] && player.positionY > 0) {
            player.moveDown();
        }
    }


}
//function to update zombie type 1 
function updateZombie() {

    frames++;

    zombies.forEach((zombie, position) => {
        let randomMovement = Math.floor(Math.random() * 4);   //random number for random movment
        let zombieRect = zombie.domElement.getBoundingClientRect();     // get zombie location on screen
        if (frames % 10 === 0) {
            if (                                                              //checks for collision between player and zombie 
                player.positionX < zombie.positionX + zombie.width &&
                player.positionX + player.width > zombie.positionX &&
                player.positionY < zombie.positionY + zombie.height &&
                player.positionY + player.height > zombie.positionY
            ) {
                lostLife();
            }
            if (zombie.type === 1) {

                if (randomMovement === 0) {
                    zombie.moveDown();

                } else if (randomMovement === 1) {

                    zombie.moveRight();


                } else if (randomMovement === 2) {

                    zombie.moveLeft();


                } else if (randomMovement === 3) {
                    zombie.moveUp();

                }
            }
        }

        // Check for collision between zombie and bullet
        bullets.forEach((projectile, bulletIndex) => {

            if (
                projectile.positionX < zombieRect.left + zombieRect.width &&            // if collision happens dom element get 
                projectile.positionX + 5 > zombieRect.left &&                            //removed and they get removed from array
                projectile.positionY < zombieRect.top + zombieRect.height &&
                projectile.positionY + 5 > zombieRect.top
            ) {

                score.innerHTML = `Score: ${points += 5}`
                zombie.delete();
                zombies.splice(position, 1);

                projectile.element.remove();
                bullets.splice(bulletIndex, 1);
            }
        });

    })

}

function updateZombie2() {

    zombies2.forEach((zombie, zombieIndex) => {

        let zombieRect = zombie.domElement.getBoundingClientRect();

        if (frames % 10 === 0) {

            if (
                player.positionX < zombie.positionX + zombie.width &&
                player.positionX + player.width > zombie.positionX &&
                player.positionY < zombie.positionY + zombie.height &&
                player.positionY + player.height > zombie.positionY
            ) {
                lostLife();
            }

            if (player.positionX < zombie.positionX) {
                zombie.moveLeft();
            } if (player.positionY < zombie.positionY) {
                zombie.moveDown();

            } if (player.positionY > zombie.positionY) {
                zombie.moveUp();
            } if (player.positionX > zombie.positionX) {
                zombie.moveRight();
            }
        }
        bullets.forEach((projectile, bulletIndex) => {

            if (
                projectile.positionX < zombieRect.left + zombieRect.width &&
                projectile.positionX + 5 > zombieRect.left &&
                projectile.positionY < zombieRect.top + zombieRect.height &&
                projectile.positionY + 5 > zombieRect.top
            ) {

                zombie.delete();
                zombies2.splice(zombieIndex, 1);
                score.innerHTML = `Score: ${points += 5}`

                projectile.element.remove();
                bullets.splice(bulletIndex, 1);
            }
        });


    })



}

function lostLife() {
    lives--
    zombies.forEach((element) => {
        element.delete();
        delete element;

    })
    zombies2.forEach((element) => {
        element.delete();
        delete element;
    })
    bullets.forEach((bullet) => {
        bullet.element.remove()
        delete bullet;
    })

    player.domElement.remove();
    zombies = [];
    zombies2 = [];
    bullets = [];

    frames = 0;

    player = new Player;
    gamer = document.getElementById("player")
    let lostlife = document.getElementById(`life${lives}`)
    lostlife.remove()
    if (lives <= 0) {
        const score = localStorage.setItem("score", points)
        location.href = "gameOver.html";
    }
}



let livesContainer = document.getElementById("lives")
let player = new Player;
let lives = 3;
let zombies = [];
let zombies2 = [];
let bullets = [];
let gameBoard = document.getElementById("gameBoard");
let gamer = document.getElementById("player")
let frames = 0;
let score = document.getElementById("score")
let points = 0

///display lives
for (let i = 0; i < lives; i++) {
    let displayLives = document.createElement("div");
    displayLives.classList.add("heart");
    displayLives.id = `life${i}`;
    livesContainer.appendChild(displayLives)


}
//spawn zombies type 1
let spawn1 = setInterval(() => {

    if (zombies.length <= 20) {

        let zombie = new Zombies(player.positionX, player.positionY, 1)
        zombies.push(zombie)
    }
}, 800);
//spawn zombies type 2
let spawn2 = setInterval(() => {
    if (zombies2.length <= 10) {

        let zombie = new Zombies(player.positionX, player.positionY, 2)
        zombies2.push(zombie)

    }
}, 2000);

const keysPressed = {};

// Track key states
document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keysPressed[e.code] = false;
});


setInterval(() => {
    updatePlayer()
    updateZombie()
    updateProjectiles();
    updateZombie2()

}, 20)



document.addEventListener("click", (e) => {
    if (bullets.length < 2) {


        let gamerRect = gamer.getBoundingClientRect();

        console.log(gamerRect)
        const targetX = e.clientX;
        const targetY = e.clientY;
        const projectile = {
            positionX: gamerRect.left + gamerRect.width / 2,
            positionY: gamerRect.bottom - gamerRect.height / 2,
            targetX: targetX,
            targetY: targetY,
            element: document.createElement("div")
        };
        projectile.element.className = "shot";
        gameBoard.appendChild(projectile.element);
        bullets.push(projectile);
    }
});

function updateProjectiles() {

    bullets.forEach((projectile, index) => {
        // let deltaX = projectile.targetX - projectile.positionX;
        // let deltaY = projectile.targetY - projectile.positionY;
        // let direction =  Math.sqrt(deltaX);

        if (projectile.targetX < projectile.positionX) {
            projectile.positionX -= 1;

        } if (projectile.targetY < projectile.positionY) {
            projectile.positionY -= 1;
        } if (projectile.targetY > projectile.positionY) {
            projectile.positionY += 1;
        } if (projectile.targetX > projectile.positionX) {
            projectile.positionX += 1;
        }




        projectile.element.style.left = projectile.positionX + "px";
        projectile.element.style.top = projectile.positionY + "px";

        if (Math.floor(projectile.positionX) === Math.floor(projectile.targetX) && Math.floor(projectile.positionY) === Math.floor(projectile.targetY)) {
            projectile.element.remove();
            bullets.splice(index, 1);
        }


    });


}


