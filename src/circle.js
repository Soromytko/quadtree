export default class Circle {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        
        this.color = "green"
        this.direction = {x: 0, y: 0}
    }

    setSpeed(x, y) {
        this.speed = {x, y}
    }
}