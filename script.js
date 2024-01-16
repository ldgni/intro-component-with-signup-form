// Get DOM elements
const trialForm = document.getElementById("trial-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Create a regular expression to validate the email address
const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to create an error message
function createErrorMessage(inputField, message) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("input__error-message");
  errorMessage.textContent = message;
  errorMessage.setAttribute("id", "error-message");
  errorMessage.setAttribute("role", "alert");
  inputField.insertAdjacentElement("afterend", errorMessage);
}

// Function to validate an input field
function validateInput(inputField, errorMessageText) {
  if (inputField.value === "") {
    inputField.classList.add("trial__input--error");
    inputField.setAttribute("aria-invalid", "true");
    inputField.setAttribute("aria-describedby", "error-message");
    createErrorMessage(inputField, errorMessageText);
  } else {
    inputField.classList.remove("trial__input--error");
    inputField.removeAttribute("aria-invalid");
    inputField.removeAttribute("aria-describedby");
  }
}

// Function to validate email
function validateEmail() {
  if (email.value !== "" && !emailValidationRegex.test(email.value)) {
    createErrorMessage(email, "Looks like this is not an email");
    email.classList.add("trial__input--error");
    email.setAttribute("aria-invalid", "true");
    email.setAttribute("aria-describedby", "error-message");
  } else if (email.value !== "" && emailValidationRegex.test(email.value)) {
    email.classList.remove("trial__input--error");
    email.removeAttribute("aria-invalid");
    email.removeAttribute("aria-describedby");
  }
}

trialForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Remove all existing error messages
  const errorMessages = document.querySelectorAll(".input__error-message");
  errorMessages.forEach((message) => message.remove());

  // Validate each input field
  validateInput(firstName, "First name cannot be empty");
  validateInput(lastName, "Last name cannot be empty");
  validateInput(email, "Email cannot be empty");
  validateInput(password, "Password cannot be empty");

  // Additional validation for email
  validateEmail();

  // If all inputs are valid, clear the form
  if (
    firstName.value !== "" &&
    lastName.value !== "" &&
    email.value !== "" &&
    emailValidationRegex.test(email.value) &&
    password.value !== ""
  ) {
    trialForm.reset();
  }
});
