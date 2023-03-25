import Rectangle from "./rectangle"
import Circle from "./circle"
import QuadTree from "./quad-tree"
import Polygon from "./polygon";

// var isQuadTreeCollision = false
var collisionFuncPtr = lazyCollision;

const canvas = document.getElementById("cnvs")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')

const gameState = {};
var tree = new QuadTree(new Rectangle(0, 0, canvas.width, canvas.height))

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
        
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
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

    context.beginPath()
    context.fillStyle = "red"
    context.fillRect(gameState.debugPoint.x, gameState.debugPoint.y, 5, 5)
    context.closePath()

    // drawTree(tree)
}

//the algorithm is borrowed from:
//https://math.stackexchange.com/questions/311921/get-location-of-vector-circle-intersection
function isCirclePolygonIntersects(circle, triangle) {
    for (let i = 0; i < triangle.points.length; i++) {
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

function lazyCollision() {
    // circle vs circle
    for (let i = 0; i < gameState.circles.length - 1; i++) {
        let circle1 = gameState.circles[i]
        for (let j = i + 1; j < gameState.circles.length; j++) {
            let circle2 = gameState.circles[j]
            if (Math.abs(circle1.x - circle2.x) <= circle1.radius + circle2.radius && 
                Math.abs(circle1.y - circle2.y) <= circle1.radius + circle2.radius) {
                let t = circle1.speed
                circle1.speed = circle2.speed
                circle2.speed = t  
                circle1.color = circle2.color = "red"  
            }
        }
    }

    //polygon vs polygon
    for (let i = 0; i < gameState.polygons.length - 1; i++) {
        for (let j = i + 1; j < gameState.polygons.length; j++) {
            let triangle1 = gameState.polygons[i]
            let triangle2 = gameState.polygons[j]
            if (triangle1.intersects(triangle2)) {
                let t = triangle1.speed
                triangle1.speed = triangle2.speed
                triangle2.speed = t  
                triangle1.color = triangle2.color = "red"
            }
        }
    }

    // circle vs polygon
    for (let i = 0; i < gameState.circles.length; i++) {
        let circle = gameState.circles[i]
        for (let j = 0; j < gameState.polygons.length; j++) {
            let triangle = gameState.polygons[j]
            if (isCirclePolygonIntersects(circle, triangle)) {
                circle.color = "red"
                triangle.color = "red"
                let t = circle.speed
                circle.speed = triangle.speed
                triangle.speed = t
            }
        }
    }

}

function quadTreeCollision() {
    tree.clear()
    gameState.rects.forEach(rect => tree.insert(rect))
}

function update(tick) {

    // collision()
    // console.log(tree.length)

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

    gameState.polygons.forEach(triangle => {
        triangle.x += triangle.speed.x
        triangle.y += triangle.speed.y

        if (triangle.x - triangle.size / 2 <= 0) triangle.speed.x = Math.abs(triangle.speed.x)
        else if (triangle.x + triangle.size / 2 >= canvas.width) triangle.speed.x = -Math.abs(triangle.speed.x)
        if (triangle.y - triangle.size / 2 <= 0) triangle.speed.y = Math.abs(triangle.speed.y)
        else if (triangle.y + triangle.size / 2 >= canvas.height) triangle.speed.y = -Math.abs(triangle.speed.y)
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

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

    // gameState.figures = []
    // for(let i = 0; i < 10; i++) {
    //     gameState.figures.push(new Circle(random(0, canvas.width), random(0, canvas.height), 5))
    //     gameStates.figure.push(new Rectangle)
    // }
    gameState.cursor = {x: 50, y: 50}
    gameState.debugPoint = {x: 0, y: 0}
    gameState.rects = []
    gameState.circles = []
    gameState.polygons = []
    for(let i = 0; i < 10; i++) {
        let rect = new Rectangle(random(0, canvas.width), random(0, canvas.height), 10, 10)
        let circle = new Circle(random(0, canvas.width), random(0, canvas.height), 10)
        let triangle = new Polygon(random(0, canvas.width), random(0, canvas.height), 3, 10)
        let pentagon = new Polygon(random(0, canvas.width), random(0, canvas.height), 5, 10)
        
        let speed = 3

        rect.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        circle.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        triangle.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        pentagon.setSpeed(rendomWithExcluded(-speed, speed), rendomWithExcluded(-speed, speed))
        
        //gameState.rects.push(rect)
        gameState.circles.push(circle)
        gameState.polygons.push(triangle)
        gameState.polygons.push(pentagon)
    }

    // gameState.polygons.push(new Polygon(50, 50, 3))
    // gameState.polygons[0].setSpeed(1, 0)
    // gameState.polygons.push(new Polygon(50, 700, 3))
    // gameState.circles.push(new Circle(100, 50, 10))
    // gameState.circles[0].setSpeed(-1, 0)
}

setup();
run();
