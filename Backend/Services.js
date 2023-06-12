import config from './dbconfig.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';


async function comparePassword(contraseñaPlana, hash) {
    const result = await bcrypt.compare(contraseñaPlana, hash);
    console.log("result:",result);
    return result;
}
export class Services {

    static login = async(mail,contraseña) =>
    {
        let returnEntity = null;
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input("mail",sql.VarChar(200),mail)
        .query('SELECT * FROM Usuarios WHERE Mail = @mail');
        if(typeof result.recordsets[0][0] !== "undefined")
        {
            const valid = await comparePassword(contraseña, result.recordsets[0][0].Contraseña);
            valid ? returnEntity = {status:200, objeto: result.recordsets[0][0]} : returnEntity = {status:404}
        } 
        else {
              returnEntity = {status:404}
        }
        return returnEntity;
    }

    static getAllCursos = async () => 
    {
        let returnEntity = null;
        console.log("Estoy en: GetAll - Cursos");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT * FROM Cursos");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getMaterial = async (idCurso) =>
    {
        let returnEntity = null;
        console.log("Estoy en: getAll - Material");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId",sql.Int, idCurso)
                .query("SELECT * FROM CursoMateriales WHERE IdCurso = @pId");
            returnEntity = result.recordsets[0];
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getProfesores = async () =>
    {
        let returnEntity = null;
        console.log("Estoy en: getProfesores");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT * FROM Usuarios WHERE FkRol=2");
            returnEntity = result.recordsets[0];
        } catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getUserById = async (id) => {
        let returnEntity = null;
        console.log("Estoy en: GetById");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, id)
                .query("SELECT * FROM Usuarios WHERE Id = @pId");
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }

    static insertCurso = async (curso) => {
        console.log("Estoy en: insert - Curso");
        const { Titulo, Descripcion, FkProfesor } = curso
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('titulo', sql.NVarChar(50), Titulo)
            .input('descripcion', sql.NVarChar(200), Descripcion)
            .input('fkProfesor',sql.Int,FkProfesor)
            .query('INSERT INTO Cursos(titulo,descripcion,fkProfesor) VALUES (@titulo,@descripcion,@fkProfesor)')
    }
    static insertMaterial = async (Material) => {
        console.log("Estoy en: insert - Curso");
        const { IdCurso, Imagen, Texto } = Material
        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('idCurso', sql.Int, IdCurso)
            .input('imagen', sql.NVarChar(200), Imagen)
            .input('texto',sql.NVarChar(200),Texto)
            .query('INSERT INTO CursoMateriales (idCurso,imagen,texto) VALUES (@idCurso,@imagen,@texto)')
    }

    static insertUsuario = async (Usuario) => {
        console.log("Estoy en: insert - Curso");
        const { contraseña, nombre, apellido,telefono, mail, fiscalia, oficio } = Usuario;
        const fkRol = 1;
        bcrypt.genSalt(10,(err, salt) => {
            bcrypt.hash(contraseña, salt, async function(err, hash) {
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input('contraseña',sql.NVarChar(200),hash)
            .input('nombre', sql.NVarChar(200), nombre)
            .input('apellido', sql.NVarChar(200), apellido)
            .input('fkRol',sql.Int,fkRol)
            .input('telefono',sql.NVarChar(17),telefono)
            .input('mail',sql.NVarChar(200),mail)
            .input('fiscalia',sql.NVarChar(200),fiscalia)
            .input('oficio',sql.NVarChar(200),oficio)
            .query('INSERT INTO Usuarios (Contraseña,Nombre,Apellido,FkRol,Telefono,Mail,Fiscalia,Oficio) VALUES (@contraseña,@nombre,@apellido,@fkRol,@telefono,@mail,@fiscalia,@oficio)')
            });
        })
    }

    static updateUsuario = async (usuario) => {
        const { Id, Contraseña, Nombre, Apellido, FkRol, Telefono, Mail } = usuario
        let returnEntity = null;
        console.log("Estoy en: update");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, Id)
                .input('contraseña',sql.NVarChar(50),Contraseña)
                .input('nombre', sql.NVarChar(50), Nombre)
                .input('apellido', sql.NVarChar(50), Apellido)
                .input('fkRol', sql.Int, FkRol)
                .input('telefono', sql.NVarChar(15), Telefono)
                .input('mail', sql.NVarChar(50), Mail)
                .query('UPDATE Usuarios SET Contraseña = @contraseña, Nombre = @nombre, Apellido = @apellido, fkRol = @fkRol, Telefono = @telefono, Mail = @mail WHERE Usuarios.Id = @pId')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static convertirUsuario = async (id,rol) => {
        let returnEntity = null;
        console.log("Estoy en: updateRol");
        console.log(id,rol)
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .input('fkRol', sql.Int, rol)
                .query('UPDATE Usuarios SET FkRol = @fkRol WHERE Usuarios.Id = @pId')
            returnEntity = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        console.log(returnEntity);
        return returnEntity;
    }

    static updateProfesor = async (idProfesor,idCurso) => {
        let returnEntity = null;
        console.log("Estoy en: updateProfesor");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('idProfesor', sql.Int, idProfesor)
                .input('idCurso',sql.Int, idCurso)
                .query('UPDATE Cursos SET fkProfesor = @IdProfesor WHERE Id = @IdCurso')
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }


    static deleteUsuario = async (id) => {
        let returnEntity = null;
        console.log("Estoy en: delete - Usuario");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, id)
                .query("Delete FROM Usuarios WHERE id = @pId");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static deleteCurso = async (id) => {
        let returnEntity = null;
        console.log("Estoy en: delete - Curso");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, id)
                .query("Delete FROM Cursos WHERE id = @pId");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}