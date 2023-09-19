import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));

const form = `
<h1>Herzlich Willkommen zur ExpressServerSpielerei von RaupeCHR!</h1>
<form method="post" action="/login">
    <label for="name">Name:</label>
    <input name="name" type="text">
    <label for="pw">Passwort:</label>
    <input name="pw" type="password">
    <button type="submit">Login</button>
</form>
</br>
<a href="/">Home</a>
<a href="/oldhtml">To Do List</a>
<a href="/cat/:says">Catpictures</a>
          `

const user = [
    {name: "Christoph", passwort: "123"},
    {name: "Bartek", passwort: "456"},
    {name: "Evelyn", passwort: "789"}
]

app.get('/', (req, res) => {
  res.send(form);
});

app.post("/login", (req, res) => {
    const {name, pw}  = req.body
    
    for  (let i = 0; i < user.length; i++){
      if (name === user[i].name && pw === user[i].passwort){
        res.send(`login erfolgreich`)
        return
      }
    }

    res.send(`Login fehlgeschlagen`)
})

app.get('/oldhtml', (req, res) => {
    res.sendFile('todo.html', { root: './'});
});

app.get('/cat/:says', (req, res) => {
  const text = req.params.says;
  res.redirect(`https://cataas.com/cat/says/${text}`);
});

app.listen(port, () => {
  console.log(`Express-Server hört auf Port ${port}`);
});