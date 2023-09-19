import express from "express"

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Herzlich Willkommen zu den Hausaufgaben von Christoph Raupach!');
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