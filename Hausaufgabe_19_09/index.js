import express from "express"

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send(`
  <h1>Herzlich Willkommen zu den Hausaufgaben von Christoph Raupach!</h1>
  <a href="/">Home</a>
  <a href="/oldhtml">To Do List</a>
  <a href="/cat/:says">Catpictures</a>
            `);
});

app.get('/oldhtml', (req, res) => {
    res.sendFile('todo.html', { root: './'});
});

app.get('/cat/says:', (req, res) => {
  const text = req.params.says;
  res.redirect(`https://cataas.com/cat/says/${text}`);
});

app.listen(port, () => {
  console.log(`Express-Server hört auf Port ${port}`);
});