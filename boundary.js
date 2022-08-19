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