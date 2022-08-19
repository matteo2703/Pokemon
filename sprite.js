//generic sprite class
class Sprite{
    constructor({position, image, frames = {max: 1, hold: 10}, sprites, animate = false, rotation = 0, scaleFactor = 1}){
        this.image = new Image();
        this.frames = {...frames, val: 0, elapsed: 0};
        this.image.onload = () =>{
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.image.src = image.src;
        this.animate = animate;
        this.sprites = sprites;
        this.opacity = 1;
        this.rotation = rotation;
        this.position = position;
        this.scaleFactor = scaleFactor;
    }

    draw(){
        c.save();
        c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        c.rotate(this.rotation);
        c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2);
        c.globalAlpha = this.opacity;
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height, 
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max * this.scaleFactor,
            this.image.height * this.scaleFactor
        );
        c.restore();

        if(!this.animate) 
            return;

        if(this.frames.max > 1){
            this.frames.elapsed++;
        }

        if(this.frames.elapsed % this.frames.hold === 0){
            if(this.frames.val < this.frames.max - 1)
                this.frames.val++;
            else
                this.frames.val = 0;
        }
    }   
}

//background object
const background = new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: mapImage
})

//foreground object
const foreground = new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image: foregroundMap
})

//load battle background image
const battleBackground = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

//attacks effects
//fireball effect
const fireball = new Sprite({
    image: fireballImage,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
})

const bolla = new Sprite({
    image: bollaImage,
    frames: {
        max: 4,
        hold: 10
    },
    animate: true,
})

const liana = new Sprite({
    image: lianaImage,
    frames: {
        max: 5,
        hold: 10
    },
    animate: true,
    scaleFactor: 2
})

const scintilla = new Sprite({
    image: scintillaImage,
    frames: {
        max: 5,
        hold: 10
    },
    animate: true,
})