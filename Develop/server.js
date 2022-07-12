const path = require('path');
const fs = require('fs');
const uuid = require('uuid'); 

const express = require('express');
const PORT = 3001;
const app = express();

const db = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, './public/index.html'));
    console.log('here');
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
    console.log('there');
});

app.get('/api/notes', (req, res) => {
    console.log(db)
    res.json(db); 
})

app.post('/api/notes', (req, res) => {
    console.log("everywhere");
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };
        db.push(newNote);
        // const noteString = JSON.stringify(newNote)
        
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

