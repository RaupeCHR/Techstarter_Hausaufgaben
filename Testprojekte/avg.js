

function average(numbers) {
    let sum = 0;
    for (let number of numbers) {
        sum += numbers;
    }
    return sum / numbers.length
}

let numbers = [1,2,3,4,5]

let result = average(numbers)

console.log(result)

//function avg2(numbers) {
//    return numbers.reduce((acc, number) => acc + number,0) / numbers.length                 // reduce Funktion
//}

//let res2 = avg(numbers)
//console.log("Enrico: ", res2)