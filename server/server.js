const express = require('express');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' }) // for direct storage
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
        username: "xyz",
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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  const upload = multer({ storage: storage })



// multer
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/home");
  })


app.use("/api/registerDoctor", require("./routes/doctorsDetails"));

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
