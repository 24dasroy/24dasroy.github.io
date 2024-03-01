//header comment
//declare variables
let colorPicker,
clearButton,
shapeSelector,
sizeSlider,
imageSelector,
loadImageButton,
settingsButton,
goBackButton,
saveImageButton; //declare all of the HTML controls
let controlsContainer; //this is an html section in the index.html file!
let sliderValue;  
let currentShape = "draw";
let images = [];
let currentImage;
let selectedImage; //currently selected image
let colorButtons = [];
let colorPickersControls = [];
let currentColor = '#000000'; //
let isSettingsVisible = false;



//create an array of objects with two fields, file and description 
//#0.1 enter the following array code into *AI* to have it explain it to you
//#0.2 Find 5 images for your theme and load them into the assets folder
let imageFiles = [
{ file: '/assets/one.jpg', 
description: 'stranded' },
{ file: '/assets/two.jpg', 
description: 'night-time roadtrip' },
{ file: '/assets/three.jpg', 
description: 'lost in a forest' },
{ file: '/assets/four.jpg', 
description: 'walking along the shore' },
{ file: '/assets/five.jpg', 
description: 'sinking' },
];

//preload images for asynchronous web
//#1.1 enter the following code into *AI* to explain it to you
function preload() {
for (let file of imageFiles){
images.push(loadImage(file.file)); //load each image
}
} //end function preload()

//initialize variables and setup program 
function setup() {
let canvas = createCanvas(450, 800);
let canvasContainer = select("#canvasContainer");
canvas.parent("canvasContainer");
let controlsContainer = select("#controlsContainer");
controlsContainer.style("display", "none"); // Hide controls initially
background(255);

//update the title in the index.html file from Processing!
let bannerDiv = select('#app-header');
bannerDiv.html('where i would go with a billion dollars'); //#2 Change to your themed title


createClearButton();
createSettingsButton();
createGoBackButton();
createSaveImageButton(); 


//create a color picker
colorPicker = createColorPicker("#0000"); //#3.1 Change the default color
colorPicker.parent(controlsContainer);

//create a clear button



//create a shape selector dropdown
//*** createSelect() ***//
shapeSelector = createSelect().parent(controlsContainer);
//add the dropdown options!
shapeSelector.option("draw");
shapeSelector.option("circle");
shapeSelector.option("square");
shapeSelector.option("triangle");
shapeSelector.option("diamond");

//create a size slider
sizeSlider = createSlider(1, 100, 5).parent(controlsContainer).id('sizeSlider');

//create a paragraph for slider value display
sliderValueDisplay = createSpan("size: " + sizeSlider.value()).parent(
controlsContainer
);
sliderValueDisplay.style("margin-top", "10px"); //add margin for spacing

//*** getting value from slider to label ***//
sizeSlider.input(() => {
sliderValueDisplay.html("size: " + sizeSlider.value());
});

//create an image selector dropdown
imageSelector = createSelect().parent(controlsContainer);
//populate image selector (assuming you have an array of image names)
//populate the selector with options using descriptions
imageFiles.forEach((file, index) => {
imageSelector.option(file.description, index.toString());
});

imageSelector.changed(onImageSelect); //event handler for selection
 // Create color pickers for controls container
    for (let i = 0; i < 5; i++) {
        let cp = createColorPicker("#000000"); // Default color
        cp.parent(select("#controlsContainer"));
        colorPickersControls.push(cp);
        cp.changed(() => {
            fill(colorPickersControls[i].color());
        });
    }

    // Create color buttons for settings container
    // Create color buttons for settings container
// Create color buttons for settings container
// Create color buttons for settings container
// Create color buttons for settings container
for (let i = 0; i < 5; i++) {
    let btn = createButton("");
    btn.class("colorButton");
    btn.parent(select("#colorbuttonsContainer"));
    colorButtons.push(btn);
    btn.mousePressed(() => {
        // Get the background color of the clicked button
        let buttonColor = color(colorButtons[i].style("background-color"));
        // Set the currentColor to the background color of the clicked button
        currentColor = buttonColor;
        // Set the value of the color picker to the selected color
        colorPicker.value(currentColor);
    });
}



    // Event listeners for color pickers in controls container
    for (let i = 0; i < 5; i++) {
        colorPickersControls[i].changed(() => {
            // Update color button background color in settings container
            colorButtons[i].style("background-color", colorPickersControls[i].value());
        });
    }


} //end function setup()

