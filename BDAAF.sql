USE [master]
GO
/****** Object:  Database [BDAAF]    Script Date: 11/13/2023 1:23:59 AM ******/
CREATE DATABASE [BDAAF]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BDAAF', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\BDAAF.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BDAAF_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\BDAAF_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [BDAAF] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BDAAF].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BDAAF] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BDAAF] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BDAAF] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BDAAF] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BDAAF] SET ARITHABORT OFF 
GO
ALTER DATABASE [BDAAF] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BDAAF] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BDAAF] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BDAAF] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BDAAF] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BDAAF] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BDAAF] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BDAAF] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BDAAF] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BDAAF] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BDAAF] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BDAAF] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BDAAF] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BDAAF] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BDAAF] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BDAAF] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BDAAF] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BDAAF] SET RECOVERY FULL 
GO
ALTER DATABASE [BDAAF] SET  MULTI_USER 
GO
ALTER DATABASE [BDAAF] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BDAAF] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BDAAF] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BDAAF] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BDAAF] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BDAAF] SET QUERY_STORE = OFF
GO
USE [BDAAF]
GO
/****** Object:  User [AAF]    Script Date: 11/13/2023 1:23:59 AM ******/
CREATE USER [AAF] FOR LOGIN [AAF] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [AAF]
GO
/****** Object:  Table [dbo].[ArticuloNoticia]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ArticuloNoticia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](100) NOT NULL,
	[Texto] [varchar](200) NOT NULL,
	[Imagen] [varchar](200) NULL,
	[Fecha] [date] NOT NULL,
	[Footer] [varchar](100) NOT NULL,
 CONSTRAINT [PK_ArticuloNoticia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Asistencia]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Asistencia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[Asistencia] [bit] NOT NULL,
	[fkClase] [int] NOT NULL,
 CONSTRAINT [PK_Asistencia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClaseAsistencia]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClaseAsistencia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCursoUsuarios] [int] NOT NULL,
	[IdClase] [int] NOT NULL,
	[Asistencia] [bit] NOT NULL,
 CONSTRAINT [PK_CursoAsistencia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClaseCurso]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClaseCurso](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[fkCurso] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
	[Horario] [varchar](max) NOT NULL,
	[Titulo] [varchar](max) NOT NULL,
 CONSTRAINT [PK_ClaseCurso] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CursoMateriales]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CursoMateriales](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCurso] [int] NOT NULL,
	[Imagen] [varchar](max) NULL,
	[Texto] [varchar](max) NULL,
	[LinkMateriales] [varchar](max) NOT NULL,
	[Zoom] [nchar](10) NULL,
 CONSTRAINT [PK_CursoMateriales] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cursos]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cursos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](max) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[fkProfesor] [int] NULL,
 CONSTRAINT [PK_Cursos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CursoUsuarios]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CursoUsuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCurso] [int] NOT NULL,
	[IdUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImagenPerfil]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImagenPerfil](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[url] [varchar](999) NULL,
	[fkUsuario] [int] NOT NULL,
 CONSTRAINT [PK_ImagenPerfil] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mensaje]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mensaje](
	[IdMensaje] [int] IDENTITY(1,1) NOT NULL,
	[IdCurso] [int] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[texto] [varchar](max) NOT NULL,
	[FkMensaje] [int] NULL,
 CONSTRAINT [PK_Mensaje] PRIMARY KEY CLUSTERED 
(
	[IdMensaje] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Contrasenia] [varchar](max) NOT NULL,
	[Nombre] [varchar](max) NOT NULL,
	[Apellido] [varchar](max) NOT NULL,
	[FkRol] [int] NOT NULL,
	[Telefono] [nchar](17) NULL,
	[Mail] [varchar](max) NULL,
	[Fiscalia] [varchar](max) NOT NULL,
	[Oficio] [varchar](max) NOT NULL,
	[Descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Asistencia]  WITH CHECK ADD  CONSTRAINT [FK_Asistencia_ClaseCurso] FOREIGN KEY([fkClase])
REFERENCES [dbo].[ClaseCurso] ([Id])
GO
ALTER TABLE [dbo].[Asistencia] CHECK CONSTRAINT [FK_Asistencia_ClaseCurso]
GO
ALTER TABLE [dbo].[Asistencia]  WITH CHECK ADD  CONSTRAINT [FK_Asistencia_Usuarios] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Asistencia] CHECK CONSTRAINT [FK_Asistencia_Usuarios]
GO
ALTER TABLE [dbo].[ClaseCurso]  WITH CHECK ADD  CONSTRAINT [FK_ClaseCurso_Cursos] FOREIGN KEY([fkCurso])
REFERENCES [dbo].[Cursos] ([Id])
GO
ALTER TABLE [dbo].[ClaseCurso] CHECK CONSTRAINT [FK_ClaseCurso_Cursos]
GO
ALTER TABLE [dbo].[CursoMateriales]  WITH CHECK ADD  CONSTRAINT [FK_CursoMateriales_Cursos] FOREIGN KEY([IdCurso])
REFERENCES [dbo].[Cursos] ([Id])
GO
ALTER TABLE [dbo].[CursoMateriales] CHECK CONSTRAINT [FK_CursoMateriales_Cursos]
GO
ALTER TABLE [dbo].[Cursos]  WITH CHECK ADD  CONSTRAINT [FK_Cursos_Usuarios] FOREIGN KEY([fkProfesor])
REFERENCES [dbo].[Usuarios] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cursos] CHECK CONSTRAINT [FK_Cursos_Usuarios]
GO
ALTER TABLE [dbo].[CursoUsuarios]  WITH NOCHECK ADD  CONSTRAINT [FK_CursoUsuarios_Cursos] FOREIGN KEY([IdCurso])
REFERENCES [dbo].[Cursos] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[CursoUsuarios] NOCHECK CONSTRAINT [FK_CursoUsuarios_Cursos]
GO
ALTER TABLE [dbo].[CursoUsuarios]  WITH NOCHECK ADD  CONSTRAINT [FK_CursoUsuarios_Usuarios] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[CursoUsuarios] NOCHECK CONSTRAINT [FK_CursoUsuarios_Usuarios]
GO
ALTER TABLE [dbo].[ImagenPerfil]  WITH CHECK ADD  CONSTRAINT [FK_ImagenPerfil_Usuarios] FOREIGN KEY([fkUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ImagenPerfil] CHECK CONSTRAINT [FK_ImagenPerfil_Usuarios]
GO
ALTER TABLE [dbo].[Mensaje]  WITH CHECK ADD  CONSTRAINT [FK_Mensaje_Cursos] FOREIGN KEY([IdCurso])
REFERENCES [dbo].[Cursos] ([Id])
GO
ALTER TABLE [dbo].[Mensaje] CHECK CONSTRAINT [FK_Mensaje_Cursos]
GO
ALTER TABLE [dbo].[Mensaje]  WITH CHECK ADD  CONSTRAINT [FK_Mensaje_Mensaje] FOREIGN KEY([FkMensaje])
REFERENCES [dbo].[Mensaje] ([IdMensaje])
GO
ALTER TABLE [dbo].[Mensaje] CHECK CONSTRAINT [FK_Mensaje_Mensaje]
GO
ALTER TABLE [dbo].[Mensaje]  WITH CHECK ADD  CONSTRAINT [FK_Mensaje_Usuarios] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[Mensaje] CHECK CONSTRAINT [FK_Mensaje_Usuarios]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Roles] FOREIGN KEY([FkRol])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_Roles]
GO
/****** Object:  StoredProcedure [dbo].[Register]    Script Date: 11/13/2023 1:23:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE procedure [dbo].[Register]
@contrasenia VARCHAR(200),
@nombre VARCHAR(200),
@apellido VARCHAR(200),
@fkRol VARCHAR(200),
@telefono VARCHAR(17),
@mail VARCHAR(200),
@fiscalia VARCHAR(200),
@oficio VARCHAR(200),
@descripcion VARCHAR(999)
AS
BEGIN
    DECLARE @idUsuario INT;
    INSERT INTO Usuarios (Contrasenia,Nombre,Apellido,FkRol,Telefono,Mail,Fiscalia,Oficio,Descripcion) VALUES (@contrasenia,@nombre,@apellido,@fkRol,@telefono,@mail,@fiscalia,@oficio,@descripcion)
    SET @idUsuario = (SELECT TOP 1 Id from Usuarios WHERE Mail = @mail);
    INSERT INTO ImagenPerfil (url,fkUsuario) VALUES (null,@idUsuario);
	SELECT Usuarios.*,ImagenPerfil.url AS Imagen FROM Usuarios INNER JOIN ImagenPerfil ON Usuarios.Id=ImagenPerfil.fkUsuario WHERE Usuarios.Id = @idUsuario
END
GO
USE [master]
GO
ALTER DATABASE [BDAAF] SET  READ_WRITE 
GO
