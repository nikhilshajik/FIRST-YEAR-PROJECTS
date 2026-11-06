// StudyTrack stores tasks in the browser, so they remain after refresh.
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const filterInput = document.getElementById("filter");

let tasks = JSON.parse(localStorage.getItem("studytrack-tasks")) || [];

document.getElementById("today").textContent =
  new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function saveTasks() {
  localStorage.setItem("studytrack-tasks", JSON.stringify(tasks));
}

function showTasks() {
  taskList.innerHTML = "";
  const filter = filterInput.value;
  const visibleTasks = tasks.filter(task => {
    if (filter === "pending") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  visibleTasks.forEach(task => {
    const item = document.createElement("div");
    item.className = task.done ? "task done" : "task";

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = task.done;
    check.addEventListener("change", () => {
      task.done = check.checked;
      saveTasks();
      showTasks();
    });

    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.name;

    const details = document.createElement("small");
    details.textContent = task.due ? "Due: " + task.due : "No deadline";

    const badge = document.createElement("span");
    badge.className = "priority " + task.priority;
    badge.textContent = task.priority;

    const remove = document.createElement("button");
    remove.className = "delete";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      showTasks();
    });

    item.append(check, name, details, badge, remove);
    taskList.appendChild(item);
  });

  document.getElementById("emptyMessage").style.display = visibleTasks.length ? "none" : "block";
  document.getElementById("totalCount").textContent = tasks.length;
  document.getElementById("doneCount").textContent = tasks.filter(t => t.done).length;
  document.getElementById("leftCount").textContent = tasks.filter(t => !t.done).length;
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  tasks.push({
    id: Date.now(),
    name: taskInput.value.trim(),
    priority: priorityInput.value,
    due: dueDateInput.value,
    done: false
  });
  saveTasks();
  taskForm.reset();
  showTasks();
});

filterInput.addEventListener("change", showTasks);
showTasks();
