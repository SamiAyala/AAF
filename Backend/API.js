import  express from "express";
import config from './dbconfig.js';
import sql from 'mssql';
import cors from 'cors';
import { Services } from "./Services.js";
const app = express();
const port = 3000;
app.use(cors());
app.post('/Registrarse', async(req,res) =>{
    try{
        console.log(req.body)
        await Services.insert(req.body);
        res.status(201).json({message: 'Pizza creada'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo la cracion'})
    }
})
app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})