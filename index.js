const userForm = document.getElementById('user-form');
const tableEntries = document.getElementById('table');
const dobInput = document.getElementById('dob');
const emailInput = document.getElementById('email');

const retrieveEntries = () => {
    const storedEntries = localStorage.getItem('user-entries');
    return storedEntries ? JSON.parse(storedEntries) : [];
}

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableContent = entries.map(entry => {
        const cells = Object.values(entry).map(value => `<td>${value}</td>`).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    const table = `<tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>${tableContent}`;
    tableEntries.innerHTML = table;
}

const saveUserForm = event => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    const entry = { name, email, password, dob, acceptedTerms };

    const userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem('user-entries', JSON.stringify(userEntries));

    displayEntries();
}

const calculateAge = (today, birthDate) => {
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();

    if (monthsDiff < 0 || (monthsDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

dobInput.addEventListener('change', () => {
    const [year, month, date] = dobInput.value.split('-');
    const dob = new Date(year, month - 1, date);
    const today = new Date();
    const age = calculateAge(today, dob);

    if (age < 18 || age > 55) {
        dobInput.setCustomValidity('Your age is not between 18 and 55');
    } else {
        dobInput.setCustomValidity('');
    }
});

emailInput.addEventListener('input', () => validateEmail(emailInput));

function validateEmail(element) {
    if (element.validity.typeMismatch) {
        element.setCustomValidity('The email is not in the right format!');
        element.reportValidity();
    } else {
        element.setCustomValidity('');
    }
}

userForm.addEventListener('submit', saveUserForm);
displayEntries();
