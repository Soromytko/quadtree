import Circle from './circle'

describe('Circle.contains()', () => {
    let circle
    beforeEach(() => {
        circle = new Circle(0, 0, 5)
    })

    it('should returns true if point is inside the circle', () => {
        expect(circle.contains({x: 1, y: 1})).toBeTruthy()
    })

    it('should returns false if point located on border', () => {
        expect(circle.contains({x: -5, y: 0})).toBeFalsy()
        expect(circle.contains({x: 0, y: 5})).toBeFalsy()
    })

    it('should returns false if point is out of circle', () => {
        expect(circle.contains({x: 6, y: -1})).toBeFalsy()
        expect(circle.contains({x: 0, y: 7})).toBeFalsy()
        expect(circle.contains({x: 4.8, y: 4.8})).toBeFalsy()
    })
})

describe('Circle.intersects()', () => {
    let circle
    beforeEach(() => {
        circle = new Circle(0, 0, 5)
    })

    it('should returns true if circles are intersected', () => {
        const otherCircle = new Circle(2, 2, 5)
        expect(circle.intersects(otherCircle)).toBeTruthy()
    })

    it('should returns true if one circle contains other', () => {
        const otherCircle = new Circle(0, 0, 3)
        expect(circle.intersects(otherCircle)).toBeTruthy()
    })

    it('should returns false if circles are not intersected', () => {
        const otherCircle = new Circle(10, 10, 5)
        expect(circle.intersects(otherCircle)).toBeFalsy()
    })
})