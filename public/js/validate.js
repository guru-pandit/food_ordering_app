// Accessing the elements
let fName = document.getElementById("fname");
let lName = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");
let cPassword = document.getElementById("cpassword");


// Changing the border and label when error
function borderColor(element, isError) {
    let parentElem = element.parentNode;

    // console.log(element)
    // console.log(parentElem)

    if (isError) {
        parentElem.classList.remove("valid");
        parentElem.classList.add("error");
    } else {
        parentElem.classList.remove("error");
        parentElem.classList.add("valid");
    }
}

// Validation for key up
function validate(e) {
    let element = e.target;

    if (element.name === "fname") {
        // Checking the Name
        let fNamePattern = /^[a-zA-Z ]+$/;
        let isfNameValid = fNamePattern.test(element.value);

        borderColor(element, !isfNameValid);
    } else if (element.name === "lname") {
        // Checking the Name
        let lNamePattern = /^[a-zA-Z ]+$/;
        let islNameValid = lNamePattern.test(element.value);

        borderColor(element, !islNameValid);
    }
    else if (element.name === "email") {
        // Checking the Email
        let emailPattern =
            /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
        let isEmailValid = emailPattern.test(element.value);

        borderColor(element, !isEmailValid);
    } else if (element.name === "password") {
        // Checking the password
        // Checking password for Min 1 uppercase letter, Min 1 lowercase letter, Min 1 special character, Min 1 Number, and 8 - 30 characters
        let passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/;
        let isPasswordValid = passwordPattern.test(element.value);

        borderColor(element, !isPasswordValid);
    } else if (element.name === "cpassword") {
        // Checking the Confirm Password
        let isConfirmPasswordValid = element.value === password.value;

        borderColor(element, !isConfirmPasswordValid);
    }
}
