class Obstacle{
    constructor(ctx, gameW, gameH, backPos, character) {
        this.ctx = ctx;
        this.backPos = backPos
        this.gameWidth = this.backPos.backgroundWidth;
        this.gameHeight = this.backPos.backgroundHeight;
        this.character = character
        this.width = 150
        this.height = 170;
        
        this.image = new Image();
        this.image.src = "./images/Walls/stone.png";
        this.image.frames = 4;
        this.image.framesIndex = 1;

        this.posX = this.gameWidth ;
        this.posY = this.gameHeight - this.height - 230;
        this.posY0 = this.posY;
        
        this.enemiPosX = this.character.posX
        this.velY = 1;
        this.gravity = 0.4;
        this.velX = 5;
    }

    draw() {

        
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY + 200,
            this.width,
            this.height
        );

        this.move()
        
    }

    move() {
        if (this.character.pos == 2 && this.backPos.backgroundPos.x < 0) {
            this.posX += this.character.velX
        }
        if (this.character.pos == 1) {
            this.posX -= this.character.velX
        }

    }
 
}