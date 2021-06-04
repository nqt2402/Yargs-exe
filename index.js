const yargs = require('yargs');
const { addTask, deleteTask, updateTask, viewAllTasks, viewTaskByDetail, viewTasksByType } = require('./task');

//  command add task
yargs.command({
    command: 'add',
    builder: {
        title: { type: 'string', demandOption: true },
        description: { type: 'string', demandOption: true },
        type: { type: 'string', demandOption: true },
    },
    handler: (args) => {
        addTask(args.title, args.description, args.type)
    }
})

//  command delete task
yargs.command({
    command: 'delete',
    builder: {
        id: { type: 'string' },
    },
    handler: (args) => {
        deleteTask(args.id);
    }
})

//  command update task
yargs.command({
    command: 'update',
    builder: {
        id: { type: 'string' },
        title: { type: 'string', },
        description: { type: 'string', },
        type: { type: 'string' },
    },
    handler: (args) => {
        updateTask(args.id, args.title, args.description, args.type);
    }
})

//  command view all tasks
yargs.command({
    command: 'list',
    builder: {}, // no need 
    handler: () => {
        viewAllTasks();
    }
})

//  command view task detail
yargs.command({
    command: 'detail',
    builder: {
        id: { id: 'string' },
    },
    handler: (args) => {
        viewTaskByDetail(args.id);
    }
})

//  command view task by type
yargs.command({
    command: 'type',
    builder: {
        type: { type: 'string' },
    },
    handler: (args) => {
        viewTasksByType(args.type);
    }
})

yargs.parse();