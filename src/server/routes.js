// Create the routes for the pages
const express = require("express");
const app = express();
const { Pool } = require("pg");
const pool = new Pool({ database: "todo_app" });
var bodyParser = require('body-parser')

app.use(express.static("public"))
app.use(bodyParser.json())



// path to open the index.html in the browser
// http://localhost:3333/index.html
//http://localhost:3333/find_Restaurant_Map.html
app.listen(3333);