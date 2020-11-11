import Element from "./src/foundation/element"

let canvas = document.querySelector('canvas') as HTMLCanvasElement
let context = canvas.getContext('2d') as CanvasRenderingContext2D
let element = new Element({
    curves: []
})

element.appendCurve(function(context: CanvasRenderingContext2D): CanvasRenderingContext2D{
    context.beginPath()
    context.moveTo(75, 50)
    context.lineTo(100, 75)
    context.lineTo(100, 25)
    context.fill()
    return context
})

element.draw(context)