const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = canvas.getBoundingClientRect().width
canvas.height = canvas.getBoundingClientRect().height

class Particle {
    constructor(x, y, t) {
        this.x = x;
        this.y = y;
        this.t = t;

        if (this.t == 'v') {
            this.r = 30;
            this.color = 'green'
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
    }
}

class Soap {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.color = 'red';
    }

    edges() {
        if (this.x <= this.r) {
            this.x = this.r
        } else if (this.x >= (canvas.width - this.r)) {
            this.x = canvas.width - this.r
        }

        if (this.y <= this.r) {
            this.y = this.r
        } else if (this.y >= (canvas.height - this.r)) {
            this.y = canvas.height - this.r
        }
    }

    brownian() {
        this.x += Math.random() - 0.5;
        this.y += Math.random() - 0.5;
    }

    draw() {
        this.brownian();
        this.edges();
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

const virus = new Particle(canvas.width / 2, canvas.height - 30, 'v');

virus.draw();

var soaps = []

function animate() {
    requestAnimationFrame(animate);
    soaps.forEach((soap) => {
        soap.draw();
    });
}

window.addEventListener('click', (event) => {
    soapX = Math.random() * canvas.width;
    soapY = Math.random() * canvas.height;
    soaps.push( new Soap(soapX, 
                         soapY, 
                         10
                         )
    );
})

animate();
