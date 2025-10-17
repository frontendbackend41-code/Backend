const serverless = require('serverless-http');
const app = require('../src/app');
const express = require("express");
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola desde vercel")
});


module.exports.handler = serverless(app);

