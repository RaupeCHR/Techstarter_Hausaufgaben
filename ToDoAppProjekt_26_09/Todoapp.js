import express from "express";
import bodyParser from "body-parser";
import fs from "fs/promises"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const form = `
<div class="container">
    <h1>To Do App Enrico Anna Christoph</h1>
    <form method="post" action="/login" class="login-form">
        <label for="name">Name:</label>
        <input name="name" type="text" class="input-field">
        <label for="pw">Passwort:</label>
        <input name="pw" type="password" class="input-field">
        <button type="submit" class="btn login-btn">Login</button>
    </form>
    <br>
    <form method="get" action="/register" class="register-form">
        <button type="submit" class="btn register-btn">Zur Registrierung</button>
    </form>
</div>
`;

const users = [
    { name: "Christoph", passwort: "123" },
    { name: "Enrico", passwort: "456" },
    { name: "Anna", passwort: "789" }
];

const userTodoLists = {};
const todoFilePath = "todo.json";

app.get('/', (req, res) => {
    res.send(form);
});

app.get("/register", (req, res) => {
    const registerForm = `
    <h1 class="form-title">Registrierung</h1>
<form method="post" action="/register" class="registration-form">
    <label for="name" class="form-label">Name:</label>
    <input name="name" type="text" class="form-input">
    <label for="pw" class="form-label">Passwort:</label>
    <input name="pw" type="password" class="form-input">
    <button type="submit" class="form-button">Registrieren</button>
</form>
<br>
<a href="/" class="form-link">Zurück zum Login</a>
    `;
    res.send(registerForm);
});

app.get("/login", (req, res) => {
    res.send(`
    <h1 class="form-title">Login</h1>
<form method="post" action="/login" class="login-form">
    <label for="name" class="form-label">Name:</label>
    <input name="name" type="text" class="form-input">
    <label for="pw" class="form-label">Passwort:</label>
    <input name="pw" type="password" class="form-input">
    <button type="submit" class="form-button">Einloggen</button>
</form>
<br>
<a href="/" class="form-link">Zurück zum Login</a>
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
            <h2 class="todo-list-header">Meine To-Do-Liste für ${name}</h2>
            <form class="todo-form" method="post" action="/addtodo">
                <input type="hidden" name="name" value="${name}">
                <label for="title">Titel:</label>
                <input class="todo-input" name="title" type="text" placeholder="Titel" required>
                <label for="description">Beschreibung:</label>
                <input class="todo-input" name="description" type="text" placeholder="Beschreibung (optional)">
                <button class="todo-button" type="submit">Hinzufügen</button>
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
    <li class="todo-item">
        <strong class="todo-item-title">${item.title}</strong><br>
        <span class="todo-item-description">Description: ${item.description}</span><br>
        <span class="todo-item-due-date">Due Date: ${item.dueDate}</span><br>
        <span class="todo-item-status">Status: ${item.status}</span><br>
        <form class="todo-form" method="post" action="/markcompleted">
            <input type="hidden" name="name" value="${name}">
            <input type="hidden" name="todoId" value="${item.id}">
            <button class="todo-button" type="submit">Als erledigt markieren</button>
        </form>
    </li>
    `).join("");
    
    const userTodoList = `
    <h2 class="todo-list-title">To-Do-Liste für ${name}</h2>
    <form class="todo-form" method="post" action="/addtodo">
        <input type="hidden" name="name" value="${name}">
        <label for="title">Titel:</label>
        <input class="todo-input" name="title" type="text" placeholder="Titel" required>
        <label for="description">Beschreibung:</label>
        <input class="todo-input" name="description" type="text" placeholder="Beschreibung (optional)">
        <label for="dueDate">Fälligkeitsdatum:</label>
        <input class="todo-input" name="dueDate" type="text" placeholder="Fälligkeitsdatum">
        <label for="status">Status:</label>
        <input class="todo-input" name="status" type="text" placeholder="Status">
        <button class="todo-button" type="submit">Hinzufügen</button>
    </form>
    <ul class="todo-list">${todoListHtml}</ul>
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
    <div class="todo-container">
    <h2 class="todo-header">To-Do-Liste für ${name}</h2>
    <form method="post" action="/addtodo" class="todo-form">
        <input type="hidden" name="name" value="${name}">
        <div class="todo-form-field">
            <label for="title" class="todo-label">Titel:</label>
            <input name="title" type="text" class="todo-input" placeholder="Titel" required>
        </div>
        <div class="todo-form-field">
            <label for="description" class="todo-label">Beschreibung:</label>
            <input name="description" type="text" class="todo-input" placeholder="Beschreibung (optional)">
        </div>
        <div class="todo-form-field">
            <label for="dueDate" class="todo-label">Fälligkeitsdatum:</label>
            <input name="dueDate" type="text" class="todo-input" placeholder="Fälligkeitsdatum">
        </div>
        <div class="todo-form-field">
            <label for="status" class="todo-label">Status:</label>
            <input name="status" type="text" class="todo-input" placeholder="Status">
        </div>
        <button type="submit" class="todo-button">Hinzufügen</button>
    </form>
    <ul class="todo-list">${todoListHtml}</ul>
</div>

    `;

    res.send(`Eintrag erfolgreich als erledigt markiert: ${userTodoList}`);
});

app.listen(port, () => {
    console.log(`Express-Server hört auf Port ${port}`);
});