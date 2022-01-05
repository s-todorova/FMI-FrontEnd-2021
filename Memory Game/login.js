
//login:
const form = document.getElementById("form-login");
const email = document.getElementById("email-login");
const pass = document.getElementById("pass-login");

//----FROM VALIDATION------

function validateInputs() {
    const emailValue = email.value.trim();
    const passValue = pass.value.trim();
    
    if(invalidEmail(emailValue)) {
        showError(email, "Invalid email!");
    }
    else {
        showSuccess(email);
    }
    
    if(passValue.length < 3) {
        showError(pass, "Password can't be shorter than 3 symbols!");
    }
    else {
        showSuccess(pass);
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateInputs();
});

//helpers:

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
    const errorField = inputItem.querySelector('small');
    inputItem.classList.remove("error");
    inputItem.classList.add("success");
}