
let container = document.querySelector("#container")
let userContainer = document.querySelector(".user-container")
let userClose = document.querySelector(".user-cross")
let getAge = document.querySelector("#get-age")
let userName = document.getElementById("name")
let error = document.getElementById("error")
let ageInfo = document.querySelector(".age-info")
let ageClose = document.getElementById("age-close")
let user = document.getElementById("user")
let loader = document.querySelector(".loader")

function clickAgeBtn() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let birthdate = new Date(document.getElementById("birthdate").value);
    if (birthdate >= today) {
        document.getElementById("date-error").innerText = "*Enter a Valid Date"
    }
    else {
        userContainer.style.visibility = "visible"
        container.style.filter = "blur(15px)"
    }
}

userClose.addEventListener("click", () => {
    userContainer.style.visibility = "hidden"
    container.style.filter = "blur(0)"
    error.textContent = ""
    userName.value = ""
    document.getElementById("date-error").innerText = ""
})

getAge.addEventListener("click", () => {
    if (userName.value === "") {
        error.textContent = "*Please Enter Your Name"
    }
    else {
        calculateAge()
        loader.classList.add("showloader")
        userContainer.style.visibility = "hidden"
        setTimeout(() => {
            user.innerText = document.getElementById("name").value
            loader.classList.remove("showloader")
            ageInfo.style.visibility = "visible"
            error.textContent = ""
            userName.value = ""
            document.getElementById("date-error").innerText = ""
        }, 1200);
    }
})

ageClose.addEventListener("click", () => {
    ageInfo.style.visibility = "hidden"
    container.style.filter = "blur(0)"
    user.innerText = ""
    document.getElementById("birthdate").value = "00/00/0000"
})


function calculateAge() {
    let birthdate = new Date(document.getElementById("birthdate").value);
    let today = new Date();

    // Calculate the difference in years, months, and days
    let yearsDiff = today.getFullYear() - birthdate.getFullYear();
    let monthsDiff = today.getMonth() - birthdate.getMonth();
    let daysDiff = today.getDate() - birthdate.getDate();

    // Adjust for negative months and days differences
    if (daysDiff < 0) {
        monthsDiff--;
        daysDiff += 30; // Assuming an average of 30 days per month
    }

    if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
    }

    let ageText = `${yearsDiff} Years, ${monthsDiff} Months And ${daysDiff} Days Old`;
    document.getElementById("result").textContent = ageText;
}


document.querySelector("#birthdate").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("cal-age").click();
        document.querySelector("#name").focus()
    }
});

document.querySelector("#name").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("get-age").click();
    }
});
