const chalk = require('chalk');

function summe(a, b) {
    let name = "Christoph Raupach"
    let sum = a + b

    console.log(
        (chalk.yellow(sum)),
        (chalk.redBright(name))
    )
     

}
module.exports = summe;

