const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const API = "http://localhost:5000/api/tasks";

// Add Task
async function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputBox.value })
    });

    inputBox.value = "";
    loadTasks();
}

// Load Tasks
async function loadTasks() {
    listContainer.innerHTML = "";
    const res = await fetch(API);
    const tasks = await res.json();

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = task.text;
        if (task.completed) li.classList.add("checked");
        li.setAttribute("data-id", task._id);

        let span = document.createElement("span");
        span.innerHTML = "X";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

// Toggle / Delete
listContainer.addEventListener("click", async (e) => {
    const li = e.target.closest("li");
    const id = li.getAttribute("data-id");

    if (e.target.tagName === "LI") {
        const updated = !li.classList.contains("checked");
        li.classList.toggle("checked");
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: updated })
        });
    } else if (e.target.tagName === "SPAN") {
        li.remove();
        await fetch(`${API}/${id}`, { method: "DELETE" });
    }
});

loadTasks();
