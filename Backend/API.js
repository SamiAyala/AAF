import  express from "express";
import { Services } from "./Services.js";
import cors from 'cors';

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())

//Test
app.get('/aaf/getPerfil/:id',async(req,res)=>{
    const perfil = await Services.getUserById(req.params.id);
    res.status(200).send(perfil);
})

//Sprint:
app.post('/aaf/login', async(req, res) => {
	let mail = req.body.mail;
	let contraseña = req.body.contraseña;
    console.log(req.body)
    if (mail && contraseña) {
        const respuesta = await Services.login(mail,contraseña);
        console.log(respuesta, respuesta.objeto)
		res.status(respuesta.status).send(respuesta.objeto);
	} else {
		res.status(400).send("Mail o contraseña invalidos");
	}
});

app.put('/aaf/editarperfil',async(req,res) => {
    let usuario = Services.updateUsuario(req.body);
    res.status(202).send(usuario);
})

app.post('/aaf/registrarse', async(req,res) =>{
    console.log(req.body)
    try{
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