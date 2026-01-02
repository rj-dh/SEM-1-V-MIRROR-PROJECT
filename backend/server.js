const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = "./users.json";

// READ users from file
function getUsers() {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

// SAVE users to file
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

/* ---------------- SIGNUP ---------------- */
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.json({ success: false, message: "User already exists" });
    }

    users.push({ username, password });
    saveUsers(users);

    res.json({ success: true });
});

/* ---------------- LOGIN ---------------- */
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();

    const validUser = users.find(
        u => u.username === username && u.password === password
    );

    if (validUser) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

/* ---------------- SERVER ---------------- */
app.listen(3000, () => {
    console.log("Backend running at http://localhost:3000");
});
