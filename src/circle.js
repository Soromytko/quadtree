export default class Circle {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        
        this.direction = {x: 0, y: 0}
        this.speed = 1
    }
}