import config from './dbconfig.js';
import sql from 'mssql';
export class Services {

    static login = async(mail,contraseña) =>
    {
        let returnEntity = null;
            let pool = await sql.connect(config)
            let result = await pool.request()
            .input("mail",sql.NVarChar(200),mail)
            .input("contraseña",sql.NVarChar(50),contraseña)
            .query('SELECT * FROM Usuarios WHERE Mail = @mail AND Contraseña = @contraseña');
            if(result.recordsets[0][0]!=null){
                returnEntity = {status:200, objeto: result.recordsets[0][0]};
            } else {
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
        const { Titulo, Descripcion } = curso
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('titulo', sql.NVarChar(50), Titulo)
            .input('descripcion', sql.NVarChar(200), Descripcion)
            .query('INSERT INTO Cursos(titulo,descripcion) VALUES (@titulo,@descripcion)')
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
        const { Contraseña, Nombre, Apellido, FkRol, Telefono, Mail } = Usuario
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('contraseña',sql.NVarChar(50),Contraseña)
            .input('nombre', sql.NVarChar(200), Nombre)
            .input('apellido', sql.NVarChar(200), Apellido)
            .input('fkRol',sql.Int,FkRol)
            .input('Telefono',sql.NVarChar(17),Telefono)
            .input('Mail',sql.NVarChar(200),Mail)
            .query('INSERT INTO Usuarios (Contraseña,Nombre,Apellido,FkRol,Telefono,Mail) VALUES (@contraseña,@nombre,@apellido,@fkRol,@telefono,@mail)')
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