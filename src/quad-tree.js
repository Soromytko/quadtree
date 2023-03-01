import Rectangle from './rectangle'

export default class QuadTree {
    constructor(boundary, capacity = 1) {
        if (!boundary) {
            throw TypeError('boundary is null or undefined')
        }

        if (!(boundary instanceof Rectangle)) {
            throw TypeError('boundary should be a Rectangle')
        }

        this._points = []
        this._boundary = boundary
        this._capacity = capacity
        this._hasChildren = false
        this._children = []
    }

    // todo
    insert(point) {
        if (!this._boundary.contains(point)) {
            return false
        }

        if (this._points.length < this._capacity) {
            this._points.push(point)
            return true
        }

        // if (this.length >= 300) return false

        // if (this._boundary.w <= 10) return false

        // if (!this._hasChildren) {
        //     if (this.length == 1) {

        //     }
        // }

        if (!this._hasChildren) {
            this._subdivide()
        }
        
        if (this._children[0].insert(point) || this._children[1].insert(point) ||
            this._children[2].insert(point) || this._children[3].insert(point)) {
            return true
        }

        return false
    }

    get length() {
        let count = this._points.length
        if (this._hasChildren) {
            // handle childrens somehow
            this._children.forEach(item => {
                count += item.length
            })
        }
        return count
    }

    queryRange(rect, found = []) {
        return found
    }

    // todo call if the number of elements is too big
    _subdivide() {
        const boundary = this._boundary
        const wHalf = boundary.w / 2
        const hHalf = boundary.h / 2
        // console.log(wHalf)
        this._children.push(new QuadTree(new Rectangle(boundary.x, boundary.y, wHalf, hHalf)))
        this._children.push(new QuadTree(new Rectangle(boundary.x + wHalf, boundary.y, wHalf, hHalf)))
        this._children.push(new QuadTree(new Rectangle(boundary.x + wHalf, boundary.y + hHalf, wHalf, hHalf)))
        this._children.push(new QuadTree(new Rectangle(boundary.x, boundary.y + hHalf, wHalf, hHalf)))
        this._hasChildren = true

        for(let i = 0; i < this._points.length; i++) {
            for (let j = 0; j < this._children.length; j++) {
                this._children[j].insert(this._points[i])
            }
        }
    }

    clear() {
        // clear _points and _children arrays
        // see https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._points = []
        this._children = []
        this._hasChildren = false
    }
}
