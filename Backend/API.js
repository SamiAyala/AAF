import  express from "express";
import { Services } from "./Services.js";
const app = express();
const port = 5000;
app.put('/aaf/editarperfil',async(req,res) => {
    let usuario = Services.updateUsuario(req.body);
    res.status(202).send(usuario);
})

app.use(express.json())
app.post('/aaf/registrarse', async(req,res) =>{
    try{
        console.log(req.body)
        await Services.insertUsuario(req.body);
        res.status(201).json({message: 'Registrado con éxito'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo el registro'})
    }
})
app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})