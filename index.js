function displayDetails() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var dob = document.getElementById("dob").value.trim();
  var acceptedTerms = document.getElementById("acceptedTerms").checked ? "Yes" : "No";

  // Validate email format
  if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Validate age
  if (!validateAge(dob)) {
      alert("Only users between 18 and 55 years old are allowed.");
      return;
  }

  var tableBody = document.getElementById("userDataBody");
  var newRow = tableBody.insertRow(tableBody.rows.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  cell1.textContent = name;
  cell2.textContent = email;
  cell3.textContent = password;
  cell4.textContent = dob;
  cell5.textContent = acceptedTerms;

  document.getElementById("displayTable").style.display = "table";
}

function validateEmail(email) {
  // Regular expression for a basic email format validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return age >= 18 && age <= 55;
}
