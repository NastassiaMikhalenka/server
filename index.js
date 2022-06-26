const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
});

const PORT = 4444;

app.listen(PORT, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(`Server started on port ${PORT}`);
});