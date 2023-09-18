import  express from "express";
import { Services } from "./Services.js";
import cors from 'cors';


const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())

app.get('/aaf/getPerfil/:id',async(req,res)=>{
    const perfil = await Services.getUserById(req.params.id);
    res.status(200).send(perfil);
});

app.get('/aaf/getUsers',async(req,res) =>{
   try{
        const usuarios = await Services.getAllUsers();
        res.status(200).send(usuarios)
    } catch (error){
        res.status(500).send(error)
     }
});

app.get('/aaf/getAlumnos',async(req,res) =>{
    try{
         const alumnos = await Services.getAlumnos(req.body.idCurso);
         res.status(200).send(alumnos);
     } catch (error){
         res.status(500).send(error);
      }
 });

app.get('/aaf/getCursos',async(req,res) =>{
    try{
         const cursos = await Services.getAllCursos();
         res.status(200).send(cursos)
     } catch (error){
         res.status(500).send(error)
      }
 });

app.post('/aaf/login', async(req, res) => {
	let mail = req.body.mail;
	let contraseña = req.body.contraseña;
    console.log("mail: ",mail, "contraseña: ",contraseña);
    if (mail && contraseña) {
        const respuesta = await Services.login(mail,contraseña);
		res.status(respuesta.status).send(respuesta.objeto);
	} else {
		res.status(400).send("Mail o contraseña invalidos");
	}
});

app.put('/aaf/editarperfil',async(req,res) => {
    let usuario = Services.updateUsuario(req.body);
    res.status(202).send(usuario);
})

app.put('/aaf/convertirUsuario',async(req,res)=> {
    let id = req.body.id;
    let rol = req.body.rol;
    const result = Services.convertirUsuario(id,rol);
    res.status(202).send(result);
})

app.post('/aaf/registrarse', async(req,res) =>{
    try{
        await Services.insertUsuario(req.body);
        res.status(201).json({message: 'Registrado con éxito'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo el registro'})
    }
})
app.post('/aaf/crearCurso', async(req,res) =>{
    try{
        await Services.insertCurso(req.body);
        res.status(201).json({message: 'Creado con éxito'})
    } catch (error){
        console.log(error)
        res.status(500).json({error : 'Fallo la cracion'})
    }
})

app.get('/aaf/getProfesores',async(req,res) =>{
    try{
        const profesores = await Services.getProfesores();
        res.status(200).send(profesores)
    } catch (error){
        console.log(error);
        res.status(500)
    }
})

app.get('/aaf/getNoticias',async(req,res) =>{
    try{
        const noticias = await Services.getNoticias();
        res.status(200).send(noticias)
    } catch(error){
        console.log(error);
        res.status(500);
    }
})

app.put('/aaf/asignarProfesor',async(req,res) =>{
    let idProfesor = req.body.idProfesor;
	let idCurso = req.body.idCurso;
    console.log("idProfesor",idProfesor);
    console.log("idCurso",idCurso);
    let curso = await Services.updateProfesor(idProfesor,idCurso);
    res.status(202).send(curso);
})

app.post('/aaf/crearCurso',async(req,res) =>{
    try{
        console.log(req.body)
        await Services.insertCurso(req.body)
        res.status(201).json({message:'Creado con éxito'})
    } catch(error){
        console.log(error)
        res.status(500).json({error:'fallo la creación'})
    }
})

app.post('/aaf/crearNoticia',async(req,res) => {
    try{
        await Services.insertNoticia(req.body)
        res.status(201).json({message:'creado con éxito'})
    } catch(error){
        console.log(error);
        res.status(500).json({error:'fallo la creación'})
    }
})

app.delete('/aaf/eliminarCurso/:Id',async(req,res) =>{
    try{
        await Services.deleteCurso(req.params.Id);
        res.status(200).json({message:'eliminado con éxito'});
    } catch(error){
        console.log(error);
        res.status(500).json({error:'fallo la eliminación'})
    }
})
app.delete('/aaf/eliminarUsuario/:Id',async(req,res) =>{
    try{
        await Services.deleteUsuario(req.params.Id);
        res.status(200).json({message:'eliminado con éxito'});
    } catch(error){
        console.log(error);
        res.status(500).json({error:'fallo la eliminación'})
    }
})

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`)
})