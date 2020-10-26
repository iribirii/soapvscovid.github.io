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
function mousePressed() {
	nSoaps++
	soaps.push(new Cell(mouseX - width/2, mouseY - height/2, "S"))
}
