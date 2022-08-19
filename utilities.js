const offset = {
    x: -735,
    y: -650
}

let lastCheckPoint = {
    x: offset.x,
    y: offset.y
}

const collisionsMap = [];
const battleZonesMap = [];
const boundaries = [];
const battleZones = [];
const battle = {initiated: false}
const keys = {
    w:{pressed: false},
    a:{pressed: false},
    s:{pressed: false},
    d:{pressed: false}
}

//function to determine collision from 2 rectangles
function rectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
}