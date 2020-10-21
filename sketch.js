// /*
// // Mercury
//     config = {
//         size: 30,
//         colour: [90, 90, 90, darkenColourBy],
//         startPositionInSky: 45,
//         rotateClockwise: true,
//         rotateSpeed: 4,
//         orbit: true,
//         orbitSpeed: 4,
//         orbitDistanceFromCentre: 300
//     };
//     mercury = new CelestialBody(config);

//     // Venus
//     config = {
//         size: 40,
//         colour: [255, 165, 0, darkenColourBy],
//         startPositionInSky: 90,
//         rotateClockwise: false,
//         rotateSpeed: 5,
//         orbit: true,
//         orbitSpeed: 5,
//         orbitDistanceFromCentre: 400
//     };
//     venus = new CelestialBody(config);

//     // Earth
//     config = {
//         size: 80,
//         colour: [0, 0, 255, darkenColourBy],
//         startPositionInSky: 45,
//         rotateClockwise: true,
//         rotateSpeed: 6,
//         orbit: true,
//         orbitSpeed: 5,
//         orbitDistanceFromCentre: 300

        
//     };
//     earth = new CelestialBody(config);

//     // Earth's moon
//     config = {
//         size: 10,
//         colour: [255, 0, 0, darkenColourBy],
//         startPositionInSky: 120,
//         rotateClockwise: false,
//         rotateSpeed: 6,
//         orbit: false,
//         orbitSpeed: 1,
//         orbitDistanceFromCentre: 90,


//         foo: true
//     };
//     earthsMoon = new CelestialBody(config);

//     // Mars
//     config = {
//         size: 70,
//         colour: [255, 0, 0, darkenColourBy],
//         startPositionInSky: 180,
//         rotateClockwise: false,
//         rotateSpeed: 6,
//         orbit: true,
//         orbitSpeed: 1,
//         orbitDistanceFromCentre: 600
//     };
// 		mars = new CelestialBody(config);
// 		*/


// const darkenColourBy = 200;
// let speed;

// // Sun
// let sun;
// const sunConfig = {
// 	size: 200,
//   colour: [255, 255, 0, darkenColourBy],
//   startPositionInSky: 0,
//   rotateClockwise: false,
//   rotateSpeedRatio: 3,
//   orbit: false,
// };

// // Earth
// let earth;
// const earthConfig = {
// 	size: 80,
// 	colour: [173, 216, 230, darkenColourBy],
// 	startPositionInSky: 45,
// 	rotateClockwise: true,
// 	rotateSpeedRatio: 1,
// 	orbit: true,
// 	orbitSpeedRatio: 8,
// 	orbitClockwise: true,
// 	orbitDistanceFromCentre: sunConfig.size + 300,

// 	moons: [
// 		{
// 			size: 30,
// 			colour: [80, 80, 80, darkenColourBy],
// 			startPositionInSky: 45,
// 			rotateClockwise: false,
// 			rotateSpeedRatio: 10,
// 			orbit: true,
// 			orbitSpeedRatio: 4,
// 			orbitClockwise: false,
// 			orbitDistanceFromCentre: 100,
// 		}
// 	]

// }

// function setup() {
//     createCanvas(900, 600);
// 		background(0);

//     // Sun
//     sun = new CelestialBody(sunConfig);

//     // Earth
//     earth = new CelestialBody(earthConfig);
// }

// function draw() {
//     background(0);
// 		translate(width / 2, height / 2);
		
// 		speed = frameCount;

// 		frameRate(40)
		
// 		// Draw the Sun
// 		sun.draw();
		
// 		// Draw the Earth
// 		earth.draw();
// }

// class CelestialBody {
//     constructor (config) {
//         this.config = config;
//         this.currentPosition = config.startPositionInSky;
//         this.currentRotation = 0;
// 				this.yPos = 0;
// 				this.rotate = rotate;
// 				this.moonCurrentPosition = [];
//     }
    
//     draw (rotateFn) {
//         // Deconstuct the props
//         const { size,
//                 colour,
//                 rotate,
//                 rotateClockwise,
//                 rotateSpeedRatio,
//                 orbit,
//                 orbitClockwise,
//                 orbitSpeedRatio,
// 								orbitDistanceFromCentre,
// 								moons
//         } = this.config;
// 				const fillColour = color(...colour); // Main colour

