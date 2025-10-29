// Add your code here
const input = document.getElementById("userInput");
const textDiv = document.getElementById("textContainer");

// When the user presses Enter, run the highlight function
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const word = input.value.trim();
    if (word === "") return;

    // Remove old highlights
    const text = textDiv.textContent;

    // Highlight all matches of the word (case-insensitive)
    const result = text.replace(
      new RegExp(word, "gi"),
      `<span style="background-color: yellow;">$&</span>`
    );

    textDiv.innerHTML = result;
  }
});
