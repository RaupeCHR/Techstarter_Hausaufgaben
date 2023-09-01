// firePosition ist die Position, in der die Waffe abgefeuert wird.
let firePosition = 1;

// Die Ausgabe von spinChamber ist eine "zufällige" Zahl und kann als Parameter an die Funktion fireGun übergeben werden.
const spinChamber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// fireGun prüft, ob die Zahl aus spinChamber mit der Zahl aus firePosition übereinstimmt.
// Falls JA, gibt die Funktion "Du bist tot" zurück, falls NEIN, gibt die Funktion "Spiel weiter" zurück.
const fireGun = (bulletPosition) => {
  if (bulletPosition === firePosition) {
    return "Du bist tot 🔫";
  } else {
    return "Spiel weiter 🎲";
  }
};

console.log(fireGun(spinChamber()));
