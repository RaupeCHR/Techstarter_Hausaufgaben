let test = "hello " + "world"
console.log(test)
console.log(typeof(test))


// args
console.log("first function invocation", 2, "third function invocation")                    // Funtionen die mit Argumenten auf die Parameter zugreift
helloWorld("hello", "world")

console.log("second function ivocation")
helloWorld("hello", 1)

console.log("third function invocation")
helloWolrd("hello", true, 3)


// (param1, param2, param3)
                                                                                           //Jede Funktion wird als Object bezeichnet
function helloWorld(param1, param2, param3) {                                              //Eine Funktion mit gesetzten Paramentern
    //console.log(arguments)
    console.log("param1", param1)
    console.log("param2", param2)
    console.log("param3", param3)

}

const helloWorldAnonym = (param1, param2, param3) => {                                      //Lambda-Funktion in Javascript
    console.log("param1", param1)
    console.log("param2", param2)
    console.log("param3", param3)
}
const roundToNext10 = (n) => Math.round(n /10) * 10                                         // RundungsFunktion

console.log(
    roundToNext10(14),
    roundToNext10(24),
)
const nameGenerator = (firstName, lastName) => {
    return firstName + " " + lastName
}
const addGreetings = (name) => {
    return "Hello " + name + "!"
}

//const result1 = nameGenerator("John", "Doe")

//const result3 = addGreetings(result1)

const program = (a, b) => {
    let result = (a > b) ? "ist grösser" : "ist nicht grösser"
    return result

}

console.log(program(1, 2))

