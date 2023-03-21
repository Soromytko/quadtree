import Rectangle from "./rectangle"
import Circle from "./circle"
import QuadTree from "./quad-tree"

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

    // drawTree(tree)
}

function lazyCollision() {

    let reflect = (direction, normal) => {
        let dot = direction.x * normal.x + direction.y * normal.y
        return {
            x: direction.x - 2 * dot * normal.x,
            y: direction.y - 2 * dot * normal.y,
        }
    }

    let normalize = (vector) => {
        let length = Math.sqrt(vector.x * vector.y)
        if (length == 0) {
            return {
                x: 0,
                y: 0,
            }
        }
        return {
            x: vector.x / length,
            y: vector.y / length,
        }
    }

    // rect vs rect
    for (let i = 0; i < gameState.rects.length - 1; i++) {
        for (let j = i + 1; j < gameState.rects.length; j++) {
            let rect1 = gameState.rects[i]
            let rect2 = gameState.rects[j]
            if(rect1.intersects(rect2)) {
                // rect1.color = "red"
                // rect2.color = "red"
                let t = rect1.speed
                rect1.speed = rect2.speed
                rect2.speed = t
            }
        }
    }

    // circle vs circle
    for (let i = 0; i < gameState.circles.length - 1; j++) {
        for (let j = i + 1; j < gameState.circles.length; j++) {

        }
    }

    //rect vs circle
    for (let i = 0; i < gameState.rects.length; i++) {
        for (let j = 0; j < gameState.circles.length; j++) {

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

    // collisionFuncPtr()

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
        else if (circle.y + circle.radisu >= canvas.height) circle.y = -Math.abs(circle.speed.y)
    })
}

function run(tFrame) {
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
    gameState.rects = []
    gameState.circles = []
    for(let i = 0; i < 10; i++) {
        let rect = new Rectangle(random(0, canvas.width), random(0, canvas.height), 10, 10)
        let circle = new Circle(random(0, canvas.width), random(0, canvas.height), 5)

        let speed = 3

        rect.setSpeed(random(-speed, speed), random(-speed, speed))
        circle.setSpeed(random(-speed, speed), random(-speed, speed))

        gameState.rects.push(rect)
        gameState.circles.push(circle)
    }

    // gameState.rects = []
    // // const rectangle = new Rectangle(10, 10, 30, 30)
    // // rectangle.setSpeed(5, 5)
    // // gameState.rects.push(rectangle)
    // for (let i = 0; i < 100; i++) {
    //     let size = 5
    //     const rect = new Rectangle(random(0, canvas.width), random(0, canvas.height), size, size)
    //     let speed = 1
    //     rect.setSpeed(random(-speed, speed), random(-speed, speed))
    //     gameState.rects.push(rect)
    // }

    // let rect = new Rectangle(300, 300, 10, 10)
    // rect.setSpeed(1, 0.5)
    // rect.color = "red"
    // gameState.rects.push(rect)
    // rect = new Rectangle(600, 300, 10, 10)
    // rect.setSpeed(-1, 0.5)
    // gameState.rects.push(rect)

    // gameState.rects.push(new Rectangle(10, 10, 5, 5))
    // gameState.rects.push(new Rectangle(20, 10, 5, 5))
    // gameState.rects.push(new Rectangle(30, 10, 5, 5))


}

setup();
run();
