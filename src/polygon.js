import Rectangle from "./rectangle"

export default class Polygon {
    constructor(x, y, angleCount, size) {
        this._x = x
        this._y = y
        this.points = []
        this.size = size
        for (let i = 0; i < angleCount; i++) {
            let angle = i * (2 * Math.PI / angleCount)
            angle -= Math.PI / 2
            let point = {x: Math.cos(angle) * this.size, y: Math.sin(angle) * this.size}
            this.points.push(point)
        }

        this.speed = {x: 0, y: 0}
        this.color = "green"
        this.health = 3
        
        this._vectors = [] // vectors of sides (http://cyber-code.ru/tochka_v_treugolnike/?ysclid=lfiovplcnc106423362)
        for (let i = 0; i < this.points.length - 1; i++) {
            this._vectors.push({
                x: this.points[i + 1].x - this.points[i].x,
                y: this.points[i + 1].y - this.points[i].y,
            })
        }
        this._vectors.push({
            x: this.points[0].x - this.points[this.points.length - 1].x,
            y: this.points[0].y - this.points[this.points.length - 1].y,
        })
        
        let point = {x: -this.points[0].x, y: -this.points[0].y}

        this._rect = new Rectangle(x - size, y - size, size * 2, size * 2)
    }

    get x() {
        return this._x
    }

    set x(value) {
        this._x = value
        this._rect.x = this._x
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
        this.speed.x = x
        this.speed.y = y
    }

    takeDamage() {
        this.health -= 1
        if (this.health == 2) this.color = "yellow"
        else if (this.health == 1) this.color = "red"
    }

    // Algorithm for determining the position of a point relative to a vector
    // https://gamedev.ru/code/forum/?id=49696
    contains(point) {
        let localPoint = {
            x: point.x - this.x,
            y: point.y - this.y,
        }

        for (let i = 0; i < this._vectors.length; i++) {
            // dot (https://uookn-kursk.ru/wp-content/uploads/5/f/8/5f8ed75a8563d5fb8ccf7b0a607be941.jpeg)
            // i * (y1 * z1 - y2 * x2) - j * (x1 * z1 - x2 * z2) + k * (x1 * y2 - x2 * y1)
            let x1 = this._vectors[i].x
            let y1 = this._vectors[i].y
            let x2 = localPoint.x - this.points[i].x
            let y2 = localPoint.y - this.points[i].y
            let d = x1 * y2 - x2 * y1

            if (d <= 0) {
                return false
            }
        }

        return true
    }

    containsAnyPoint(polygon) {
        for (let i = 0; i < polygon.points.length; i++) {
            let globalPoint = {
                x: polygon.points[i].x + polygon.x,
                y: polygon.points[i].y + polygon.y,
            }
            if (this.contains(globalPoint)) {
                return true
            }
        }
        return false
    }

    intersects(polygon) {
        // two polygons are intersects when one of them contains a point of the other
        return this.containsAnyPoint(polygon) || polygon.containsAnyPoint(this)
    }
}