import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'

// Erhalte den Pfad des aktuellen Moduls
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000
const dataPath = path.join(__dirname, 'data.json')

// Middleware zum Parsen von form-daten
app.use(bodyParser.urlencoded({ extended: true }))

// Daten aus der JSON-Datei lesen
async function readData() {
    const rawData = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(rawData)
}

// Daten in die JSON-Datei schreiben
async function writeData(data) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}

// Hauptlogin-Seite
app.get('/', (req, res) => {
    const form = `
    <style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        width: 70%;
        margin: auto;
    }
    header {
        background: #50b3a2;
        color: #ffffff;
        padding-top: 30px;
        min-height: 70px;
        border-bottom: #bbb 1px solid;
    }
    header a {
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 16px;
    }
    header ul {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
    }
    header li {
        float: right;
        display: block;
        padding: 0 20px;
        font-size: 16px;
    }
    header #branding {
        float: left;
    }
    header #branding h1 {
        margin: 0;
    }
    header nav {
        float: right;
        margin-top: 10px;
    }
    header .highlight, header .current a {
        color: #e8491d;
        font-weight: bold;
    }
    header a:hover {
        color: #ffffff;
        font-weight: bold;
    }
    #task-input {
        margin-bottom: 20px;
    }
    ul {
        padding: 0;
    }
    li {
        list-style: none;
        background: #fff;
        margin-bottom: 5px;
        padding: 10px;
        cursor: pointer;
    }
    li.done {
        text-decoration: line-through;
        color: #888;
    }
</style>

    <div class="container">
    <header>
        <h1 id="branding">To Do App Enrico Anna Christoph</h1>
    </header>
    </br>
    <form method="post" action="/login" id="task-input">
        <label for="name">Name:</label>
        <input name="name" type="text">
        <label for="pw">Passwort:</label>
        <input name="pw" type="password">
        <button type="submit">Login</button>
    </form>
    <br>
    <form method="get" action="/register">
        <button type="submit">Zur Registrierung</button>
    </form>
</div>
    `
    res.send(form)
})

// Registrierungsseite
app.get("/register", (req, res) => {
    const registerForm = `
    <style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        width: 70%;
        margin: auto;
    }
    header {
        background: #50b3a2;
        color: #ffffff;
        padding-top: 30px;
        min-height: 70px;
        border-bottom: #bbb 1px solid;
    }
    header a {
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 16px;
    }
    header ul {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
    }
    header li {
        float: left;
        display: block;
        padding: 0 20px;
        font-size: 16px;
    }
    header #branding {
        float: left;
    }
    header #branding h1 {
        margin: 0;
    }
    header nav {
        float: right;
        margin-top: 10px;
    }
    header .highlight, header .current a {
        color: #e8491d;
        font-weight: bold;
    }
    header a:hover {
        color: #ffffff;
        font-weight: bold;
    }
    #task-input {
        margin-bottom: 20px;
    }
    ul {
        padding: 0;
    }
    li {
        list-style: none;
        background: #fff;
        margin-bottom: 5px;
        padding: 10px;
        cursor: pointer;
    }
    li.done {
        text-decoration: line-through;
        color: #888;
    }
</style>
        <div class="container">
        <header>
        <h1>Registrierung</h1>
        </header>
        </br>
        <form method="post" action="/register">
            <label for="name">Name:</label>
            <input name="name" type="text">
            <label for="pw">Passwort:</label>
            <input name="pw" type="password">
            <button type="submit">Registrieren</button>
        </form>
        <br>
        <form method="get" action="/">
        <button type="submit">Zurück zum Login</button>
    </form>
    `
    res.send(registerForm)
})

app.post("/register", async (req, res) => {
    const { name, pw } = req.body
    const hashedPassword = await bcrypt.hash(pw, 10)
    const data = await readData()
    if (data.users.some(user => user.name === name)) {
        res.send("Registrierung fehlgeschlagen. Dieser Benutzername existiert bereits.")
        return
    }
    data.users.push({ name, passwort: hashedPassword })
    data.userTodoLists[name] = []
    await writeData(data)
    res.redirect(`/todolist?name=${name}`)
})

app.post("/login", async (req, res) => {
    const { name, pw } = req.body
    const data = await readData()
    const user = data.users.find(u => u.name === name)
    if (user && await bcrypt.compare(pw, user.passwort)) {
        renderTodoList(res, name, data)
        return
    }
    res.send("Login fehlgeschlagen")
})

// Neues Todo hinzufügen
app.post('/addtodo', async (req, res) => {
    const { name, title, description, dueDate, category } = req.body

    const data = await readData()

    if (!data.userTodoLists[name]) {
        data.userTodoLists[name] = []
    }

    const newTodo = {
        title,
        description: description || "",
        dueDate: dueDate || "",
        category: category || "Allgemein", // Default auf "Allgemein" setzen
        status: "Offen"
    }

    data.userTodoLists[name].push(newTodo)

    // Sortiere die Todos nach Fälligkeit
    data.userTodoLists[name].sort((a, b) => {
        if (a.dueDate < b.dueDate) return -1
        if (a.dueDate > b.dueDate) return 1
        return 0
    })

    await writeData(data)
    renderTodoList(res, name, data)
})

