const zutaten = ["Kapern", "Senf", "Butter", "Eier", "Hackfleisch", "Kartoffeln", "Zwiebeln"];

// Sortiere die Zutaten nach dem Alphabet
zutaten.sort();

exports.handler = async (event) => {
  let output = "Liste der Zutaten:\n";

  zutaten.forEach((zutat) => {
    output += zutat + "\n";
  });

  return output;
};

console.log("Liste der Zutaten:");
zutaten.forEach((zutat) => {
  console.log(zutat);
});