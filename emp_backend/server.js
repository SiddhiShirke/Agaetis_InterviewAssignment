require("dotenv").config();
const express = require('express');
const cors = require("cors");
const routes = require("../emp_backend/routes/emp_routes");
const pool = require("../emp_backend/config/db");
const app = express();
app.use(express.json());
app.use(cors());

app.use('/',routes);

app.listen(5000, "127.0.0.1", () => {
    console.log("Server running at http://127.0.0.1:5000");
});
