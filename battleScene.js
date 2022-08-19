//sprites to load
let renderedSprites;
//queue of actions
let queue;
//set enemy
let enemy;

//adding enemies
const enemies = [ditto,bulbasaur,squirtle,charmander];

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
    enemy.setBattlePosition();
    myMonsters[myMonster].setBattlePosition();

    document.querySelector('#enemyName').innerHTML = enemy.name;
    document.querySelector('#myMonsterName').innerHTML = myMonsters[myMonster].name;
    document.querySelector('#myMonsterLevel').innerHTML = 'Liv. ' + myMonsters[myMonster].level;
    document.querySelector('#battleUserInterface').style.display = 'block';
    document.querySelector('#dialogBox').style.display = 'none';
    document.querySelector('#enemyHealthBar').style.width = '100%';
    document.querySelector('#enemyLevel').innerHTML = 'Liv. ' + enemy.level;
    document.querySelector('#myHealthBar').style.width = (myMonsters[myMonster].health / myMonsters[myMonster].baseHealth * 100) + '%';
    document.querySelector('#attacksBox').replaceChildren();
    document.querySelector('#expBar').style.width = (myMonsters[myMonster].exp / myMonsters[myMonster].requiredExp * 100) + '%';
    console.log((myMonsters[myMonster].exp / myMonsters[myMonster].requiredExp * 100) + '%')
    
    renderedSprites = [enemy, myMonsters[myMonster]];
    queue = [];

    //display max 4 attacks based on the level (the 4 best attacks)
    let attacksToDisplay = [];
    for(let i=0; i<myMonsters[myMonster].attacks.length;i++){
        if(myMonsters[myMonster].attacksFromLevel[i] > myMonsters[myMonster].level || i == myMonsters[myMonster].attacks.length - 1){
            if(i == myMonsters[myMonster].attacks.length - 1 && myMonsters[myMonster].attacksFromLevel[i] <= myMonsters[myMonster].level)
                i++;
            for(let j=i-1, k=4; j>=0; j--, k--){
                if(k>0){
                    attacksToDisplay.push(myMonsters[myMonster].attacks[j]);
                }
            }
            break;
        }
    }
    attacksToDisplay.reverse();
    attacksToDisplay.forEach(attack =>{
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
                    enemy.faint(myMonsters[myMonster]);
                    //level up
                    if(myMonsters[myMonster].exp >= myMonsters[myMonster].requiredExp){
                        myMonsters[myMonster].exp -= myMonsters[myMonster].requiredExp;
                        myMonsters[myMonster].level++;
                        myMonsters[myMonster].setBaseHealth();
                        myMonsters[myMonster].health += 5;
                        document.querySelector('#myMonsterLevel').innerHTML = 'Liv. ' + myMonsters[myMonster].level;
                        document.querySelector('#myHealthBar').style.width = (myMonsters[myMonster].health / myMonsters[myMonster].baseHealth * 100) + '%';
                        if(myMonsters[myMonster].level == myMonsters[myMonster].evolutionLevel)
                            evolve(myMonsters[myMonster],myMonster, monsterDatabase[evolution(myMonsters[myMonster])]);
                    }
                        
                    document.querySelector('#expBar').style.width = (myMonsters[myMonster].exp / myMonsters[myMonster].requiredExp * 100) + '%';
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
                            resetDeadEnemy();
                        }
                    })
                })
            }
    
            //random enemy attack
            let enemyAttacks = [];
            for(let i=0; i<enemy.attacks.length;i++){
                if(enemy.attacksFromLevel[i] > enemy.level || i == enemy.attacks.length - 1){
                    if(i == enemy.attacks.length - 1 && enemy.attacksFromLevel[i] <= enemy.level)
                        i++;
                    for(let j=i-1, k=4; j>=0; j--, k--){
                        if(k>0){
                            enemyAttacks.push(enemy.attacks[j]);
                        }
                    }
                    break;
                }
            }
            const randomAttack = enemyAttacks[Math.floor(Math.random() * enemyAttacks.length)];
            queue.push(() => {
                enemy.attack({
                    attack: randomAttack,
                    recipient: myMonsters[myMonster],
                    renderedSprites
                })
                if(myMonsters[myMonster].health <= 0){
                    queue.push(() =>{
                        myMonsters[myMonster].faint(enemy);
                        resetDeadEnemy();
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

function resetDeadEnemy(){
    enemy.health = enemy.baseHealth;
    enemy.frames.val = 0;
    enemy.opacity = 1;
}

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

function evolve(startMonster, startMonsterPosition, evolvedMonster){

    evolvedMonster.level = startMonster.level;
    evolvedMonster.exp = startMonster.exp;
    evolvedMonster.requiredExp = (evolvedMonster.level+1) ^ 3 - evolvedMonster.level ^ 3;
    evolvedMonster.baseHealth = startMonster.baseHealth + 3 * evolvedMonster.level;
    evolvedMonster.health = startMonster.health;

    player.monsters[startMonsterPosition] = evolvedMonster;
}