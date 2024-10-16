// Function to update player position
function updatePlayer() {
    frames++;
    if (frames % 3 === 0) {


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
    // Request the next animation frame 

    requestAnimationFrame(updatePlayer)

}

function updateZombie() {
    // makes the zombie follow the player

    frames++;
    if (frames % 10 === 0) {
        zombies.forEach((zombie) => {
            let randomMovement = Math.floor(Math.random() * 10);
            if (randomMovement > 5) {

                if (player.positionX < zombie.positionX) {
                    zombie.moveLeft();
                } if (player.positionY < zombie.positionY) {
                    zombie.moveDown();

                } if (player.positionY > zombie.positionY) {
                    zombie.moveUp();
                } if (player.positionX > zombie.positionX) {
                    zombie.moveRight();
                }
            } else if (randomMovement === 4) {
                setInterval(() => {
                    zombie.moveLeft();

                }, 3000);
            } else if (randomMovement === 3) {
                setInterval(() => {
                    zombie.moveRight();

                }, 3000);
            } else if (randomMovement === 2) {
                setInterval(() => {
                    zombie.moveDown();

                }, 3000);
            } else if (randomMovement < 2) {
                setInterval(() => {
                    zombie.moveUp();

                }, 3000);
            }
            // Detects Collision between zombie and player
            if (
                player.positionX < zombie.positionX + zombie.width &&
                player.positionX + player.width > zombie.positionX &&
                player.positionY < zombie.positionY + zombie.height &&
                player.positionY + player.height > zombie.positionY
            ) {
                console.log("game over");
                // location.href = "gameOver.html";
            }


        })
    }
    //requestes antimation fram with delay to make it run at a reasnobale speed

    requestAnimationFrame(updateZombie)

}

function updateZombie() {
    // makes the zombie follow the player

    frames++;
    if (frames % 20 === 0) {
        zombies.forEach((zombie) => {
            let randomMovement = Math.floor(Math.random() * 10);
            if (randomMovement > 5) {

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
            // Detects Collision between zombie and player
            if (
                player.positionX < zombie.positionX + zombie.width &&
                player.positionX + player.width > zombie.positionX &&
                player.positionY < zombie.positionY + zombie.height &&
                player.positionY + player.height > zombie.positionY
            ) {
                console.log("game over");
                // location.href = "gameOver.html";
            }


        })
    }
    //requestes antimation fram with delay to make it run at a reasnobale speed

    requestAnimationFrame(updateZombie)

}

let player = new Player;
let zombies = [];
let zombies2 = [];
let frames = 0;

let spawn = setInterval(() => {

    //if there is more than 100 zombies they would despawn and respawn 
    if (zombies.length <= 100) {
        if (Math.floor(Math.random() * 10) > 5) {
            let zombie = new Zombies(player.positionX, player.positionY, 1)
            zombies.push(zombie)
        } else {
            let zombie = new Zombies(player.positionX, player.positionY, 2)
            zombies.push(zombie)
        }


    } else {
        clearInterval(spawn);
    }

}, 400);

const keysPressed = {};

// Track key states
document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keysPressed[e.code] = false;
});


requestAnimationFrame(updatePlayer);

requestAnimationFrame(updateZombie);


/*
    
    Score:
    - 1) localstorage + redirect
 */