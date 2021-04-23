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
// Changed '*' to '/' because '*' did not work
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Displays the notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});


// Setting up notes route
app.route("/api/notes")
    // Gets note list
    .get((req, res) => {
        res.json(DB);
    })

    // Adds a new note to db.json
    .post((req, res) => {
        let jsonPath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        // This allows the test note to be the original note.
        let highestId = 99;
        // Loop through the array to find the highest ID.
        for (let i = 0; i < DB.length; i++) {
            let individualNote = DB[i];

            if (individualNote.id > highestId) {
                // highestId will always be the highest numbered id in the notesArray.
                highestId = individualNote.id;
            }
        };
        // This assigns an id to the newNote.
        newNote.id = highestId + 1;

        // Push it to db.json
        DB.push(newNote);

        // Rewrites db.json to add note
        fs.writeFile(jsonPath, JSON.stringify(DB),(err) => {
            if (err) {
                return console.log(err);
            } else {
                console.log("Note saved!!!");
            }
        });
        // Returns user's new note. 
        res.json(newNote);
    });

// Setting up app.delete to remove notes from note pad
app.delete("/api/notes/:id", (req, res) => {
    let jsonPath = path.join(__dirname, "/db/db.json");
    // for loop that uses id to delete note
    for (let i = 0; i < DB.length; i++) {
        if (DB[i].id == req.params.id) {
            // Splice takes i position, and then deletes the 1 note.
            DB.splice(i, 1);
            break;
        }
    }
    // Function to remove note from db.json 
    fs.writeFileSync(jsonPath, JSON.stringify(DB),(err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Note deleted!!!");
        
    });
    res.json(DB);
});

// app.listen to set up the server
app.listen(PORT, () => {
    console.log(`App listening on PORT: http://localhost:${PORT}/`);
});


