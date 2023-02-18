// Get the canvas element and context
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Default values
var text1 = '';
var text2 = '';
var fontSize = '24';
var fontStyle = 'Arial';
var fontColor = '#FFFFFF';

var img = new Image();
const imageUpload = document.getElementById('image-upload');
imageUpload.addEventListener('change', function() {
	const file = this.files[0];
	const reader = new FileReader();

	reader.addEventListener('load', function() {
		ctx.clearRect(0, 0, 400, 400);
		img.src = reader.result;
	});

	reader.readAsDataURL(file);
});

// Function to calculate the new dimensions of the image based on the canvas size and aspect ratio
function calculateImageDimensions() {
  const aspectRatio = img.width / img.height;
  let newWidth = canvas.width;
  let newHeight = canvas.height;
  if (aspectRatio > 1) {
    newHeight = canvas.width / aspectRatio;
  } else {
    newWidth = canvas.height * aspectRatio;
  }
  return [newWidth, newHeight];
}

// Function to draw the image with text properties
function drawImageWithText() {
  ctx.clearRect(0, 0, 400, 400);
  const [newWidth, newHeight] = calculateImageDimensions();
  ctx.drawImage(img, 0, 0, newWidth, newHeight);
  ctx.font = `${fontSize}px ${fontStyle}`;
  ctx.fillStyle = fontColor;
  // center text1 horizontally and vertically
  const text1Width = ctx.measureText(text1).width;
  const text1X = (newWidth - text1Width) / 2;
  const text1Y = (newHeight - fontSize * 2) / 4;
  ctx.fillText(text1, text1X, text1Y);
  // center text2 horizontally and vertically
  const text2Width = ctx.measureText(text2).width;
  const text2X = (newWidth - text2Width) / 2;
  const text2Y = newHeight - (canvas.height - fontSize * 2) / 8;
  ctx.fillText(text2, text2X, text2Y);
}

// Load the image and draw it on the canvas
img.onload = function() {
  drawImageWithText();
};

// Function to redraw the image with the updated text properties
function drawImage() {
  drawImageWithText();
}


// Handle the text inputs and controls
var textInput1 = document.getElementById('text-input-1');
textInput1.addEventListener('input', function() {
	text1 = textInput1.value;
	drawImage();
});

var textInput2 = document.getElementById('text-input-2');
textInput2.addEventListener('input', function() {
	text2 = textInput2.value;
	drawImage();
});

var _fontStyle = document.getElementById('text-font');
_fontStyle.addEventListener('input', function () {
	fontStyle = _fontStyle.value;
	drawImage();
});

var _fontSize = document.getElementById('text-size');
_fontSize.addEventListener('input', function () {
	fontSize = _fontSize.value;
	drawImage();
});

var _fontColor = document.getElementById('text-color');
_fontColor.addEventListener('input', function () {
	fontColor = _fontColor.value;
	drawImage();
});

// Function to download the edited image
function download(dataURL, filename) {
  var link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  link.click();
}

// Add a download button to save the edited image
var downloadButton = document.getElementById('download-button');
downloadButton.addEventListener('click', function() {
  var dataURL = canvas.toDataURL();
  download(dataURL, 'new-meme.png');
});
