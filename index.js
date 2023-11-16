function displayDetails() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var dob = document.getElementById("dob").value.trim();
  var acceptedTerms = document.getElementById("acceptedTerms").checked ? "Yes" : "No";

  if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
  }

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

  saveEntryToStorage(name, email, password, dob, acceptedTerms);
}

function saveEntryToStorage(name, email, password, dob, acceptedTerms) {
  var entry = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      acceptedTerms: acceptedTerms
  };

  var entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  entries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(entries));
}

function validateEmail(email) {
  // i found this regex on stackoverflow
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

function loadEntriesFromStorage() {
  var entries = JSON.parse(localStorage.getItem("userEntries")) || [];
  var tableBody = document.getElementById("userDataBody");

  entries.forEach(function (entry) {
      var newRow = tableBody.insertRow(tableBody.rows.length);
      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);
      var cell5 = newRow.insertCell(4);

      cell1.textContent = entry.name;
      cell2.textContent = entry.email;
      cell3.textContent = entry.password;
      cell4.textContent = entry.dob;
      cell5.textContent = entry.acceptedTerms;
  });
}

loadEntriesFromStorage();
