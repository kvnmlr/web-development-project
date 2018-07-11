const express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    {Pool} = require('pg'),
    connectionString = 'postgresql://postgres:root@localhost:5432/webdev',
    pool = new Pool({connectionString: connectionString});

const app = express();
const router = express.Router();

app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log("%s %s %s", req.method, req.url, req.path);
    next();
});

router.route("/people/").get(function (req, res) {
    let searchTerm = req.query.search;
    console.log("Search for: " + searchTerm);
    //pool.query('SELECT * FROM student WHERE username LIKE $1', ['%' + searchTerm + '%'], (err, searchResult) => {
    pool.query('SELECT * FROM lecture', (err, searchResult) => {
        if (err) {
            console.log(err.stack);
            res.json(err.json);
        } else {
            if (searchResult.rows.length > 0) {
                console.log('found:', searchResult.rows[0]);
            }
            let results = {results: searchResult.rows};
            res.json(results);

        }
    });
});

router.route("/lectures").get(function (req, res) {
    let searchTerm = req.query.search;
    console.log("Query all lectures");
    //pool.query('SELECT * FROM student WHERE username LIKE $1', ['%' + searchTerm + '%'], (err, searchResult) => {
    pool.query('SELECT * FROM lecture', (err, searchResult) => {
        if (err) {
            console.log(err.stack);
            res.json(err.json);
        } else {
            if (searchResult.rows.length > 0) {
                console.log('found:', JSON.stringify(searchResult.rows));
            }
            let results = {results: searchResult.rows};
            res.json(results);
        }
    });
});

app.use('/api', router);

app.listen(5300);
console.log("Listening on pert 5300");