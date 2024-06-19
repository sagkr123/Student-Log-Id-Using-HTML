function registerUser(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var gender = document.getElementById("gender").value;

    if (localStorage.getItem(email)) {
        alert("This email is already registered. Please login.");
        return;
    }

    // Check password strength
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and include a number, a lowercase letter, an uppercase letter, and a special character.");
        return;
    }

    var user = {
        email: email,
        password: password,
        gender: gender
    };

    localStorage.setItem(email, JSON.stringify(user));
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
}

function loginUser(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    var storedUser = localStorage.getItem(email);
    if (!storedUser) {
        alert("This email is not registered. Please register first.");
        return;
    }

    var user = JSON.parse(storedUser);
    if (user.password === password) {
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        alert("Incorrect password. Please try again.");
    }
}
