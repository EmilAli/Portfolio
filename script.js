const audio = document.getElementById('myAudio');
const muteButton = document.getElementById('muteButton');

muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
});

document.addEventListener('click', function () {
    audio.play();
});


// Select the hover button and the about section
const hoverButton = document.querySelector('.button');
const aboutSection = document.getElementById('about');

// Smooth scroll to about section on button click
hoverButton.addEventListener('click', function(event) {
    event.preventDefault();
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// Sticky navbar
window.onscroll = function() {stickNavbar()};


const navbar = document.getElementById("navbar");
const sticky = navbar.offsetTop;

function stickNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}



var canvas = document.querySelector('.polygon');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
};

// Adjust these variables to set the max and min radius
var maxRadius = 1;
var minRadius = 0.5;

var colourArray = [
    '#b5179e',
    '#560bad',
    '#3a0ca3',
    '#4361ee',
    '#4cc9f0',
];

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius, colour) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = minRadius;
    this.colour = colour;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };
}

var circleArray = [];
var lines = [];

function init() {
    circleArray = [];
    lines = [];

    var numberOfCircles = 300;
    if (window.innerWidth < 700) {
        numberOfCircles = Math.floor(numberOfCircles / 2); // 50% less
    }

    for (var i = 0; i < numberOfCircles; i++) {
        var radius = Math.random() * (maxRadius - minRadius) + minRadius;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = (Math.random() - 0.5);
        var colour = colourArray[Math.floor(Math.random() * colourArray.length)];
        circleArray.push(new Circle(x, y, dx, dy, radius, colour));
    }
    connectCircles();
}

function connectCircles() {
    lines = [];
    for (var i = 0; i < circleArray.length; i++) {
        for (var j = i + 1; j < circleArray.length; j++) {
            var distance = Math.hypot(circleArray[i].x - circleArray[j].x, circleArray[i].y - circleArray[j].y);
            if (distance < 100) {  // Adjust the distance threshold as needed
                lines.push({
                    circle1: circleArray[i],
                    circle2: circleArray[j],
                    color: getLineColor(circleArray[i], circleArray[j])
                });
            }
        }
    }
}

function getLineColor(circle1, circle2) {
    return circle1.colour;
}

function drawLines() {
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var opacity = 0.1; //opacity of continual lines
        if (mouse.x - line.circle1.x < 50 && mouse.x - line.circle1.x > -50 &&
            mouse.y - line.circle1.y < 50 && mouse.y - line.circle1.y > -50) {
            opacity = 1;
        }
        c.beginPath();
        c.moveTo(line.circle1.x, line.circle1.y);
        c.lineTo(line.circle2.x, line.circle2.y);
        c.strokeStyle = hexToRgba(line.color, opacity);
        c.lineWidth = 1;
        c.stroke();
        c.closePath();
    }
}

function hexToRgba(hex, opacity) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function drawBackground() {
    var gradient = c.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#3e0449");
    gradient.addColorStop(1, "#000009");
    c.fillStyle = gradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    for (var i = 0; i < 50; i++) {
        var starX = Math.random() * canvas.width;
        var starY = Math.random() * canvas.height;
        var starSize = Math.random() * 1;
        c.fillStyle = "#ffffff";
        c.fillRect(starX, starY, starSize, starSize);
    }
}
  

function animate() {
    requestAnimationFrame(animate);
    drawBackground();
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    connectCircles();
    drawLines();
}


init();
animate();

document.addEventListener('DOMContentLoaded', function () {
    // Fade in heading
    const heading = document.querySelector('.heading');
    heading.classList.add('fade-in');
  
    // Fade in about and logos when about section is in view
    const aboutSection = document.getElementById('about');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.getElementById('intro').classList.add('fade-in-left');
          document.querySelectorAll('.logo div').forEach(logo => {
            logo.classList.add('fade-in-right');
          });
        }
      });
    }, observerOptions);
  
    observer.observe(aboutSection);
  });

  