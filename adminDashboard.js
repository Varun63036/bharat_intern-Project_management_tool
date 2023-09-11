// JavaScript code here
// Get references to HTML elements
const submitButton = document.getElementById("submit_button");
const userNameInput = document.getElementById("userNameInput");
const projectNameInput = document.getElementById("projectNameInput");
const allTasksTableBody = document.getElementById("all_tasks");
const passwordInput = document.getElementById("password");
let serialNumber = 1;

function createStatusDropdown() {
  const dropdown = document.createElement("select");
  dropdown.className = "status-dropdown";
  dropdown.innerHTML = `
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    <option value="Canceled">Canceled</option>
  `;
  return dropdown;
}

submitButton.addEventListener("click", () => {
  const userName = userNameInput.value.trim();
  const password = passwordInput.value.trim();
  const projectName = projectNameInput.value.trim();
  // Get the selected user

  if (userName !== "") {
    const startTime = new Date();
    let endTime = "";

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${serialNumber}</td>
      <td>${userName}</td>
      <td>${password}</td>
      <td>${projectName}</td>
      <td class="action-column"></td>
      <td>Calculating...</td>
     
    `;
    allTasksTableBody.appendChild(newRow);

    const statusCell = newRow.getElementsByClassName("action-column")[0];
    const statusDropdown = createStatusDropdown();
    statusCell.appendChild(statusDropdown);

    serialNumber++;
    userNameInput.value = "";
    passwordInput.value = "";
    projectNameInput.value = "";

    // Function to update status and row background color
    const updateStatus = () => {
      const selectedStatus = statusDropdown.value;
      endTime = new Date(); // Get current time as end time
      newRow.getElementsByTagName("td")[4].textContent = selectedStatus;
      const duration = calculateDuration(startTime, endTime);
      newRow.getElementsByTagName("td")[5].textContent = duration;
      newRow.style.backgroundColor = getRowBackgroundColor(selectedStatus);
      statusDropdown.disabled = true;
    };

    statusDropdown.addEventListener("change", updateStatus);
  }
});

function calculateDuration(startTime, endTime) {
  const durationInMillis = endTime - startTime;
  const hours = Math.floor(durationInMillis / 3600000);
  const minutes = Math.floor((durationInMillis % 3600000) / 60000);
  const seconds = Math.floor((durationInMillis % 60000) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function getRowBackgroundColor(status) {
  if (status === "Completed") {
    return "#ADD8E6"; // Light Blue
  } else if (status === "Canceled") {
    return "#DC3545"; // Red
  } else if (status === "In Progress") {
    return "#FFFF99"; // Yellow
  }
}

allTasksTableBody.addEventListener("click", (event) => {
  const target = event.target;
  if (target && target.className === "update-button") {
    const row = target.closest("tr");
    if (row) {
      const statusCell = row.getElementsByClassName("action-column")[0];
      const statusDropdown = createStatusDropdown();
      statusCell.innerHTML = "";
      statusCell.appendChild(statusDropdown);
      target.disabled = true;
    }
  }
});
