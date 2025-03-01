"use strict";

const submit_btn = document.getElementById("submit_btn");
const textInput = document.getElementById("text");
const taskList = document.getElementById("task_list");

const dataList = JSON.parse(localStorage.getItem("taskList")) || [];

function showList() {
  taskList.innerHTML = "";
  dataList.forEach((task, index) => {
    let li = document.createElement("li");
    li.append(task);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("id", "delete");
    deleteBtn.classList.add("btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.setAttribute("id", "edit");
    editBtn.classList.add("btn");
    editBtn.addEventListener("click", () => editTask(index));

    let div = document.createElement("div");
    div.append(editBtn);
    div.append(deleteBtn);

    li.appendChild(div);
    taskList.append(li);
  });
}

submit_btn.addEventListener("click", function () {
  if (textInput.value.trim() !== "") {
    dataList.unshift(textInput.value.trim());
    localStorage.setItem("taskList", JSON.stringify(dataList));
    textInput.value = "";
    showList();
  } else {
    alert("Please Enter Your Task");
  }
});

function deleteTask(selectTask) {
  if (confirm("Are You Sure?")) {
    const deletedTask = dataList.splice(selectTask, 1);
    alert(`${deletedTask} deleted successfully`);
    localStorage.setItem("taskList", JSON.stringify(dataList));
    showList();
  }
}

function editTask(selectTask) {
  let newTask = prompt(`Edit the task: ${dataList[selectTask]}`);
  if (newTask !== null && newTask.trim() !== "") {
    dataList[selectTask] = newTask.trim();
    localStorage.setItem("taskList", JSON.stringify(dataList));
    showList();
  }
}

showList();
