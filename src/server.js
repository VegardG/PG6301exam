
const express = require('express');
const cors = require('cors');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8000;

const uri = 'mongodb+srv://admin:haha@cluster0.42agqtn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

const users = [
    {username: 'employee1', password: 'employee1', role: 'employee'},
    {username: 'manager1', password: 'manager1', role: 'manager'},
];

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Connecting to the database');
        await client.connect();
        console.log('Connected to the database');

        const user = users.find(user => user.username === username);
        const collection = client.db('alleansatte').collection('brukere');

        // Check if the user exists
        //const user = await collection.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User do not exist' });
        }

        // Check if the password is correct
        /*const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(404).json({ error: 'Wrong password' });
        }*/
        if (password !== user.password) {
            return res.status(404).json({ error: 'Wrong password'});
        }

        // Sign the JWT token and return it to the client
        const token = jwt.sign({ sub: user._id, role: user.role }, 'secretkey');
        res.json({ token, role: user.role });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        //await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});