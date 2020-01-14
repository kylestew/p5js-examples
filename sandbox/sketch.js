/* == HELLO WORLD ==
 * TODO: find step 1 and follow the TODO instructions. Move on to step 2 when
 * you feel you understand step 1. Repeat until all steps are done.
 *
 * Adapted from: Son of Ra 37
 * View the link to see the final piece
 * https://www.openprocessing.org/sketch/144336
 */

/* == STEP 1 - Evil Program State ==
 * P5.js works in a way where it contains a lot of "state"
 * Don't get too attached to this way of thinking because its actually a really
 * poor way to create software. P5's over use of global variables is mostly what
 * I am talking about. In the future your goal will be to minimize state, but
 * for now it does make getting started much easier.
 *
 * Heads up: there are a lot of global variables (state) like "width" and
 * global functions "color()" that you might trip on when creating your
 * own variables and functions. Consult the documentation if run into strange
 * issues. (https://p5js.org/reference/)
 */
// size of canvas
var canvasSize = 600;

// how many rectangles we draw
var shapeCount = 8;
// how tall each rectangle is
// (extra credit: try making this random per rectangle)
var shapeWidth = 65;

// rotational boundaries for the random rotations given to the rectangles
var rotateMin = 7;
var rotateMax = 22;

// diameter of the cropping circle
// circle is relative to size of canvas
// (programming becomes powerful through these types of simple relationships)
var cropSize = canvasSize * 0.6; // 60% size of canvas

// space out rectangles based on crop size and number of shapes drawn
// gives a consistent grouping of shapes no matter how many we add
var step = cropSize / shapeCount;


/* == STEP 2 - Setting the Stage ==
 * "setup()" is called once and can contain settings for your sketch that you
 * would like to see applied later. Keep in mind that if you change these
 * settings later in "draw()" (or elsewhere), they will stick to what you have
 * set them there. You don't have to setup these settings here, it's just
 * a matter of convention (habits programmers pick up from eachother).
 */
function setup() {
    // just your standard canvas sizing call
    // I've bound canvasSize to an adjustable variable (see STEP 2)
    createCanvas(canvasSize, canvasSize);

    // switch to HSB colors with range 0 to 100 for values
    // this makes it easy to genrate a muted color palette for our specific
    // design (1 color - different shades, what is that called? Monochromatic?)
    // https://p5js.org/reference/#/p5/colorMode
    colorMode(HSB, 100, 100, 100);

    // must call "redraw()" to make a new frame (image)
    // be default, "draw()" gets called many times a second (30-60?)
    // later we are going to make this sketch draw a new image every time the
    // mouse is clicked
    noLoop();

    // all rectangles are drawn with the original at center
    rectMode(CENTER);
    // ... and no stroke
    noStroke();
}


/* == STEP 2 - Drawing ==
 * "draw()" handles all the drawing of a frame
 *
 * Per our design, we are taking the following steps:
 * - A color hue and saturation is chosen randomly as a starting point
 * - For each rectangle we draw (for loop):
 *   - Place the drawing cursor at the right height
 *   - Determine a random left or right rotation
 *   - Set a color shade based on the base color, lessening the saturation and
 *      brightness after each rectangle is drawn
 *   - Draw the rectangle
 * - Apply a fake "mask" to give the design its circular outline
 * - Apply a fake "paper" texture
 *
 * TODO: go through and uncomment the below code step by step (they are marked)
 *   and view the effects it has on the output. Try and internalize what is
 *   happening at each step.
 */
