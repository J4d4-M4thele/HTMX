import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/users", async (req, res) => {
    const limit = +req.query.limit || 10;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
    const users = await response.json();
    res.send(`
        <h2>Users</h2>
        <ul class="list-group">
            ${users.map((user) => `<li class="list-group-item">${user.name}</li>`).join('')}
        </ul>
    `);
});

app.post("/calculate", (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight/(height * height);
    res.send(`
        <p>Height of ${height}m and Weight of ${weight}kg gives a BMI of ${bmi.toFixed(2)}kg/m²</p>
    `);
});

let currentPrice = 60;

app.get("/get-price", (req, res) => {
    currentPrice = currentPrice + Math.random() * 2 - 1;
    res.send(`$${currentPrice.toFixed(1)}`);
});

app.post("/search", async (req, res) => {
    const searchTerm = req.body.search.toLowerCase();

    if(!searchTerm) {
        return res.send(
            "<tr></tr>"
        );
    }
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();

    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm)
    })

    const searchResultHTML = searchResults.map((user) => {
        `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>`
    }).join('');

    res.send(searchResultHTML)
});

app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});