import config from './dbconfig.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';


async function comparePassword(contraseñaPlana, hash) {
    const result = await bcrypt.compare(contraseñaPlana, hash);
    return result;
}
export class Services {

    static login = async (mail, contraseña) => {
        let returnEntity = null;
        console.log("mail: ", mail, " contraseña: ",contraseña)
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input("mail", sql.VarChar(200), mail)
            .query('SELECT * FROM Usuarios WHERE Mail = @mail');
        if (typeof result.recordsets[0][0] !== "undefined") {
            const valid = await comparePassword(contraseña, result.recordsets[0][0].Contrasenia);
            valid ? returnEntity = { status: 200, objeto: result.recordsets[0][0] } : returnEntity = { status: 404 }
        }
        else {
            returnEntity = { status: 404 }
        }
        return returnEntity;
    }


    static getAllCursos = async () => {
        let returnEntity = null;
        console.log("Estoy en: GetAll - Cursos");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT Cursos.Id, Cursos.Titulo, Cursos.Descripcion, Cursos.fkProfesor, (SELECT Concat(Usuarios.Nombre, ' ', Usuarios.Apellido) FROM Usuarios WHERE Usuarios.Id = Cursos.fkProfesor) AS NombreProfesor FROM Cursos");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAlumnos = async (idCurso) => {
        let returnEntity = null;
        console.log("Estoy en: GetAll - Alumnos");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, idCurso)
                .query("select U.* from Usuarios U inner join CursoUsuarios CU on CU.idCurso = @pId WHERE U.Id = CU.IdUsuario");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getMaterial = async (idCurso) => {
        let returnEntity = null;
        console.log("Estoy en: getAll - Material");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input("pId", sql.Int, idCurso)
                .query("SELECT * FROM CursoMateriales INNER JOIN Cursos ON Cursos.Id = CursoMateriales.IdCurso WHERE IdCurso = @pId");
            returnEntity = result.recordset[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getProfesores = async () => {
        let returnEntity = null;
        console.log("Estoy en: getProfesores");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT * FROM Usuarios WHERE FkRol=2");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getNoticias = async () => {
        let returnEntity = null;
        console.log("Estoy en: get - Noticias");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT * FROM ArticuloNoticia ORDER BY fecha desc");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllUsers = async () => {
        let returnEntity = null;
        console.log("Estoy en: GetAllUsers");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT Usuarios.Id, Usuarios.Nombre, Usuarios.Apellido, Usuarios.contrasenia, Usuarios.Telefono, Usuarios.Mail, Usuarios.Fiscalia, Usuarios.Oficio, Roles.Descripcion AS Rol FROM Usuarios INNER JOIN Roles ON Usuarios.FkRol = Roles.Id");
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
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
    static getUsersCurso = async (IdCurso) => {
        let returnEntity = null;
        console.log("Estoy en: GetAllUsers");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .query("SELECT Usuarios.* FROM Usuarios INNER JOIN CursoUsuarios ON CursoUsuarios.IdUsuario = Usuarios.Id WHERE CursoUsuarios.IdCurso = @IdCurso")
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity
    }
    static insertCurso = async (curso) => {
        console.log("Estoy en: insert - Curso");
        const { titulo, descripcion } = curso
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input('titulo', sql.NVarChar(99999), titulo)
            .input('descripcion', sql.NVarChar(200), descripcion)
            .query('INSERT INTO Cursos (Titulo,Descripcion) VALUES (@titulo,@descripcion)')
    }

    static insertNoticia = async (noticia) => {
        console.log("Estoy en: insert - Noticia");
        const { titulo, texto, imagen, fecha, footer } = noticia;
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('titulo', sql.NVarChar(50), titulo)
            .input('texto', sql.NVarChar(200), texto)
            .input('imagen', sql.NVarChar(200), imagen)
            .input('fecha', sql.Date, fecha)
            .input('footer', sql.NVarChar(50), footer)
            .query('insert into ArticuloNoticia (Titulo, Texto, Imagen, Fecha, Footer) VALUES (@titulo,@texto,@imagen,@fecha,@footer)')
    }
    static anotarAlumno = async (idAlumno,idCurso) => {
        console.log("idCurso",idCurso)
        console.log("idAlumno",idAlumno)
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('pIdC',sql.Int,idCurso)
        .input('pIdA',sql.Int,idAlumno)
        .query('insert into CursoUsuarios (IdCurso,IdUsuario) VALUES (@pIdC,@pIdA)');
        return result.rowsAffected;
    }
    
    static tomarAsistencia = async (idAlumno, idCurso, asistencia, fecha) =>{
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input("pIdAlumno",sql.Int,idAlumno)
        .input("pIdCurso",sql.Int,idCurso)
        .input("pAsistencia", sql.Bit,asistencia)
        .query("insert into Asistencia (IdUsuarios,IdCurso,Asistencia) VALUES (@pIdAlumno,@pIdClase,@pAsistencia)");
    }

    static insertMaterial = async (Material) => {
        console.log("Estoy en: insert - Material");
        const { IdCurso, Imagen, Texto } = Material
        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('idCurso', sql.Int, IdCurso)
            .input('imagen', sql.NVarChar(200), Imagen)
            .input('texto', sql.NVarChar(200), Texto)
            .query('INSERT INTO CursoMateriales (idCurso,imagen,texto) VALUES (@idCurso,@imagen,@texto)')
    }

    static insertUsuario = async (Usuario) => {
        console.log("Estoy en: insert - Usuario");
        const { contraseña, nombre, apellido, telefono, mail, fiscalia, oficio } = Usuario;
        const fkRol = 1;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(contraseña, salt, async function (err, hash) {
                let pool = await sql.connect(config)
                let result = await pool.request()
                    .input('contrasenia', sql.NVarChar(200), hash)
                    .input('nombre', sql.NVarChar(200), nombre)
                    .input('apellido', sql.NVarChar(200), apellido)
                    .input('fkRol', sql.Int, fkRol)
                    .input('telefono', sql.NVarChar(17), telefono)
                    .input('mail', sql.NVarChar(200), mail)
                    .input('fiscalia', sql.NVarChar(200), fiscalia)
                    .input('oficio', sql.NVarChar(200), oficio)
                    .query('INSERT INTO Usuarios (Contrasenia,Nombre,Apellido,FkRol,Telefono,Mail,Fiscalia,Oficio) VALUES (@contrasenia,@nombre,@apellido,@fkRol,@telefono,@mail,@fiscalia,@oficio)')
                });
        })
        return Usuario;
    }

    static updateUsuario = async (usuario) => {
        console.log("usuario", usuario)
        const { Id, Contrasenia, Nombre, Apellido, FkRol, Telefono, Mail, Fiscalia, Oficio, Descripcion } = usuario;
        let returnEntity = null;
        console.log("Estoy en: update - Usuario");
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(Contrasenia, salt, async function (err, hash) {
                console.log("Contrasenia",Contrasenia)
                console.log("hash",hash)
                try {
                    let pool = await sql.connect(config)
                    let result = await pool.request()
                        .input('pId', sql.Int, Id)
                        .input('contrasenia', sql.NVarChar(999), hash)
                        .input('nombre', sql.NVarChar(999), Nombre)
                        .input('apellido', sql.NVarChar(999), Apellido)
                        .input('fkRol', sql.Int, FkRol)
                        .input('telefono', sql.NChar(17), Telefono)
                        .input('mail', sql.NVarChar(999), Mail)
                        .input('fiscalia', sql.NVarChar(999), Fiscalia)
                        .input('oficio', sql.NVarChar(999), Oficio)
                        .input('descripcion', sql.NVarChar(999), Descripcion)
                        .query('UPDATE Usuarios SET Contrasenia = @contrasenia, Nombre = @nombre, Apellido = @apellido, FkRol = @fkRol, Telefono = @telefono, Mail = @mail, Fiscalia = @fiscalia, Oficio = @oficio, Descripcion = @descripcion WHERE Usuarios.Id = @pId')
                    returnEntity = result.rowsAffected;
                    console.log("returnEntity", returnEntity);
                } catch (error) {
                    console.log(error);
                }
                return returnEntity;
            });
        })

    }

    static convertirUsuario = async (id, rol) => {
        let returnEntity = null;
        console.log("Estoy en: updateRol");
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
        return returnEntity;
    }

    static updateProfesor = async (idProfesor, idCurso) => {
        let returnEntity = null;
        console.log("Estoy en: updateProfesor");
        try {
            let pool = await sql.connect(config)
            let result = await pool.request()
                .input('idProfesor', sql.Int, idProfesor)
                .input('idCurso', sql.Int, idCurso)
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