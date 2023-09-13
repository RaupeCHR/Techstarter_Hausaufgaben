let input = prompt("Bitte Grad Celsius eingeben");

let result = celsiusToFahrenheit(input);

console.log(input + " Grad Celsius = " + result + "F");

function celsiusToFahrenheit(celsius){
    return celsius * (9 / 5) + 32;
}