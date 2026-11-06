
// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Convert old saved tasks into the new format
tasks = tasks.map(task => {
    if (typeof task === "string") {
        return {
            name: task,
            date: "",
            priority: "Medium"
        };
    }
    return task;
});

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display all tasks
function displayTasks() {
    let taskList = document.getElementById("taskList");
    let emptyMessage = document.getElementById("emptyMessage");
    let taskCount = document.getElementById("taskCount");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let details = document.createElement("div");
        details.className = "task-details";

        let name = document.createElement("strong");
        name.className = "task-name";
        name.textContent = task.name;

        let meta = document.createElement("div");
        meta.className = "task-meta";

        let priority = document.createElement("span");
        priority.className = "priority " + task.priority;
        priority.textContent = task.priority + " priority";

        meta.appendChild(priority);

        let date = document.createElement("span");
        date.textContent = task.date
            ? "Due: " + task.date
            : "No due date";

        meta.appendChild(date);

        details.appendChild(name);
        details.appendChild(meta);

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            deleteTask(index);
        };

        li.appendChild(details);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";

    taskCount.textContent = tasks.length +
        (tasks.length === 1 ? " task" : " tasks");
}

// Add a new task
function addTask() {
    let input = document.getElementById("taskInput");
    let dateInput = document.getElementById("taskDate");
    let priorityInput = document.getElementById("taskPriority");

    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task");
        input.focus();
        return;
    }

    tasks.push({
        name: taskName,
        date: dateInput.value,
        priority: priorityInput.value
    });

    saveTasks();

    input.value = "";
    dateInput.value = "";
    priorityInput.value = "Medium";

    displayTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Show tasks when page loads
displayTasks();
