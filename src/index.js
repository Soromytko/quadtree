import Rectangle from "./rectangle"
import Circle from "./circle"
import QuadTree from "./quad-tree"
import Polygon from "./polygon"

//config
// var shapeCount = 300
var shapeCount = 300 // x3
var shapeSize = 5
var shapeSpeed = 1
var circlesEnable = true
var trianglesEnable = true
var pentagonEnable = true
var isQuadTreeCollision = true
var collisionFuncPtr = isQuadTreeCollision ? quadTreeCollision : lazyCollision
var isDrawTree = false
//

const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')

const gameState = {};
var tree = new QuadTree(new Rectangle(0, 0, canvas.width, canvas.height), 4)

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function drawTree(tree) {
    if (!tree._hasChildren) {
        context.strokeStyle = "red"
        const rect = tree._boundary
        context.strokeRect(rect.x, rect.y, rect.w, rect.h)
    } else {
        drawTree(tree._children[0])
        drawTree(tree._children[1])
        drawTree(tree._children[2])
        drawTree(tree._children[3])
    }
}
    
function draw(tFrame) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    // context.fillStyle = "black"
    // context.fillRect(0, 0, canvas.width, canvas.height)

    gameState.rects.forEach(rect =>{
        context.fillStyle = rect.color
        context.fillRect(rect.x, rect.y, rect.w, rect.h)
    })

    gameState.circles.forEach(circle => {
        context.beginPath()
        context.fillStyle = circle.color
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        context.fill()
        context.closePath()
    })

    gameState.polygons.forEach(triangle => {
        context.beginPath()
        context.fillStyle = triangle.color
        context.moveTo(triangle.points[0].x + triangle.x, triangle.points[0].y + triangle.y)
        triangle.points.forEach(point => {
            context.lineTo(point.x + triangle.x, point.y + triangle.y)
        })
        context.fill()
        context.closePath()
    })

    // context.beginPath()
    // context.fillStyle = "red"
    // context.fillRect(gameState.cursor.x, gameState.cursor.y, 5, 5)
    // context.closePath()

    if (isQuadTreeCollision && isDrawTree) {
        drawTree(tree)
    }

    let currentShapeCount = gameState.circles.length + gameState.polygons.length
    context.fillStyle = "blue"
    context.font = "bold 16px Arial"
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText("max: " + shapeCount * 3, 30, 30)
    context.fillText("now: " + currentShapeCount, 30, 50)

    gameState.buttons.forEach(button => {
        context.fillStyle = button.rect.color
        context.fillRect(button.rect.x, button.rect.y, button.rect.w, button.rect.h)
        context.fillStyle = "black"
        context.font = "bold 16px Arial"
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(button.text, button.rect.x + button.rect.w / 2, button.rect.y + button.rect.h / 2)
    })
}

function isCirclePolygonIntersects(circle, triangle) {
    // first check AABB at the intersection for optimization
    if (!circle.rect.intersects(triangle.rect)) {
        return false
    }

    for (let i = 0; i < triangle.points.length; i++) {
        // the algorithm is borrowed from:
        // https://math.stackexchange.com/questions/311921/get-location-of-vector-circle-intersection
        let p = {x: triangle.points[i].x, y: triangle.points[i].y}
        let v = triangle._vectors[i]

        p.x += triangle.x
        p.y += triangle.y

        let a = v.x * v.x + v.y * v.y;
        let b = 2 * v.x * (p.x - circle.x) + 2 * v.y * (p.y - circle.y)
        let c = Math.pow(p.x - circle.x, 2) + Math.pow(p.y - circle.y, 2) - circle.radius * circle.radius

        let d = b * b - 4 * a * c

        if (d < 0) {
            continue
        }
        
        d = Math.sqrt(d)
        // let t1 = 2 * c / (-b + d)
        let t1 = (-b - d) / (2 * a)
        let t2 = (-b + d) / (2 * a)

        if (t1 > 0 && t1 < 1 || t2 > 0 && t2 < 1) {
            return true
        }
    }

    return triangle.contains(circle)
}

function resolveCollision(figure1, figure2) {
    let speed = figure1.speed
    figure1.speed = figure2.speed
    figure2.speed = speed

    figure1.takeDamage()
    figure2.takeDamage()
}

function processDeletionQueue() {
    gameState.circleDeletionQueue.forEach(circle => {
        let index = gameState.circles.indexOf(circle)
        if (index > 0)
        gameState.circles.splice(index, 1)
    })
    gameState.circleDeletionQueue = []

    gameState.polygonDeletionQueue.forEach(polygon => {
        let index = gameState.polygons.indexOf(polygon)
        if (index > 0)
        gameState.polygons.splice(index, 1)
    })
    gameState.polygonDeletionQueue = []
}

