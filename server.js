import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/users", (req, res) => {
    const users = [
        { id: 1, name: "Jane Doe" },
        { id: 2, name: "Gabby Halie" },
        { id: 3, name: "Matilda Botha" }
    ];
    res.send(`
        <h2>Users</h2>
        <ul class="list-group">
            ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
        </ul>
    `);
});

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});