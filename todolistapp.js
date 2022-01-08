const input = document.getElementById("text");
const tasks = document.getElementById("tasks");
const btnSubmit = document.querySelector(".btnSubmit");
let Tasks = [];
let ID = 0;
let isEdit = false;

function addTask(e) {
  e.preventDefault();
  let value = input.value;
  const date = new Date().getMilliseconds();
  // check if its edit of add task
  if (!isEdit) {
    // when adding tasks
    if (value) {
      Tasks.push({
        id: date,
        value: value,
      });

      tasks.innerHTML = mapping(Tasks);
      localStorage.setItem("tasks", JSON.stringify(Tasks));
    }
  } else {
    // when editing a task
    if (value) {
      tasks.innerHTML = Tasks.map((task) => {
        if (task.id == ID) {
          task.value = value;
        }
        return `<div class="tasks">
      <h4>${task.value}</h4>
      <div>
        <button class="btns" onclick="editTask(event);" data-id="${task.id}"><i class="fas fa-edit"></i></button>
        <button class="btns" onclick="deleteTask(event);"><i class="fas fa-trash"></i></button>
      </div>
    </div>`;
      }).join("");
      localStorage.setItem("tasks", JSON.stringify(Tasks));
      isEdit = false;
      btnSubmit.textContent = "add";
    }
  }

  input.value = "";
}

function editTask(e) {
  btnSubmit.textContent = "edit";
  ID = e.currentTarget.dataset.id;
  isEdit = true;
}

function deleteTask(e) {
  ID = e.currentTarget.previousSibling.previousSibling.dataset.id;
  Tasks = Tasks.filter((task) => task.id != ID);

  if (Tasks) {
    tasks.innerHTML = mapping(Tasks);
  } else {
    tasks.innerHTML = "";
  }
  localStorage.setItem("tasks", JSON.stringify(Tasks));
}

function clearAll() {
  Tasks = [];
  tasks.innerHTML = "";
  localStorage.clear();
}

function mapping(arr) {
  return arr
    .map((task) => {
      return `<div class="tasks">
    <h4>${task.value}</h4>
    <div>
      <button class="btns" onclick="editTask(event);" data-id="${task.id}"><i class="fas fa-edit"></i></button>
      <button class="btns" onclick="deleteTask(event);"><i class="fas fa-trash"></i></button>
    </div>
  </div>`;
    })
    .join("");
}

function onLoad() {
  Tasks = JSON.parse(localStorage.getItem("tasks"));
  if (Tasks != null) {
    tasks.innerHTML = mapping(Tasks);
  }
}
