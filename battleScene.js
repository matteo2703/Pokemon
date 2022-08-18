//sprites to load
let renderedSprites;
//queue of actions
let queue;
//set enemy
let enemy;

//adding enemies
const ditto = new Monster(monsters.Ditto);
const bulbasaur = new Monster(monsters.Bulbasaur);
const enemies = [bulbasaur];

//load battle background image
const battleBackgroundImage = new Image();
battleBackgroundImage.src = './img/battleBackground.png';
const battleBackground = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

function selectActiveMonster(myMonsters){
    for(let i=0; i < myMonsters.length; i++){
        if(myMonsters[i].health > 0)
            return i;
    }
    return 0;
}

//initialize components
function initBattle(myMonsters, fightEnemy){

    let myMonster = selectActiveMonster(myMonsters);
    enemy = enemies[fightEnemy];
    enemy.isEnemy = true;
    enemy.setPosition();
    myMonsters[myMonster].setPosition();

    document.querySelector('#enemyName').innerHTML = enemy.name;
    document.querySelector('#myMonsterName').innerHTML = myMonsters[myMonster].name;
    document.querySelector('#battleUserInterface').style.display = 'block';
    document.querySelector('#dialogBox').style.display = 'none';
    document.querySelector('#enemyHealthBar').style.width = '100%';
    document.querySelector('#myHealthBar').style.width = (myMonsters[myMonster].health / myMonsters[myMonster].baseHealth * 100) + '%';
    document.querySelector('#attacksBox').replaceChildren();
    
    renderedSprites = [enemy, myMonsters[myMonster]];
    queue = [];

    myMonsters[myMonster].attacks.forEach(attack =>{
        const button = document.createElement('button');
        button.innerHTML = attack.name;
        document.querySelector('#attacksBox').append(button);
    })

    document.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click', (e) =>{
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            myMonsters[myMonster].attack({
                attack: selectedAttack,
                recipient: enemy,
                renderedSprites
            })
    
            if(enemy.health <= 0){
                queue.push(() =>{
                    enemy.faint();
                })
                //audio.vittoria.play();
                queue.push(() =>{
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            window.cancelAnimationFrame(battleAnimationId);
                            animate();
                            document.querySelector('#battleUserInterface').style.display = 'none';
                            gsap.to('#overlappingDiv',{
                                opacity: 0
                            })
                            battle.initiated = false;
                        }
                    })
                })
            }
    
            //random enemy attack
            const randomAttack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];
            queue.push(() => {
                enemy.attack({
                    attack: randomAttack,
                    recipient: myMonsters[myMonster],
                    renderedSprites
                })
                if(myMonsters[myMonster].health <= 0){
                    queue.push(() =>{
                        myMonsters[myMonster].faint();
                    })
                    queue.push(() =>{
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                window.cancelAnimationFrame(battleAnimationId);
                                animate();
                                document.querySelector('#battleUserInterface').style.display = 'none';
                                gsap.to('#overlappingDiv',{
                                    opacity: 0
                                })
                                battle.initiated = false;
                                if(myMonster == myMonsters.length - 1)
                                    reset();
                            }
                        })
                    })
                }
            })
        })
    
        button.addEventListener('mouseenter', (e) =>{
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            document.querySelector('#attackType').innerHTML = selectedAttack.type;
            document.querySelector('#attackType').style.color = selectedAttack.color;
        })
    
        button.addEventListener('mouseleave', (e) =>{
            document.querySelector('#attackType').innerHTML = 'Tipologia di Attacco';
            document.querySelector('#attackType').style.color = 'black';
        })
    });
}

//animate battle
let battleAnimationId;
function animateBattle(){
    battleAnimationId = window.requestAnimationFrame(animateBattle);
    battleBackground.draw();

    renderedSprites.forEach((sprite) =>{
        sprite.draw();
    })
}

document.querySelector('#dialogBox').addEventListener('click', (e) =>{
    if(queue.length > 0){
        queue[0]();
        queue.shift();
    }else
        e.currentTarget.style.display = 'none';
})

function reset(){
    movement ={
        x: lastCheckPoint.x - myPosition.x,
        y: lastCheckPoint.y- myPosition.y
    }
    player.image = player.sprites.down;
    player.frames.val = 0;
    movables.forEach(movable =>{
        movable.position.x += movement.x;
        movable.position.y += movement.y;
    })
    player.monsters.forEach(monster =>{
        monster.health = monster.baseHealth;
        monster.frames.val = 0;
        monster.opacity = 1;
    })
}