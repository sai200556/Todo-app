const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load from localStorage on page load
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToDOM(taskText, false);
    saveToLocalStorage();
    taskInput.value = "";
  }
});

function addTaskToDOM(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveToLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveToLocalStorage();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveToLocalStorage() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({ text: li.childNodes[0].textContent.trim(), completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
