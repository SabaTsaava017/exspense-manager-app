const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let expenses = [];

app.post('/expenses', (req, res) => {
    const { id, name, cost, createdAt } = req.body;
    expenses.push({ id, name, cost, createdAt });
    res.json({ message: 'Expense added successfully' });
});

app.get('/expenses', (req, res) => {
    res.json({ expenses });
});


app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;
    expenses = expenses.filter(expense => expense.id !== id);
    res.json({ message: 'Expense deleted successfully' });
});


app.get('/dynamic-page/:id', (req, res) => {
    const id = req.params.id;
    const expense = expenses.find(expense => expense.id === id);
    if (expense) {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Expense Details</title>
            </head>
            <body>
                <h1>Expense Details</h1>
                <p>ID: ${expense.id}</p>
                <p>Name: ${expense.name}</p>
                <p>Cost: ${expense.cost}</p>
                <p>Created At: ${expense.createdAt}</p>
            </body>
            </html>
        `);
    } else {
        res.status(404).send('Expense not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});