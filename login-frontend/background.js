const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const COUNT = 160;

const mouse = {
    x: null,
    y: null,
    radius: 130
};

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        // Very slow initial movement
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;

        this.baseRadius = Math.random() * 1.2 + 0.6;
        this.radius = this.baseRadius;
    }

    update() {
        // Free floating
        this.x += this.vx;
        this.y += this.vy;

        // Screen wrap
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Cursor interaction (repel)
        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.vx += (dx / dist) * force * 0.35;
                this.vy += (dy / dist) * force * 0.35;
                this.radius = this.baseRadius + force * 2.5;
            } else {
                this.radius += (this.baseRadius - this.radius) * 0.05;
            }
        }

        // Damping (smooth motion)
        this.vx *= 0.985;
        this.vy *= 0.985;
    }

    draw() {
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("resize", () => {
    resize();
    init();
});

resize();
init();
animate();
