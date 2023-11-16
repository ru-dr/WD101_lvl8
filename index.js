function displayDetails() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dob = document.getElementById("dob").value;
  var acceptedTerms = document.getElementById("acceptedTerms").checked
    ? "Yes"
    : "No";

  var tableBody = document.getElementById("userDataBody");
  var newRow = tableBody.insertRow(tableBody.rows.length);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  cell1.innerHTML = name;
  cell2.innerHTML = email;
  cell3.innerHTML = password;
  cell4.innerHTML = dob;
  cell5.innerHTML = acceptedTerms;

  document.getElementById("displayTable").style.display = "table";
}
