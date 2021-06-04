const fs = require('fs');
const chalk = require('chalk');

/* ADD TASK */
const addTask = (title, description, type) => {
    //  Lấy danh sách task đã có
    const allTasks = fetchTasks();
    //  Tạo dộng ID
    //  Tạo đối tượng task
    const task = {
        id: Math.round(Math.random() * 10000).toString(),
        title: title,
        description: description,
        type: type,
    };
    //  Thêm task vào danh sách
    allTasks.push(task);
    //  Lựu lại danh sách vào file
    fs.writeFileSync('task.json', JSON.stringify(allTasks));

    console.log(chalk.green('Successfully !'));
};

/* DELETE TASK */
const deleteTask = (id) => {
    const allTasks = fetchTasks();

    const index = allTasks.findIndex((task) => {
        return task.id === id;
    });

    if (index === -1) {
        console.log(chalk.red('Task not found !'));
        return
    };

    allTasks.splice(index, 1);

    fs.writeFileSync('task.json', JSON.stringify(allTasks));

    console.log(chalk.green('Successfully !'));
}

/* UPDATE TASK */
const updateTask = (id, title, description, type) => {
    const allTask = fetchTasks();

    const index = allTask.findIndex((task) => {
        return task.id === id;
    });

    if (index === -1) {
        console.log(chalk.red('Task not found !'));
        return;
    }

    const updatedTask = { title, description, type };

    addTask.splice(index, 1, updatedTask);

    console.log(chalk.green('Successfully !'));

};

/* VIEW ALL TASK */

const viewAllTasks = () => {
    return fetchTasks();
}

/* VIEW TASK BY DETAIL */

const viewTaskByDetail = (id) => {
    const allTasks = fetchTasks();

    const taskByID = allTasks.find((task) => {
        return task.id === id;
    })

    if (!taskByID) {
        console.log(chalk.red('Task not found !'));
        return;
    }

    return (
        console.log(chalk.green('Successfully !')),
        taskByID
    )
}

/* VIEW TASK BY TYPE */
const viewTasksByType = (type) => {
    const allTasks = fetchTasks();

    const tasksByType = allTasks.filter((task) => {
        return task.type === type
    })

    if (!tasksByType) {
        console.log(chalk.red('Task not found !'));
        return;
    }

    console.log(chalk.green('Successfully !'));
    return tasksByType;
}

/* FETCH TASK */
const fetchTasks = () => {
    try {
        const buffer = fs.readFileSync('./task.json');
        console.log('buffer --->', buffer);
        const tasksJSON = buffer.toString();

        return JSON.parse(tasksJSON);
    } catch (error) {
        return [];
    }

};

module.exports = {
    addTask, deleteTask, updateTask, viewAllTasks, viewTaskByDetail, viewTasksByType
}