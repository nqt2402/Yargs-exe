const fs = require('fs');
const chalk = require('chalk');

fs.writeFileSync('test.txt', 'Learn NodeJs');

console.log(chalk.bgRed("You are wrong"));