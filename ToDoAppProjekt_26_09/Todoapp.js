import express from "express";
import bodyParser from "body-parser";
import fs from "fs/promises"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const form = `
<h1>To Do App Enrico Anna Christoph</h1>
<form method="post" action="/login">
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
`;

const users = [
    { name: "Christoph", passwort: "123" },
    { name: "Bartek", passwort: "456" },
    { name: "Evelyn", passwort: "789" }
];

const userTodoLists = {};
const todoFilePath = "todo.json";

app.get('/', (req, res) => {
    res.send(form);
});

app.get("/register", (req, res) => {
    const registerForm = `
    <h1>Registrierung</h1>
    <form method="post" action="/register">
        <label for="name">Name:</label>
        <input name="name" type="text">
        <label for="pw">Passwort:</label>
        <input name="pw" type="password">
        <button type="submit">Registrieren</button>
    </form>
    <br>
    <a href="/">Zurück zum Login</a>
    `;
    res.send(registerForm);
});

app.get("/login", (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form method="post" action="/login">
        <label for="name">Name:</label>
        <input name="name" type="text">
        <label for="pw">Passwort:</label>
        <input name="pw" type="password">
        <button type="submit">Einloggen</button>
    </form>
    <br>
    <a href="/">Zurück zum Login</a>
    `);
});

app.post("/register", (req, res) => {
    const { name, pw } = req.body;

    if (!name || !pw) {
        res.send("Registrierung fehlgeschlagen. Bitte geben Sie einen Benutzernamen und ein Passwort ein.");
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
    userTodoLists[name] = [];
    res.redirect(`/todolist?name=${name}`);
});

app.post("/login", (req, res) => {
    const { name, pw } = req.body;

    for (let i = 0; i < users.length; i++) {
        if (name === users[i].name && pw === users[i].passwort) {
            if (!userTodoLists[name]) {
                userTodoLists[name] = [];
            }
            const todoList = userTodoLists[name];
            const todoListHtml = todoList.map(item => `<li>${item.title}: ${item.description}</li>`).join("");
            const userTodoList = `
                <h2>Meine To-Do-Liste für ${name}</h2>
                <form method="post" action="/addtodo">
                    <input type="hidden" name="name" value="${name}">
                    <label for="title">Titel:</label>
                    <input name="title" type="text" placeholder="Titel" required>
                    <label for="description">Beschreibung:</label>
                    <input name="description" type="text" placeholder="Beschreibung (optional)">
                    <button type="submit">Hinzufügen</button>
                </form>
                <ul>${todoListHtml}</ul>
            `;
            res.send(`Login erfolgreich ${userTodoList}`);
            return;
        }
    }

    res.send(`Login fehlgeschlagen`);
});

app.get('/', (req, res) => {
    res.send(form);
});

// ... (Die anderen Routen bleiben gleich)

app.post('/addtodo', async (req, res) => {
    const { name, title, description, dueDate, status } = req.body;

    if (!userTodoLists[name]) {
        userTodoLists[name] = [];
    }

    // Erstelle einen neuen Todo-Eintrag mit Titel, Beschreibung, Fälligkeitsdatum und Status
    const newTodo = {
        title,
        description: description || "",
        dueDate: dueDate || "",
        status: status || "To-Do" // Standardmäßig als "To-Do" markieren
    };

    // Füge den neuen Eintrag zur Aufgabenliste hinzu
    userTodoLists[name].push(newTodo);

    // Speichere die Aufgabenliste in der JSON-Datei
    await fs.writeFile(todoFilePath, JSON.stringify(userTodoLists));

    // Die Todo-Liste auf derselben Seite aktualisieren und zurücksenden
    const todoList = userTodoLists[name];
    const todoListHtml = todoList.map(item => `
        <li>
            <strong>${item.title}</strong><br>
            Description: ${item.description}<br>
            Due Date: ${item.dueDate}<br>
            Status: ${item.status}<br>
            <form method="post" action="/markcompleted">
                <input type="hidden" name="name" value="${name}">
                <input type="hidden" name="todoId" value="${item.id}">
                <button type="submit">Als erledigt markieren</button>
            </form>
        </li>
    `).join("");
    
    const userTodoList = `
        <h2>To-Do-Liste für ${name}</h2>
        <form method="post" action="/addtodo">
            <input type="hidden" name="name" value="${name}">
            <label for="title">Titel:</label>
            <input name="title" type="text" placeholder="Titel" required>
            <label for="description">Beschreibung:</label>
            <input name="description" type="text" placeholder="Beschreibung (optional)">
            <label for="dueDate">Fälligkeitsdatum:</label>
            <input name="dueDate" type="text" placeholder="Fälligkeitsdatum">
            <label for="status">Status:</label>
            <input name="status" type="text" placeholder="Status">
            <button type="submit">Hinzufügen</button>
        </form>
        <ul>${todoListHtml}</ul>
    `;

    res.send(`Eintrag erfolgreich hinzugefügt: ${userTodoList}`);
});

app.post("/markcompleted", async (req, res) => {
    const { name, todoId } = req.body;

    // Aktualisiere den Status des Todo-Eintrags auf "Erledigt"
    const todoList = userTodoLists[name];
    const todo = todoList.find(item => item.id === todoId);
    if (todo) {
        todo.status = "Erledigt";

        // Speichere die Aufgabenliste in der JSON-Datei
        await fs.writeFile(todoFilePath, JSON.stringify(userTodoLists));
    }

    // Aktualisiere die lokale Todo-Liste
    const todoListHtml = todoList.map(item => `
        <li>
            <strong>${item.title}</strong><br>
            Description: ${item.description}<br>
            Due Date: ${item.dueDate}<br>
            Status: ${item.status}<br>
            <form method="post" action="/markcompleted">
                <input type="hidden" name="name" value="${name}">
                <input type="hidden" name="todoId" value="${item.id}">
                <button type="submit">Als erledigt markieren</button>
            </form>
        </li>
    `).join("");

    const userTodoList = `
        <h2>To-Do-Liste für ${name}</h2>
        <form method="post" action="/addtodo">
            <input type="hidden" name="name" value="${name}">
            <label for="title">Titel:</label>
            <input name="title" type="text" placeholder="Titel" required>
            <label for="description">Beschreibung:</label>
            <input name="description" type="text" placeholder="Beschreibung (optional)">
            <label for="dueDate">Fälligkeitsdatum:</label>
            <input name="dueDate" type="text" placeholder="Fälligkeitsdatum">
            <label for="status">Status:</label>
            <input name="status" type="text" placeholder="Status">
            <button type="submit">Hinzufügen</button>
        </form>
        <ul>${todoListHtml}</ul>
    `;

    res.send(`Eintrag erfolgreich als erledigt markiert: ${userTodoList}`);
});

app.listen(port, () => {
    console.log(`Express-Server hört auf Port ${port}`);
});