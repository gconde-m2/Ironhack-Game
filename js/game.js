
const mainGame = {

    name: 'Space Ironhacker',
    author: 'Belén Olias Ericsson y Guillermo Conde magaña',
    version: '1.0.0 por decir algo',
    license: undefined,
    description: 'The best game u gonna play in ya life ',
    
    canvas: undefined,
    ctx: undefined,
    FPS: 60,
    mainChar: undefined,
    enemies: [],
    obstacles: [],
    frames: 0,
    background: undefined,
    framesCounter: 0,
    canvasSize: {
        w: 1200,
        h: 900
    },

    keys: {
        top: 38,
        right: 39,
        space: 32,
        left:  37
    },
    init(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        //setEvent()
        console.log(this.ctx)
        this.startGame()

    },

    startGame()
    {
        this.reset()
        this.ctx.fillStyle = "black";
       
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.canvasSize.w - 200, this.canvasSize.h - 300, 500, 500);
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
           
          }, 1000 / this.FPS)


    },
    drawAll() {
        
        this.mainChar.draw(this.framesCounter)
       
      },

    reset(){

        this.mainChar = new Character(this.ctx,this.canvasSize.w,this.canvasSize.h,this.keys)
    },
    clearAll(){

        this.ctx.clearRect(0, 0, this.canvasSize.w ,this.canvasSize.h);
    }
    
}
