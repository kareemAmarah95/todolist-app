const todoInput = document.querySelector("#todoInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
const tasksDiv = document.querySelector("#tasksDiv");
let todosArr = [];
if (window.localStorage.getItem("todos")) {
  todosArr = JSON.parse(window.localStorage.getItem("todos"));
}

getDataFromLocalStorage();

tasksDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-todo")) {
    removeTodoFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("list-item")) {
    toggleCompletedStatusInLocalStorage(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

addTaskBtn.addEventListener("click", function () {
  if (todoInput.value === "") {
    return;
  } else {
    addTask(todoInput.value);
    todoInput.value = "";
  }
});
function addTask(inputValue) {
  let todo = {
    id: Date.now(),
    completed: false,
    title: inputValue,
  };
  todosArr.push(todo);
  createElementInThePage(todosArr);
  addTodoToLocalStorage(todosArr);
}

function createElementInThePage(todosArr) {
  tasksDiv.innerHTML = "";
  todosArr.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-item";
    if (task.completed) {
      li.className = "list-item done";
    }
    li.setAttribute("data-id", task.id);
    li.style.cssText = `
      display: flex;
      justify-content: space-between;
    `;
    const todoText = document.createElement("p");
    todoText.textContent = task.title;
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    deleteBtn.className = "delete-todo";
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
    tasksDiv.appendChild(li);
    console.log(tasksDiv);
  });
}

function addTodoToLocalStorage(todosArr) {
  window.localStorage.setItem("todos", JSON.stringify(todosArr));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("todos");
  if (data) {
    let task = JSON.parse(data);
    createElementInThePage(task);
  }
}

function removeTodoFromLocalStorage(taskId) {
  todosArr = todosArr.filter((task) => task.id != taskId);
  addTodoToLocalStorage(todosArr);
}

function toggleCompletedStatusInLocalStorage(taskId) {
  for (let i = 0; i < todosArr.length; i++) {
    if (todosArr[i].id == taskId) {
      todosArr[i].completed == false
        ? (todosArr[i].completed = true)
        : (todosArr[i].completed = false);
    }
  }
  addTodoToLocalStorage(todosArr);
}

clearAllBtn.addEventListener("click", function () {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("todos");
});
