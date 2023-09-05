// Leeres Objekt "person" erstellen
const person = {};

// Eigenschaften "name" und "alter" hinzufügen
person.name = "Max Mustermann";
person.alter = 30;

// Methode "geburtstagsFeiern" hinzufügen
person.geburtstagsFeiern = function() {
    this.alter += 1;
};

// Die Methode "geburtstagsFeiern" aufrufen, um das Alter um 1 zu erhöhen
person.geburtstagsFeiern();

// Überprüfung der Werte
console.log(person.name); // Ausgabe: "Max Mustermann"
console.log(person.alter); // Ausgabe: 31

// Beispiel-Zeichenkette
const zahlAlsText = "42";

// Mit parseInt in eine Ganzzahl (integer) konvertieren
const zahl = parseInt(zahlAlsText, 10);

// Mit parseFloat in eine Gleitkommerzahl (float) konvertieren
 const zahl1 = parseFloat(zahlAlsText);

 console.log(
    zahl,
    zahl1
 )

// Beispiel- Zahl
const nummer = 42;

// Verwendung von toString()
const text = nummer.toString();

// Verwendung der Konkatenation mit einer leeren Zeichenkette
const text1 = "" + nummer;

console.log(
    text,
    text1
)

function hatEigenschaft(obj, eigenschaft) {
    return eigenschaft in obj;
}
 console.log(
    hatEigenschaft(person, "name"),
    hatEigenschaft(person, "adresse")
    
    );

const buch = {};

buch.title = "Die Verwandlung";
buch.author = "Franz Kafka";
buch.jahr = 1915;

buch.jahr = 1912,
buch.information = function() {
    return this.title + " von " + this.author + ", veröffentlicht im Jahr " + this.jahr;
}
delete buch.author;

console.log(
    buch.title,
    buch.author,
    buch.jahr,
    buch.information()
)

const preis = 799.99;
const preisText = "$" + preis.toString();

console.log(preisText);

let a = 5
let b = 3

function multipli(a, b) {
    return a * b;
}
let sum = multipli(a, b);

console.log(sum);