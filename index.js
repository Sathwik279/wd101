let userForm = document.getElementById("user-form");
const retrieveEntries = ()=>{
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }
    else{
        entries = [];
    }
    return entries;
}
let userEntries = retrieveEntries();

const displayEntries = ()=>{
    const entries = retrieveEntries();


   const tableEntries  =  entries.map((entry)=>{
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`
        
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell}  ${acceptTermsCell}`

        return row;
    }).join("\n")

    const table = `<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
    <th class="px-4 py-2">Email</th>
    <th class="px-4 py-2">Password</th>
    <th class="px-4 py-2">dob</th>
    <th class="px-4 py-2">Accepted terms?</th>
    </tr>${tableEntries}</table>`

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
userEntries = []
const saveUserForm = (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").value;

    const dob = document.getElementById("dob").value;
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
    }
    userEntries.push(entry);
    let existingEntries = localStorage.getItem("user-entries");
    if (existingEntries) {
        existingEntries = JSON.parse(existingEntries);
        existingEntries.push(...userEntries);
        localStorage.setItem("user-entries", JSON.stringify(existingEntries));
    } else {
        localStorage.setItem("user-entries", JSON.stringify(userEntries));
    }
    displayEntries();
    
}
userForm.addEventListener("submit",saveUserForm);
displayEntries();