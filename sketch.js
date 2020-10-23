const orbitColor = [40, 40, 40]; // Colour of orbit path
let speed; // Store frame count to be used as base speed throughout
let scaleRatio = 1; // Base scale
const buttonSize = 30; // Size of zoom button
const buttonMargin = 6; // Margin around zoom button
let zoomOutBtn; // Translate position for zoom out button
let zoomInBtn; // Translate position for zoom in button

/**
 * P5 setup function
 *
 * @return void.
 */
function setup() {
	createCanvas(900, 700);
	
	zoomOutBtn = [buttonMargin, height - (buttonSize + buttonMargin)];
	zoomInBtn = [width - (buttonSize + buttonMargin), height - (buttonSize + buttonMargin)];
}

/**
 * P5 draw function
 *
 * @return void.
 */
function draw() {
	background(0);
	speed = frameCount;

	// Draw zoom buttons
	drawButton(zoomOutBtn, '-');
	drawButton(zoomInBtn, '+');

	// Move 0, 0 to the centre of the canvas
	translate(width/2, height/2);
		
	scale(scaleRatio);

	// Draw the Sun
	push();
	celestialObj(
		color(237, 249, 3),
		200,
		0,
		0,
		speed / 3,
		false,
		0
	);
	pop();

	// Draw the Earth
	push();
	celestialObj(
		color(50, 69, 252),
		80,
		0,
		300,
		speed,
		true,
		0
	);
		// Moon 1
		push();
		celestialObj(
			color(255, 255, 255),
			30,
			0,
			86,
			-speed * 2,
			true,
			300
		);

			// Asteroid around Moon 1
			push();
			celestialObj(
				color(220, 20, 60),
				10,
				0,
				30,
				speed * 3,
				true,
				86
			);
			pop();

		pop();

		// Moon 2
		push();
		celestialObj(
			color(160, 160, 160),
			20,
			0,
			112,
			-speed * 3,
			true,
			300
		);
		pop();
	pop();
}

/**
 * Draws a celestial body (planet or moon) to the sky
 *
 * @param {p5 color}	color - P5 color representation of the body being drawn
 * @param {number}	size - Diameter of the body
 * @param {number}	x - X position of the body
 * @param {number}	y - Y position of the body
 * @param {number}	speed - The speed at which to orbit and/or rotate
 * @param {boolean}	orbit - Whether the body should orbit (the sun does not)
 * @param {number}	orbitPoint - If orbiting, orbit around this point
 * 
 * @return void.
 */
function celestialObj (color, size, x, y, speed, orbit, orbitPoint) {

	translate(0, orbitPoint); // Move the centre to the centre of our orbit
	rotate(radians(speed)); // Rotate the canvas

	// If we're orbiting
	if (orbit) {
		// Draw the orbit path
		drawOrbitPath(y);
	}

	// Draw the body
	noStroke();
	fill(color);
	ellipse(x, y, size, size);

	// Draw the rotation line
	strokeWeight(5);
	stroke(0);
	line(x, y, x, y + size / 2);
}

/**
 * Draws an orbit path
 *
 * @param {number}	radius - The radius of the orbit
 * 
 * @return void.
 */
function drawOrbitPath (radius) {
	push();
	stroke(orbitColor);
	strokeWeight(2);
	noFill();
	ellipse(0, 0, radius * 2, radius * 2);
	pop();
}

/**
 * Draws a button for changing the scale
 *
 * @param {array}	pos - The x and y positions to move the canvas
 * @param {string}	char - The character to display on the button
 * 
 * @return void.
 */
function drawButton (pos, char) {
	push();
	// Button
	translate(...pos);
	noStroke();
	fill(255);
	rect(0, 0, 30, 30);
	// Text
	fill(0);
	textAlign(CENTER);
	textSize(30);
	text(char, 4, 0, 30, 30);
	pop();
}

/**
 * P5 mouse pressed event listener
 *
 * @return void.
 */
function mousePressed () {
	handleClick(mouseX, mouseY);
}

/**
 * Processes info from click event and passes it on
 *
 * @param {number}	x - The x position of the click event
 * @param {number}	y - The y position of the click event
 * 
 * @return void.
 */
function handleClick (x, y) {
	// Zoom in x position
	const zoomInStartX = width - (buttonSize + buttonMargin);
	const zoomInStopX = zoomInStartX + buttonSize;
	// Zoom out x position	
	const zoomOutStartX = buttonMargin;
	const zoomOutStopX = zoomOutStartX + buttonSize;
	// Zoom y position
	const zoomStartY = height - (buttonSize + buttonMargin);
	const zoomStopY = zoomStartY + buttonSize;

	// Zoom out clicked
	if (
		(x > zoomOutStartX && x < zoomOutStopX) &&
		(y > zoomStartY && y < zoomStopY)
	) {
		zoomOut();
	}

	// Zoom in clicked
	if (
		(x > zoomInStartX && x < zoomInStopX) &&
		(y > zoomStartY && y < zoomStopY)
	) {
		zoomIn();
	}
}

/**
 * Decreases the scale of the canvas (zooms out)
 *
 * 
 * @return void.
 */
function zoomOut () {
	scaleRatio = scaleRatio * 0.9;
}

/**
 * Increases the scale of the canvas (zooms in)
 *
 * 
 * @return void.
 */
function zoomIn () {
	scaleRatio = scaleRatio * 1.1;
}