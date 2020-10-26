// Global variables to define the simulation

// Canvas dimensions
var canvasDiv = document.getElementById('water-tank');
var canvas_width = canvasDiv.offsetWidth;
var canvas_height = canvas_width * 0.6;

// Variables involving the virus 
var nVirus = 8;                             // number of viruses 
var spaceVirus = (canvas_width / nVirus );
var radiV = canvas_height / 12;                             // radii of the viruses
var nCap = 12;                              // number of proteins of the capsule
var angle = 360 / nCap                        // angle between each capsule
var l = 2 * radiV * Math.sin((angle/180*Math.PI)/2) * 0.45;
var viruses = [];                           // empty array to contain all the viruses

// Variables involving the soap particles
var nPart = 0;                              // number of soap particles
var radiS = canvas_height / 50;                             // radii of the soap particles
var particles = [];                         // empty array to contain all the soaps
var iniVel = 1.5;                           // magnitude of the velicities at start


// Setting up the simulation
function setup() {
    let cnv = createCanvas(canvas_width, canvas_height);
    cnv.parent('water-tank');

// CREATION OF THE VIRUS
    for (var i = 1; i <= nVirus; i++) {
        var x = ((spaceVirus * i) - 5 ) - radiV;
        var y = canvas_height - radiV;
        var t = "V";

        var tmp = new Particle(x, y, t);
        viruses.push(tmp);
    }    
}

// Drawing loop
function draw() {
	background(0, 170, 255);

    // draws and updates the soaps coordinates and states
    for (i = 0; i < particles.length; i++) {
        if (particles[i].free) {
            particles[i].update(particles, viruses, i);
            particles[i].show();
        } else {
            particles[i].move();
            particles[i].tilt();
            particles[i].show();
        }

    }

    // draws and updates the viruses states and positions
    for (i = 0; i < viruses.length; i++) {
        for (j = 0; j < viruses.length; j++) {
            if (i != j) {
                elastic(viruses[i], viruses[j]);
            }
        }
        viruses[i].edges();
        viruses[i].move();
       	viruses[i].show();
    }

}

