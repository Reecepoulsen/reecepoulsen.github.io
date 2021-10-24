/******************************** Helper Functions *******************************************/
// creates a DOM representation of a task
function createTaskInDOM(task){
    let taskContainer = document.createElement('div');

    // make sure the id is unique (matches localStorage) and we add class name for styling
    taskContainer.id = task['id'];
    taskContainer.className = 'task';

    // set the contents of the new task
    taskContainer.innerHTML = `
        <input id="cb${task['id']}" type="checkbox" onclick="check(${task['id']})">
        <p id="p${task['id']}">${task['content']}</p>
        <button class="delete-btn" onclick="deleteTask(${task['id']})">X</button>`;
    
    // add it to the DOM
    document.getElementById('tasks-list').append(taskContainer);
}

// creates a localStorage representation of a task
function addTaskInLS(newTask){
    let tasksObj = JSON.parse(localStorage.getItem('tasksObj'));
    tasksObj['taskList'].push(newTask);
    tasksObj['tasksToComplete'] += 1;
    localStorage.setItem('tasksObj', JSON.stringify(tasksObj));
}

// rebuilds all completed tasks on load based on localStorage
function rebuildCompleted(task){
    if (task['completed'] == true){
        let taskElement = document.getElementById(task['id']);
        taskElement.classList.add('completed');
        document.getElementById(`cb${task['id']}`).checked = true;
    }
}

// updates the task to complete count based on localStorage
function updateCountDisplay(){
    let tasksObj = JSON.parse(localStorage.getItem('tasksObj'));
    let count = 0;
    for (i in tasksObj['taskList']){
        if (tasksObj['taskList'][i]['completed'] == false) {
            count += 1
        }
    }
    document.getElementById('task-count').innerHTML =  count + " tasks left";
}


/*************************************************************************
* INITIALIZE - Set everything up based off of local storage
*************************************************************************/
window.addEventListener("load", () => {
    let tasksObj = {
        'taskList' : [],
        'tasksToComplete' : 0
    };

    // if it doesn't exist in localStorage, make one. Else, use what we have
    if (localStorage.getItem("tasksObj") == undefined){
        localStorage.setItem("tasksObj", JSON.stringify(tasksObj));
    } else {
        tasksObj = JSON.parse(localStorage.getItem("tasksObj"));
    }

    // render all tasks from local storage
    for (let i in tasksObj["taskList"]){
        let curTask = tasksObj['taskList'][i];

        // create all tasks in DOM that are stored in local storage
        createTaskInDOM(curTask);

        // check the ones that are completed
        if (curTask['completed'] == true) {
            rebuildCompleted(curTask);
        }
    }

    // make sure count display gets updated
    updateCountDisplay();
});

/*********************************** Modify Operations ***************************************/
// Add a new task
document.getElementById("add-btn").addEventListener("click", () => {
    let content = document.getElementById('new-task-input').value;

    // Don't add an empty tasks
    if (content == ''){
        return
    };

    // set the new task's info
    let newTask = {
        'id' : Date.now(), 
        'content':  content, 
        'completed' : false
    }

    // Create in DOM
    createTaskInDOM(newTask);

    // Store in local storage
    addTaskInLS(newTask);

    // reset add input box text after task is added
    document.getElementById('new-task-input').value = '';

    // make sure count display gets updated
    updateCountDisplay();
})

// Change the state of a task
function check(taskID){
    let curCheckBox = document.getElementById(`cb${taskID}`);
    let curTaskDOM = document.getElementById(taskID);
    let taskToUpdate = {};

    let tasksObj = JSON.parse(localStorage.getItem('tasksObj'));

    // make sure completed changes happen in localStorage as well
    for (const i in tasksObj['taskList']) {
        let cur = tasksObj['taskList'][i];
        if (cur['id'] == taskID) {
            taskToUpdate = cur;
        }
    }

    if (curCheckBox.checked == true){
        curTaskDOM.classList.add("completed")
        taskToUpdate['completed'] = true;
        tasksObj['tasksToComplete'] -= 1;
    } else {
        curTaskDOM.classList.remove("completed")
        taskToUpdate['completed'] = false;
        tasksObj['tasksToComplete'] += 1;
    }

    localStorage.setItem('tasksObj', JSON.stringify(tasksObj));

    // make sure count display gets updated
    updateCountDisplay();
}

// Remove a task
function deleteTask(taskID){
    // Remove task from taskList in local storage. 
    let tasksObj = JSON.parse(localStorage.getItem('tasksObj'));

    // Filter it out of the taskList based off of the ID
    tasksObj['taskList'] = tasksObj['taskList'].filter((task) => task.id != taskID);

    // if it was checked when deleted then we don't need to subtract one from the tasksToComplete count
    if (document.getElementById(`cb${taskID}`).checked == false){
        tasksObj['tasksToComplete'] -= 1;
    }

    // reset taskList to the new one without the deleted task
    localStorage.setItem('tasksObj', JSON.stringify(tasksObj));

    // Remove the task from DOM
    curTask = document.getElementById(taskID);
    curTask.remove();

    // make sure count display gets updated
    updateCountDisplay();
}

/********************************* Display Functions *****************************************/
// Show Incomplete tasks
function showIncomplete(){
    showAll();  // Show all to start with
       
    // Hide the tasks that are completed, only show incomplete
    let tasksObj = JSON.parse(localStorage.getItem("tasksObj"));
    let completedTasks = tasksObj['taskList'].filter((task) => task['completed'] == true);
    for (const i in completedTasks){
        document.getElementById(completedTasks[i]['id']).classList.add('hideTask');
    }
}

// Show Complete tasks
function showCompleted(){
    showAll();  // Show all to start with
    
    // Hide the tasks that are incomplete, only show completed
    let tasksObj = JSON.parse(localStorage.getItem("tasksObj"));
    let incompleteTasks = tasksObj['taskList'].filter((task) => task['completed'] != true);
    for (const i in incompleteTasks){
        let curTask = incompleteTasks[i];
        document.getElementById(curTask['id']).classList.add('hideTask');
    }
}

// Show all tasks
function showAll(){
    let tasksObj = JSON.parse(localStorage.getItem("tasksObj"));
    for (const i in tasksObj['taskList']){
        document.getElementById(tasksObj['taskList'][i]['id']).classList.remove('hideTask');
    }
}
