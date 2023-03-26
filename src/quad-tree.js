import Rectangle from './rectangle'

export default class QuadTree {
    constructor(boundary, capacity = 4) {
        if (!boundary) {
            throw TypeError('boundary is null or undefined')
        }

        if (!(boundary instanceof Rectangle)) {
            throw TypeError('boundary should be a Rectangle')
        }

        this._shapes = []
        this._boundary = boundary
        this._capacity = capacity
        this._hasChildren = false
        this._children = []

        this.maxDepth = 3
        this.depth
    }

    // todo
    insert(shape, depth = 0) {
        // if (!this._boundary.contains(shape)) {
        this.depth = depth
        if (!this._boundary.containsRect(shape.rect)) {
            return false
        }

        if (this._hasChildren) {
            for (let i in this._children) {
                if (this._children[i].insert(shape, depth + 1)) {
                    return true
                }
            }
        } else {
            if (depth >= this.maxDepth || this._shapes.length < this._capacity) {
                this._shapes.push(shape)
                return true
            } else {
                this._subdivide()
                return this.insert(shape, depth)
            }
        }

        // if (this._children[0].insert(shape) || this._children[1].insert(shape) ||
        //     this._children[2].insert(shape) || this._children[3].insert(shape)) {
        //     return true
        // }

        return false
    }

    get length() {
        let count = this._shapes.length
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
        this._children.push(new QuadTree(new Rectangle(boundary.x, boundary.y, wHalf, hHalf)))
        this._children.push(new QuadTree(new Rectangle(boundary.x + wHalf, boundary.y, wHalf, hHalf)))
        this._children.push(new QuadTree(new Rectangle(boundary.x + wHalf, boundary.y + hHalf, wHalf, hHalf)))
        this._children.push(new QuadTree(new Rectangle(boundary.x, boundary.y + hHalf, wHalf, hHalf)))
        this._hasChildren = true

        // for(let i = 0; i < this._shapes.length; i++) {
        //     for (let j = 0; j < this._children.length; j++) {
        //         this._children[j].insert(this._shapes[i])
        //     }
        // }

        var newValues = []
        this._shapes.forEach(shape => {
            let b = false
            for (let i = 0; i < this._children.length; i++) {
                if (this._children[i].insert(shape, this.depth + 1)) {
                    b = true
                    break
                }
            }
            if (!b) {
                newValues.push(shape)
            }
        })
        if (this.depth == 0) console.log(newValues.length)
        this._shapes = newValues
    }

    clear() {
        // clear _points and _children arrays
        // see https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._shapes = []
        this._children = []
        this._hasChildren = false
    }
}
