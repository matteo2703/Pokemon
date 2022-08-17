//load enemy monster sprite
let draggle;
//load my monster
let emby;
//sprites to load
let renderedSprites;
//queue of actions
let queue;


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

//initialize components
function initBattle(){
    document.querySelector('#battleUserInterface').style.display = 'block';
    document.querySelector('#dialogBox').style.display = 'none';
    document.querySelector('#enemyHealthBar').style.width = '100%';
    document.querySelector('#myHealthBar').style.width = '100%';
    document.querySelector('#attacksBox').replaceChildren();
    
    draggle = new Monster(monsters.Draggle);
    emby = new Monster(monsters.Emby);
    renderedSprites = [draggle, emby];
    queue = [];

    emby.attacks.forEach(attack =>{
        const button = document.createElement('button');
        button.innerHTML = attack.name;
        document.querySelector('#attacksBox').append(button);
    })

    document.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click', (e) =>{
            const selectedAttack = attacks[e.currentTarget.innerHTML];
            emby.attack({
                attack: selectedAttack,
                recipient: draggle,
                renderedSprites
            })
    
            if(draggle.health <= 0){
                queue.push(() =>{
                    draggle.faint();
                })
                audio.vittoria.play();
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
            const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];
            queue.push(() => {
                draggle.attack({
                    attack: randomAttack,
                    recipient: emby,
                    renderedSprites
                })
                if(emby.health <= 0){
                    queue.push(() =>{
                        emby.faint();
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