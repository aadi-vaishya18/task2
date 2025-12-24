const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Load tasks when page loads
loadTasks();

// Add Task
function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    let tasks = getTasks();
    tasks.push({
        text: inputBox.value,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputBox.value = "";
    loadTasks();
}

// Load Tasks
function loadTasks() {
    listContainer.innerHTML = "";
    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerText = task.text;

        if (task.completed) {
            li.classList.add("checked");
        }

        li.setAttribute("data-index", index);

        let span = document.createElement("span");
        span.innerHTML = "✕";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

// Click Events
listContainer.addEventListener("click", function (e) {
    let tasks = getTasks();
    let li = e.target.closest("li");
    let index = li.getAttribute("data-index");

    if (e.target.tagName === "SPAN") {
        tasks.splice(index, 1); // delete
    } else {
        tasks[index].completed = !tasks[index].completed; // toggle
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
});

// Get tasks from localStorage
function getTasks() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}
