const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Wie ist dein Name? ', (answer) => {
  console.log('Hallo ' + answer + '! Herzlich Willkommen!');
  rl.close();
});