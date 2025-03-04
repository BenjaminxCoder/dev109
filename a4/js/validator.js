/*
Form Validation Script
This script validates user inputs in a form before submission.
*/
function isValid(event) {
    let valid = true;
    document.getElementById("submiterror").innerHTML = "";

    // Call each validation function
    valid &= firstName();
    valid &= lastName();
    valid &= email();
    valid &= phone();
    valid &= username();
    valid &= password();
    valid &= address();
    valid &= city();
    valid &= state();
    valid &= country();
    valid &= zipcode();

    // If validation fails, prevent form submission
    if (!valid) {
        event.preventDefault();
        document.getElementById("submiterror").innerHTML = "<p><strong>Error Submitting — See Above</strong></p>";
        return false;
    }

    // If validation passes, allow normal form submission
    return true;
}

// Attach event listener to form submission
document.getElementById("myform").addEventListener("submit", function(event) {
    if (!isValid(event)) {
        event.preventDefault();
    }
});

document.getElementById("FirstName").addEventListener("blur", firstName);
document.getElementById("LastName").addEventListener("blur", lastName);
document.getElementById("email").addEventListener("blur", email);
document.getElementById("phone").addEventListener("blur", phone);
document.getElementById("username").addEventListener("blur", username);
document.getElementById("password").addEventListener("blur", password);
document.getElementById("address").addEventListener("blur", address);
document.getElementById("city").addEventListener("blur", city);
document.getElementById("state").addEventListener("blur", state);
document.getElementById("country").addEventListener("change", country);
document.getElementById("zipcode").addEventListener("blur", zipcode);

/* 
Validate First Name
Validate Last Name
Validate Email
Validate Phone
Validate Username
Validate Password
Validate Address
Validate Country
Validate Zipcode
*/
function firstName() {
    let firstname = document.getElementById("FirstName").value;
    let errorDiv = document.getElementById("fname");
    errorDiv.innerHTML = "";
    
    if (!firstname || firstname.length > 20 || !/^[a-zA-Z]+$/.test(firstname)) {
        errorDiv.innerHTML = "<p class='error'>First name is required and must be only letters, max 20 chars</p>";
        return false;
    }
    return true;
}

function lastName() {
    let lastname = document.getElementById("LastName").value;
    let errorDiv = document.getElementById("lname");
    errorDiv.innerHTML = "";
    
    if (!lastname || lastname.length > 20 || !/^[a-zA-Z]+$/.test(lastname)) {
        errorDiv.innerHTML = "<p class='error'>Last name is required and must be only letters, max 20 chars</p>";
        return false;
    }
    return true;
}

function email() {
    let email = document.getElementById("email").value;
    let errorDiv = document.getElementById("emailerror");
    errorDiv.innerHTML = "";
    
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        errorDiv.innerHTML = "<p class='error'>Invalid email format</p>";
        return false;
    }
    return true;
}

function phone() {
    let phone = document.getElementById("phone").value;
    let errorDiv = document.getElementById("phoneerror");
    errorDiv.innerHTML = "";
    
    if (!/^[0-9-]{10,15}$/.test(phone)) {
        errorDiv.innerHTML = "<p class='error'>Invalid phone number (only numbers and dashes, max 15 chars)</p>";
        return false;
    }
    return true;
}

function username() {
    let username = document.getElementById("username").value;
    let errorDiv = document.getElementById("usernameerror");
    errorDiv.innerHTML = "";
    
    if (!username || username.length > 12) {
        errorDiv.innerHTML = "<p class='error'>Username is required, max 12 characters</p>";
        return false;
    }
    return true;
}

function password() {
    let password = document.getElementById("password").value;
    let errorDiv = document.getElementById("passworderror");
    errorDiv.innerHTML = "";
    
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/)) {
        errorDiv.innerHTML = "<p class='error'>Password must be 7 chars long, include 1 uppercase, 1 lowercase, 1 number, 1 special character</p>";
        return false;
    }
    return true;
}

function address() {
    let address = document.getElementById("address").value;
    let errorDiv = document.getElementById("addresserror");
    errorDiv.innerHTML = "";
    
    if (!address || address.length < 5 || address.length > 100) {
        errorDiv.innerHTML = "<p class='error'>Address is required (5-100 characters)</p>";
        return false;
    }
    return true;
}

function country() {
    let country = document.getElementById("country").value;
    if (country === "USA") {
        document.getElementById("zipcode").disabled = false;
    } else {
        document.getElementById("zipcode").disabled = true;
    }
    return true;
}

function zipcode() {
    let zipcode = document.getElementById("zipcode").value;
    let errorDiv = document.getElementById("ziperror");
    errorDiv.innerHTML = "";
    
    if (document.getElementById("country").value === "USA" && !/^[0-9]{5}$/.test(zipcode)) {
        errorDiv.innerHTML = "<p class='error'>Zip code must be 5 digits</p>";
        return false;
    }
    return true;
}