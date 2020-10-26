class Particle {
    constructor(x, y, t) {
        this.t = t
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);

        // check that the hole particle is inside the canvas
        if (this.t == "S") {
            this.vel = p5.Vector.random2D();
            this.vel.setMag(iniVel);
            this.color = 'rgb(100, 255, 0)'
            this.r = radiS;
            this.free = true;
        } else if (this.t == "D") {
            this.vel = createVector(0, -1);
            this.color = 'rgb(200, 55, 70)'
            this.r = radiD;
            this.free = false;
        } else if (this.t == "V") {
            this.vel = createVector(0, -1);
            this.color = 'rgb(0, 255, 0)';
            this.r = radiV;
            this.free = false;
        }

        this.vx = this.vel.x;
        this.vy = this.vel.y;

        if (this.pos.x <= this.r) {
            this.pos.x = this.r;
        } else if (this.pos.x >= width - this.r) {
            this.pos.x = width - this.r;
        } else if (this.pos.y <= this.r) {
            this.pos.y = this.r;
        } else if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
        }
    }
    get mass() {
        var density = 1;
        return density * Math.PI * this.r * this.r
    }
    get v() {
        return [this.vx, this.vy];
    }

    dis(other) {
        return p5.Vector.sub(this.pos, other.pos).mag();
    }

    edges() {
        if (this.pos.x <= 0 + this.r) {
            this.pos.x = this.r;
            this.vel.x *= -1;
        } else if (this.pos.x >= width - this.r) {
            this.pos.x = width - this.r;
            this.vel.x *= -1;
        } else if (this.pos.y <= 0 + this.r) {
            this.pos.y = this.r;
            this.vel.y *= -1;
        } else if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
            this.vel.y *= -1
        }
    }

    move() {
        if (this.t == "D" && this.free || this.t == "S" && !this.free || this.t == "V" && this.free) {
            this.pos.add(this.vel);
        }
    }


    update(particles, dirts, start) {
        for (var i = 0; i < particles.length; i++) {
            var other = particles[i];
            if (this != other && this.dis(other) <= (this.r + other.r)) {
                var newVel = elastic(this, other)
            }
        }


        for (var i = 0; i < dirts.length; i++) {
        	var other = dirts[i];
        	var d = this.dis(other);
        	var sep = this.r + other.r;
        	if (d < sep) {
        		this.free = false;
        		var l = p5.Vector.sub(this.pos, other.pos).normalize().setMag(sep + 1);
        		this.pos = p5.Vector.add(other.pos, l);
        		this.vel = other.vel;
                other.free = true;
        	}
        }

        if (this.free) {
	        this.pos.add(this.vel);
	        this.tilt();
        }

        this.edges();
    }


    tilt() {
        if (this.t == "S" && this.free) {
            this.pos.add(p5.Vector.random2D().setMag(4));
        }        
        
    }

    show() {
        if (this.t == "S") {
            stroke(100, 100, 255);
            strokeWeight(2);
            fill(100, 100, 255, 100);
            ellipse(this.pos.x, this.pos.y, 2 * this.r);
        } else if (this.t == "D") {
            stroke(200, 55, 70);
            strokeWeight(2);
            fill(200, 55, 70, 100);
            ellipse(this.pos.x, this.pos.y, 2 * this.r);
        } else if (this.t == "V") {
            angleMode(DEGREES);
            noStroke();
            push();
            translate(this.pos.x, this.pos.y);
            fill(128, 197, 222);
            //exterior circle
            //circle(0, 0, 2 * this.r);
            fill(this.color)
            // interior circle
            circle(0, 0, 2 * this.r*0.85);
            // exterior horizontal and radial rectangles
            fill(this.color);
            for (var i = 0; i <= nCap-1; i++) {
                rotate(angle);
            rect(-l/4/2, 0, l/4, this.r);
            ellipse(0, this.r , l*2, l/2);
            //rect(-l/2, this.r / 2, l, l/4);
          }
            fill(165);
            circle(this.r * 0.4, this.r * 0.4, this.r * 0.15)
            circle(-this.r * 0.4, -this.r * 0.12, this.r * 0.15)
            fill(180);
            circle(this.r * 0.4, -this.r * 0.12, this.r * 0.09)
            circle(this.r * 0.05, -this.r * 0.55, this.r * 0.09)
            circle(-this.r * 0.4, this.r * 0.42, this.r * 0.09)
            circle(-this.r * 0.1, this.r * 0.52, this.r * 0.09)
            pop();

        }
    }
}
