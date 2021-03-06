class Character {

    constructor(ctx, gameW, gameH, keys, obstacles) {

        this.ctx = ctx;

        this.gameWidth = gameW;
        this.gameHeight = gameH;
        this.obstacles = obstacles,
        this.width = 500;
        this.height = 500;

        this.image = new Image();
        this.image.src = "./images/IdleRigth.png";
        this.image.frames = 4;
        this.image.framesIndex = 2;

        this.posX = 20;
        this.posY = this.gameHeight - this.height + 70;
        this.posY0 = this.posY;
        this.isJumping = undefined;
        this.velY = 1;
        this.gravity = 0.4;
        this.velX = 5;
        this.basicAttack = 0, 
        this.keys = keys;
        this.posAttack = 1,
        this.bullets = [];
        this.pos = 0, 
        this.afterJump = 0,
        this.setListeners();
        this.state = 0
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
        if (this.posY <= this.posY0) { 
            this.posY += this.velY;
            this.velY += this.gravity;
        } else {
            this.velY = 1;
        }
    }

    setListeners() {

        document.addEventListener("keydown", e => {
           
            switch (e.keyCode) {
                //SALTO HACIA LOS DOS LADOS------------
                case this.keys.top:
                    if (this.posY >= this.posY0 || this.velY == 0) {

                        if (this.pos == 2) {
                            this.afterJump = 2
                            this.image.frames = 2;
                            this.image.src = "./images/JumpLeft.png";
                            this.jump();

                        } else if (this.pos == 1) {
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
                    const audioFiu = document.getElementById("fiu")
                    audioFiu.play()
                    if (this.posAttack == 2) {
                        this.image.frames = 4;
                        this.image.src = "./images/AttackLeft.png";
                        this.basicAttack = 1

                        break
                    } else if (this.posAttack == 1) {
                        this.image.frames = 4;
                        this.image.src = "./images/AttackRight.png";
                        this.basicAttack = 1

                        break;
                    }
                    case this.keys.throw:
                        const audioKnife = document.getElementById("knife")
                        audioKnife.play()
                    if (this.posAttack == 2) {
                        this.shoot();
                        break
                    } else if (this.posAttack == 1) {
                        this.shoot();
                        break;
                    }

                    //MOVIMIENTO IZQUIERDA-----------------
                    case this.keys.left:
                        this.posAttack = 2
                        this.pos = 2
                        this.image.frames = 8;
                        this.image.src = "./images/runLeft.png";
                        //this.posX -= this.velX
                        document.addEventListener("keyup", e => {
                            if (this.pos == 2) {
                                this.image.src = "./images/IdleLeft.png";
                                this.image.frames = 4;
                                this.pos = 0
                                this.posAttack = 2
                            }
                        });
                        break;
                        //MOVIMIENTO DERECHA---------------
                    case this.keys.right:
                        this.posAttack = 1
                        this.pos = 1
                        this.image.frames = 8;
                        this.image.src = "./images/RunRigth.png";
                        document.addEventListener("keyup", e => {
                            if (this.pos == 1) {
                                this.image.src = "./images/IdleRigth.png";
                                this.image.frames = 4;
                                this.pos = 0
                                this.posAttack = 1
                            }
                        });
                        break
            }
        });
    }

    jump() {
        const audioJump = document.getElementById("jump")
          audioJump.play()
        this.posY -= 30;
        this.velY -= 8;
        this.isJumping = true
        if (this.posY >= this.playerPosY0 + this.playerHeight) {
            this.velY *= -1;
        }

    }
    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height, this.pos, this.posAttack));
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth);
    }
    
}