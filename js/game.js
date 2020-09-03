
const mainGame = {

    name: 'Space Ironhackers',
    author: 'Belén Olias Ericsson y Guillermo Conde Magaña',
    version: '1.0.0',
    license: undefined,
    description: 'The best game u gonna play in ya life ',
    
    canvasId: undefined,
    ctx: undefined,
    mainChar: undefined,
    enemies: [],
    obstacles: [],
    lastBoss: undefined,
    frames: 0,
    FPS: 60,
    lives: 3,
    background: undefined,
    canvasSize: {
        w: undefined,
        h: undefined
    },
    flagEnemy: 0,
    gameSpeed: 1,
    baseY: undefined,
   
    keys: {
        top: 38,
        right: 39,
        left: 37,
        space: 32, 
        enter: 13,
        throw : 67
    },
    dolor: 0, // cacaaaaa
    


    init(){
        this.canvasId = document.getElementById('myCanvas')
        this.ctx = this.canvasId.getContext('2d')
        this.setDimensions()
        this.welcome()
        this.setEvent()
        
    },

    setDimensions() {
        document.getElementById('myCanvas').setAttribute('width', 1200)
        document.getElementById('myCanvas').setAttribute('height', 900)
        this.canvasSize.w = 1200
        this.canvasSize.h = 900
    },
    
    welcome() {
        
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
        
        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 110, 900, 200)

        const startButton = document.getElementById('start-button')
        this.ctx.drawImage(startButton, 220, 570, 800, 400)

        const control = document.getElementById('control')
        this.ctx.drawImage(control, 330, 290, 570, 320)

        

    }, 
    tree(){
       /* this.image = new Image();
        this.image.src = "./images/Walls/stone.png";
*/

    },

    setEvent() {
        

        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.enter:
                    this.startGame()
                
                    break;
            }
        })
    },
    
    startGame() {


        this.reset()

        //  const audio = document.getElementById("audio")
        //  audio.play()  

        this.interval = setInterval(() => {

            this.clearScreen()
            
            
            this.drawAll()

            

           this.clearEnemies()

           this.generateEnemies()
             this.collisionBullet() ? this.clearBullets() : null

             this.collisionEnemy() ? this.lives-- : null

            this.generateObstacles()
            
            this.collisionBulletsBoss()
            this.clearObstacles()
            this.collisionLastBoss() ? this.lives -- : null
            this.collisionObstacles() ? this.collision() : null

            this.frames >= 2000 ? this.lastBoss.draw(this.frames): null

            this.frames > 5000 ? this.frames = 0 : this.frames++ 

             this.lastBoss.lives == 0 ? this.wonGame() : null
             this.lives <= 0 ? this.gameOver() : null
       
        }, 1000 / this.FPS)
    },

    reset() {
        this.mainChar = new Character(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.obstacles)
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./images/bg7.jpg",this.mainChar)
        this.lastBoss= new LastBoss(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)
        //this.obstacles = new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar))
        this.enemies.push(new Enemy(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)) 
        
        
        this.lives = 3
    },

    drawLives() {
       this.ctx.fillStyle = 'white'
        this.ctx.fillText('Lives: ' + this.lives, 100, 100)
        this.ctx.font = '40px sans-serif'
        
    },

    drawAll() {
        this.background.draw()
        this.mainChar.draw(this.frames)
        this.enemies.forEach(elm => elm.draw(this.frames))
        this.drawLives()
        //this.lastBoss.draw(this.frames);
        //this.obstacles.draw()
        this.obstacles.forEach(elm => elm.draw())
     
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    clearObstacles(){
        this.obstacles = this.obstacles.filter(elm =>elm.posX <= 1200 && elm.posX + elm.width >= 0)
        
    },


    generateObstacles() {

       
       this.frames % 300 === 0 && this.obstacles.length < 1 ? this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)) : null
    },

    clearBullets() {
        
        this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm.posX <= 1200 && elm.posX >= 0)

        if ( this.dolor == 1)
        {
            this.mainChar.bullets = []
               this.dolor = 0 
               
               
        }
       
      //  this.obstacles = this.obstacles.filter(elm => elm.posX >= 0)
    },

    generateEnemies() {
        
        this.enemies.forEach(elm => {
            if ( elm.posX + elm.width == 0)  
                elm.posX = elm.gameWidth
            })
       this.frames % 200 === 0 ? this.enemies.push(new Enemy(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)) : null
    },



    collision() {

        //colision x
        this.obstacles.forEach(elm => {
        switch (this.mainChar.posAttack) {

            case 1:
                
                if (this.mainChar.posY - 100  >= elm.posY - elm.height + 10 && this.mainChar.posX <= elm.posX - elm.width)
                    this.mainChar.velX = 0
                else
                    this.mainChar.velX = 5
        break;
            case 2:
                if (this.mainChar.posY - 80 >= elm.posY - elm.height + 10 && this.mainChar.posX >= elm.posX - elm.width  ){
                    this.mainChar.velX = 0
                    console.log(" porque")
                }else
                    this.mainChar.velX = 5
                break;

            default:
            }

        // this.mainChar.posAttack == 1 && this.mainChar.posY - 150  >= this.obstacles.posY - this.obstacles.height + 10
        //  || this.mainChar.posAttack == 2 && this.mainChar.posY - 150  >= this.obstacles.posY - this.obstacles.height + 10 ? 
        //  this.mainChar.velX = 0 : this.mainChar.velX = 5

        //colision y
      
        
         if (this.mainChar.isJumping && this.mainChar.posY >= elm.posX - elm.width )
          {  
             this.mainChar.velY = 0
         }else 
         {
             
             this.mainChar.velY = 5
         }

         //this.mainChar.posY >= elm.posX - elm.width  ? this.mainChar.velY = 0 : this.mainChar.velY = 5
    })
    },

    collisionBoss(){

        let flag = false
        
        this.enemies.forEach(elm => {
            

            console.log(this.mainChar.posX )
            if (this.mainChar.posX  >= elm.posX - 1  &&
                this.mainChar.posX <= elm.posX + 1  ){
                    
                    flag = true
                    
            }
        })
        return flag
    
    },
    collisionLastBoss(){
        
        if (this.mainChar.posX  >= this.lastBoss.posX - 1  &&
            this.mainChar.posX <= this.lastBoss.posX + 1  ){
                return  true
                
        }
    },

    collisionEnemy() {
        let flag = false
        
        this.enemies.forEach(elm => {
            
            if (this.mainChar.posX  >= elm.posX - 1  &&
                this.mainChar.posX <= elm.posX + 1  ){
                    
                    flag = true
                    
            }
        })
        return flag
        },
        clearEnemies() {

        
            
            if ( this.flag == true)
            {
              
               this.enemies = this.enemies.filter(elm => elm.pain = 0)
               this.flag = 0
            }
        
        // this.enemies.pain = 0
        //añadir: filtrar a los que han colisionado con una bullet
    },
    collisionBulletsBoss(){
        let flag = false

        this.mainChar.bullets.forEach(bullet => {
     
                if (bullet.posX + bullet.width -240  >=this.lastBoss.posX && bullet.posX  <=this.lastBoss.posX +this.lastBoss.width ) {
                  this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm !== bullet)
                  this.lastBoss.lives-- 
    
                   flag = true
                  }

            // flag = true ? this.enemies = this.enemies.filter(elm => elm.pain = 0) :null
        })
        
        return flag
    },
    collisionBullet() {

            let flag = false

            this.mainChar.bullets.forEach(bullet => {
                
                this.enemies.forEach(enemy=> {
                  
                    
                    if (bullet.posX + bullet.width - 240  >= enemy.posX && bullet.posX  <= enemy.posX + enemy.width && bullet.posY - bullet.height >= enemy.posY +100 &&  bullet.posY - 100 <= enemy.posY + enemy.height) {
                      enemy.pain = 1;
                      this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm !== bullet)
                      this.enemies = this.enemies.filter(elm => elm !== enemy) 
                       flag = true
                      }
                    
                })
                
                // flag = true ? this.enemies = this.enemies.filter(elm => elm.pain = 0) :null
            })
            
            return flag

        },
        collisionObstacles() {

            let flag = false

            this.obstacles.forEach(elm => {
                
                // console.log(elm.posX)
            if (this.mainChar.posX >= elm.posX - (elm.width + 150  ) && this.mainChar.posX <= elm.posX + (elm.width - 200)
            && this.mainChar.posY <= elm.posY + elm.width + 250  && this.mainChar.posY >= elm.posY - elm.height - 100 ){
                console.log(":D")
                flag = true;
                console.log(elm.posY + elm.width + 250)  
                console.log(this.mainChar.posY) 
            }
            })
            return flag
        },
        /*&&
        this.mainChar.posX >= elm.posX &&
        this.mainChar.posY >= elm.posY - elm.height &&
        this.mainChar.posY <= elm.posY){*/
    gameOver() {
        
        clearInterval(this.interval)
        
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
        
        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 110, 900, 200)

        const startButton = document.getElementById('start-button')
        this.ctx.drawImage(startButton, 220, 570, 800, 400)
        
        const lostImage = document.getElementById('lost')
        this.ctx.drawImage(lostImage,300, 250, 600, 500)
      
        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.enter:
                    location.reload();
                
                    break;
            }
        })
    },

    wonGame() {
       
        clearInterval(this.interval)
         
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
        
        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 110, 900, 200)

        const startButton = document.getElementById('start-button')
        this.ctx.drawImage(startButton, 220, 570, 800, 400)
        
        const wonImage = document.getElementById('won')
        this.ctx.drawImage(wonImage,300, 250, 600, 500)
      
        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.enter:
                    location.reload();
                
                    break;
            }
        })
        
    }
}
