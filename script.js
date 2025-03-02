"use strict";

const submitBtn = document.getElementById("submit-btn");
const textInput = document.getElementById("text");
const taskList = document.getElementById("task-list");

// getting data from localstorage
const dataList = JSON.parse(localStorage.getItem("taskList")) || [];

let editIndex = null;

// updating localStorage
function updateLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(dataList));
}

// performing edit and delete functionality
function editAndDeleteButton(btnContent, attrName, attrValue, taskFunc, index) {
  let btn = document.createElement("button");
  btn.textContent = btnContent;
  btn.setAttribute(attrName, attrValue);
  btn.classList.add("btn");
  btn.addEventListener("click", () => taskFunc(index));
  return btn;
}

// append data functionality
function appendData(apendingInto, appendedData) {
  apendingInto.append(appendedData);
}

// render task list
function showList() {
  taskList.innerHTML = "";
  dataList.forEach((task, index) => {
    let li = document.createElement("li");
    appendData(li, task);
    let deleteBtn = editAndDeleteButton(
      "Delete",
      "id",
      "delete",
      deleteTask,
      index
    );
    let editBtn = editAndDeleteButton("Edit", "id", "edit", editTask, index);
    let div = document.createElement("div");
    appendData(div, deleteBtn);
    appendData(div, editBtn);
    appendData(li, div);
    appendData(taskList, li);
  });
}

// Add task functionality
submitBtn.addEventListener("click", function () {
  let text = textInput.value.trim();

  if (!text) {
    alert("Please Enter Your Task");
    return;
  }

  if (editIndex !== null) {
    dataList[editIndex] = text;
    editIndex = null;
    submitBtn.textContent = "Add Task";
  } else {
    dataList.unshift(text);
  }

  updateLocalStorage();
  textInput.value = "";
  showList();
});

// Delete task
function deleteTask(index) {
  if (confirm("Are You Sure?")) {
    dataList.splice(index, 1);
    updateLocalStorage();
    showList();
  }
}
// delete task
function deleteTask(selectTask) {
  if (confirm("Are You Sure?")) {
    const deletedTask = dataList.splice(selectTask, 1);
    alert(`${deletedTask} deleted successfully`);
    updateLocalStorage(dataList);
    showList();
  }
}

// edit task
function editTask(selectTask) {
  textInput.value = dataList[selectTask];
  submitBtn.textContent = "Edit Task";
  editIndex = selectTask;
  updateLocalStorage(dataList);
  showList();
}

showList();
