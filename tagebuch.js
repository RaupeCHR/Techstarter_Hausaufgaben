/*
Natürlich, ich verstehe. Hier ist eine einfachere Aufgabe, die sich auf grundlegende Konzepte konzentriert:

**Titel: Persönlicher Tagebuch-Eintrag**

**Aufgabe:**
Du sollst ein kleines Programm schreiben, das es einem Benutzer ermöglicht, persönliche Tagebucheinträge zu erstellen und anzuzeigen.

**Schritte:**

1. Erstelle ein leeres Array namens `tagebuchEintraege`.*/

const tagbuchEintraege = [];

/*2. Definiere eine Funktion namens `neuerEintragHinzufuegen`, die den Benutzer nach einem Eintragstitel und dem eigentlichen Text des Eintrags fragt. Erstelle ein Objekt mit diesen Informationen und füge es dem `tagebuchEintraege`-Array hinzu. */
function neuerEintragHinzufuegen() {
    const titel = prompt("Bitte gib den Titel des Eintrags ein:");
    const text = prompt("bitte gib deinen Haupttext ein:");
    const Eintrag = {
        Titel: titel,
        Text: text
    };
    tagbuchEintraege.push(neuerEintrag);
    console.log("Eintrag wurde hinzugefügt!");
}
/*3. Definiere eine Funktion namens `alleEintraegeAnzeigen`, die durch das `tagebuchEintraege`-Array iteriert und die Titel aller vorhandenen Einträge ausgibt.*/
function alleEintraegeAnzeigen() {
    console.log("Tagebuch-Eintraege:");
    for (let i = 0; i < tagbuchEintraege.length; i++) {
        console.log(`${i + 1}. ${tagbuchEintraege[i].Titel}`);
    }
   

}

/*4. Rufe die `neuerEintragHinzufuegen`-Funktion auf, um mindestens zwei Tagebucheinträge hinzuzufügen.*/

/*5. Rufe abschließend die `alleEintraegeAnzeigen`-Funktion auf, um die Titel der vorhandenen Einträge anzuzeigen.*/

/***Bonus-Herausforderung:**
Füge der `alleEintraegeAnzeigen`-Funktion die Möglichkeit hinzu, dass der Benutzer auf einen Eintragstitel klicken kann, um den vollständigen Text des Eintrags anzuzeigen.*/

/*Diese Aufgabe sollte simpler sein und sich auf das Erstellen von Objekten, das Hinzufügen von Elementen zu einem Array und das Anzeigen von Informationen konzentrieren. Viel Spaß beim Üben!*/
