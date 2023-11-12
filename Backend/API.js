import  express from "express";
import { Services } from "./Services.js";
import cors from 'cors';


const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())


//GET

app.get('/aaf/getPerfil/:id',async(req,res)=>{
    const perfil = await Services.getUserById(req.params.id);
    res.status(200).send(perfil);
})
app.get('/aaf/getClases/:id',async(req,res)=>{
    const Clase = await Services.getClase(req.params.id);
    res.status(200).send(Clase);
})

app.get('/aaf/getUsers',async(req,res) =>{
   try{
        const usuarios = await Services.getAllUsers();
        res.status(200).send(usuarios)
    } catch (error){
        res.status(500).send(error)
     }
})

app.get('/aaf/getMails',async(req,res) => {
    try{
        const mails = await Services.getMails();
        res.status(200).send(mails)
    }catch(error){
        res.status(500).send(error)
    }
})

app.get('/aaf/getAlumnos/:idCurso',async(req,res) =>{
    try{
        console.log("en la api",req.params.idCurso)
         const alumnos = await Services.getAlumnos(req.params.idCurso);
         res.status(200).send(alumnos);
     } catch (error){
         res.status(500).send(error);
      }
 })
 app.get('/aaf/getAsistencia/:idClase',async(req,res) =>{
    try{
        console.log("en la api",req.params.idClase)
         const usuarios = await Services.getAsistencia(req.params.idClase);
         res.status(200).send(usuarios);
     } catch (error){
         res.status(500).send(error);
      }
 })
app.get('/aaf/getCursos',async(req,res) =>{
    try{
         const cursos = await Services.getAllCursos();
         res.status(200).send(cursos)
     } catch (error){
         res.status(500).send(error)
      }
 })
 app.get('/aaf/getMisCursos/:id',async(req,res) =>{
    try{
         const cursos = await Services.getMisCursos(req.params.id);
         res.status(200).send(cursos)
     } catch (error){
         res.status(500).send(error)
      }
 })

 app.get('/aaf/getUsersCurso',async(req,res) =>{
    try{
         const usuarios = await Services.getUsersCurso();
         res.status(200).send(usuarios)
     } catch (error){
         res.status(500).send(error)
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

app.get('/aaf/getMaterial/:id',async(req,res) =>{
    console.log("Estoy en: get - material");
    try{
        console.log("req.params",req.params)
        const material = await Services.getMaterial(req.params.id);
        res.status(200).send(material);
    } catch(error){
        console.log(error);
        res.status(500);
    }
})

//POST

app.post("/aaf/anotarAlumno",async(req,res) =>{
    console.log("req.body",req.body);
    let idCurso = req.body.Id;
    let idAlumno = req.body.idUsuario;
    const respuesta = await Services.anotarAlumno(idAlumno,idCurso);
    res.status(200).send(respuesta);
    console.log("respuesta",respuesta);
})

app.post("/aaf/tomarLista",async(req,res) =>{
    console.log("req.body",req.body);
    let idAlumno = req.body.idUsuario;
    let idClase = req.body.idClase;
    let asistencia = req.body.asistencia;
    const respuesta = await Services.tomarAsistencia(idAlumno,asistencia,idClase);
    res.status(200).send(respuesta);
    console.log("respuesta",respuesta);
})

app.post('/aaf/login', async(req, res) => {
	let mail = req.body.mail;
	let contraseña = req.body.contraseña;
    if (mail && contraseña) {
        const respuesta = await Services.login(mail,contraseña);
		res.status(respuesta.status).send(respuesta.objeto);
	} else {
		res.status(400).send("Mail o contraseña invalidos");
	}
})

app.post('/aaf/registrarse', async(req,res) =>{
    try{
        const perfil = await Services.insertUsuario(req.body);
        console.log("perfil",perfil);
        res.status(201).send(perfil);
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

app.post('/aaf/insertMaterial',async(req,res) => {
    try{
        await Services.insertMaterial(req.body.values, req.body.id)
        res.status(201).json({message:'creado con éxito'})
    } catch(error){
        console.log(error);
        res.status(500).json({error:'fallo la creación'})
    }
})

app.post('/aaf/insertClase',async(req,res) => {
    try{
        await Services.insertClase(req.body.values, req.body.id)
        res.status(201).json({message:'creado con éxito'})
    } catch(error){
        console.log(error);
        res.status(500).json({error:'fallo la creación'})
    }
})

//PUT

app.put('/aaf/editarFoto',async(req,res)=>{
    let id = req.body.id;
    let url = req.body.url;
    const result = Services.updateFoto(id,url);
    res.status(202).send(result);
})

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


app.put('/aaf/asignarProfesor',async(req,res) =>{
    let idProfesor = req.body.idProfesor;
	let idCurso = req.body.idCurso;
    console.log("idProfesor",idProfesor);
    console.log("idCurso",idCurso);
    let curso = await Services.updateProfesor(idProfesor,idCurso);
    res.status(202).send(curso);
})

app.put('/aaf/cambiarLinkZoom',async(req,res) => {
    let link = req.body.link;
    let idCurso = req.body.idCurso;
    console.log("link",link);
    let curso = await Services.updateLink(link,idCurso);
    res.status(202).send(curso);
})

//DELETE

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