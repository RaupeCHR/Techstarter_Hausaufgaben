import express from "express";
import bodyParser from "body-parser";

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

app.post('/addtodo', (req, res) => {
    const { name, title, description } = req.body;

    if (!userTodoLists[name]) {
        userTodoLists[name] = [];
    }

    // Erstelle einen neuen Todo-Eintrag mit Titel und optionaler Beschreibung
    const newTodo = {
        title,
        description: description || "",
    };

    userTodoLists[name].push(newTodo);

    // Die Todo-Liste auf derselben Seite aktualisieren und zurücksenden
    const todoList = userTodoLists[name];
    const todoListHtml = todoList.map(item => `
        <li>
            <strong>${item.title}</strong>
            ${item.description ? `<br>${item.description}` : ""}
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
            <button type="submit">Hinzufügen</button>
        </form>
        <ul>${todoListHtml}</ul>
    `;

    res.send(`Eintrag erfolgreich hinzugefügt: ${userTodoList}`);
});

app.get("/todolist", (req, res) => {
    const { name } = req.query;
    const todoList = userTodoLists[name] || [];
    const todoListHtml = todoList.map(item => `
        <li>
            <strong>${item.title}</strong>
            ${item.description ? `<br>${item.description}` : ""}
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
            <button type="submit">Hinzufügen</button>
        </form>
        <ul>${todoListHtml}</ul>
    `;

    res.send(userTodoList);
});

app.listen(port, () => {
    console.log(`Express-Server hört auf Port ${port}`);
});
