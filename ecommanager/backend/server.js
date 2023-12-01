// server.js
const express = require('express');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());

// Initialize the SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE products (id INT, title TEXT, price REAL, description TEXT, category TEXT, image TEXT, rate REAL, count INT)");

    axios.get('https://fakestoreapi.com/products')
        .then(response => {
            const stmt = db.prepare("INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            response.data.forEach(product => {
                stmt.run(product.id, product.title, product.price, product.description, product.category, product.image, product.rating.rate, product.rating.count);
            });
            stmt.finalize();
        });
});



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// In your backend server.js

app.get('/products', (req, res) => {
    let query = "SELECT * FROM products";
    const params = [];

    if (req.query.search) {
        query += " WHERE title LIKE ?";
        
        params.push(`%${req.query.search}%`);
    }

    // Add more filters as needed

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).send("Error in database operation");
        } else {
            res.json(rows);
        }
    });
});