//use variables to have fun
function draw() {
  
if (mouseIsPressed) {
    fill(currentColor); // Use currentColor for fill
drawShape();
}
} //end function draw()

//draw the selected shape
//*** drawShape() ***//
function drawShape() {
    let size = sizeSlider.value();
    fill(currentColor); // Use currentColor instead of colorPicker.value()
    noStroke();

    //*** switch ***// 
    switch (shapeSelector.value()) {
        case "draw":
            stroke(currentColor); // Use currentColor instead of colorPicker.value()
            strokeWeight(size);
            line(pmouseX, pmouseY, mouseX, mouseY);
            break;
        case "circle":
            ellipse(mouseX, mouseY, size, size);
            break;
        case "square":
            rect(mouseX, mouseY, size, size);
            break;
        case "triangle":
            triangle(
                mouseX,
                mouseY,
                mouseX + size,
                mouseY,
                mouseX + size / 2,
                mouseY - size
            );
            break;
        case "diamond":
            quad(
                mouseX,
                mouseY - size / 2,
                mouseX + size / 2,
                mouseY,
                mouseX,
                mouseY + size / 2,
                mouseX - size / 2,
                mouseY
            );
            break;
    }
} //end function drawShape()

//clear the canvas
function clearCanvas() {
clear();
background(255);
} //end function clearCanvas()

//function to handle image selection - this function is mapped to the control
function onImageSelect() {
const selectedIndex = parseInt(imageSelector.value(), 10);
selectedImage = images[selectedIndex];
clearCanvas();

// Calculate the aspect ratio of the selected image
let aspectRatio = selectedImage.width / selectedImage.height;

// Calculate the width and height for displaying the image within the canvas
let displayWidth = width;
let displayHeight = width / aspectRatio;

// If the calculated height exceeds the canvas height, adjust the dimensions accordingly
if (displayHeight > height) {
displayWidth = height * aspectRatio;
displayHeight = height;
}

// Calculate the position to draw the image in the middle of the canvas
let x = (width - displayWidth) / 2;
let y = (height - displayHeight) / 2;

// Display the resized image maintaining aspect ratio at the calculated position
image(selectedImage, x, y, displayWidth, displayHeight);
}//end function onImageSelect()


// Function to toggle visibility of settings
function toggleSettings() {
isSettingsVisible = !isSettingsVisible;
if (isSettingsVisible) {
showSettings();

} else {
hideSettings();
}
}

// Function to show the settings screen
function showSettings() {
// Hide canvas
select("#canvasContainer").style("width", "450px"); // Adjust canvas width
select("#canvasContainer").hide();
// Show controls container
select("#controlsContainer").show();
// Hide settings button and show "Go Back" button
settingsButton.hide();
saveImageButton.hide();
clearButton.hide();
goBackButton.show();
}


// Function to hide the settings screen
function hideSettings() {
// Show canvas
select("#canvasContainer").style("width", "450px"); // Reset canvas width
select("#canvasContainer").show();
// Hide controls container
select("#controlsContainer").hide();
// Hide "Go Back" button and show settings button
goBackButton.hide();
settingsButton.show();
clearButton.show();
saveImageButton.show();
}

// Function to create the settings button
function createSettingsButton() {
settingsButton = createButton("Settings");
settingsButton.parent("settingsContainer"); // Append to settingsContainer
settingsButton.mousePressed(toggleSettings);
}

// Function to create the "Go Back" button
function createGoBackButton() {
goBackButton = createButton("Go Back");
goBackButton.parent("settingsContainer"); // Append to settingsContainer
goBackButton.hide(); // Initially hide the "Go Back" button
goBackButton.mousePressed(toggleSettings);
}

function createSaveImageButton() {
saveImageButton = createButton("Save Image");
saveImageButton.parent("settingsContainer"); // Append to settingsContainer
saveImageButton.mousePressed(saveImage);
}


function createClearButton() {
clearButton = createButton("Clear");

clearButton.parent("settingsContainer"); // Append to settingsContainer
clearButton.mousePressed(clearCanvas); //assign a function
}

// Function to save the canvas as an image
function saveImage() {
saveCanvas("myDrawing", "png"); // Save canvas as PNG file with filename "myDrawing"
}

