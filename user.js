function User (email, password) {
    this.email = email;
    this.password = password;
  }

const form = document.getElementById("registerForm");

form.addEventListener("submit", register);

function register(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const newUser = new User(email, password);

  console.log(newUser);
}

