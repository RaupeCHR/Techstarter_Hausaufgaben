// Fahrenheit zu Celsius umrechnen
function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  // Celsius zu Fahrenheit umrechnen
  function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }
  
  console.log(convertToCelsius(32)); // gibt 0 aus
  console.log(convertToFahrenheit(0)); // gibt 32 aus
  