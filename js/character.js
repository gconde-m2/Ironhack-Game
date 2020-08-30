class Character {

  constructor(ctx, gameW, gameH, keys) {

    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 700;
    this.height = 700;

    this.image = new Image();
    this.image.src = "./images/IdleRigth.png";
    this.image.frames = 4;
    this.image.framesIndex = 2;

    this.posX = 20;
    this.posY = this.gameHeight - this.height + 200;
    this.posY0 = this.posY;

    this.velY = 1;
    this.gravity = 0.4;
    this.velX = 10;

    this.keys = keys;

    this.bullets = [];
    this.pos = 1  //cambio direccion imagen bullet
    this.afterJump = 0
    this.setListeners();

  }

  draw(framesCounter) {

    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
      0,
      Math.floor(this.image.width / this.image.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    this.animate(framesCounter)

    this.bullets.forEach(bullet => bullet.draw())
    this.clearBullets()
    this.moveJump()

  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex > this.image.frames - 1) {
      this.image.framesIndex = 0;
    }
  }

  moveJump() {
    if (this.posY < this.posY0) {
      this.posY += this.velY;
      this.velY += this.gravity;
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
  }

  setListeners() {

    document.addEventListener("keydown", e => {
      console.log(this.afterJump)
      switch (e.keyCode) {
        //SALTO HACIA LOS DOS LADOS------------
        case this.keys.top:
          if (this.posY >= this.posY0) {

            if (this.pos == 2) {
              this.afterJump = 2
              this.image.frames = 2;
              this.image.src = "./images/JumpLeft.png";
              this.jump();
              document.addEventListener("keypress" ,e => {

                this.posX -= this.velX;
                this.posX -= 30
              })

            }
            else if (this.pos == 1) {
              this.posX += this.velX;
              this.image.frames = 2;
              this.image.src = "./images/JumpRight.png"
              this.jump()
              this.afterJump = 1
            } else {

              this.image.frames = 2;
              this.image.src = "./images/JumpRight.png"
              this.jump()
              this.afterJump = 1
            }
            if (this.posY == this.posY0) {
              this.image.src = "./images/IdleLeft.png";
              this.image.frames = 4;
            }
          }
          break;
        //ATAQUE HACIA LOS DOS LADOS-----------
        case this.keys.space:
          if (this.pos == 2) {
            this.image.frames = 4;
            this.image.src = "./images/AttackLeft.png";
            this.shoot();
          }
          else if (this.pos == 1) {
            this.image.frames = 4;
            this.image.src = "./images/AttackRight.png";
            this.shoot();
          }

          break;
        //MOVIMIENTO IZQUIERDA-----------------
        case this.keys.left:
          this.pos = 2
          this.image.frames = 8;
          this.image.src = "./images/runLeft.png";
          this.posX -= 30
          document.addEventListener("keyup", e => {
            if (this.posY == this.posY0) {
              this.image.src = "./images/IdleLeft.png";
              this.image.frames = 4;
            }
          });
          break;
        //MOVIMIENTO DERECHA---------------
        case this.keys.right:
          this.pos = 1
          this.image.frames = 8;
          this.image.src = "./images/RunRigth.png";
          this.posX += 30
          document.addEventListener("keyup", e => {
            if (this.posY == this.posY0) {
              this.image.src = "./images/IdleRigth.png";
              this.image.frames = 4;
            }
          });

          break
          
      }
    });

  }

  jump() {
    this.posX += this.velX;
    this.posY -= 70;
    this.velY -= 8;
    this.velY += this.gravity;
    if (this.posY >= this.playerPosY0 + this.playerHeight) {
        this.velY *= -1;
  }
  }
  shoot() {
    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height,this.pos));
  }

  clearBullets() {
    this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);
  }
}