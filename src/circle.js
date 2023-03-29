import Rectangle from "./rectangle"

export default class Circle {
    constructor(x, y, radius) {
        this._x = x
        this._y = y
        this.radius = radius
        
        this.color = "green"
        this.health = 3
        this.speed = {x: 0, y: 0}

        this._rect = new Rectangle(x - radius, y - radius, radius * 2, radius * 2)
    }

    get x() {
        return this._x
    }
    
    set x(value) {
        this._x = value
        this._rect.x = value
    }
    
    get y() {
        return this._y
    }
    
    set y(value) {
        this._y = value
        this._rect.y = value
    }

    get rect() {
        return this._rect
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
        return Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2) < this.radius * this.radius
    }

    intersects(circle) {
        return Math.sqrt(Math.pow(circle.x - this._x, 2) +
            Math.pow(circle.y - this._y, 2)) < circle.radius + this.radius
    }
}