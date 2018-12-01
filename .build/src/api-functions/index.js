"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const dao_1 = require("../dao/dao");
const serverless = require("serverless-http");
const app = express();
app.use(bodyParser.json({ strict: true }));
app.post('/data', saveData);
app.get('/data/:id', getData);
app.delete('/data/:id', deleteData);
app.get('/data', getAllData);
async function getAllData(req, res) {
    let dao = new dao_1.Dao(process.env.transformations);
    let result;
    try {
        result = await dao.getall();
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
    res.status(200).json(result);
}
async function deleteData(req, res) {
    console.log(req.params);
    if (!req.params.id) {
        res.status(400).send({ error: "send the id to delete the document" });
    }
    let dao = new dao_1.Dao(process.env.transformations);
    let result;
    try {
        result = await dao.delete(parseInt(req.params.id));
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
    res.status(200).json(result);
}
async function getData(req, res) {
    console.log(req.params);
    if (!req.params.id) {
        res.status(400).send({ error: "send the id to retrive the document" });
    }
    console.log(req.params.id);
    let dao = new dao_1.Dao(process.env.transformations);
    let result;
    try {
        result = await dao.get(parseInt(req.params.id));
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
    res.status(200).json(result);
}
async function saveData(req, res) {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({ error: "No payload data" });
    }
    let dao = new dao_1.Dao(process.env.transformations);
    let result;
    try {
        result = await dao.save(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}
module.exports.handler = serverless(app);
//# sourceMappingURL=index.js.map