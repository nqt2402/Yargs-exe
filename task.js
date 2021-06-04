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
        title,
        description,
        type,
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
    const allTasks = fetchTasks();

    const index = allTasks.findIndex((task) => {
        return task.id === id;
    });

    if (index === -1) {
        console.log(chalk.red('Task not found !'));
        return;
    }

    const updatedTask = { id, title, description, type };

    allTasks.splice(index, 1, updatedTask);

    fs.writeFileSync('task.json', JSON.stringify(allTasks));
};

/* VIEW ALL TASK */

const viewAllTasks = () => {
    const allTasks = fetchTasks();
    console.log(chalk.green('allTasks--->'), allTasks);
}

/* VIEW TASK BY DETAIL */
//  BUG
const viewTaskByDetail = (id) => {
    const allTasks = fetchTasks();
    console.log('allTasks', allTasks);
    const taskByID = allTasks.find((task) => task.id === id);
    console.log('taskByID', taskByID);

    // if (!taskByID) {
    //     console.log(chalk.red('Task not found !'));
    //     return;
    // }

    // return (
    //     console.log(chalk.green('Successfully !')),
    //     taskByID
    // )
}

/* VIEW TASK BY TYPE */
const viewTasksByType = (type) => {
    const allTasks = fetchTasks();

    const tasksByType = allTasks.filter((task) => {
        return task.type === type
    })

    if (tasksByType == '') {
        console.log(chalk.red('Task not found !'));
        return;
    }

    console.log(chalk.green('Successfully !'));
    console.log(chalk.green('tasksByType'), tasksByType);
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