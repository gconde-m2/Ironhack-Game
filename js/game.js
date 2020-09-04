
const mainGame = {

    name: 'Jungle Ninja',
    author: 'Belén Olias Ericsson y Guillermo Conde Magaña',
    version: '1.0.0',
    license: undefined,
    description: 'Ninja platform game --Alpha ',
    images : undefined,
    canvasId: undefined,
    ctx: undefined,
    mainChar: undefined,
    enemies: [],
    obstacles: [],
    lastBoss: undefined,
    liveHeart : [],
    frames: 0,
    FPS: 60,
    lives: 3,
    background: undefined,
    backgroundTwo: undefined,
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
        throw: 67
    },
    dolor: 0, 
    loadGame:0,


    init() {
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

    setEvent() {


        window.addEventListener("keydown", e => {
            if(this.loadGame == 0){
            switch (e.keyCode) {
            
                case this.keys.enter:
                    this.startGame()
                    break;
            }
        }
        })
    },

    startGame() {


        this.reset()

         const audio = document.getElementById("audio")
          audio.play()
        
            this.interval = setInterval(() => {

            this.clearScreen()

            this.drawAll()

            this.clearEnemies()

            this.generateEnemies()
           
            this.collisionBullet() ? this.clearBullets() : null
            
            this.collisionEnemy() ? this.lives-- && this.background.livesH.pop() : null

            this.generateObstacles()

            this.collisionBulletsBoss()

            this.clearObstacles()

            this.collisionLastBoss() ? this.lives-- && this.background.livesH.pop() : null

            this.collisionObstacles() ? this.collision() : null

            this.frames >= 2000 ? this.lastBoss.draw(this.frames) : null

            this.frames > 5000 ? this.frames = 0 : this.frames++

            this.lastBoss.lives == 0 ? this.wonGame() && audio.pause() : null

            this.lives <= 0 ? this.gameOver() && audio.pause() : null

            this.loadGame = 1

        }, 1000 / this.FPS)
    },

    reset() {
        this.mainChar = new Character(this.ctx, this.canvasSize.w, this.canvasSize.h, this.keys, this.obstacles)
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, "./images/bg7.jpg", this.mainChar)
        this.liveHeart.push(new Lives(this.ctx, 50, 100, "./images/life.png", this.mainChar))
        this.liveHeart.push(new Lives(this.ctx, 100, 100, "./images/life.png", this.mainChar))
        this.liveHeart.push(new Lives(this.ctx, 150, 100, "./images/life.png", this.mainChar)) 
        this.backgroundTwo =  new BackgroundTwo(this.ctx, this.canvasSize.w, this.canvasSize.h, "./images/newBg/Ground.png", this.mainChar)
        this.lastBoss = new LastBoss(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)
        this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar))

        this.lives = 3
    },


    drawAll() {
        this.background.draw()
        this.mainChar.draw(this.frames)
        this.enemies.forEach(elm => elm.draw(this.frames))
        this.liveHeart.forEach(elm => elm.draw()) 
        this.obstacles.forEach(elm => elm.draw())
        this.backgroundTwo.draw()

    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    clearObstacles() {
        this.obstacles = this.obstacles.filter(elm => elm.posX <= 1200 && elm.posX + elm.width >= 0)

    },

    generateObstacles() {


        this.frames % 300 === 0 && this.obstacles.length < 1 ? this.obstacles.push(new Obstacle(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)) : null
    },

    clearBullets() {

        this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm.posX <= 1200 && elm.posX >= 0)

        if (this.dolor == 1) {
            this.mainChar.bullets = []
            this.dolor = 0
        }

    },

    generateEnemies() {

        this.enemies.forEach(elm => {
            if (elm.posX + elm.width == 0)
                elm.posX = elm.gameWidth
        })
        this.frames % 200 === 0 ? this.enemies.push(new Enemy(this.ctx, this.canvasSize.w, this.canvasSize.h, this.background, this.mainChar)) : null
    },

    collision() {

        //colision x
        this.obstacles.forEach(elm => {
            switch (this.mainChar.posAttack) {

                case 1:

                    if (this.mainChar.posY - 100 >= elm.posY - elm.height + 10 && this.mainChar.posX <= elm.posX - elm.width)
                        this.mainChar.velX = 0
                    else
                        this.mainChar.velX = 5
                    break;
                case 2:
                    if (this.mainChar.posY - 80 >= elm.posY - elm.height + 10 && this.mainChar.posX >= elm.posX - elm.width) {
                        this.mainChar.velX = 0
                    } else
                        this.mainChar.velX = 5
                    break;

                default:
            }

            if (this.mainChar.isJumping && this.mainChar.posY >= elm.posX - elm.width) {
                this.mainChar.velY = 0
            } else {

                this.mainChar.velY = 5
            }

        })
    },

    collisionBoss() {

        let flag = false

        this.enemies.forEach(elm => {

            if (this.mainChar.posX >= elm.posX - 1 &&
                this.mainChar.posX <= elm.posX + 1) {

                flag = true
            }
        })
        return flag

    },

    collisionLastBoss() {

        if (this.mainChar.posX >= this.lastBoss.posX - 2 &&
            this.mainChar.posX <= this.lastBoss.posX + 2) {
           
            const audioPain = document.getElementById("pain")
            audioPain.play()
            this.liveHeart.pop()
            return true
        }
    },

    collisionEnemy() {
        let flag = false

        this.enemies.forEach(elm => {

            if (this.mainChar.posX >= elm.posX - 2 && this.mainChar.posX <= elm.posX + 2) {
                flag = true
                
                const audioPain = document.getElementById("pain")
                audioPain.play()

                        this.liveHeart.pop()  
            }
        })
        return flag
    },
    clearEnemies() {

        if (this.flag == true) {

            this.enemies = this.enemies.filter(elm => elm.pain = 0)
            this.flag = 0
        }
    },

    collisionBulletsBoss() {
        let flag = false

        this.mainChar.bullets.forEach(bullet => {

            if (bullet.posX + bullet.width - 240 >= this.lastBoss.posX && bullet.posX <= this.lastBoss.posX + this.lastBoss.width) {
                this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm !== bullet)
                this.lastBoss.lives--
                const audioPain = document.getElementById("pain")
                audioPain.play()
                flag = true
            }
        })

        return flag
    },
    
    collisionBullet() {

        let flag = false

        this.mainChar.bullets.forEach(bullet => {

            this.enemies.forEach(enemy => {

                if (bullet.posX + bullet.width - 240 >= enemy.posX && bullet.posX <= enemy.posX + enemy.width - 240
                    && bullet.posY - bullet.height >= enemy.posY + 100 && bullet.posY - 100 <= enemy.posY + enemy.height) {
                    enemy.pain = 1;
                    this.mainChar.bullets = this.mainChar.bullets.filter(elm => elm !== bullet)
                    this.enemies = this.enemies.filter(elm => elm !== enemy)
                    flag = true
                    const audioEnemydie = document.getElementById("enemyDie")
                    audioEnemydie.play()
                }
            })
        })
        return flag
    },

    collisionObstacles() {

        let flag = false

        this.obstacles.forEach(elm => {

            if (this.mainChar.posX >= elm.posX - (elm.width + 150) && this.mainChar.posX <= elm.posX + (elm.width - 200)
                && this.mainChar.posY <= elm.posY + elm.width + 250 && this.mainChar.posY >= elm.posY - elm.height - 100) {
                flag = true;
            }
        })
        return flag
    },

    gameOver() {
        
          audio.pause()

        clearInterval(this.interval)
        const audioGameover = document.getElementById("gameover")
        audioGameover.play()
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)

        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 110, 900, 200)

        const startButton = document.getElementById('start-button')
        this.ctx.drawImage(startButton, 220, 570, 800, 400)

        const lostImage = document.getElementById('lost')
        this.ctx.drawImage(lostImage, 300, 250, 600, 500)

        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.enter:
                    location.reload();
                    break;
            }
        })
    },

    wonGame() {
        
        audio.pause()
        clearInterval(this.interval)

        const audioWon = document.getElementById("win")
        audioWon.play()
        const welcomeImg = document.getElementById('welcome-bg')
        this.ctx.drawImage(welcomeImg, 0, 0, this.canvasSize.w, this.canvasSize.h)

        const logo = document.getElementById('logo')
        this.ctx.drawImage(logo, 145, 110, 900, 200)

        const startButton = document.getElementById('start-button')
        this.ctx.drawImage(startButton, 220, 570, 800, 400)

        const wonImage = document.getElementById('won')
        this.ctx.drawImage(wonImage, 300, 250, 600, 500)

        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case this.keys.enter:
                    location.reload();
                    break;
            }
        })

    }
}
