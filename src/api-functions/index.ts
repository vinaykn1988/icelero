import express = require("express");
import bodyParser = require("body-parser");
import {Dao} from "../dao/dao";
const serverless: any = require("serverless-http");
const app: express.Express = express();



app.use(bodyParser.json({ strict: true }));


app.post('/data', saveData);
app.get('/data/:id', getData);
app.delete('/data/:id',deleteData);
app.get('/data', getAllData);

async function getAllData(req: express.Request, res: express.Response): Promise<any>{

    let dao = new Dao(process.env.transformations);
    let result;

    try{
        result = await dao.getall();
    }
    catch(err){
        res.status(500).json({error:err});
    }

    res.status(200).json(result);
}

async function deleteData(req: express.Request, res: express.Response): Promise<any> {
    console.log(req.params);

    if(!req.params.id){
        res.status(400).send({error: "send the id to delete the document"})
    }

    let dao = new Dao(process.env.transformations);
    let result;
    try{
        result = await dao.delete(parseInt(req.params.id));
    }
    catch (err){
        res.status(500).json({error: err});
    }

    res.status(200).json(result);
}

async function getData(req: express.Request, res: express.Response): Promise<any> {

    console.log(req.params);

    if(!req.params.id){
        res.status(400).send({error: "send the id to retrive the document"})
    }

    console.log(req.params.id);

    let dao = new Dao(process.env.transformations);
    let result;
    try{
        result = await dao.get(parseInt(req.params.id));
    }
    catch (err){
        res.status(500).json({error: err});
    }

    res.status(200).json(result);

}


async function saveData(req: express.Request, res: express.Response): Promise<any> {

    console.log(req.body);

    if(!req.body){
        res.status(400).send({ error: "No payload data" });
    }
    let dao = new Dao(process.env.transformations);
    let result;
    try{
        result = await dao.save(req.body);
        res.status(200).json(result);
    }
    catch(err){
        res.status(500).json({error: err});
    }    
    
}

module.exports.handler = serverless(app);