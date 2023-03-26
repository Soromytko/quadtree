import Rectangle from "./rectangle"

export default class Circle {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        
        this.color = "green"
        this.health = 3
        this.speed = {x: 0, y: 0}

        this.rect = new Rectangle(0, 0, this.radius * 2, this.radius * 2)
    }

    setSpeed(x, y) {
        this.speed = {x, y}
    }

    takeDamage() {
        this.health -= 1
        if (this.health == 2) this.color = "yellow"
        else if (this.health == 1) this.color = "red"
    }

    contains(point) {
        return point.x - this.x <= radius && point.y - this.y <= radius
    }
}