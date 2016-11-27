// Enemies class

var Enemy = function(x,y, speed) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

var speedMultiply = 50;


// Update speed of enemy
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;

// Loops bugs back to beginning
     if (this.x > 550) {
            this.x = Math.random() * -900;
        };
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;

    this.gameTopEdge = 110;
    this.gameLeftEdge = 0;
    this.gameRightEdge = 400;

    this.moveVertical = 85;
    this.moveHorizontal = 100;
};

// Update speed of player
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
    checkCollision();
};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resets player to original square
Player.prototype.playerReset = function() {
        this.x = this.startingX;
        this.y = this.startingY;
};

// Controls player with arrow keys
Player.prototype.handleInput = function (keyup) {
    switch(keyup) {
        case 'up':
            if (this.y > this.gameTopEdge) {
                this.y -= this.moveVertical;
            } else {
                player.playerReset();
            }
            break;
        case 'down':
            if (this.y === this.startingY) {
                return null;
            } else {
                this.y += this.moveVertical;
            }
            break;
        case 'left':
            if (this.x === this.gameLeftEdge) {
                return null;
            } else {
                this.x -= this.moveHorizontal;
            }
            break;
        case 'right':
            if (this.x === this.gameRightEdge) {
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
    speed = speedMultiply * (Math.floor(Math.random() * 10) + 2);
    allEnemies.push(new Enemy(-90, 50 + 90 * i, speed));
    };

// Calls player
var player = new Player();

// Check for collisions with enemies
var checkCollision = function() {

    for (i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + 50 &&
           allEnemies[i].x + 50 > player.x &&
           allEnemies[i].y < player.y + 75 &&
           75 + allEnemies[i].y > player.y) {
            console.log("collided");
            player.playerReset();
        // collision detected!
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
