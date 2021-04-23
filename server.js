// Declare dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const DB = require("./db/db")

// Express configuration and PORT 
const app = express();
const PORT = process.env.PORT || 8080;

// Links Express to assets in public folder
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Below code handles when users visit each of the pages.
// In each of the below cases the user is shown an HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Displays the notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});





// app.listen to set up the server
app.listen(PORT, () => {
    console.log(`App listening on PORT: http://localhost:${PORT}/`);
});


