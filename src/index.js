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

    gameState.triangles.forEach(triangle => {
        context.beginPath()
        context.fillStyle = triangle.color
        context.moveTo(triangle.points[0].x + triangle.x, triangle.points[0].y + triangle.y)
        triangle.points.forEach(point => {
            context.lineTo(point.x + triangle.x, point.y + triangle.y)
        })
        context.fill()
        context.closePath()
    })

    context.beginPath()
    context.fillStyle = "red"
    context.fillRect(gameState.cursor.x, gameState.cursor.y, 5, 5)
    context.closePath()

    // drawTree(tree)
}

function lazyCollision() {

    // rect vs rect
    // for (let i = 0; i < gameState.rects.length - 1; i++) {
    //     for (let j = i + 1; j < gameState.rects.length; j++) {
    //         let rect1 = gameState.rects[i]
    //         let rect2 = gameState.rects[j]
    //         if(rect1.intersects(rect2)) {
    //             // rect1.color = "red"
    //             // rect2.color = "red"
    //             let t = rect1.speed
    //             rect1.speed = rect2.speed
    //             rect2.speed = t
    //         }
    //     }
    // }

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

    // gameState.cursor.x = 50
    // gameState.cursor.y = 0
    // gameState.triangles[0].contains(gameState.cursor)
    // return 

    //triangle vs triangle
    for (let i = 0; i < gameState.triangles.length - 1; i++) {
        for (let j = i + 1; j < gameState.triangles.length; j++) {
            let triangle1 = gameState.triangles[i]
            let triangle2 = gameState.triangles[j]
            if (triangle1.intersects(triangle2)) {
                let t = triangle1.speed
                triangle1.speed = triangle2.speed
                triangle2.speed = t  
                triangle1.color = triangle2.color = "red"
            }
        }
    }

    let vectorProjection = (vector, target) => {
        if (target.x == 0 && target.y == 0) return 0
        let dot = vector.x * target.x + vector.y * target.y
        return dot / Math.sqrt(target.x * target.x + target.y * target.y) //dot / Math.sqrt(target.x * target.x + target.y * target.y)
    }

    // circle vs triangle
    for (let i = 0; i < gameState.circles.length; i++) {
        let circle = gameState.circles[i]
        for (let j = 0; j < gameState.triangles.length; j++) {
            let triangle = gameState.triangles[j]

            let v1 = {x: circle.x - triangle.x, y: circle.y - triangle.y}
            let v2 = triangle._vectors[0]
            let project = vectorProjection(v1, v2)
            let projectPoint = {x: v2.x * project, y: v2.y * project}

            // If point onto vector
             if (projectPoint.x <= v2.x && projectPoint.y <= v2.y) {
                if (Math.abs(projectPoint.x - circle.x) <= circle.radius && Math.abs(projectPoint.y - circle.y) <= circle.radius) {
                    circle.color = "red"
                }
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

    gameState.triangles.forEach(triangle => {
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

var random = (min, max) => Math.floor(Math.random() * (max - min) + min)

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
    gameState.rects = []
    gameState.circles = []
    gameState.triangles = []
    for(let i = 0; i < 10; i++) {
        let rect = new Rectangle(random(0, canvas.width), random(0, canvas.height), 10, 10)
        let circle = new Circle(random(0, canvas.width), random(0, canvas.height), 10)
        let triangle = new Polygon(random(0, canvas.width), random(0, canvas.height), 3)
        
        let speed = 3

        rect.setSpeed(random(-speed, speed), random(-speed, speed))
        circle.setSpeed(random(-speed, speed), random(-speed, speed))
        triangle.setSpeed(random(-speed, speed), random(-speed, speed))
        
        //gameState.rects.push(rect)
        gameState.circles.push(circle)
        gameState.triangles.push(triangle)
    }

    // gameState.triangles.push(new Polygon(50, 50, 3))
    // gameState.triangles.push(new Polygon(50, 700, 3))

}

setup();
run();
