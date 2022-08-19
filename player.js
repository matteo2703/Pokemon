class Player extends Sprite{
    constructor({position, image, frames = {max: 1, hold: 10}, sprites, animate = false, rotation = 0, monsters}){
        super({image, frames, sprites, animate, rotation})
        this.monsters = monsters;
        this.position = position;
    } 
}

//player tiles
const playerDownImage = new Image();
playerDownImage.src = './img/playerDown.png';
const playerUpImage = new Image();
playerUpImage.src = './img/playerUp.png';
const playerLeftImage = new Image();
playerLeftImage.src = './img/playerLeft.png';
const playerRightImage = new Image();
playerRightImage.src = './img/playerRight.png';

//player object
const player = new Player({
    position:{
        x: canvas.width/2 - (192/4)/2, 
        y: canvas.height/2 - 68/2,
    },
    image: playerDownImage,
    frames:{
        max: 4,
        hold: 10
    },
    sprites:{
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    },
    monsters: []
})