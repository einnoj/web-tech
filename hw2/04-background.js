// Add your code here

const button = document.getElementById("toggle");
const input = document.getElementById("interval");

// initial background color, without it it's just white which hurts my eyes
document.body.style.backgroundColor = "rgb(55, 55, 55, 0.4)";

let timer = null;

// Generates a random color, darker colors to be easier on the eyes
function randomColor() {
  const r = Math.floor(Math.random() * 100);
  const g = Math.floor(Math.random() * 100);
  const b = Math.floor(Math.random() * 100);
  return `rgb(${r}, ${g}, ${b}, 0.4)`;
}

// Starts the background color changing
function start() {
  const seconds = Number(input.value);
  if (seconds <= 0) return;

  input.disabled = true;
  button.value = "Stop"; 
  button.className = "btn btn-danger";

  timer = setInterval(() => {
    const color = randomColor();
    document.body.style.backgroundColor = color;

  }, seconds * 1000);
}

// Stops the background color changing
function stop() {
  clearInterval(timer);
  timer = null;

  input.disabled = false;
  button.value = "Start";
  button.className = "btn btn-primary";
}

// Toggle button click event
button.addEventListener("click", function () {
  if (timer) {
    stop();
  } else {
    start();
  }
});

