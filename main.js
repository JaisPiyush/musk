import Element from "./src/foundation/element.js";
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let element = new Element({
    curves: []
});
element.appendCurve(function (context) {
    context.beginPath();
    context.moveTo(75, 50);
    context.lineTo(100, 75);
    context.lineTo(100, 25);
    context.fill();
    return context;
});
element.draw(context);