function lazyCollision() {
    // first check AABB at the intersection for optimization
    let isAabbIntersects = (shape1, shape2) => shape1.rect.intersects(shape2.rect)

    // circle vs circle
    for (let i = 0; i < gameState.circles.length - 1; i++) {
        let circle1 = gameState.circles[i]
        for (let j = i + 1; j < gameState.circles.length; j++) {
            let circle2 = gameState.circles[j]
            if (isAabbIntersects(circle1, circle2)) {
                if (circle1.intersects(circle2)) {
                    resolveCollision(circle1, circle2)
                    if (circle2.health <= 0) {
                        gameState.circles.splice(j, 1)
                        j -= 1
                    }
                    if (circle1.health <= 0) {
                        gameState.circles.splice(i, 1)
                        i -= 0
                        break
                    }
                }
            }
        }
    }

    //polygon vs polygon
    for (let i = 0; i < gameState.polygons.length - 1; i++) {
        let polygon1 = gameState.polygons[i]
        for (let j = i + 1; j < gameState.polygons.length; j++) {
            let polygon2 = gameState.polygons[j]
            if (isAabbIntersects(polygon1, polygon2)) {
                if (polygon1.intersects(polygon2)) {
                    resolveCollision(polygon1, polygon2)
                    if (polygon2.health <= 0) {
                        gameState.polygons.splice(j, 1)
                        j -= 1
                    }
                    if (polygon1.health <= 0) {
                        gameState.polygons.splice(i, 1)
                        i -= 1
                        break
                    }
                }
            }
        }
    }

    // circle vs polygon
    for (let i = 0; i < gameState.circles.length; i++) {
        let circle = gameState.circles[i]
        for (let j = 0; j < gameState.polygons.length; j++) {
            let polygon = gameState.polygons[j]
            if (isAabbIntersects(circle, polygon)) {
                if (isCirclePolygonIntersects(circle, polygon)) {
                    resolveCollision(circle, polygon)
                    if (polygon.health <= 0) {
                        gameState.polygons.splice(j, 1)
                        j -= 1
                    }
                    if (circle.health <= 0) {
                        gameState.circles.splice(i, 1)
                        i -= 1
                        break
                    }
                }
            }
        }
    }
}

function quadTreeCollision() {
    // QuadTree.valueCount = 0
    tree.clear()

    processDeletionQueue()

    gameState.circles.forEach(circle => tree.insert(circle))
    gameState.polygons.forEach(polygon => tree.insert(polygon))

    tree.findIntersections((shape1, shape2) => {
        if (shape1 instanceof Circle && shape2 instanceof Circle) {
            if (shape1.intersects(shape2)) {
                resolveCollision(shape1, shape2)
                // console.log("circle vs circle collision")
                if (shape1.health <= 0)
                    gameState.circleDeletionQueue.push(shape1)
                if (shape2.health <= 0)
                    gameState.circleDeletionQueue.push(shape2)
            }
        } else if (shape1 instanceof Polygon && shape2 instanceof Polygon) {
            if (shape1.intersects(shape2)) {
                resolveCollision(shape1, shape2)
                // console.log("polygon vs polygon collision")
                if (shape1.health <= 0)
                    gameState.polygonDeletionQueue.push(shape1)
                if (shape2.health <= 0)
                    gameState.polygonDeletionQueue.push(shape2)
            }
        } else if (shape1 instanceof Circle && shape2 instanceof Polygon) {
            if (isCirclePolygonIntersects(shape1, shape2)) {
                resolveCollision(shape1, shape2)
                // console.log("circle vs polygon collision")
                if (shape1.health <= 0)
                    gameState.circleDeletionQueue.push(shape1)
                if (shape2.health <= 0)
                    gameState.polygonDeletionQueue.push(shape2)
            }
        } else if (shape1 instanceof Polygon && shape2 instanceof Circle) {
            if (isCirclePolygonIntersects(shape2, shape1)) {
                resolveCollision(shape1, shape2)
                if (shape1.health <= 0)
                    gameState.polygonDeletionQueue.push(shape1)
                if (shape2.health <= 0)
                    gameState.circleDeletionQueue.push(shape2)
                // console.log("Polygon vs Circle collision")
            }
        }
    })
}

