//register:
const form = document.getElementById("form-register");
const username = document.getElementById("username-reg");
const email = document.getElementById("email-reg");
const pass = document.getElementById("pass-reg");
const confirmpass = document.getElementById("confirmpass-reg");

//----FROM VALIDATION------

function validateInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passValue = pass.value.trim();
    const confirmpassValue = confirmpass.value.trim();
    
    if(invalidUsername(usernameValue)) {
        showError(username, "Username can't contain special symbols!");
    }
    else {
        showSuccess(username);
    }

    if(invalidEmail(emailValue)) {
        showError(email, "Invalid email!");
    }
    else {
        showSuccess(email);
    }
    console.log(passValue.length);
    if(passValue.length < 3) {
        showError(pass, "Password can't be shorter than 3 symbols!");
    }
    else {
        showSuccess(pass);
    }
    
    if(passValue != confirmpassValue) {
        showError(confirmpass, "Passwords don't match!");
    }
    else {
        showSuccess(confirmpass);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateInputs();
});

//helpers:
const invalidUsername = (u) => {
    return (u.includes('@') || u.includes('!') || u.includes('#') || u.includes('&') || u.includes('^'));
};

const invalidEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return !(re.test(email));
};

function showError(inputField, message) {
    const inputItem = inputField.parentElement;
    const errorField = inputItem.querySelector('small');
    errorField.innerText = message;
    inputItem.classList.add("error");
}

function showSuccess(inputField) {
    const inputItem = inputField.parentElement;
    inputItem.classList.remove("error");
    inputItem.classList.add("success");
}