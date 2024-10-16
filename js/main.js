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
        if (keysPressed["ArrowDown"] && player.positionY > 0 + player.width) {
            player.moveDown();
        }
    }
    // Request the next animation frame 

    requestAnimationFrame(updatePlayer)

}

function updateZombie() {
    // makes the zombie follow the player

    frames++;
    if (frames % 8 === 0) {
        zombies.forEach((zombie) => {

            if (player.positionX < zombie.positionX) {
                zombie.moveLeft();
            } if (player.positionY < zombie.positionY) {
                zombie.moveDown();

            } if (player.positionY > zombie.positionY) {
                zombie.moveUp();
            } if (player.positionX > zombie.positionX) {
                zombie.moveRight();
            }
            // Detects Collision between zombie and player
            if (
                player.positionX < zombie.positionX + zombie.width &&
                player.positionX + player.width > zombie.positionX &&
                player.positionY < zombie.positionY + zombie.height &&
                player.positionY + player.height > zombie.positionY
            ) {
                console.log("game over");
                location.href = "gameover.html";
            }


        })
    }
    //requestes antimation fram with delay to make it run at a reasnobale speed

    requestAnimationFrame(updateZombie)

}

let player = new Player;
let zombies = [];

let spawn = setInterval(() => {

    //if there is more than 100 zombies they would despawn and respawn 
    if (zombies.length <= 10) {
        let zombie = new Zombies
        if (player.positionX < zombie.positionX + zombie.width &&
            player.positionX + player.width > zombie.positionX &&
            player.positionY < zombie.positionY + zombie.height &&
            player.positionY + player.height > zombie.positionY) {

            zombies.push(zombie)
        }
    } else {
        clearInterval(spawn);
    }

}, 100);

let frameZombie = 0;
const keysPressed = {};

// Track key states
document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keysPressed[e.code] = false;
});
let frames = 0;


requestAnimationFrame(updatePlayer);

requestAnimationFrame(updateZombie);


/*
    1) zombies and player arent very smooth, can i make it better?
    2) page still moves a bit to the bottom and right side. why?
    3) how to create a spawn free zone around the player? (tried using reverse detection)
    4) better to use dispaly hidden than new page to save a score(when i make one)



    Score:
    - 1) localstorage + redirect
    - 2) dom manipulation
 */