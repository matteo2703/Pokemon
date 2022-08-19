//create my monsters
const myHero = new Monster(monsters.Charmander);
myHero.setLevel(19);
myHero.exp = 1140;
player.monsters.push(myHero);

const movables = [background, ...boundaries, foreground, ...battleZones]

//animation function
let clicked = false;
function animate(){

    const animationId = window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary =>{
        boundary.draw();
    })
    battleZones.forEach(battleZone =>{
        battleZone.draw();
    })
    player.draw();  
    foreground.draw(); 

    let moving = true;
    player.animate = false;
    if(battle.initiated) return;
    //check if i'm in a battle zone
    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for(let i=0; i<battleZones.length; i++){
            const battleZone = battleZones[i];
            const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
            Math.max(player.position.x, battleZone.position.x)) * 
            (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
            Math.max(player.position.y, battleZone.position.y));
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: battleZone
            })
            && overlappingArea > player.width * player.height /2
            //try to go into a battle
            && Math.random() < 0.02
            ){
                //deactivate current animation loop
                window.cancelAnimationFrame(animationId);
                //audio.Map.stop();
                //audio.initBattle.play();
                //audio.battle.play();
                battle.initiated = true;

                //enter battle animation
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                        gsap.to('#overlappingDiv', {
                        opacity: 1,
                        duration: 0.4,
                        onComplete(){
                            myPosition={
                                x: background.position.x,
                                y: background.position.y,
                            }
                            randomEnemy = Math.floor(Math.random() * enemies.length);
                            initBattle(player.monsters, randomEnemy);
                            animateBattle();
                            gsap.to('#overlappingDiv', {
                                opacity: 0,
                                duration: 0.4,
                                })
                        }
                        })
                    }
                })
                break;
            }
        }
    }

    //check if collide before moving, if so not move the player
    //moving up
    if(keys.w.pressed && lastKey === 'w'){
        player.animate = true;
        player.image = player.sprites.up;
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position:{
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                }}
            })){
                moving=false;
                break;
            }
        }
        if(moving){
            movables.forEach(movable =>{
                movable.position.y += 3;
            })
        }
    }
    //moving left
    else if(keys.a.pressed && lastKey === 'a'){
        player.animate = true;
        player.image = player.sprites.left;
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position:{
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                }}
            })){
                moving=false;
                break;
            }
        }
        if(moving){
            movables.forEach(movable =>{
                movable.position.x += 3;
            })
        }
    }
    //moving down
    else if(keys.s.pressed && lastKey === 's'){
        player.animate = true;
        player.image = player.sprites.down;
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position:{
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                }}
            })){
                moving=false;
                break;
            }
        }
        if(moving){
            movables.forEach(movable =>{
                movable.position.y -= 3;
            })
        }
    }
    //moving right
    else if(keys.d.pressed && lastKey === 'd'){
        player.animate = true;
        player.image = player.sprites.right;
        for(let i=0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(rectangularCollision({
                rectangle1: player,
                rectangle2: {...boundary, 
                    position:{
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                }}
            })){
                moving=false;
                break;
            }
        }
        if(moving){
            movables.forEach(movable =>{
                movable.position.x -= 3;
            })
        }
    }
}

//events for pressing movement keys
let lastKey = '';
window.addEventListener('keydown', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
})

//events for releasing movement keys
window.addEventListener('keyup', (e) =>{
    switch(e.key){
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})

//switch audio map on/off
addEventListener('click', () =>{
    if(!clicked){
        //audio.Map.play();
        clicked = true;
    }else{
        //audio.Map.stop();
        clicked = false;
    }
})

animate();