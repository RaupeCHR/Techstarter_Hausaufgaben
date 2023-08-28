
// DE: Funktion, um den Durchschnitt einer Liste von Zahlen zu berechnen
function calculateAverage(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum / numbers.length;
  }

  // DE: Beispiel-Liste von Zahlen
  const numbers = [5777, 1990, 15, 520, 275];
  
  
  // DE: Berechne den Durchschnitt der Zahlen mit Hilfe der Funktion
  const average = calculateAverage(numbers);
  

  // DE: Gib den berechneten Durchschnitt aus
  console.log('Der Durchschnitt der Zahlen ist: ' + average);