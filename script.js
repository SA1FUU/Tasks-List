
let taskInput = document.querySelector('input')
let addButton = document.querySelector('button')
let listContainer = document.querySelector('.task-list-container')
let dummyText = document.querySelector('#dummy-text')

addButton.addEventListener('click', (e) => [
    e.preventDefault(),
    addTask()
])

function addTask() {
    if(taskInput.value === "") {
        alert("Enter a Task to do")
    }
    else{
        let li = document.createElement("li")
        li.innerText = taskInput.value
        listContainer.appendChild(li)

        let i = document.createElement("i")
        i.classList.add("fa-solid")
        i.classList.add("fa-trash")
        li.appendChild(i)
    }
    taskInput.value = ""
    saveData()
    dummyText.innerHTML =  ""
}



listContainer.addEventListener("click", (e) => {
    if(e.target.tagName === "I"){
        e.target.parentElement.remove()
        saveData()
    }
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        saveData()
    }
}, false)


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data")
}
showData()

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addButton.click();
    }
  });