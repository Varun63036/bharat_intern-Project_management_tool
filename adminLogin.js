const adminLoginForm = document.getElementById("adminLoginForm");
const adminUsernameInput = document.getElementById("username");
const adminPasswordInput = document.getElementById("password");

// Define admin credentials (replace with your actual admin username and password)
const adminCredentials = {
  username: "Varun",
  password: "admin@123"
};

// Event listener for form submission
adminLoginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const enteredUsername = adminUsernameInput.value.trim();
  const enteredPassword = adminPasswordInput.value.trim();

  // Check if entered credentials match admin credentials
  if (
    enteredUsername === adminCredentials.username &&
    enteredPassword === adminCredentials.password
  ) {
    window.location.href = "adminDashboard.html"; // Redirect to admin dashboard
  } else {
    alert("Invalid username or password. Please try again.");
  }
});
