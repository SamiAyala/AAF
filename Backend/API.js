import  express from "express";
import { Services } from "./Services.js";
const app = express();
const port = 5000;
app.use(express.json());
//Test
app.get('/aaf/getPerfil/:id',async(req,res)=>{
    const perfil = await Services.getUserById(req.params.id);
    res.status(200).send(perfil);
})

//Sprint:
app.post('/login', async(req, res) => {
	let mail = req.body.Mail;
	let contraseña = req.body.Contraseña;
    if (mail && contraseña) {
        const respuesta = await Services.login(mail,contraseña);
		res.send(respuesta);
	} else {
		res.send('Porfavor ingrese el mail y la contraseña!');
		res.end();
	}
});

app.put('/aaf/editarperfil',async(req,res) => {
    let usuario = Services.updateUsuario(req.body);
    res.status(202).send(usuario);
})

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