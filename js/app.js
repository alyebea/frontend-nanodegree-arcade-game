/** Object-oriented javascript that helps run frogger game. Project part of
Udacity Front-end Nanodegree. by Alye Carlevaro 11/28/16 */

// Enemies class
var Enemy = function(x,y, speed) {
    'usestrict';
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update speed of enemy
Enemy.prototype.update = function(dt) {
    'usestrict';
    this.x = this.x + this.speed * dt;

// Loop bugs back to beginning
    if (this.x > 550) {
        this.x = Math.random() * -700;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    'usestrict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class
var Player = function() {
    'usestrict';
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;

    this.score = 0;

// Set the edges of the game
    this.gameTop = 100;
    this.gameLeft = 0;
    this.gameRight = 400;

// Pixels player moves vertical and horizontal
    this.moveVertical = 85;
    this.moveHorizontal = 100;
};

// Update speed of player
Player.prototype.update = function(dt) {
    'usestrict';
    this.x = this.x;
    this.y = this.y;
    this.checkCollision();
};

// Draw player
Player.prototype.render = function() {
    'usestrict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset player to original square
Player.prototype.playerReset = function() {
    'usestrict';
    this.x = 200;
    this.y = 400;
};

// Control player with arrow keys
Player.prototype.handleInput = function (keyup) {
    'usestrict';
    switch(keyup) {
        case 'up':
            if (this.y > this.gameTop) {
                this.y -= this.moveVertical;
            } else {
                this.playerReset();
                this.score += 20;
                document.getElementById("score").innerHTML = this.score;
            }
            break;
        case 'down':
            if (this.y === 400) {
                return null;
            } else {
                this.y += this.moveVertical;
            }
            break;
        case 'left':
            if (this.x === this.gameLeft) {
                return null;
            } else {
                this.x -= this.moveHorizontal;
            }
            break;
        case 'right':
            if (this.x === this.gameRight) {
                return null;
            } else {
                this.x += this.moveHorizontal;
            }
            break;
        default:
            return null;
    }
};

// Array of enemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var speed1 = 60 * Math.floor(Math.random() * 11) + 4;
    var speed2 = 40 * Math.floor(Math.random() * 11) + 4;
    allEnemies.push(new Enemy(-90, 50 + 90 * i, speed1));
    allEnemies.push(new Enemy(-90, 50 + 90 * i, speed2));
};

// Calls player
var player = new Player();

// Check for collisions with enemies
Player.prototype.checkCollision = function() {
    'usestrict';
    for (i = 0, len = allEnemies.length; i < len; i++) {
        if (allEnemies[i].x < player.x + 50 &&
           allEnemies[i].x + 50 > player.x &&
           allEnemies[i].y < player.y + 75 &&
           75 + allEnemies[i].y > player.y) {
            console.log("collided");
            this.playerReset();
        }
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
