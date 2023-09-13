const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  
  const ageInMilliseconds = today - birth;
  
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = Math.floor(ageInMilliseconds / millisecondsInYear);

  const millisecondsInMonth = millisecondsInYear / 12;
  const months = Math.floor(ageInMilliseconds / millisecondsInMonth) % 12;

  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const weeks = Math.floor(ageInMilliseconds / millisecondsInWeek) % 4;

  const days = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24)) % 7;

  return {
    years,
    months,
    weeks,
    days
  };
}

rl.question('Geben Sie Ihr Geburtsdatum (YYYY-MM-DD) ein: ', (answer) => {
  const age = calculateAge(answer);
  console.log(`Ihr Alter beträgt ${age.years} Jahre, ${age.months} Monate, ${age.weeks} Wochen und ${age.days} Tage.`);
  rl.close();
});
