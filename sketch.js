const orbitColor = [40, 40, 40]; // Colour of orbit path
let speed; // Store frame count to be used as base speed throughout
let scaleRatio = 1; // Base scale
const buttonSize = 30; // Size of zoom button
const buttonMargin = 6; // Margin around zoom button
let zoomOutBtn; // Translate position for zoom out button
let zoomInBtn; // Translate position for zoom in button

function setup() {
	createCanvas(900, 700);
	
	zoomOutBtn = [buttonMargin, height - (buttonSize + buttonMargin)];
	zoomInBtn = [width - (buttonSize + buttonMargin), height - (buttonSize + buttonMargin)];
}

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
			70,
			-speed * 2,
			true,
			300
		);
		pop();

		// Moon 2
		push();
		celestialObj(
			color(160, 160, 160),
			15,
			0,
			100,
			speed,
			true,
			300
		);
		pop();
	pop();
}

function celestialObj (color, size, x, y, speed, orbit, orbitPoint, bar) {

	translate(0, orbitPoint); // Move the centre to the centre of our orbit
	rotate(radians(speed));

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

function drawOrbitPath (pos) {
	push();
	stroke(orbitColor);
	strokeWeight(2);
	noFill();
	ellipse(0, 0, pos * 2, pos * 2);
	pop();
}

function drawButton (pos, char) {
	push();
	translate(...pos);
	noStroke();
	fill(255);
	rect(0, 0, 30, 30);
	fill(0);
	textAlign(CENTER);
	textSize(30);
	text(char, 4, 0, 30, 30);
	pop();
}

function mousePressed () {
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
		(mouseX > zoomOutStartX && mouseX < zoomOutStopX) &&
		(mouseY > zoomStartY && mouseY < zoomStopY)
	) {
		scaleRatio = scaleRatio * 0.9;
	}

	// Zoom in clicked
	if (
		(mouseX > zoomInStartX && mouseX < zoomInStopX) &&
		(mouseY > zoomStartY && mouseY < zoomStopY)
	) {
		scaleRatio = scaleRatio * 1.1;
	}
}