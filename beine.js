/*
Du bist ein angehender Tierforscher und möchtest die Anzahl der Beine in verschiedenen Tierarten erforschen. Deine Aufgabe ist es, ein einfaches Programm zu schreiben, das dir hilft, die Anzahl der Beine für verschiedene Tiere zu berechnen und anzuzeigen.
*/

const tierarten = ["Elefant", "Hund", "Spinne", "Pferd"];
// 1. Aufgabe: Anzahl der Beine für jedes Tier hinzufügen
const beineAnzahl = {
    Elefant: 4,     // Elefanten haben 4 Beine
    Hund: 4,        // Hunde haben 4 Beine
    Spinne: 8,      // Spinnen haben 8 Beine
    Pferd: 4        // Pferde haben 4 Beine
};

// Du kannst weiter Tierarte und Ihre Beinanzahl hinzufügen

beineAnzahl['Giraffe'] = 4;

// 2. Aufgabe: Beine Anzahl pro Tier ausgeben

for (const tier of tierarten) {
    console.log('${tier} hat ${beineAnzahl[tier]} Beine.');
}