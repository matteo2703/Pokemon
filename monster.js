class Monster extends Sprite{
    constructor({image, frames = {max: 1, hold: 10}, sprites, animate = false, rotation = 0, isEnemy = false, name, attacks, 
        attacksFromLevel, baseHealth, level = 1, exp = 0, type, weak, strong, evolutionLevel = -1, id}){
        super({image, frames, sprites, animate, rotation})

        this.positionFront = {
            x: 800,
            y: 120
        }
        this.positionBack = {
            x: 300,
            y: 320
        }
        this.isEnemy = isEnemy;
        this.name=name;
        this.id = id;

        this.baseHealth = baseHealth + 3 * level;
        this.health = this.baseHealth;

        this.attacks = attacks;
        this.attacksFromLevel = attacksFromLevel;
        this.type = type;
        this.weak = weak;
        this.strong = strong;

        this.level = level;
        this.evolutionLevel = evolutionLevel;
        this.exp = exp;
        this.requiredExp = (this.level+1) ^ 3 - this.level ^ 3;
        this.releaseExp = this.level ^ 3;
    }

    setBaseHealth(){
        this.baseHealth += 3 * this.level;
    }

    setLevel(level){
        this.level = level;
        this.requiredExp = (this.level+1) ^ 3 - this.level ^ 3;
        this.releaseExp = this.level ^ 3;
    }

    //set position in the battle area
    setBattlePosition(){
        if(this.isEnemy){
            this.position = this.positionFront
            this.image.src = this.sprites.front;
        }
        else{
            this.position = this.positionBack;
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
            this.position.x - this.width / 2,
            this.position.y - this.height,
            this.image.width / this.frames.max * 3,
            this.image.height * 3
        );
        c.restore();

        if(!this.animate) 
            return;

        //animation loop
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

    //dead
    faint(recipient){
        document.querySelector('#dialogBox').innerHTML = this.name + ' ha esaurito le forze...';
        //audio.battle.stop();
        //go down
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        //desappear
        gsap.to(this, {
            opacity: 0
        })
        //reset normal position for the future
        gsap.to(this.position,{
            y: this.position.y
        })

        //release exp at the player
        if(this.isEnemy){
           recipient.exp += this.releaseExp;
        }
    }

    attack({attack, recipient, renderedSprites}){

        //attack dialog
        let dialogBox = document.querySelector('#dialogBox');
        dialogBox.style.display = 'block';
        dialogBox.innerHTML = this.name + ' usa ' + attack.name;

        //prepare attack
        let damage;
        if(attack.type == recipient.weak)
        //double if strong against opponent element
            damage = attack.damage * 2;
        else if(attack.type == recipient.strong)
        //half if weak against opponent element
            damage = attack.damage / 2;
        else
            damage = attack.damage;
        //set health of the opponent
        recipient.health -= damage;
        let newHealth;
        newHealth = (recipient.health / recipient.baseHealth * 100);
        if(newHealth <= 0) newHealth = 0;
        let healthBar = '#enemyHealthBar';
        let movementDistance = 20;
        let rotation = 1
        if(this.isEnemy) {
            //mirroring effects
            healthBar = '#myHealthBar';
            movementDistance = -20;
            rotation = -1;
        }

        switch(attack.type){
            case 'Fuoco':
                fireAttack(this, recipient, rotation, renderedSprites, healthBar, newHealth);
            break;

            case 'Elettrico':
                electroAttack(this, recipient, rotation, renderedSprites, healthBar, newHealth);
            break;

            case 'Acqua':
                waterAttack(this, recipient, renderedSprites, healthBar, newHealth);
            break;

            case 'Erba':
                grassAttack(this, recipient, renderedSprites, healthBar, newHealth);
            break;

            //attacco fisico
            default:
                baseAttack(this, recipient, movementDistance, healthBar, newHealth);
            break;
        }
    }
}

function evolution(monsterToEvolve){
    monsterDatabase.forEach(monster =>{
        if(monster.id == monsterToEvolve.id + 1){
            return monster.id;
        }
    })
    return monsterToEvolve.id;
}

const ditto = new Monster(monsters.Ditto);
const bulbasaur = new Monster(monsters.Bulbasaur);
const ivysaur = new Monster(monsters.Ivysaur);
const venusaur = new Monster(monsters.Venusaur);
const squirtle = new Monster(monsters.Squirtle);
const wartortle = new Monster(monsters.Wartortle);
const blastoise = new Monster(monsters.Blastoise);
const charmander = new Monster(monsters.Charmander);
const charmeleon = new Monster(monsters.Charmeleon);
const charizard = new Monster(monsters.Charizard);

const monsterDatabase = [ditto, bulbasaur, ivysaur, venusaur, squirtle, wartortle, blastoise, charmander, charmeleon, charizard];