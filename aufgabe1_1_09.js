function removeFromArray(arr, ...args) {
  return arr.filter(item => !args.includes(item));
}

console.log(removeFromArray([1, 2, 3, 4], 3)); // gibt [1, 2, 4] aus
