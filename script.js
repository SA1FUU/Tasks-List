let mainContainer = document.querySelector('.main-container')
let inputValue = document.querySelector('input')
let addButton = document.querySelector('button')
let listContainer = document.querySelector('.task-list-container')
let userInfo = document.getElementById('users-information')
let alertPopupBox = document.querySelector('.alert-popup-box')
let universalAlert = document.querySelector('.alert-popup')

// Function to Remove Snack Notification

function removeUniversalAlert() {
    setTimeout(() => {
        alertPopupBox.style.visibility = "hidden"
        universalAlert.innerText = ""
    }, 1800);
}

// Event Listener Function to Add Task

addButton.addEventListener('click', (e) => [
    e.preventDefault(),
    addTask()
])

// Validation for The Input Task 

function addTask() {
    if (inputValue.value === "") {
        universalAlert.innerHTML = universalAlert.innerHTML + " Please Enter a Task "
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
    else {
        let li = document.createElement("li")
        li.innerText = `- ${inputValue.value}`
        listContainer.appendChild(li)

        let div = document.createElement('div')
        div.classList.add("actions")
        li.appendChild(div)

        let i = document.createElement("i")
        i.classList.add("fa-solid")
        i.classList.add("fa-trash")

        li.appendChild(i)

        universalAlert.innerHTML = universalAlert.innerHTML + " One Task Added  "
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
    saveData()
    inputValue.value = ""
}

// Adding Event Listener on Task List

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        e.target.parentElement.remove()
        saveData()
        universalAlert.innerHTML = universalAlert.innerHTML + " One Task Deleted "
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked")
        saveData()
        universalAlert.innerHTML = universalAlert.innerHTML + " One Task Completed "
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
}, false)

// Function to Save Data on Local Storage

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data")
}
showData()


// Function to Trigger Add Button on Enter Click

inputValue.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
    }
});

//  For Profile Thing

let profileButton = document.querySelector('#profile-button')
let profileDiv = document.querySelector('.profile-container')
let submitButton = document.getElementById('save-btn')
let errorMessage = document.querySelector('.error-message')

profileButton.addEventListener("click", () => {
    addProfileDiv()
})

function addProfileDiv() {
    profileDiv.style.visibility = "visible"
    mainContainer.style.filter = "blur(5px)"
    notiInfoContainer.style.visibility = "hidden"
}

let closeProfileButton = document.querySelector("#close-profile-btn")

closeProfileButton.addEventListener("click", () => {
    profileDiv.style.visibility = "hidden",
    mainContainer.style.filter = "blur(0)"
    errorMessage.innerText = ""
})


submitButton.addEventListener("click", () => {
    createProfile()
})

function createProfile() {
    if (document.getElementById('name').value === "" && document.getElementById('gender').value === "none") {
        errorMessage.innerText = "Fill the Required Details"
        saveProfileData()
    }
    else if (document.getElementById('name').value === "") {
        errorMessage.innerText = "Enter the Username"
        saveProfileData()
    }
    else if (document.getElementById('name').value.length > 10) {
        errorMessage.innerText = "Username Should be Less than 10 Chars"
        saveProfileData()
    }
    else if (document.getElementById('gender').value === "none") {
        errorMessage.innerText = "Select Your Gender"
        saveProfileData()
    }
    else if (document.getElementById('gender').value === "male") {
        userInfo.innerText = `Hey, Mr. ${document.getElementById('name').value}`
        profileDiv.style.visibility = "hidden",
            mainContainer.style.filter = "blur(0)"
        userInfo.style.backgroundImage = "linear-gradient(25deg, blueviolet, rgb(49, 186, 186))"
        errorMessage.innerText = ""
        saveProfileData()
        universalAlert.innerHTML = universalAlert.innerHTML + " Profile Updated Successfully "
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
    else if (document.getElementById('gender').value === "female") {
        userInfo.innerText = `Hey, Ms. ${document.getElementById('name').value}`
        profileDiv.style.visibility = "hidden",
            mainContainer.style.filter = "blur(0)"
        userInfo.style.backgroundImage = "linear-gradient(25deg, blueviolet, rgb(49, 186, 186))"
        errorMessage.innerText = ""
        saveProfileData()
        universalAlert.innerHTML = universalAlert.innerHTML + "Profile Updated Successfully"
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
    document.getElementById('name').value === ""
    document.getElementById('gender').value === "none"
    saveProfileData()
}


let deletProfileButton = document.getElementById("delete-btn")

deletProfileButton.addEventListener("click", () => {
    profileDiv.style.visibility = "hidden",
        mainContainer.style.filter = "blur(0)"
    userInfo.style.backgroundImage = "none"
    userInfo.innerText = ""
    errorMessage.innerText = ""
    saveProfileData()
    universalAlert.innerHTML = universalAlert.innerHTML + " Profile Deleted Successfully "
    alertPopupBox.style.visibility = "visible"
    removeUniversalAlert()
})

// Trigger Save Profile Button on Clicking Enter while on Gender Div

document.querySelector(".gender-div").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
    }
});


// Function to Save Profile Data

function saveProfileData() {
    localStorage.setItem("user-data", userInfo.innerText)
}

function showProfileData() {
    userInfo.innerText = localStorage.getItem("user-data")
}
showProfileData()



// Notification Scenes

let closeAlertBoxBtn = document.getElementById('close-alertbox-btn')
let mainAlertBtn = document.getElementById('main-alert-btn')
let sendNotiButton = document.querySelector('#send-noti-btn')
let notiInfoContainer = document.querySelector('.noti-info-container')
let errorInNotification = document.getElementById('error-in-noti')


mainAlertBtn.addEventListener("click", () => {
    notiInfoContainer.style.visibility = "visible"
    profileDiv.style.visibility = "hidden",
        mainContainer.style.filter = "blur(10px)"

        requestPerms()
})

closeAlertBoxBtn.addEventListener("click", () => {
    notiInfoContainer.style.visibility = "hidden"
    mainContainer.style.filter = "blur(0)"
    errorInNotification.innerText = ""
})


sendNotiButton.addEventListener("click", () => {
    let minutes = parseFloat(document.querySelector("#minutes-delay").value)
    let exactDelay = minutes * 60 * 1000

    // Check if the input is a valid number

    if (isNaN(minutes) || minutes <= 0) {
        errorInNotification.innerText = "Enter a Valid / Positive Time Duration"
        return;
    }
    else {
        setTimeout(() => {
            sendNotification()
        }, exactDelay);

        universalAlert.innerHTML = universalAlert.innerHTML + ` You Will be Notified After ${minutes} Minutes `
        alertPopupBox.style.visibility = "visible"
        removeUniversalAlert()
    }
    notiInfoContainer.style.visibility = "hidden"
    mainContainer.style.filter = "blur(0)"
    errorInNotification.innerText = ""

})

// Requesting Permission
      
function requestPerms() {
    Notification.requestPermission()
}

// Notification Body if Access Granted

function sendNotification() {
        Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            let notification = new Notification(`Hey, ${document.getElementById('name').value}`, {
                body: "You Have a Pending Task",
                icon: "https://tse1.mm.bing.net/th?id=OIP.tSp2HqX4psYo4zSvqnGHGgHaHa&pid=Api&P=0&h=180",
            })
        }
    })
}
