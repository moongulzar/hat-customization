// Get elements from the DOM
const color = document.querySelector(".color");
const colorInput = document.querySelector(".color-input");
const textInput = document.querySelector(".text-input");
const fontSizeInput = document.querySelector(".font-size-input");
const fontColorInput = document.querySelector(".font-color-input");
const fontFaceInput = document.querySelector(".font-face-input");
const addTextBtn = document.querySelector(".add-text-btn");
const clipartInput = document.querySelector(".clipart-input");
const clearBtn = document.querySelector(".clear-btn");
const textOverlay = document.querySelector(".text-overlay");
const clipartOverlay = document.querySelector(".clipart-overlay");

// Change hat color
colorInput.addEventListener("input", () => {
  color.style.backgroundColor = colorInput.value;
});

// Add draggable and adjustable text
addTextBtn.addEventListener("click", () => {
  const text = textInput.value;
  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;
  const fontFace = fontFaceInput.value;

  if (text) {
    const textElement = document.createElement("div");
    textElement.textContent = text;
    textElement.style.color = fontColor;
    textElement.style.fontSize = `${fontSize}px`;
    textElement.style.fontFamily = fontFace;
    textElement.style.position = "absolute";
    textElement.style.top = "50%";
    textElement.style.left = "50%";
    textElement.style.transform = "translate(-50%, -50%)";
    textElement.style.cursor = "move";
    textElement.classList.add("draggable");
    textOverlay.appendChild(textElement);

    makeDraggable(textElement);
  }
});

// Add draggable and resizable clipart
clipartInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.style.width = "100px";
      img.style.position = "absolute";
      img.style.top = "50%";
      img.style.left = "50%";
      img.style.transform = "translate(-50%, -50%)";
      img.style.cursor = "move";
      img.classList.add("draggable", "clipart");
      clipartOverlay.appendChild(img);

      makeDraggable(img);
    };
    reader.readAsDataURL(file);
  }
});

// Clear all customizations
clearBtn.addEventListener("click", () => {
  textOverlay.innerHTML = "";
  clipartOverlay.innerHTML = "";
  color.style.backgroundColor = "#ff0000"; // Reset to default color
});

// Make elements draggable
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "move";
  });
}
