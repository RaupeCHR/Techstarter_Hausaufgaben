import express from "express"
import bodyParser from "body-parser"

const port = 3000
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const form = `
<form method="post" action="/login">
    <label for="name">Name:</label>
    <input name="name" type="text">
    <label for="pw">Passwort:</label>
    <input name="pw" type="password">
    <button type="submit">Login</button>
</form>
</br>
<form method="get" action="/register">
    <button type="submit">Zur Registrierung</button>
</form>
`

const users = [
    {name: "Christoph", passwort: "123"},
    {name: "Bartek", passwort: "321"},
    {name: "Mathias", passwort: "456"},
]

app.get("/", (req, res) => {
    res.send(form)
})

app.get("/register", (req, res) => {
    const registerForm = `
    <form method="post" action="/register">
        <label for="name">Name:</label>
        <input name="name" type="text">
        <label for="pw">Passwort:</label>
        <input name="pw" type="password">
        <label for="pw2">Passwort wiederholen:</label>
        <input name="pw2" type="password">
        <button type="submit">Registrieren</button>
    </form>
    <br>
    <form method="get" action="/">
        <button type="submit">Zurück zum Login</button>
    </form>
    `;
    res.send(registerForm);
});


 app.post("/register", (req, res) => {
    const { name, pw, pw2 } = req.body;

    if (!name || !pw || !pw2 || pw !== pw2) {
        res.send("Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.");
        return;
    }

    // Überprüfen, ob der Benutzer bereits existiert
    
    
    for (let i = 0; i < users.length; i++) {
        if (name === users[i].name) {
            res.send("Registrierung fehlgeschlagen. Dieser Benutzername existiert bereits.");
            return;
        }
    }

    // Neuen Benutzer hinzufügen
    users.push({ name, passwort: pw });
    res.send(`Registrierung erfolgreich für Benutzer ${name}`);
});

app.post("/login", (req, res) => {
    
    const {name, pw} = req.body

    for (let i = 0; i < users.length; i++){
        if (name === users[i].name && pw === users[i].passwort){
            res.send(`Login erfolgreich`)
            return
        } 
    }

    res.send(`Login fehlgeschlagen`)
}) 



app.listen(port, () => {
    console.log("server listens on port", port)
})