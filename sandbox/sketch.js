/*
 *
 */

var canvasSize = 600;

function setup() {
    createCanvas(canvasSize, canvasSize);

    // switch to HSB colors with range 0 to 100 for values
    // https://p5js.org/reference/#/p5/colorMode
    colorMode(HSB, 100, 100, 100);

    // must call "redraw()" to make a new frame (image)
    noLoop();

    // all rectangles are drawn with the original at center
    rectMode(CENTER);
    // ... and no stroke
    noStroke();
}

function draw() {
    background(255, 10, 128);

}