//         // Calculate the current rotation, depending on speed
//         if (frameCount % rotateSpeedRatio === 0) {
//             this.currentRotation = this.currentRotation === 360 ? 0 : this.currentRotation + 1;
//         }
//         // Map the current rotation value
//         let rotateAmount = map(this.currentRotation, 0, 60, 0, 360);
//         if (!rotateClockwise) {
//             rotateAmount = map(this.currentRotation, 0, 60, 360, 0);
// 				}

//         // Draw the shape
// 				push();
//         noStroke();
//         fill(...colour);
//         if (orbit) { // Move around orbit
            
//             // Calculate the current position *in the sky* value, depending on speed
//             //if (frameCount % orbitSpeedRatio === 0) {
//                 this.currentPosition = this.currentPosition === 360 ? 0 : this.currentPosition + 1;
//             //}
//             // Map the current position *in the sky* value
//             let positionAngle = map(this.currentPosition, 0, 60, 0, 360);
//             if (!orbitClockwise) {
//                 positionAngle = map(this.currentPosition, 0, 60, 360, 0);
//             }
// 						// Rotate the canvas
//             this.rotate(radians(positionAngle));
//             this.yPos = 0 - orbitDistanceFromCentre / 2;
// 						ellipse(0, this.yPos, size, size);
						

// 						// Draw any moons
// 						if (moons && moons.length) {

// 							moons.forEach((moon, index) => {
// 								const fillColour = color(...moon.colour); // Main colour

// 								this.moonCurrentPosition[index] = this.moonCurrentPosition[index] || 0;
								

// 								// Calculate the current position *in the sky* value, depending on speed
// 								if (frameCount % moon.orbitSpeedRatio === 0) {
// 									this.moonCurrentPosition[index] = this.moonCurrentPosition[index]  === 360 ? 0 : this.moonCurrentPosition[index]  + 1;
// 								}
// 								// Map the current position *in the sky* value
// 								let positionAngle = map(this.moonCurrentPosition[index] , 0, 60, 0, 360);
// 								if (!moon.orbitClockwise) {
// 										positionAngle = map(this.moonCurrentPosition[index] , 0, 60, 360, 0);
// 								}

// 								push();
// 								translate(0, this.yPos);
// 								this.rotate(radians(positionAngle));
// 								fill(...moon.colour);
// 								this.moonYPos = 0 - ((size + moon.size + 20) / 2);
// 								ellipse(0, this.moonYPos, moon.size, moon.size);

// 								// Created the shaded half of the body
// 								createShadedHalf(this.moonYPos, moon.size, rotateAmount, fillColour);

// 								pop();
// 							});

// 						}
            
//             // Created the shaded half of the body
//             createShadedHalf(this.yPos, size, rotateAmount, fillColour);

//         } else {
// 						// No orbit, just rotate (must be the sun)
//             ellipse(0, this.yPos, size, size);
//             fill(fillColour);
//             arc(0, 0, size, size, PI + radians(rotateAmount), TWO_PI + radians(rotateAmount), OPEN);
//         }
// 				pop();
				
// 				function createShadedHalf (yPos, size, rotateAmount, fillColour) {
// 					//return;
// 					push();
// 					translate(0, yPos);
// 					fill(fillColour);
// 					arc(0, 0, size, size, PI + radians(rotateAmount), TWO_PI + radians(rotateAmount), OPEN);
// 					pop();
// 				}

//     }

// }


var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
		speed = frameCount;

		

		translate(width/2, height/2);

		scale(0.5);

    push();
    
		celestialObj(color(255,150,0), 200, 0, 0); // SUN
		pop();
		


		

		speed = speed / 3 % 360;
		let rotateAmount = map(speed, 0, 60, 0, 360);
		push();
		translate(0, 0);
		rotate(radians(rotateAmount));

		stroke(40);
		//fill(0);
		noFill();
		ellipse(0, 0, 600, 600);

		celestialObj(color(0,0,255), 80, 0, 300); // EARTH

		push();

		
		translate(0, 300);
		

		speed = -speed * 2 % 360;
		let rotateAmount2 = map(speed, 0, 60, 360, 0);
		rotate(radians(rotateAmount2));
		//translate(0, -50);
		//translate(0, 60);

		stroke(40);
		//stroke(255, 0, 0);
		//fill(0);
		noFill();
		ellipse(0, 0, 140, 140);

		celestialObj(color(100,100,100), 30, 0, 70); // EARTH

		pop();


    pop();
}

function celestialObj(c, size, x, y){
		noStroke();
		fill(c);
		ellipse(x, y, size, size);
		
		// strokeWeight(5);
		// stroke(0);
		// line(0, 0, size/2, 0);
}
