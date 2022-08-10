

// On form submit add task
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
  });
  
  function loadTasks() {
  
  
    // Get the tasks and convert it to an array
    let tasks = Array("tasks");
  
    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
      const list = document.querySelector("ul");
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.task}"  class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
      list.insertBefore(li, list.children[0]);
    });
  }
  
  function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector("ul");
    // return if task is empty
    if (task.value === "") {
      alert("Please add some task!");
      return false;
    }
    // check is task already exist
    if (document.querySelector(`input[value="${task.value}"]`)) {
      alert("Task already exist!");
      return false;
    }
  
    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
        <input type="text" value="${task.value}" class="task"  onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    // clear input
    task.value = "";
  }
  
  function taskComplete(event) {
    let tasks = Array("tasks");
    tasks.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }
    });6
    event.nextElementSibling.classList.toggle("completed");
  }
  
  function removeTask(event) {
    let tasks = Array("tasks");
    tasks.forEach(task => {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    event.parentElement.remove();
  }
  
  // store current task to track changes
  const currentTask = null;
  
  // get current task
  function getCurrentTask(event) {
    currentTask = event.value;
  }
  
  // edit the task and update local storage
  function editTask(event) {
    let tasks = Array("tasks");
    // check if task is empty
    if (event.value === "") {
      alert("Task is empty!");
      event.value = currentTask;
      return;
    }
    // task already exist
    tasks.forEach(task => {
      if (task.task === event.value) {
        alert("Task already exist!");
        event.value = currentTask;
        return;
      }
    });
    // update task
    tasks.forEach(task => {
      if (task.task === currentTask) {
        task.task = event.value;
      }
    });
  
  }
