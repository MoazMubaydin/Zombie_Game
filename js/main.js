// Function to update player position
function updatePlayer() {
    framesPlayer++;
    if (framesPlayer % 4 === 0) {


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

    // requestAnimationFrame(updatePlayer)

}



function updateZombie() {
    // makes the zombie follow the player

    framesZombie1++;
    if (framesZombie1 % 10 === 0) {
        zombies.forEach((zombie, position) => {
            let randomMovement = Math.floor(Math.random() * 4);
            let zombieRect = zombie.domElement.getBoundingClientRect();
            if (
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

            // Check for collision
            bullets.forEach((projectile, bulletIndex) => {

                if (
                    projectile.positionX < zombieRect.left + zombieRect.width &&
                    projectile.positionX + 5 > zombieRect.left &&
                    projectile.positionY < zombieRect.top + zombieRect.height &&
                    projectile.positionY + 5 > zombieRect.top
                ) {
                    console.log('HIT');

                    score.innerHTML = `Score: ${points += 5}`
                    zombie.delete();
                    zombies.splice(position, 1);

                    projectile.element.remove();
                    bullets.splice(bulletIndex, 1);
                }
            });


            // Detects Collision between zombie and player



        })
    }
    //requestes antimation fram with delay to make it run at a reasnobale speed
    // requestAnimationFrame(updateZombie)
}
function updateZombie2() {
    framesZombie2++;
    // if (framesZombie2 % 10 === 0) {
    zombies2.forEach((zombie, zombieIndex) => {
        // zombies2.forEach((element) => {
        //  if (
        //    element.positionX < zombie.positionX + zombie.width &&
        ///   element.positionX + element.width > zombie.positionX &&
        //   element.positionY < zombie.positionY + zombie.height &&
        //  element.positionY + element.height > zombie.positionY && element.type === 2
        //) {
        let zombieRect = zombie.domElement.getBoundingClientRect();

        if (
            player.positionX < zombie.positionX + zombie.width &&
            player.positionX + player.width > zombie.positionX &&
            player.positionY < zombie.positionY + zombie.height &&
            player.positionY + player.height > zombie.positionY
        ) {
            lostLife();
        }
        //} else {
        if (player.positionX < zombie.positionX) {
            zombie.moveLeft();
        } if (player.positionY < zombie.positionY) {
            zombie.moveDown();

        } if (player.positionY > zombie.positionY) {
            zombie.moveUp();
        } if (player.positionX > zombie.positionX) {
            zombie.moveRight();
        }
        bullets.forEach((projectile, bulletIndex) => {

            if (
                projectile.positionX < zombieRect.left + zombieRect.width &&
                projectile.positionX + 5 > zombieRect.left &&
                projectile.positionY < zombieRect.top + zombieRect.height &&
                projectile.positionY + 5 > zombieRect.top
            ) {
                console.log('HIT');

                zombie.delete();
                zombies2.splice(zombieIndex, 1);
                score.innerHTML = `Score: ${points += 5}`

                projectile.element.remove();
                bullets.splice(bulletIndex, 1);
            }
        });
        //})

    })
    // }

    // requestAnimationFrame(updateZombie2)

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
    framesPlayer = 0;
    framesZombie1 = 0;
    framesZombie2 = 0;

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
let framesPlayer = 0;
let framesZombie1 = 0;
let framesZombie2 = 0;
let score = document.getElementById("score")
let points = 0
for (let i = 0; i < lives; i++) {
    let displayLives = document.createElement("div");
    displayLives.classList.add("heart");
    displayLives.id = `life${i}`;
    livesContainer.appendChild(displayLives)


}
let spawn1 = setInterval(() => {

    if (zombies.length <= 20) {

        let zombie = new Zombies(player.positionX, player.positionY, 1)
        zombies.push(zombie)
    }
    // } else {
    //     clearInterval(spawn1);
    // }

}, 800);

let spawn2 = setInterval(() => {
    if (zombies2.length <= 10) {

        let zombie = new Zombies(player.positionX, player.positionY, 2)
        zombies2.push(zombie)

    }    // } else {
    //     clearInterval(spawn2);
    // }
}, 2000);

const keysPressed = {};

// Track key states
document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true;
});

document.addEventListener("keyup", (e) => {
    keysPressed[e.code] = false;
});


// requestAnimationFrame(updatePlayer);
// requestAnimationFrame(updateZombie2)
// requestAnimationFrame(updateZombie);

setInterval(() => {
    updatePlayer()
    updateZombie()
    updateProjectiles();
}, 20)

setInterval(() => {

    updateZombie2()
}, 400)

let gameBoard = document.getElementById("gameBoard");
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
let gamer = document.getElementById("player")

document.addEventListener("click", (e) => {

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
});

function updateProjectiles() {
    bullets.forEach((projectile, index) => {

        if (projectile.targetX < projectile.positionX) {
            projectile.positionX--

        } if (projectile.targetY < projectile.positionY) {
            projectile.positionY--
        } if (projectile.targetY > projectile.positionY) {
            projectile.positionY++
        } if (projectile.targetX > projectile.positionX) {
            projectile.positionX++
        }


        projectile.element.style.left = projectile.positionX + "px";
        projectile.element.style.top = projectile.positionY + "px";

        if (Math.floor(projectile.positionX) === Math.floor(projectile.targetX) && Math.floor(projectile.positionY) === Math.floor(projectile.targetY)) {
            projectile.element.remove(); // Remove from DOM
            bullets.splice(index, 1); // Remove from the array
        }


    });

}


