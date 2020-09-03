class Background {
    constructor(ctx, w, h, img,character) {
        this.ctx = ctx
        this.livesH = [] 
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
        else if ( this.char.pos == 2 && this.backgroundPos.x < 0 )
        this.backgroundPos.x <= -this.backgroundWidth ? this.backgroundPos.x = 0 : this.backgroundPos.x += this.char.velX 
        }else if (this.backgroundPos.x > 0 && this.char.pos == 2)
        {

           this.char.velX = 0
        }
    
    } 
    lives(){
        const image = new Image();
        image.src = "./images/life.png";
        this.livesH = [
        this.ctx.drawImage(image, 50, 50, 100, 100),
        this.ctx.drawImage(image, 100, 50, 100, 100),
        this.ctx.drawImage(image, 150, 50, 100, 100)
        ]
        this.livesH.pop
    }
}


class BackgroundTwo {
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
            this.backgroundPos.x <= -this.backgroundWidth ? this.backgroundPos.x = 0 : this.backgroundPos.x -= this.char.velX + 1
        else if ( this.char.pos == 2 && this.backgroundPos.x < 0 )
        this.backgroundPos.x <= -this.backgroundWidth ? this.backgroundPos.x = 0 : this.backgroundPos.x += this.char.velX - 1
        }else if (this.backgroundPos.x > 0 && this.char.pos == 2)
        {
           this.char.velX = 0
        }
    }
}

class Lives {
    constructor(ctx, w, h, img,character) {
        this.ctx = ctx
        this.livesH = [] 
        this.w = w
        this.h = h
        this.livesImg = new Image()
        this.livesImg.src = img
        this.backgroundPos = {
            x: 0,
            y: 0
        }
        this.backgroundSpeed = 1
        this.char = character
    }
    draw() {
        
            this.ctx.drawImage(this.livesImg, this.w, this.h, 100, 100)
   
    }
    lives(){
    
        
       
    }
}