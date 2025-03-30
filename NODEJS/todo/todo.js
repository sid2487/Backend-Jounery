const fs = require('fs')
const filePath = "./tasks.json"

// loading the task(3rd)
const loadTask = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

// addign save task(4th)
const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filePath, dataJSON)
}

// adding a task(2nd)
const addTask = (task) => {
    const tasks = loadTask()
    tasks.push({task})
    saveTasks(tasks)
    console.log("Task added", task); // (5th)
    
}

// list the task(6th)
const listTask = () => {
    const tasks = loadTask() // it will give an array
    tasks.forEach((task, index) => {
        console.log(`${index+1} - ${task.task}`)
    })
}

// remove the task using filter(7th)-->> creates a new array 
// const removeTask = (taskToRemove) => {
//     const tasks = loadTask();
//     const updatedTask = tasks.filter(task => task.task != taskToRemove); // remove the matching task and keep the unmatched task in a array named updatedTask.
//     saveTasks(updatedTask);
//     console.log(`Task removed: ${taskToRemove}`);
    
// }

// remove the task using splice(7th)-->> modifies the existing array
const removeTask = (taskToRemove) => {
    let tasks = loadTask();

    const index = tasks.findIndex(task => task.task === taskToRemove)

    if(tasks != -1) {
        tasks.splice(index, 1); 
        saveTasks(tasks)
        console.log(`Task removed: ${taskToRemove}`)
    } else {
        console.log(`Task not found: ${taskToRemove}`)
    }
}


// to grab the things through command(1st)
const command = process.argv[2]
const argument = process.argv[3];


if(command === "add") {
    addTask(argument);
} else if(command === "list") {
    listTask();
} else if(command === "remove") {
    removeTask(argument);
} else {
    console.log("Command not found!");
}