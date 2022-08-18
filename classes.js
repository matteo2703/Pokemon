//generic sprite class
class Sprite{
    constructor({position, image, frames = {max: 1, hold: 10}, sprites, animate = false, rotation = 0}){
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
            this.image.width / this.frames.max,
            this.image.height
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

class Player extends Sprite{
    constructor({position, image, frames = {max: 1, hold: 10}, sprites, animate = false, rotation = 0, monsters}){
        super({image, frames, sprites, animate, rotation})
        this.monsters = monsters;
        this.position = position;
    } 
}

class Monster extends Sprite{
    constructor({image, frames = {max: 1, hold: 10}, sprites, animate = false, rotation = 0, 
        isEnemy = false, name, attacks, baseHealth, level = 1, exp = 0, type, weak, strong}){
        super({image, frames, sprites, animate, rotation})
        this.positionFront = {
            x: 800,
            y: 100
        }
        this.positionBack = {
            x: 300,
            y: 320
        }
        this.isEnemy = isEnemy;
        this.name=name;
        this.baseHealth = baseHealth + 3 * level;
        this.health = this.baseHealth;
        this.attacks = attacks;
        this.level = level;
        this.exp = exp;
        this.type = type;
        this.weak = weak;
        this.strong = strong;
    }

    setPosition(){
        if(this.isEnemy){
            this.position = {
                x: this.positionFront.x,
                y: this.positionFront.y
            }
            this.image.src = this.sprites.front;
        }
        else{
            this.position = {
                x: this.positionBack.x,
                y: this.positionBack.y
            }
            this.image.src = this.sprites.back;
        }
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
            this.image.width / this.frames.max * 3,
            this.image.height * 3
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

    faint(){
        document.querySelector('#dialogBox').innerHTML = this.name + ' ha esaurito le forze...';
        //audio.battle.stop();
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0
        })
        gsap.to(this.position,{
            y: this.position.y
        })
    }

    attack({attack, recipient, renderedSprites}){

        document.querySelector('#dialogBox').style.display = 'block';
        document.querySelector('#dialogBox').innerHTML = this.name + ' usa ' + attack.name;

        let healthBar = '#enemyHealthBar';
        let damage;
        if(attack.type == recipient.weak)
            damage = attack.damage * 2;
        else if(attack.type == recipient.strong)
            damage = attack.damage / 2;
        else
            damage = attack.damage;
        recipient.health -= damage;
        let newHealth;
        newHealth = (recipient.health / recipient.baseHealth * 100);
        if(newHealth <= 0) newHealth = 0;
        let movementDistance = 20;
        let rotation = 1
        if(this.isEnemy) {
            healthBar = '#myHealthBar';
            movementDistance = -20;
            rotation = -1;
        }

        switch(attack.type){
            case 'Fuoco':
                //create fireball
                //audio.initAttaccoFuoco.play();
                const fireballImage = new Image();
                fireballImage.src = './img/fireball.png';
                const fireball = new Sprite({
                    position:{
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation,
                })
                renderedSprites.splice(1, 0, fireball);

                gsap.to(fireball.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () =>{                      
                        renderedSprites.splice(1, 1);
                        //hitting
                        gsap.to(healthBar,{
                            width: newHealth + '%'
                        })
                        //audio.attaccoFuoco.play();

                        gsap.to(recipient.position,{
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient,{
                            opacity: 0,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
            break;

            case 'Elettrico':
                //create fireball
                //audio.initAttaccoFuoco.play();
                const scintillaImage = new Image();
                scintillaImage.src = './img/fireball.png';
                const scintilla = new Sprite({
                    position:{
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: scintillaImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation,
                })
                renderedSprites.splice(1, 0, scintilla);

                gsap.to(scintilla.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () =>{                      
                        renderedSprites.splice(1, 1);
                        //hitting
                        gsap.to(healthBar,{
                            width: newHealth + '%'
                        })
                        //audio.attaccoFuoco.play();

                        gsap.to(recipient.position,{
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient,{
                            opacity: 0,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
            break;

            case 'Acqua':
                //create fireball
                //audio.initAttaccoFuoco.play();
                const bollaImage = new Image();
                bollaImage.src = './img/fireball.png';
                const bolla = new Sprite({
                    position:{
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: bollaImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation,
                })
                renderedSprites.splice(1, 0, bolla);

                gsap.to(bolla.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () =>{                      
                        renderedSprites.splice(1, 1);
                        //hitting
                        gsap.to(healthBar,{
                            width: newHealth + '%'
                        })
                        //audio.attaccoFuoco.play();

                        gsap.to(recipient.position,{
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient,{
                            opacity: 0,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
            break;

            case 'Erba':
                //create fireball
                //audio.initAttaccoFuoco.play();
                const lianaImage = new Image();
                lianaImage.src = './img/fireball.png';
                const liana = new Sprite({
                    position:{
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: lianaImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation: rotation,
                })
                renderedSprites.splice(1, 0, liana);

                gsap.to(liana.position,{
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () =>{                      
                        renderedSprites.splice(1, 1);
                        //hitting
                        gsap.to(healthBar,{
                            width: newHealth + '%'
                        })
                        //audio.attaccoFuoco.play();

                        gsap.to(recipient.position,{
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient,{
                            opacity: 0,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                })
            break;

            //attacco fisico
            case 'Normale':
                const tl = gsap.timeline()
                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        //hitting
                        gsap.to(healthBar,{
                            width: newHealth + '%'
                        })
                        //audio.attaccoFisico.play();

                        gsap.to(recipient.position,{
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })
                        gsap.to(recipient,{
                            opacity: 0,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            break;
        }
    }
}

//class to create boundaries
class Boundary{

    static width = 48;
    static height = 48;
    constructor({position, color}){
        this.position = position;
        this.width = 48;
        this.height = 48;
        this.color = color;
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}