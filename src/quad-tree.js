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

        this.maxDepth = 10
        this.depth
    }

    // todo
    insert(shape, depth = 0) {
        this.depth = depth
        if (!this._boundary.containsRect(shape.rect)) {
            return false
        }

        if (this._hasChildren) {
            if (!this._insertIntoChildren(shape)) {
                this._shapes.push(shape)
            }
            return true
        } else {
            if (depth >= this.maxDepth || this._shapes.length < this._capacity) {
                this._shapes.push(shape)
                return true
            } else {
                this._subdivide()
                if (this.insert(shape, depth)) {
                    return true
                }
            }
        }

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

    getValues() {
        let result = []
        this._shapes.forEach(shape => {
            result.push(shape)
        })
        
        this._children.forEach(child => {
            let r = child.getValues()
            r.forEach(value => result.push(value))
        })

        return result
    }

    queryRange(rect, found = []) {
        return found
    }

    findIntersections(predicate) {
        // Find intersections in the current node
        for (let i = 0; i < this._shapes.length; i++) {
            let shape1 = this._shapes[i]
            for (let j = 0; j < i; j++) {
                let shape2 = this._shapes[j]
                if (shape1.rect.intersects(shape2.rect)) {
                    predicate(shape1, shape2)
                }
            }

            this._children.forEach(child => {
                child._findIntersictionsInDescendants(this._shapes[i], predicate)
            })
        }

        this._children.forEach(child => {
            child.findIntersections(predicate)
        })
    }

    _findIntersictionsInDescendants(shape, predicate) {
        let shape1 = shape
        for (let i = 0; i < this._shapes.length; i++) {
            let shape2 = this._shapes[i]
            if (shape1.rect.intersects(shape2.rect)) {
                predicate(shape1, shape2)
            }
        }

        if (this._hasChildren)
        this._children.forEach(child => {
            child._findIntersictionsInDescendants(shape, predicate)
        })
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

        var newValues = []
        this._shapes.forEach(shape => {
            if (!this._insertIntoChildren(shape)) {
                newValues.push(shape)
            }
        })
        this._shapes = newValues
    }

    _insertIntoChildren(shape) {
        for (let i = 0; i < this._children.length; i++) {
            if (this._children[i].insert(shape, this.depth + 1)) {
                return true
            }
        }
        return false
    }

    clear() {
        // clear _points and _children arrays
        // see https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
        this._shapes = []
        this._children = []
        this._hasChildren = false
    }
}
