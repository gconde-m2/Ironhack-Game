
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
    background: undefined,
    canvasSize: {
        w: 1200,
        h: 900
    },

    init(id){
        this.canvasID = id
        const ctx = document.getElementById(this.canvasId).getContext('2d');
    }


}