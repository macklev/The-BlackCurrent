function User (email, password) {
    this.email = email;
    this.password = password;
  }

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", login);

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(`Logging in with email: ${email} and password: ${password}`);
}