function draw() {
    // clear background with solid color
    background(10, 3, 90);

    // define where we start drawing rectangles
    // Let's do this relative to where the cropping lies and
    // start drawing rectangles a little below the bottom of the crop.
    // Remember that Y = 0 is the top of the canvas (not bottom)
    // Bit of tricky algebra:
    // bottom of cropping circle = center of view + half of crop diameter
    // lets add 20% to put the rectangles well below the crop bottom
    var verticalStart = (height / 2 + cropSize / 2) * 1.2;

    // pro tip: view the Console in your browser for some debug information
    // (ignore the complexity of these for now, I've opted to keep them terse)
    console.log("Canvas is " + height + " tall");
    console.log("Crop circle size: " + cropSize);
    console.log("Crop circle bottom will be at " + (height / 2 + cropSize / 2));
    console.log("We will start drawing rectangles at " + verticalStart);

    // randomly choose a color scheme by choosing a random hue and saturation
    var H = random(0, 100);
    // we limit the saturation to 90-100% so its always visible
    var S = random(90, 100);
    var B = 10;

    // lets apply it now so we can see what we're doing
    // (we won't need this later)
    fill(H, S, B);

    // * UNCOMMENT: 3 (don't forget end of loop)
    for (var i = 0; i < shapeCount; ++i) {
        // more console information
        // console.log("Drawing shape " + i + " at height: " + verticalStart);

        // drawing state (style, transformations, etc) can be saved and restored
        // here we are saving the current state by pushing it onto a stack
        // (think stack of plates at a buffet)
        push();

        // think about a little turtle as your drawing origin
        // move that turtle in place
        // remember we are in center origin mode for rectangle drawing
        // so we need to move the origin to the horizontal middle of the canvas
        translate(width / 2, verticalStart - shapeWidth / 2);

        // to make things interesting, we are rotating the stacked rectangles
        // they can either rotate left or right
        // their rotation amount is bounded by a global setting

        // first figure out rotation direction
        // do this by rolling the dice for a random number from 0-1
        var roll = random(1);

        // half the time it will be true, half the time false
        // you can arbitrarily assing either half to true or false
        var rotateLeft = roll > 0.5;

        // we can then roll another (stranger) dice to determine how much to
        // rotate in our chosen direction
        var rotation = random(rotateMin, rotateMax);

        // our rotational decision will print to the console
        console.log("dice: " + roll + " = " + (rotateLeft ? "rotate left" : "rotate right") + " by " + rotation + " degrees");

        // apply our rotation decision to the rotation by multiplying it by -1
        // in the case or rotating left, which rotates counter-clockwise
        if (rotateLeft) {
            rotation *= -1;
        }

        // actually apply the rotation to our drawing commands
        // need to convert from degrees to radians with a handy built-in function
        // * UNCOMMENT: 2
        rotate(radians(rotation));

        // Apply a gradient of color fills by shifting the colors every time we draw
        // (ignore the complexity of this line, lot's going on here)
        // * UNCOMMENT: 4
        fill(H, S - i * (100 / shapeCount), B + i * ((100 - 8) / shapeCount));

        // Yay!
        // Finally time to draw the rectangle
        // remember we are drawing rects with the origin at the center
        // * UNCOMMENT: 1
        rect(0, 0, canvasSize, shapeWidth);

        // All done! Restore our drawing state to what it was previously.
        // (pull that plate of the buffet plate stack)
        // all the tranlations, fill settings, rotations etc we just did are discarded
        pop();

        // Setup for the next loop:
        // Step up the start position for the next rectangle being drawn
        verticalStart -= step - random(-step / 2, step / 2);
    }

    // apply mask by drawing huge stroked circle where the stroke matches the
    // background color
    // this is a bit of a hack, but it works!
    stroke(10, 3, 90);
    noFill();

    // oversized to reach off extents of canvas
    var strokeWidth = 300;
    strokeWeight(strokeWidth);

    // draw circle (ellipse) from the center
    // need to oversize the ellipse since strokes are centered
    // (strokes can't be offset like in Illustrator)
    // * UNCOMMENT: 5
    ellipse(width / 2, height / 2, cropSize + strokeWidth, cropSize + strokeWidth);

    // extra credit: what does this line of code do?
    // * UNCOMMENT: 6
    paper(0.30);
}

// STEP 4
function mousePressed() {
    // click to draw a new image
    redraw();
}


// === IGNORE BELOW ===
// (fun paper texture)
function paper(in_val) {
    noStroke();
    for (var i = 0; i < width - 1; i += 2) {
        for (var j = 0; j < height - 1; j += 2) {
            fill(random(85 - 10, 85 + 10), in_val);
            rect(i, j, 2, 2);
        }
    }

    for (var i = 0; i < 30; i++) {
        fill(random(40, 60), random(in_val * 2.5, in_val * 3));
        rect(random(0, width - 2), random(0, height - 2), random(1, 3), random(1, 3));
    }
}