// Status des Todos ändern
app.post('/togglestatus', async (req, res) => {
    const { name, index } = req.body
    const data = await readData()
    const todo = data.userTodoLists[name][index]

    // Toggle den Status zwischen "Offen" und "Erledigt"
    todo.status = todo.status === "Offen" ? "Erledigt" : "Offen"
    await writeData(data)

    renderTodoList(res, name, data)
})

// To-Do-Liste eines Benutzers anzeigen
app.get("/todolist", async (req, res) => {
    const { name } = req.query
    const data = await readData()
    renderTodoList(res, name, data)
})

app.post('/searchtodo', async (req, res) => {
    const { name, query } = req.body;
    const data = await readData();

    const filteredTodos = data.userTodoLists[name].filter(todo => {
        return todo.title.includes(query) ||
               (todo.description && todo.description.includes(query)) ||
               (todo.category && todo.category.includes(query)) || // vorausgesetzt, Ihre Todo-Objekte haben ein "category" Feld
               (todo.dueDate && todo.dueDate.includes(query));
    });

    renderTodoList(res, name, { ...data, userTodoLists: { [name]: filteredTodos } });
});


// Funktion zum Rendern der To-Do-Liste
function renderTodoList(res, name, data) {
    const todoListHtml = data.userTodoLists[name].map((item, index) => `
    <style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        width: 70%;
        margin: auto;
    }
    header {
        background: #50b3a2;
        color: #ffffff;
        padding-top: 30px;
        min-height: 70px;
        border-bottom: #bbb 1px solid;
    }
    header a {
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 16px;
    }
    header ul {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
    }
    header li {
        float: left;
        display: block;
        padding: 0 20px;
        font-size: 16px;
    }
    header #branding {
        float: left;
    }
    header #branding h1 {
        margin: 0;
    }
    header nav {
        float: right;
        margin-top: 10px;
    }
    header .highlight, header .current a {
        color: #e8491d;
        font-weight: bold;
    }
    header a:hover {
        color: #ffffff;
        font-weight: bold;
    }
    #task-input {
        margin-bottom: 20px;
    }
    ul {
        padding: 0;
    }
    li {
        list-style: none;
        background: #fff;
        margin-bottom: 5px;
        padding: 10px;
        cursor: pointer;
    }
    li.done {
        text-decoration: line-through;
        color: #888;
    }
</style>
        <li>
            <strong>${item.title}</strong> - Kategorie: ${item.category}
            ${item.description ? `</br>${item.description}` : ""}
            ${item.dueDate ? `</br>Fällig am: ${item.dueDate}` : ""}
            </br>Status: ${item.status}
            <form method="post" action="/togglestatus">
                <input type="hidden" name="name" value="${name}">
                <input type="hidden" name="index" value="${index}">
                <button type="submit">Status ändern</button>
            </form>
        </li>
    `).join("")

    const userTodoList = `
    <style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        width: 70%;
        margin: auto;
    }
    header {
        background: #50b3a2;
        color: #ffffff;
        padding-top: 30px;
        min-height: 70px;
        border-bottom: #bbb 1px solid;
    }
    header a {
        color: #fff;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 16px;
    }
    header ul {
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
    }
    header li {
        float: left;
        display: block;
        padding: 0 20px;
        font-size: 16px;
    }
    header #branding {
        float: left;
    }
    header #branding h1 {
        margin: 0;
    }
    header nav {
        float: right;
        margin-top: 10px;
    }
    header .highlight, header .current a {
        color: #e8491d;
        font-weight: bold;
    }
    header a:hover {
        color: #ffffff;
        font-weight: bold;
    }
    #task-input {
        margin-bottom: 20px;
    }
    ul {
        padding: 0;
    }
    li {
        list-style: none;
        background: #fff;
        margin-bottom: 5px;
        padding: 10px;
        cursor: pointer;
    }
    li.done {
        text-decoration: line-through;
        color: #888;
    }
</style>
<div class="container">
<header>
        <h2>To-Do-Liste für ${name}</h2>
        </header>
        </br>
        <form method="post" action="/addtodo">
            <input type="hidden" name="name" value="${name}">
            <label for="title">Titel:</label>
            <input name="title" type="text" placeholder="Titel" required></br></br>
            <label for="description">Beschreibung:</label>
            <input name="description" type="text" placeholder="Beschreibung (optional)"></br></br>
            <label for="dueDate">Fälligkeitsdatum:</label>
            <input name="dueDate" type="date"></br></br>
            <label for="category">Kategorie:</label>
            <input name="category" type="text" placeholder="Kategorie (optional)"></br></br>
            <label for="status">Status:</label>
            <select name="status">
                <option value="Offen">Offen</option>
                <option value="Erledigt">Erledigt</option>
            </select>
            <button type="submit">Hinzufügen</button>
        </form>
        <form method="post" action="/searchtodo">
            <input type="hidden" name="name" value="${name}">
            <label for="query">Suche:</label>
            <input name="query" type="text" placeholder="Suche">
            <button type="submit">Suchen</button>
        </form>
        <ul>${todoListHtml}</ul>
    `
    res.send(userTodoList)
}

app.listen(port, () => {
    console.log(`Express-Server hört auf Port ${port}`)
})