// Functions that are gonna be used in the simulations

// This function rotates the direction of the velocity by an angle
function rot(v, theta) {
    return [v[0] * Math.cos(theta) - v[1] * Math.sin(theta), v[0] * Math.sin(theta) + v[1] * Math.cos(theta)];
}

// This function changes the velocities of the particles simulating an elastic collision
function elastic(p1, p2) {
    // calculates the distances between the particles
    var dx = p1.pos.x - p2.pos.x;
    var dy = p1.pos.y - p2.pos.y;
    var dSq = dx ** 2 + dy ** 2;

    // checks the squared distance for collision
    if (dSq <= (p1.r/2 + p2.r/2) ** 2) {
        var dvx = p2.vel.x - p1.vel.x;
        var dvy = p2.vel.y - p1.vel.y;
        dotP = dx * dvx + dy * dvy;

        if (dotP > 0) {
            var collisionScale = dotP / dSq;
            var xCollision = dx * collisionScale;
            var yCollision = dy * collisionScale;

            var tMass = p1.mass + p2.mass;
            var wP1 = 2 * p2.mass / tMass;
            var wP2 = 2 * p1.mass / tMass;

            // The collision vector is the speed diference projected on the dist vector
            p1.vel.x += wP1 * xCollision;
            p1.vel.y += wP1 * yCollision;
            p2.vel.x -= wP2 * xCollision;
            p2.vel.y -= wP2 * yCollision;
        }
    }
}

// This funtion creates a soap particle and adds it to the soaps array
function newSoap() {
	nSoaps++
    var rsoap = random(rCell, rCell * 2)
    var anglesoap = random(0,360);
    var xsoap = rsoap * cos(anglesoap);
    var ysoap = rsoap * sin(anglesoap);
	soaps.push(new Cell(xsoap , ysoap , "S"))

}

function connect(p1, p2) {
    var dx = p1.pos.x - p2.pos.x;
    var dy = p1.pos.y - p2.pos.y;
    var dSq = dx ** 2 + dy ** 2;
    if (dSq <= 300 * p1.r) {
        var dens = map(dSq, 0, 100 * p1.r, 0, 255)
        stroke(100,50,100, 255 - dens * 0.85)
        strokeWeight(p1.r / 5)
        line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
    }
}

function resetSketch() {
    dnas = [];
    soaps = [];
    cells = [];
    nPart = 0;
    nSoaps = 0;
    nFree = 0;

    for (var i = 0; i < nCap; i++) {
    	angleMode(DEGREES);
	    var x1 = rCell * cos(angle * i);
   		var y1 = rCell * sin(angle * i);

   		cells.push(new Cell(x1,y1,"C", angle * i));
    }

    // Creation of the DNA inside the virus
    // it creates nDNA particles in a random position inside the virus
    for (var i = 0; i < nDNA; i++) {
    	var rdna = random(0, rCell * 0.5);   // sets a random radii between two values
    	var angledna = random(0,360);               // sets a random angle between 0 and 360
        // coordinates from polar to cartesian
	    var xdna = rdna * cos(angledna);            
	    var ydna = rdna * sin(angledna);
    	dnas.push(new Cell(xdna, ydna, "D", 0))
    }
}
