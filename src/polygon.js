export default class Polygon {
    constructor(x, y, angleCount, size) {
        this.x = x
        this.y = y
        this.points = []
        this.size = size
        for (let i = 0; i < angleCount; i++) {
            let angle = i * (2 * Math.PI / angleCount)
            angle -= Math.PI / 2
            let point = {x: Math.cos(angle) * this.size, y: Math.sin(angle) * this.size}
            this.points.push(point)
        }

        this.speed = {x: 0, y: 0}
        this.color = "black"

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
        // console.log(this.points, this._vectors, point)
    }

    setSpeed(x, y) {
        this.speed.x = x
        this.speed.y = y
    }

    //Алгоритм определения положения точки относительно вектора
    //https://gamedev.ru/code/forum/?id=49696
    contains(point) {
        let localPoint = {
            x: point.x - this.x,
            y: point.y - this.y,
        }

        for (let i = 0; i < this._vectors.length; i++) {
            //dot (https://uookn-kursk.ru/wp-content/uploads/5/f/8/5f8ed75a8563d5fb8ccf7b0a607be941.jpeg)
            //i * (y1 * z1 - y2 * x2) - j * (x1 * z1 - x2 * z2) + k * (x1 * y2 - x2 * y1)
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

    containsAnyPoint(triangle) {
        let result = false
        triangle.points.forEach(point => {
            let globalPoint = {
                x: point.x + triangle.x,
                y: point.y + triangle.y,
            }
            if (this.contains(globalPoint)) {
                result = true
                return
            }
        })

        return result
    }

    intersects(triangle) {
        return this.containsAnyPoint(triangle) ||
                triangle.containsAnyPoint(this)
    }
}