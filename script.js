const stars = document.getElementById('stars');
const starsCtx = stars.getContext('2d');
const slider = document.querySelector(".slider input");
const output = document.querySelector("#speed");




let screen, starsElements, starsParams = { speed: 2, number: 300, extinction: 4 };


setupStars();
updateStars();


output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
    starsParams.speed = this.value;
};


window.onresize = function() {
    setupStars();
};

        function Star() {
            this.x = Math.random() * stars.width;
            this.y = Math.random() * stars.height;
            this.z = Math.random() * stars.width;
            this.color = "white"; 
        
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
                starsCtx.fillStyle = this.color; 
                starsCtx.arc(x, y, rad, 0, Math.PI * 2);
                starsCtx.fill();
            }
        }
        


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
    var dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
  }
  
  window.onclick = function(event) {
    var dropdown = document.getElementById("myDropdown");
    var button = document.getElementsByClassName("dropbtn")[0];
  
    if (event.target !== button && !dropdown.contains(event.target)) {
      dropdown.classList.remove("show");
    }
  }



function getRandomColor() {
    const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'rebeccapurple', 'violet', 'black', 'pink'];
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

    window.requestAnimationFrame(() => updateStars(newColor)); 
}

button.addEventListener('click', () => {
    console.log("clicked");
    newColor = getRandomColor();
});

updateStars(newColor); 



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
            context.lineWidth = penRange.value;
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


const penRange = document.querySelector(".pen-range");
let draw_Width = penRange.value;


ctx.lineWidth = draw_Width;


function changeLineWidth() {
  draw_Width = penRange.value;
  ctx.lineWidth = draw_Width;
}


ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);