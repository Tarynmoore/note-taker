const path = require('path');
const fs = require('fs');

const express = require('express');
const PORT = 3001;
const app = express();

const db = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Get requests for the public html's 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Get the notes from the post request 
app.get('/api/notes', (req, res) => {
    console.log(db)
    res.json(db); 
})


app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };
        db.push(newNote);

        const response = {
            status: 'success',
            body: newNote
        }
        res.json(db);
        console.log(response);
        fs.writeFileSync('./db/db.json', JSON.stringify(db));
       
    } 
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, () => {
    console.log(`Listen at localhost: ${PORT}`);
});

