const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const zodiacSigns = [
  "Widder", "Stier", "Zwillinge", "Krebs", "Löwe", "Jungfrau",
  "Waage", "Skorpion", "Schütze", "Steinbock", "Wassermann", "Fische"
];

function calculateZodiacSign(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return zodiacSigns[0]; // Widder
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return zodiacSigns[1]; // Stier
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return zodiacSigns[2]; // Zwillinge
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return zodiacSigns[3]; // Krebs
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return zodiacSigns[4]; // Löwe
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return zodiacSigns[5]; // Jungfrau
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return zodiacSigns[6]; // Waage
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return zodiacSigns[7]; // Skorpion
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return zodiacSigns[8]; // Schütze
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return zodiacSigns[9]; // Steinbock
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return zodiacSigns[10]; // Wassermann
  } else {
    return zodiacSigns[11]; // Fische
  }
}

function calculateMoonSign(birthYear, birthMonth, birthDay) {
  const yearNumber = parseInt(birthYear);
  const monthNumber = parseInt(birthMonth);
  const dayNumber = parseInt(birthDay);

  // Schritt 1: Finde die Zahl, die dem Geburtsjahr entspricht
  let yearValue = 0;

  if (yearNumber >= 1940 && yearNumber <= 1959) {
    yearValue = yearNumber - 1940;
  } else if (yearNumber >= 1960 && yearNumber <= 1979) {
    yearValue = yearNumber - 1960 + 1;
  } else if (yearNumber >= 1980 && yearNumber <= 1999) {
    yearValue = yearNumber - 1980 + 1;
  } else if (yearNumber >= 2000 && yearNumber <= 2019) {
    yearValue = yearNumber - 2000 + 1;
  }

  // Schritt 2: Finde die Zahl, die dem Geburtsmonat entspricht
  const monthValue = [
    0, 4, 4, 8, 11, 14, 17, 21, 24, 27, 3, 6
  ][monthNumber - 1];

  // Schritt 3: Addiere Geburtsdatum mit den oben genannten Zahlen
  let sum = yearValue + monthValue + dayNumber;

  // Überprüfe die Summe und weise das Mondzeichen zu
  if (sum >= 0 && sum <= 28) {
    const moonSigns = [
      "Widder", "Stier", "Zwilling", "Krebs", "Löwe", "Jungfrau",
      "Waage", "Skorpion", "Schütze", "Steinbock", "Wassermann", "Fische"
    ];
    return moonSigns[sum];
  } else if (sum >= 29 && sum <= 54) {
    sum -= 27;
  } else if (sum >= 55 && sum <= 81) {
    sum -= 55;
  } else if (sum > 81) {
    sum -= 82;
  }

  // Weise das Mondzeichen basierend auf der bereinigten Summe zu
  if (sum >= 0 && sum <= 1 || sum === 27 || sum === 28) {
    return "Widder";
  } else if (sum >= 2 && sum <= 4) {
    return "Stier";
  } else if (sum >= 5 && sum <= 6) {
    return "Zwilling";
  } else if (sum >= 7 && sum <= 8) {
    return "Krebs";
  } else if (sum >= 9 && sum <= 10) {
    return "Löwe";
  } else if (sum >= 11 && sum <= 13) {
    return "Jungfrau";
  } else if (sum >= 14 && sum <= 15) {
    return "Waage";
  } else if (sum >= 16 && sum <= 17) {
    return "Skorpion";
  } else if (sum >= 18 && sum <= 19) {
    return "Schütze";
  } else if (sum >= 20 && sum <= 22) {
    return "Steinbock";
  } else if (sum >= 23 && sum <= 24) {
    return "Wassermann";
  } else if (sum >= 25 && sum <= 26) {
    return "Fische";
  } else {
    return "Unbekanntes Mondzeichen";
  }
}

rl.question('Geben Sie Ihr Geburtsdatum (YYYY-MM-DD) ein: ', (birthDate) => {
  rl.question('Geben Sie Ihren Geburtsort ein: ', (birthPlace) => {
    rl.question('Geben Sie Ihre Geburtszeit (Stunden und Minuten) im Format HH:MM ein: ', (birthTime) => {
      const dateParts = birthDate.split('-');
      const birthDay = parseInt(dateParts[2]);
      const birthMonth = parseInt(dateParts[1]);
      const birthYear = parseInt(dateParts[0]);

      const timeParts = birthTime.split(':');
      const birthHour = parseInt(timeParts[0]);
      const birthMinute = parseInt(timeParts[1]);
      const day = parseInt(dateParts[2]);
      const month = parseInt(dateParts[1]);

      const zodiacSign = calculateZodiacSign(day, month);
      
      const moonSign = calculateMoonSign(birthYear, birthMonth, birthDay);

      console.log(`Sternzeichen: ${zodiacSign}`);
      console.log(`Mondzeichen: ${moonSign}`);

      // Hier können Sie die Berechnung des Aszendenten hinzufügen.

      rl.close();
    });
  });
});
