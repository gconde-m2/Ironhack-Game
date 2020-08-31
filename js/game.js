
const mainGame = {
    name: 'Space Ironhacker',
    author: 'Belén Olias Ericsson y Guillermo Conde magaña',
    version: '1.0.0 por decir algo',
    license: undefined,
    description: 'The best game u gonna play in ya life ',
    canvasId: undefined,
    ctx: undefined,
    mainChar: undefined,
    enemies: [],
    obstacles: [],
    frames: 0,
    FPS: 60,
    lives: undefined,
    background: undefined,
    canvasSize: {
        w: 1200,
        h: 900
    },
    flagEnemy :0,
    gameSpeed: 1,
    baseY: undefined,
    keys: {
        top: 38,
        right: 39,
        left: 37,
        space: 32
    },
    init(){
        this.canvasId = document.getElementById('myCanvas')
        this.ctx = this.canvasId.getContext('2d')
        this.setEvent()
        // this.welcome()
    },
    // setDimensions() {
    //     document.getElementById(this.canvasId).setAttribute('width', 1200)
    //     document.getElementById(this.canvasId).setAttribute('height', 900)
    //     this.canvasSize.w = 1200
    //     this.canvasSize.h = 900
    //     console.log("A")
    // },
    welcome() {
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 140, 900, 100)
        const startButton = document.getElementById('start-button')
        this.ctx.drawImage(startButton, 500, 700, 240, 80)
        const control = document.getElementById('control')
        this.ctx.drawImage(control, 330, 290, 570, 320)
    },
    setEvent() {
        
            window.addEventListener = () => {
                document.getElementById('myCanvas').onclick = () => {
                    this.startGame()
                    console.log("A")
                }
            }
            window.addEventListener("keydown", e => {
                switch (e.keyCode) {
                    case this.keys.enter:
                        this.startGame()
                        console.log("wgu")
                        break;
                }
            })
        
    
    },
    startGame() {
     
        this.reset()
        this.interval = setInterval(() => {
            this.clearScreen()
            this.drawAll()
            // this.generateEnemies()
            this.clearEnemies()
            this.generateObstacles()
            this.clearObstacles()
            //this.collisionBullet() ? alert("alfonso") : null
            //this.collisionBullet() ? this.clearEnemies() : null
            //this.collisionEnemy() ? console.log("me han mataoo") : null
            console.log(this.mainChar.posY )
            console.log(this.obstacles.posY - this.obstacles.height )
            this.collisionObstacles() ? this.collision(): null
            this.frames > 5000 ? this.frames = 0 : this.frames++
            // this.collision() ? this.lives-- : null
            // this.lives = 0 ? this.gameOver : null
        }, 1000 / this.FPS)
    },
    collision(){
       //colision x
       switch(this.mainChar.posAttack){

        case 1:
            console.log("paco")
        if ( this.mainChar.posY - 150  >= this.obstacles.posY - this.obstacles.height + 10 && this.mainChar.posX <= this.obstacles.posX - this.obstacles.width )
            this.mainChar.velX = 0
            else 
            this.mainChar.velX = 5
            break;
         case 2:
            if ( this.mainChar.posY - 150  >= this.obstacles.posY - this.obstacles.height + 10 &&  this.mainChar.posX >= this.obstacles.posX  )
            this.mainChar.velX = 0
            else
            this.mainChar.velX = 5
            break;

        default:
            

       }
        // this.mainChar.posAttack == 1 && this.mainChar.posY - 150  >= this.obstacles.posY - this.obstacles.height + 10
        //  || this.mainChar.posAttack == 2 && this.mainChar.posY - 150  >= this.obstacles.posY - this.obstacles.height + 10 ? 
        //  this.mainChar.velX = 0 : this.mainChar.velX = 5

        //colision y
        this.mainChar.posY >= this.obstacles.posY - this.obstacles.height + 10 && this.mainChar.posY >= this.obstacles.posX - this.obstacles.width + 120 ? this.mainChar.velY = 0 : this.mainChar.velY = 5

    },
    reset() {
        
        this.mainChar = new Character(this.ctx,this.canvasSize.w,this.canvasSize.h,this.keys,this.obstacles)
        
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./images/bg2.jpg",this.mainChar)
        this.enemies =new Enemy(this.ctx,this.canvasSize.w,this.canvasSize.h,this.background,this.mainChar)
       this.obstacles = new Obstacle(this.ctx,this.canvasSize.w,this.canvasSize.h,this.background,this.mainChar)
        // this.player = new Player(this.ctx, this.width, this.height, this.keys)
        //this.obstacles = []
        this.mainChar.bullets = []
        // this.enemies = []
        this.lives = 3
    },
    drawLives() {
        this.ctx.fillText('Lives: ' + this.lives, 100, 100)
        this.ctx.font = '20px sans-serif'
    },
    drawAll() {
       
        this.background.draw()
        this.mainChar.draw(this.frames)
        this.enemies.draw(this.frames)
        
        this.drawLives()
        this.obstacles.draw()
        //this.obstacles.forEach(elm => elm.draw())
        
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    generateObstacles() {
        //this.frames % 1800 === 0 ? this.obstacles.push(new Obstacle(this.ctx,this.canvasSize.w,this.canvasSize.h,this.background,this.mainChar)) : null
    },
    clearObstacles() {
        //this.obstacles = this.obstacles.filter(elm => elm.obsPosX >= 0)
        this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm.posX <= 1200 && elm.posX >= 0)
    },
    generateEnemies() {
    },
    
    clearEnemies() {
        //this.enemies = this.enemies.filter(elm => elm.enemyPosX >= 0 || this.flagEnemy == 1)
        //añadir: filtrar a los que han colisionado con una bullet
    },
   
     collisionEnemy(){
          
            if( this.mainChar.posX + 200  >= this.enemies.posX &&
             this.mainChar.posX  <= this.enemies.posX + 200  &&
             this.mainChar.posY  >= this.enemies.posY &&
             this.mainChar.posY  <= this.enemies.posY )
                return true;
    },
    collisionBullet(){
        
        let paco = false
        
        this.mainChar.bullets.forEach(elm => {
            
            // console.log("bala"+ elm.posX)
            // console.log("paco" +this.enemies.posX)
            if(elm.posX + 100 >= this.enemies.posX){
                
                 paco = true
                }
        })
            return paco
        
    },
    collisionObstacles(){
        
       
        if( this.mainChar.posX + this.mainChar.width/2 >= this.obstacles.posX &&
            this.mainChar.posX  <= this.obstacles.posX &&
            this.mainChar.posY   >= this.obstacles.posY  - this.obstacles.height &&
            this.mainChar.posY  <= this.obstacles.posY )
               return true;

    },

    gameOver() {
        clearInterval(this.interval)
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.fillRect(50, 50, this.canvasSize.w - 50, this.canvasSize.h - 50)
        this.ctx.font = 'sans-serif 50px'
        this.ctx.fillText('¡Has perdido merluzo!', 150, 250, 200)
        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 140, 900, 100)
        const playAgain = document.getElementById('play-again')
        this.ctx.drawImage(playAgain, 400, 700, 340, 80)
    },
    
    wonGame() {
        clearInterval(this.interval)
        const welcomeImg = document.getElementById('welcome-bg')
         this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)
         this.ctx.fillRect(50, 50, this.canvasSize.w - 50, this.canvasSize.h - 50)
         this.ctx.font = 'sans-serif 50px'
         this.ctx.fillStyle = 'white'
            this.ctx.fillText('¡Has ganado!', 150, 250, 200)
         this.ctx.fillText('¡Has ganado!', 150, 250, 200)
         const logo = document.getElementById('logo')
         this.ctx.drawImage(logo, 145, 140, 900, 100)
         const playAgain = document.getElementById('play-again')
         this.ctx.drawImage(playAgain, 400, 700, 340, 80)
    }
}
