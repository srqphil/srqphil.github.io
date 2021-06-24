//declare variables
var canvas = document.querySelector('.canvas');
var slider = document.querySelector('.slider');
var rainbow = document.querySelector('#rainbow');
var eraser = document.querySelector('#eraser');
var clear = document.querySelector('#clear');
var input = document.querySelector('#inputColor');
var sliderLabel = document.querySelector('#sliderLabel');


function createGrid() {
    //remove existing divs if present
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
    }
    //define grid
    var gridSideLength = slider.value;
    var gridArea = gridSideLength ** 2;
    canvas.style.gridTemplateColumns = `repeat(${gridSideLength},1fr)`
    canvas.style.gridTemplateRows = `repeat(${gridSideLength},1fr)`
    //fill grid with divs
    for (i = 0; i < gridArea; i++){
        const pixel = document.createElement('div');
        pixel.classList.add('pixel')
        pixel.setAttribute( 'id' , i );
        canvas.appendChild(pixel); 
    }

    draw(input.value);
}

//Draw function
function draw(color) {
    var nodelist = document.querySelectorAll('.pixel')
    if (color === 'rainbow') {
        nodelist.forEach(element => {
            element.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = `#${makeRainbow()}`;
            })
        })
    }
    nodelist.forEach(element => {
        element.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = color;
        })
    })
}  
function inputColor() {
    draw(input.value);
}

//Make Random Colors
function makeRainbow() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

//Eraser function
function erase() {
    draw('#fff');
}

//Clear button
function clearGrid() {
    var nodelist = document.querySelectorAll('.pixel');
    nodelist.forEach(element => element.style.backgroundColor = 'white');
}

//Call main function
createGrid();
draw('#333');

//Event Listeners
slider.addEventListener('mouseup', createGrid);
slider.addEventListener('input', (e) => sliderLabel.textContent = slider.value +'x'+ slider.value);
eraser.addEventListener('click', erase);
clear.addEventListener('click', clearGrid);
rainbow.addEventListener('click', (e) => e = draw('rainbow'))
input.addEventListener('input', inputColor)
