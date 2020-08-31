class Background {
    constructor(ctx, w, h, img,character) {
        this.ctx = ctx
        this.backgroundWidth = w
        this.backgroundHeight = h
        this.backgroundImg = new Image()
        this.backgroundImg.src = img
        this.backgroundPos = {
            x: 0,
            y: 0
        }
        this.backgroundSpeed = 1
        this.char = character
    }
    draw() {
        this.move()
        this.ctx.drawImage(this.backgroundImg, this.backgroundPos.x, this.backgroundPos.y, this.backgroundWidth, this.backgroundHeight);
        this.ctx.drawImage(this.backgroundImg, this.backgroundPos.x + this.backgroundWidth, this.backgroundPos.y, this.backgroundWidth, this.backgroundHeight);
    }
    move() {
        if (this.char.pos != 0)
        {
        if ( this.char.pos == 1 )
            this.backgroundPos.x <= -this.backgroundWidth ? this.backgroundPos.x = 0 : this.backgroundPos.x -= this.char.velX 
        else
        this.backgroundPos.x <= -this.backgroundWidth ? this.backgroundPos.x = 0 : this.backgroundPos.x += this.char.velX 
        }
    }
}