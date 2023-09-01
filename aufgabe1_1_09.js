function repeatString(str, count) {
  let repeatedString = '';
  for (let i = 0; i < count; i++) {
    repeatedString += str;
  }
  return repeatedString;
}

console.log(repeatString('hey', 3)); // gibt 'heyheyhey' aus
