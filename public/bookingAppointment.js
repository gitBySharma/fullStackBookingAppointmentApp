const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('email');
const phoneInput = document.getElementById('phNumber');

//backend server URL
const serverURL = "http://localhost:3000/";

//event handling when clicked on submit button
const submitBtn = document.getElementById('btn');
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const userDetails = {
        userName: userNameInput.value,
        emailId: userEmailInput.value,
        phoneNumber: phoneInput.value
    };

    axios.post(serverURL, userDetails)
        .then((result) => {
            console.log(result);
            displayDetailsOnDashboard(result.data.newUserData);
        }).catch((err) => {
            console.log(err);
        });

    //clearing the input fields
    userNameInput.value = "";
    userEmailInput.value = "";
    phoneInput.value = "";
});

//function to display details on dashboard on page reload
window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:3000/")
        .then((result) => {
            console.log(result);
            if (result.data.allUsers) {
                result.data.allUsers.forEach(user => {
                    displayDetailsOnDashboard(user);
                });
            }
        }).catch((err) => {
            console.log(err);
        });
})

//function to display details on Dashboard
function displayDetailsOnDashboard(userDetails) {

    const li = document.createElement("li");
    li.appendChild(
        document.createTextNode(
            `${userDetails.userName} - ${userDetails.emailId} - ${userDetails.phoneNumber}  `
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    li.appendChild(deleteBtn);
    deleteBtn.className = "btn btn-outline-danger btn-sm rounded dynamic-button";  //used bootstrap for design

    li.appendChild(document.createTextNode(`  `));

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.className = "btn btn-outline-warning btn-sm rounded dynamic-button";  //used bootstrap for design

    const ul = document.getElementById("list");
    ul.appendChild(li);

    //delete button functionality
    deleteBtn.addEventListener("click", (event) => {
        axios.delete(`${serverURL}${userDetails.id}`)
            .then((result) => {
                ul.removeChild(event.target.parentElement);
            }).catch((err) => {
                console.error(err);
            });
    })

    //edit button functionality
    editBtn.addEventListener("click", (event) => {
        const editID = userDetails.id;
        ul.removeChild(event.target.parentElement);
        userNameInput.value = userDetails.userName;
        userEmailInput.value = userDetails.emailId;
        phoneInput.value = userDetails.phoneNumber;

        //creating a save button to save the edited data to the database
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.className = "btn btn-success font-weight-bold";  //used bootstrap
        const outerForm = document.getElementById("outerForm");
        outerForm.appendChild(saveBtn);

        //save button functionality
        saveBtn.addEventListener("click", (event) => {
            axios.put(`${serverURL}${editID}`, {
                userName: userNameInput.value,
                emailId: userEmailInput.value,
                phoneNumber: phoneInput.value
            }).then((result) => {
                console.log(result);
                outerForm.removeChild(saveBtn);
                displayUpdatedDetailsOnDashboard(result.data.updatedUserData);
            }).catch((error) => {
                console.log(error);
            })
                
        });
    })
}//function to call when any details update is needed
function displayUpdatedDetailsOnDashboard(userDetails){
    displayDetailsOnDashboard(userDetails);
}