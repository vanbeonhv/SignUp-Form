"user strict";

const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirm-password");
const form = document.querySelector("form");

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isEmptyError = true;
      showError(input, `${input.placeholder} is required`);
    } else {
      showSuccess(input);
    }
  });
  return isEmptyError;
}

function checkEmailError(email) {
  let isEmailError = false;
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email.value)) {
    showError(email, "Email is not valid");
    isEmailError = true;
  } else {
    showSuccess(email);
  }
  return isEmailError;
}

function checkUserNameLengthError(username, min, max) {
  let isUserNameLengthError = false;
  if (username.value.length < min) {
    showError(username, `Username must be at least ${min} characters`);
    isUserNameLengthError = true;
  } else if (username.value.length > max) {
    showError(username, `Username must be less than ${max} characters`);
    isUserNameLengthError = true;
  } else {
    showSuccess(username);
    isUserNameLengthError = false;
  }
  return isUserNameLengthError;
}

function checkPasswordLengthError(password, min, max) {
  let isPasswordLengthError = false;
  if (password.value.length < min) {
    showError(password, `Password must be at least ${min} characters`);
    isPasswordLengthError = true;
  } else if (password.value.length > max) {
    showError(password, `Password must be less than ${max} characters`);
    isPasswordLengthError = true;
  } else {
    showSuccess(password);
    isPasswordLengthError = false;
  }
  return isPasswordLengthError;
}

function checkPasswordMatch(password, confirmPassword) {
  let isPasswordMatch = false;
  if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "Password is not match");
    isPasswordMatch = true;
  } else {
    showSuccess(confirmPassword);
    isPasswordMatch = true;
  }
  return isPasswordMatch;
}
//Chưa thêm preventDefault cho form. Để xem code thế nào đã
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);
  if (!isEmptyError) {
    let isUserNameLengthError = checkUserNameLengthError(username, 6, 25);
    let isEmailError = checkEmailError(email);
    let isPasswordLengthError = checkPasswordLengthError(password, 8, 15);
    let isPasswordMatch = checkPasswordMatch(password, confirmPassword);
  }
});
