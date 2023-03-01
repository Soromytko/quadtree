import Rectangle from "./rectangle"
import Circle from "./circle"
import QuadTree from "./quad-tree"

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
    // const rect = tree._boundary
    // context.strokeStyle = "red"
    // context.strokeRect(rect.x, rect.y, rect.w, rect.h)
    // if (tree._hasChildren) {
    //     drawTree(tree._children[0])
    //     drawTree(tree._children[1])
    //     drawTree(tree._children[2])
    //     drawTree(tree._children[3])
    // }

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
        context.fillStyle = "green"
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        context.fill()
    })

    drawTree(tree)
}

function collision() {
    tree.clear()
    gameState.rects.forEach(rect => tree.insert(rect))
}

function update(tick) {

    collision()
    // console.log(tree.length)

    gameState.rects.forEach((figure)=>{
        figure.x += figure.speed.x
        figure.y += figure.speed.y

        if (figure.x < 0) figure.speed.x = Math.abs(figure.speed.x)
        if (figure.x > canvas.width) figure.speed.x = -Math.abs(figure.speed.x)
        if (figure.y < 0) figure.speed.y = Math.abs(figure.speed.y)
        if (figure.y > canvas.height) figure.speed.y = -Math.abs(figure.speed.y)
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

    gameState.rects = []
    // const rectangle = new Rectangle(10, 10, 30, 30)
    // rectangle.setSpeed(5, 5)
    // gameState.rects.push(rectangle)
    for (let i = 0; i < 100; i++) {
        const rect = new Rectangle(random(0, canvas.width), random(0, canvas.height), 5, 5)
        let speed = 1
        rect.setSpeed(random(-speed, speed), random(-speed, speed))
        gameState.rects.push(rect)
    }

    // gameState.rects.push(new Rectangle(10, 10, 5, 5))
    // gameState.rects.push(new Rectangle(20, 10, 5, 5))
    // gameState.rects.push(new Rectangle(30, 10, 5, 5))

    gameState.circles = []
    const circle = new Circle(10, 10, 15)
    // gameState.circles.push(circle)

}

setup();
run();
