

// On form submit add task
const form = document.querySelector("form");
form.addEventListener("submit", e => {
    e.preventDefault();
    addTask();
  });
  
 
  //-----------------------------AddTasks
  const addTask = () => {
    const task = document.querySelector("form input");
    const list = document.querySelector("ul");
    // return if task is empty
    if (task.value === "") {
      alert("Field can not be empty! Please add a task!");
      return false;
    }
    // check is task already exist
    const taskExists = document.querySelector(`input[value="${task.value}"] `);
    if (taskExists) {
      alert("Task already exist! Please click on the task to edit or update");
      return false;
    }
  
    // create list item, add innerHTML and append to ul
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
        <input type="text" value="${task.value}" input type="date" class="task" 
        onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <input type="date">
        <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
    // clear input
    task.value = "";
  }
  //----------------------Loadtasks
   const loadTasks = () => {
    // Get the tasks and convert it to an array
    let tasks = Array("tasks");
  
    // Loop through the tasks and add them to the list
    tasks.forEach(task => {
      const list = document.querySelector("ul");
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" 
      class="check" ${task.completed ? 'checked' : ''}>
            <input type="text" value="${task.task}"  class="task ${task.completed ? 'completed' : ''}"  
            onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
      list.insertBefore(li, list.children[0]);
    });
  }
    //----------------------TaskComplete
  const taskComplete = (event) => {
    let tasks = Array("tasks");
    tasks.forEach(task => {
      if (task.task === event.nextElementSibling.value) {
        task.completed = !task.completed;
      }
    });
   confirmCompleteTask ();

    event.nextElementSibling.classList.toggle("completed");
  }
      //----------------------Remove
  const removeTask = (event) => {
    let tasks = Array("tasks");
    tasks.forEach(task => {
      if (task.task === event.parentNode.children[1].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    confirmDeleteTask();
    event.parentElement.remove();

  }
  
  // store current task to track changes
  const currentTask = null;
  
  // get current task
  const getCurrentTask = (event) => {
    currentTask = event.value;
  }
  
    //----------------------EditTask
    const editTask = (event) => {
    let tasks = Array("tasks");
    // check if task is empty
    if (event.value === "") {
      alert("Task is empty!");
      event.value = currentTask;
      return;

    }
    // task already exist
    tasks.forEach(task => {
      const taskValue = (task.task === event.value);

      if (taskValue) {
        alert("Task already exist!");
        event.value = currentTask;
        return;
      }
    });
     //----------------------UpdateTask
    tasks.forEach(task => {

      const updateTask = (task.task === currentTask);

      if (updateTask) {
                task.task = event.value;

      }
    });
  
  }
  const confirmDeleteTask = () =>{
    let confirmDeleteTask = confirm("Are you sure to delete this task?");
    if (confirmDeleteTask) {
      alert("Task will be removed!");
    } else {
      alert("Task will not be removed");
      removeTask();
    }
  }
  const confirmCompleteTask = () =>{
    let confirmCompleteTask = confirm("Are you sure task is completed?");
    if (confirmCompleteTask) {
      alert("Task will be marked as completed!");
    } else {
      alert("Task will not be marked as completed!");
      taskComplete();
    }
  }
  