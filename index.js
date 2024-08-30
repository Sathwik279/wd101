let userForm = document.getElementById("user-form");//accessing the form element from html


//retrieve data from local storage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);//if it is there in ls as a string parse it into an object
    } else {
        entries = []; //if not there return an empty array
    }
    return entries;
};


//this displays the data in the table after accessing from local storage
const displayEntries = () => {
    const entries = retrieveEntries();//returns a parsed object
    // (console.logentries);

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
        // console.log(`entry.acceptedTermsAndconditions is ${entry.acceptedTermsAndconditions}`)
        const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    //th means table header or column name
    const table = `<table class="table-auto w-full">
        <tr>
            <th class="px-4 py-2">Name</th> 
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">Dob</th>
            <th class="px-4 py-2">Accepted terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
};


const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
    console.log(`acceptedTermsAndconditions${acceptedTermsAndconditions}`)

    const currentDate = new Date();
    const userDob = new Date(dob);
    const age = currentDate.getFullYear() - userDob.getFullYear();

    if (age < 18 || age > 55) {
        alert("Please enter a valid date of birth between 18 and 55 years");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };

    const entries = retrieveEntries();
    entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(entries));

    displayEntries();
};


userForm.addEventListener("submit", saveUserForm);


displayEntries();
