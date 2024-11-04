const express = require('express');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
app.set('view engine', 'hbs');
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("working");
});

// Render example routes
app.get('/home', (req, res) => {
    res.render('home', {
        username: "Nitesh",
        posts: "fiana dimkana"
    });
});

app.get('/allusers', (req, res) => {
    res.render('allusers', {
        data: [
            { name: "illu", age: 19 },
            { name: "xyz", age: 17 }
        ]
    });
});

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);  

app.use(errorHandler);

app.use("/api/registerDoctor", require("./routes/doctorsDetails"));

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
