// Add your code here
const form = document.getElementById("user-form");
const modal = new bootstrap.Modal(document.getElementById("resultModal"));
const modalBody = document.getElementById("modalBody");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const statusSelect = document.getElementById("status");
const commentsArea = document.getElementById("comments");


form.addEventListener("submit", (e) => {
  // Prevents the page from reloading once user clicks submit
  e.preventDefault();

  // Collect form values, the default will be an empty string
  const name = nameInput.value.trim() || "";
  const email = emailInput.value.trim() || "";
  const status = statusSelect.value || "";
  const comments = commentsArea.value.trim() || "";
  
  // check which courses were checked
  let courses = "";
  const checkboxes = document.querySelectorAll(".form-check-input");
  checkboxes.forEach(function (box) {
    if (box.checked) {
      // Separate multiple courses with " | "
      if (courses !== "") {
        courses += " | ";
      }
      courses += box.value;
    }
  });

  // If no courses selected, display "No courses"
  if (courses === "") {
    courses = "No courses";
  }

  // The model body content
  modalBody.innerHTML = `
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Status:</b> ${status}</p>
    <p><b>Courses:</b> ${courses}</p>
    <p><b>Comments:</b> ${comments}</p>
  `;

  modal.show();
});
