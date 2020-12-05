const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const whitelist = ['http://localhost',
    'http://localhost:8080',
    'http://localhost:8000',
    'http://localhost:80'
];

const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        console.log(origin);
        if (whitelist.includes(origin)) {
            return callback(null, true)
        }
        callback(new Error('Not allowed by CORS'));
    }
}

//app.use(cors(corsOptions));
app.use(cors());

app.use(session({
    secret: "Wok Tow3l",
    resave: false,
    saveUninitialized: true
}));

/* Parse Cookie header and populate req.cookies with
 * an object keyed by the cookie names. */
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*  All your middleware has to be setup before you define and configure */
/*  your routes */

app.use(express.json());

const MongoClient = require('mongodb').MongoClient;

const client = MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

client.connect(err => {
    if (err) {
        throw err;
    }
    console.log(`${new Date().toLocaleString()}: Connected successfully to server`);
});

const fashionAppDb = client.db('fashionAppDb');

app.get("/ping", (req, res) => {
  console.log('hi')
    res.send('Pong!');
});

app.post("/user", (req, res) => {
    fashionAppDb.collection('users').insertOne({
        email: req.body.email,
        username: req.body.username,
        photoURL: "",
        likes: {
          temp: {
            tempLike: true
          }
        }
    }, ).then(
        res => console.log(`Added ${res.result.n} documents`),
        err => {
          res.send(err);
          console.error(`Something went wrong: ${err}`)
          return;
        },
        console.log(`${new Date().toLocaleString()} Insertion complete.`)
    );

    res.send("true");
});

// app.put("/edit/:target", (req, res) => {
//     let query = {
//         id: req.params.target
//     };
//     let newItem = {
//         $set: {
//             "description": req.body.description
//         }
//     };
//
//     fashionAppDb.collection("thoughts").updateOne(query, newItem).then(
//         res => console.log(`Updated ${res.result.n} documents`),
//         err => console.error(`Something went wrong: ${err}`),
//         console.log(`${new Date().toLocaleString()} Insertion complete.`)
//     );
//
//     res.send('true');
// })
//
// app.get("/get", (req, res) => {
//     fashionAppDb.collection("thoughts").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         res.send(result);
//     });
// })
//

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Todo (server) is listening at http://localhost:${port}`);
});
