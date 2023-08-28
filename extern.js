let test = "hello " + "world"
console.log(test)
console.log(typeof(test))

// (param1, param2, param3)

function helloWorld(pram1, param2, param3) {                                               //Eine Funktion mit gesetzten Paramentern
    //console.log(arguments)
    console.log("param1", param1)
    console.log("param2", param2)
    console.log("param3", param3)

}

// args
console.log("first function invocation", 2, "third function invocation")                    // Funtionen die mit Argumenten auf die Parameter zugreift
helloWorld("hello", "world")

console.log("second function ivocation")
helloWorld("hello", 1)

console.log("third function invocation")
helloWolrd("hello", true, 3)