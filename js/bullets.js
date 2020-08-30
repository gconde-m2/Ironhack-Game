class Bullets{


    constructor(ctx,playerPosX,playerPosY,playerPosY0,playerWidth,playerHeight,bulletPos){
        this.framesCounter = mainGame.framesCounter;
        this.ctx = ctx;
        this.posX = playerPosX + playerWidth / 2;
        this.posY = playerPosY + playerHeight /2.7;
        this.PosXLeft = playerPosX + playerWidth / 2;
        this.playerPosY0 = playerPosY0;
        this.playerHeight = playerHeight;
        this.pos = bulletPos;
        this.radius = 20;
    
        this.velX = 10;
        this.velY = 1;
        this.image = new Image();
        this.image.src = "./images/bulletSingleRight.png";
        this.image.frames = 1;
        this.image.framesIndex = 0;
        

    }
    // HACER BALAS ANIMADAAAAAAS
    draw(bulletDir) {

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
            0,
            Math.floor(this.image.width / this.image.frames),
            this.image.height,
            this.posX,
            this.posY,
            200,
            200
          );
          this.move(bulletDir)
      }
    
      move() {
        
        if (this.pos == 1)
        {
          this.image.src = "./images/bulletSingleRight.png";
            this.image.frames = 1;
          this.posX += this.velX;
          if (this.posY >= this.playerPosY0 + this.playerHeight) {
              this.velY *= -1;
        }
      }else if (this.pos == 2)
      {
        
        this.image.src = "./images/bulletSingleLeft.png";
        this.image.frames = 1;
        this.posX -=this.velX
        if (this.posY >= this.playerPosY0 + this.playerHeight) {
            this.velY *= -1;
    }
  }

}

}