// Get the DOM elements
const trialForm = document.getElementById("trial-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Define the email regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Define an array of inputs
const inputs = [firstName, lastName, email, password];

// Function to create an error message
function createErrorMessage(input, message) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-msg");
  errorMessage.innerText = message;
  input.after(errorMessage);
  input.classList.add("error");
}

// Function to remove an error message
function removeErrorMessage(input) {
  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains("error-msg")
  ) {
    input.nextElementSibling.remove();
  }
  input.classList.remove("error");
}

// Add event listener to the form
trialForm.addEventListener("submit", function (e) {
  e.preventDefault();

  for (let input of inputs) {
    // Remove the existing error message if any
    removeErrorMessage(input);

    // Check if the input is empty or if it's the email input and not valid
    if (input.value.trim() === "") {
      createErrorMessage(input, `${input.placeholder} cannot be empty`);
    } else if (input === email && !emailRegex.test(email.value.trim())) {
      createErrorMessage(input, `Looks like this is not an email`);
    }
  }

  // Check if any input fields have the error class
  let hasError = inputs.some((input) => input.classList.contains("error"));

  // If no input fields have the error class, clear all input fields
  if (!hasError) {
    inputs.forEach((input) => (input.value = ""));
  }
});
