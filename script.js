// DOM selectors
const stars = document.getElementById('stars');
const starsCtx = stars.getContext('2d');
const slider = document.querySelector(".slider input");
const output = document.querySelector("#speed");



// global variables
let screen, starsElements, starsParams = { speed: 2, number: 300, extinction: 4 };

// run stars
setupStars();
updateStars();

// handle slider
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    starsParams.speed = this.value;
};

// update stars on resize to keep them centered
window.onresize = function() {
    setupStars();
};

// star constructor
        // function Star() {
        //     this.x = Math.random() * stars.width;
        //     this.y = Math.random() * stars.height;
        //     this.z = Math.random() * stars.width;

        //     this.move = function() {
        //         this.z -= starsParams.speed;
        //         if (this.z <= 0) {
        //             this.z = stars.width;
        //         }
        //     };

        //     this.show = function() {
        //         let x, y, rad, opacity;
        //         x = (this.x - screen.c[0]) * (stars.width / this.z);
        //         x = x + screen.c[0];
        //         y = (this.y - screen.c[1]) * (stars.width / this.z);
        //         y = y + screen.c[1];
        //         rad = stars.width / this.z;
        //         opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

        //         starsCtx.beginPath();
        //         starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
        //         starsCtx.arc(x, y, rad, 0, Math.PI * 2);
        //         starsCtx.fill();
        //     }
        // }
        function Star() {
            this.x = Math.random() * stars.width;
            this.y = Math.random() * stars.height;
            this.z = Math.random() * stars.width;
            this.color = "white"; // add a color property
        
            this.move = function() {
                this.z -= starsParams.speed;
                if (this.z <= 0) {
                    this.z = stars.width;
                }
            };
        
            this.show = function() {
                let x, y, rad, opacity;
                x = (this.x - screen.c[0]) * (stars.width / this.z);
                x = x + screen.c[0];
                y = (this.y - screen.c[1]) * (stars.width / this.z);
                y = y + screen.c[1];
                rad = stars.width / this.z;
                opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;
        
                starsCtx.beginPath();
                starsCtx.fillStyle = this.color; // use the color property to set the fillStyle
                starsCtx.arc(x, y, rad, 0, Math.PI * 2);
                starsCtx.fill();
            }
        }
        

// setup <canvas>, create all the starts
function setupStars() {
    screen = {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
        c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
    };
    window.cancelAnimationFrame(updateStars);
    stars.width = screen.w;
    stars.height = screen.h;
    starsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();
    }
}



function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



function getRandomColor() {
    const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'rebeccapurple', 'violet'];
    return rainbow[Math.floor(Math.random() * rainbow.length)];
}

const button = document.getElementById('button');
let newColor = 'black';

function updateStars(color) {
    starsCtx.fillStyle = color;
    starsCtx.fillRect(0, 0, stars.width, stars.height);
    starsElements.forEach(function (s) {
        s.show();
        s.move();
    });

    window.requestAnimationFrame(() => updateStars(newColor)); // update with newColor
}

button.addEventListener('click', () => {
    console.log("clicked");
    newColor = getRandomColor();
});

updateStars(newColor); // initial call with black color



/*const button = document.getElementById('button');
    
    button.addEventListener('click', () => {
        starsCtx.fillStyle = getRandomColor();
        console.log("teqst")
    });*/


const canvas = document.getElementById('canvas');
canvas.width = 950;
canvas.height = 500;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);


let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let restore_array = [];
let index = -1;


canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    is_drawing = true;
    const rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.moveTo(event.clientX - rect.left,
                   event.clientY - rect.top);
        event.preventDefault();
}

function draw(event) {
    if (is_drawing) {
        const rect = canvas.getBoundingClientRect();
        context.lineTo(event.clientX - rect.left,
            event.clientY - rect.top);
            context.strokeStyle = draw_color;
            context.lineWigth = draw_width;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
    }
    event.preventDefault();
}

function stop(event){
    if (is_drawing){
        context.stroke();
        is_drawing = false;
    }
    event.preventDefault();

    if ( event.type != 'mouseout') {
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    }

    console.log(restore_array);
}

function clear_canvas(){
    context.fillStyle = start_background_color;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restore_array = [];
    index = -1;
}

function undo_last(){
    if ( index <= 0) {
        clear_canvas();
    } else {
        index -=1 ;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}


const shareButton = document.querySelector('.share-button');
  shareButton.addEventListener('click', () => {
    addthis.share({
      title: 'Title of your image',
      url: 'http://example.com/your-image.png',
      description: 'Description of your image',
      media: 'http://example.com/your-image.png'
    });
  });

const penRange = document.querySelector('.pen-range');


penRange.addEventListener('change', () => {
    console.log(penRange.value)
})
