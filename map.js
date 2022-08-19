//create Canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

//create collision map from an array of bytes
for(let i=0;i<collisions.length;i+=70){
    collisionsMap.push(collisions.slice(i, 70+i));
}
//create battleZones map from an array of bytes
for(let i=0;i<battleZonesData.length;i+=70){
    battleZonesMap.push(battleZonesData.slice(i, 70+i));
}

//create array to create boundaries
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) =>{
        if(symbol === 1025){
            boundaries.push(new Boundary({
                position:{
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                },
                color: 'rgba(255, 0, 0, 0)'
            }))
        }
    })
})

//create arrray to create battleZones
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) =>{
        if(symbol === 1025){
            battleZones.push(new Boundary({
                position:{
                    x: j*Boundary.width + offset.x,
                    y: i*Boundary.height + offset.y
                },
                color: 'rgba(0, 255, 0, 0)'
            }))
        }
    })
})