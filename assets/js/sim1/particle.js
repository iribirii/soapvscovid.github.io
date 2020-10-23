// Class file where all the features of the different particles are.
class Cell {
    constructor(x, y, t, a) {
        this.t = t;                         // Type of the particle
        this.x = x;                         
        this.y = y;
        this.pos = createVector(x, y);
        this.angle = a;
        
        // Characteristics depending on the type of particle

        // CAPSULE PROTEIN
        if (this.t == "C") {
            this.vel = p5.Vector.sub(this.pos, [0,0]); // Velocity pointing to the center of the virus
            this.vel.setMag(-iniVel);                  // Velocity now resized and pointing the oposite direction
            
            this.r = radiC;
            this.free = false;                         // The particle is not moving at the starting point
        } 
        // DNA PARTICLE
        else if (this.t == "D") {
        	this.vel = p5.Vector.random2D();            // random velocity
        	this.vel.setMag(iniVel*0.2);                // resized velocity
        	
        	this.r = radiD;
        	this.free = true;                           // free movement
        } 
        // SOAP PARTICLE
        else if (this.t == "S") {
        	this.vel = p5.Vector.random2D();            // random velocity
        	this.vel.setMag(iniVel/5);                  // resized velocity
        	
        	this.r = radiS;
        	this.free = true                            // free movement
        }

        this.vx = this.vel.x;
        this.vy = this.vel.y;
    }

    // A function to calculate the mass of each particle based on their size
    get mass() {
        var density = 1;
        return density * Math.PI * this.r * this.r
    }

    // A function to calculate the velocity magnitude of the particle
    get v() {
        return [this.vx, this.vy];
    }

    // A function to calculate the distance between a particle an another one
    dis(other) {
        return p5.Vector.sub(this.pos, other.pos).mag();
    }

    // A function that makes the particles bounce off the walls
    edges() {
        if (this.pos.x <= -width/2 + this.r/2) {
            this.pos.x = -width/2 + this.r/2;
            this.vel.x *= -1;
        } else if (this.pos.x >= width/2 - this.r/2) {
            this.pos.x = width/2 - this.r/2;
            this.vel.x *= -1;
        } else if (this.pos.y <= -height/2 + this.r/2) {
            this.pos.y = -height/2 + this.r/2;
            this.vel.y *= -1;
        } else if (this.pos.y >= height/2 - this.r/2) {
            this.pos.y = height/2 - this.r/2;
            this.vel.y *= -1
        }
    }

    // A function to update the position of the particle based on its velocity
    move() {
        if (this.t == "S" && !this.free || this.t == "C" && this.free || this.t == "D" && this.free && nFree > nCap/2) {
            this.pos.add(this.vel);
        }
    }

    // A function to make the particle move its position randomly 
    // This recreates the brownian motion of a free particle in water
    tilt(n) {
        if (this.t == "S" && this.free || this.t == "D" && this.free || this.t == "C") {
            this.pos.add(p5.Vector.random2D().setMag(n));
        }        
        
    }

    // A funtion to make the particle rotate randomly over time
    // Only affects non-spherical particles
    osc() {
    	if (this.free) {
	    	this.angle = this.angle + random(-1,1);
    	} 
    }

    // Updates the particles position, checking if the have collided
    update(particles, dirts, start) {
        // This function applies the elastic function to particles of the same type if they are colliding
        for (var i = 0; i < particles.length; i++) {
            var other = particles[i];
            if (this != other && this.dis(other) <= (this.r + other.r)) {
                var newVel = elastic(this, other)
            }
        }

        // This changes the particles status when two particles of a different kind (soap and proteins in this case) collide
        for (var i = 0; i < dirts.length; i++) {
            var other = dirts[i];
            var d = this.dis(other);
            var sep = this.r/2 + other.r/2;
            if (d < sep) {
                this.free = false;
                var l = p5.Vector.sub(this.pos, other.pos).normalize().setMag(sep + 1);
                this.pos = p5.Vector.add(other.pos, l);
                this.vel = other.vel;
                other.free = true;
                nFree++
            }
        }

        if (this.free) {
            this.pos.add(this.vel);
            this.tilt();
        }

        this.edges();
    }

    // This function create the particles shapes and shows them in the simulation
    show() {
        // PROTEIN
    	if (this.t == "C") {
    		fill(0);
    		noStroke();

            //Drawing the different part of the capside monomers
            push();                                         // needed to rotate each particle

            stroke(0,255,0);                                // green stroke with no transparency
            fill(0, 255, 0, 200);                           // green filling with transparency
            translate(this.pos.x, this.pos.y);              
            rotate(this.angle);

            // shape of the protein
            rect(0, -this.r/2, -this.r/3, this.r);
            ellipse(this.r/4, 0, this.r/2, this.r*0.85);

            pop();                                          // needed undo the translation and rotation 

    	} 
        // DNA
        else if (this.t == "D") {
    		stroke(150,50,100);                             // dark red stroke with no transparency
    		fill(150,50,100, 100);                          // dark red filling with transparency 
    		circle(this.pos.x, this.pos.y, this.r);
    	} else if (this.t == "S") {
    		stroke(100,100,255);                            // dark blue stroke with no transparency
    		fill(100,100,255, 100);                         // dark blue filling with transparency
    		circle(this.pos.x, this.pos.y, this.r);
    	}
    }
}
