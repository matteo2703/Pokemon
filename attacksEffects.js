function hittingOpponent(defender){
    gsap.to(defender.position,{
        x: defender.position.x + 10,
        yoyo: true,
        repeat: 5,
        duration: 0.08
    })
    gsap.to(defender,{
        opacity: 0,
        repeat: 3,
        yoyo: true,
        duration: 0.08
    })
}
function setNewHealth(healthBar, newHealth){
    gsap.to(healthBar,{
        width: newHealth + '%'
    })
}

function baseAttack(striker, defender, movementDistance, healthBar, newHealth){
    const tl = gsap.timeline()
    tl.to(striker.position, {
        x: striker.position.x - movementDistance
    }).to(striker.position, {
        x: striker.position.x + movementDistance * 2,
        duration: 0.1,
        onComplete: () => {
            //hitting
            setNewHealth(healthBar,newHealth);
            //audio.attaccoFisico.play();
            hittingOpponent(defender);
        }
    }).to(striker.position, {
        x: striker.position.x
    })
}

function fireAttack(striker, defender, rotation, renderedSprites, healthBar, newHealth){
    //create fireball
    //audio.initAttaccoFuoco.play();
    fireball.position = {
        x:striker.position.x,
        y: striker.position.y
    }
    fireball.rotation = rotation;
    renderedSprites.splice(1, 0, fireball);
    gsap.to(fireball.position,{
        x: defender.position.x,
        y: defender.position.y,
        onComplete: () =>{                      
            renderedSprites.splice(1, 1);
            //hitting
            setNewHealth(healthBar,newHealth);
            //audio.attaccoFuoco.play();
            hittingOpponent(defender);
        }
    })
}

function waterAttack(striker, defender, renderedSprites, healthBar, newHealth){
    //create waterball
    //audio.initAttaccoFuoco.play();        da sostituire con rumore bolla d'acqua
    bolla.position = {
        x: striker.position.x,
        y: striker.position.y
    },
    renderedSprites.splice(1, 0, bolla);
    gsap.to(bolla.position,{
        x: defender.position.x,
        y: defender.position.y,
        onComplete: () =>{                      
            renderedSprites.splice(1, 1);
            //hitting
            setNewHealth(healthBar,newHealth);
            hittingOpponent(defender);
        }
    })
}

function grassAttack(striker, defender, renderedSprites, healthBar, newHealth){
    //create whip
    //audio.initAttaccoFuoco.play();        da sostituire con rumore taglio
    liana.position ={
        x: striker.position.x + striker.width * 2,
        y: striker.position.y - striker.height,
    }
    renderedSprites.splice(1, 0, liana);  
    gsap.to(liana,{
        onComplete(){
            renderedSprites.splice(1, 1);
            //hitting
            setNewHealth(healthBar,newHealth);
            hittingOpponent(defender);
        }
    })
}

function electroAttack(striker, defender, rotation, renderedSprites, healthBar, newHealth){
    //create electroball
    //audio.initAttaccoFuoco.play();
    scintilla.position = {
        x: striker.position.x,
        y: striker.position.y
    }       
    scintilla.rotation = rotation,
    renderedSprites.splice(1, 0, scintilla);
    gsap.to(scintilla.position,{
        x: defender.position.x,
        y: defender.position.y,
        onComplete: () =>{                      
            renderedSprites.splice(1, 1);
            //hitting
            setNewHealth(healthBar,newHealth);
            hittingOpponent(defender);
        }
    })
}