function update(tick) {
    collisionFuncPtr()

    gameState.rects.forEach((figure)=>{
        figure.x += figure.speed.x
        figure.y += figure.speed.y

        if (figure.x <= 0) figure.speed.x = Math.abs(figure.speed.x)
        else if (figure.x >= canvas.width) figure.speed.x = -Math.abs(figure.speed.x)
        if (figure.y <= 0) figure.speed.y = Math.abs(figure.speed.y)
        else if (figure.y >= canvas.height) figure.speed.y = -Math.abs(figure.speed.y)
    })

    gameState.circles.forEach(circle => {
        circle.x += circle.speed.x
        circle.y += circle.speed.y

        if (circle.x - circle.radius <= 0) circle.speed.x = Math.abs(circle.speed.x)
        else if (circle.x + circle.radius >= canvas.width) circle.speed.x = -Math.abs(circle.speed.x)
        if (circle.y - circle.radius <= 0) circle.speed.y = Math.abs(circle.speed.y)
        else if (circle.y + circle.radius >= canvas.height) circle.speed.y = -Math.abs(circle.speed.y)
    })

    gameState.polygons.forEach(polygon => {
        polygon.x += polygon.speed.x
        polygon.y += polygon.speed.y

        if (polygon.x - polygon.size / 2 <= 0) polygon.speed.x = Math.abs(polygon.speed.x)
        else if (polygon.x + polygon.size / 2 >= canvas.width) polygon.speed.x = -Math.abs(polygon.speed.x)
        if (polygon.y - polygon.size / 2 <= 0) polygon.speed.y = Math.abs(polygon.speed.y)
        else if (polygon.y + polygon.size / 2 >= canvas.height) polygon.speed.y = -Math.abs(polygon.speed.y)
    })
}

function run(tFrame) {
    canvas.addEventListener('mousemove', (e) => gameState.cursor = {x: e.pageX, y: e.pageY}, false)

    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

var random = (min, max) => (Math.random() * (max - min) + min)
function rendomWithExcluded(min, max, excludedValue) {
    while(true) {
        let rand = random(min, max)
        if (rand != excludedValue)
            return rand
    }
}

function onClickEvent(event) {
    // gameState.circles.push(new Circle(e.offsetX, e.offsetY, 10))

    let point = {x: event.offsetX, y: event.offsetY}
    gameState.buttons.forEach(button => {
        if (button.rect.contains(point)) {
            button.onClick(button)
        }
    })
}

function spawn() {
    gameState.rects = []
    gameState.circles = []
    gameState.polygons = []
    for(let i = 0; i < shapeCount; i++) {
        let size = shapeSize
        let rect = new Rectangle(random(0, canvas.width), random(0, canvas.height), size, size)
        let circle = new Circle(random(0, canvas.width), random(0, canvas.height), size)
        let triangle = new Polygon(random(0, canvas.width), random(0, canvas.height), 3, size)
        let pentagon = new Polygon(random(0, canvas.width), random(0, canvas.height), 5, size)
        
        let speed = shapeSpeed
        rect.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        circle.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        triangle.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        pentagon.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        
        // gameState.rects.push(rect)
        if (circlesEnable) gameState.circles.push(circle)
        if (trianglesEnable) gameState.polygons.push(triangle)
        if (pentagonEnable) gameState.polygons.push(pentagon)
    }

    gameState.circleDeletionQueue = []
    gameState.polygonDeletionQueue = []
}

function setup() {
    canvas.addEventListener("click", onClickEvent, false)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    gameState.cursor = {x: 50, y: 50}
    
    spawn()

    gameState.buttons = []
    
    gameState.buttons.push({rect: new Rectangle(canvas.width - 125, 25, 100, 25), text: "Quadtree", onClick: (self) => {
        isQuadTreeCollision = !isQuadTreeCollision
        collisionFuncPtr = isQuadTreeCollision ? quadTreeCollision : lazyCollision
        self.text = isQuadTreeCollision ? "Quadtree" : "Lazy" 
    }, })
    gameState.buttons.push({rect: new Rectangle(canvas.width - 125, 25 + 50 - 12, 100, 25), text: "Show Tree", onClick: (self) => {
        isDrawTree = !isDrawTree
        self.text = isDrawTree ? "Hide tree" : "Show tree"
    }, })
    gameState.buttons.push({rect: new Rectangle(canvas.width - 125, 25 + 50 - 12 + 50 - 12, 45, 25), text: "-", onClick: (self) => {
       shapeCount -= 100
       if (shapeCount <= 0) shapeCount = 0
    }, })
    gameState.buttons.push({rect: new Rectangle(canvas.width - 125 + 55, 25 + 50 - 12 + 50 - 12, 45, 25), text: "+", onClick: (self) => {
        shapeCount += 100
    }, })
    gameState.buttons.push({rect: new Rectangle(canvas.width - 125, 200, 100, 25), text: "Restart", onClick: (self) => {
        spawn()
    }, })

    gameState.buttons.forEach(button => button.rect.color = "gray")

}

setup();
run();
