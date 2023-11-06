USE [master]
GO
/****** Object:  Database [BDAAF]    Script Date: 6/11/2023 09:09:46 ******/
CREATE DATABASE [BDAAF]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BDAAF', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\BDAAF.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BDAAF_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\BDAAF_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
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
EXEC sys.sp_db_vardecimal_storage_format N'BDAAF', N'ON'
GO
ALTER DATABASE [BDAAF] SET QUERY_STORE = OFF
GO
USE [BDAAF]
GO
/****** Object:  User [alumno]    Script Date: 6/11/2023 09:09:46 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [AAF]    Script Date: 6/11/2023 09:09:46 ******/
CREATE USER [AAF] FOR LOGIN [AAF] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [AAF]
GO
/****** Object:  Table [dbo].[ArticuloNoticia]    Script Date: 6/11/2023 09:09:46 ******/
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
/****** Object:  Table [dbo].[Asistencia]    Script Date: 6/11/2023 09:09:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Asistencia](
	[Id] [int] NOT NULL,
	[IdCurso] [int] NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[Asistencia] [bit] NOT NULL,
	[fkClase] [int] NOT NULL,
 CONSTRAINT [PK_Asistencia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClaseAsistencia]    Script Date: 6/11/2023 09:09:46 ******/
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
/****** Object:  Table [dbo].[ClaseCurso]    Script Date: 6/11/2023 09:09:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClaseCurso](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[fkCurso] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
	[Horario] [time](7) NOT NULL,
 CONSTRAINT [PK_ClaseCurso] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CursoMateriales]    Script Date: 6/11/2023 09:09:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CursoMateriales](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCurso] [int] NOT NULL,
	[Imagen] [varchar](max) NULL,
	[Texto] [varchar](max) NULL,
	[Link] [varchar](max) NOT NULL,
 CONSTRAINT [PK_CursoMateriales] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cursos]    Script Date: 6/11/2023 09:09:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cursos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](max) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[fkProfesor] [int] NULL,
	[LinkZoom] [varchar](max) NULL,
 CONSTRAINT [PK_Cursos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CursoUsuarios]    Script Date: 6/11/2023 09:09:46 ******/
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
/****** Object:  Table [dbo].[ImagenPerfil]    Script Date: 6/11/2023 09:09:46 ******/
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
/****** Object:  Table [dbo].[Mensaje]    Script Date: 6/11/2023 09:09:46 ******/
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
/****** Object:  Table [dbo].[Roles]    Script Date: 6/11/2023 09:09:46 ******/
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
/****** Object:  Table [dbo].[Usuarios]    Script Date: 6/11/2023 09:09:46 ******/
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
SET IDENTITY_INSERT [dbo].[ArticuloNoticia] ON 

INSERT [dbo].[ArticuloNoticia] ([Id], [Titulo], [Texto], [Imagen], [Fecha], [Footer]) VALUES (1, N'titulo', N'texto', N'https://static.wixstatic.com/media/b793be_bbc72cf84af446cfac26495d2addc1a4f000.jpg/v1/fill/w_507,h_285,al_c,q_80,usm_0.33_1.00_0.00,enc_auto/b793be_bbc72cf84af446cfac26495d2addc1a4f000.jpg', CAST(N'2020-03-10' AS Date), N'footer')
INSERT [dbo].[ArticuloNoticia] ([Id], [Titulo], [Texto], [Imagen], [Fecha], [Footer]) VALUES (2, N'titulo 2', N'texto 2 ', NULL, CAST(N'2023-10-03' AS Date), N'footer')
SET IDENTITY_INSERT [dbo].[ArticuloNoticia] OFF
GO
SET IDENTITY_INSERT [dbo].[Cursos] ON 

INSERT [dbo].[Cursos] ([Id], [Titulo], [Descripcion], [fkProfesor], [LinkZoom]) VALUES (1, N'intro 101', N'esto es una intro', NULL, N'linkDelZoom')
SET IDENTITY_INSERT [dbo].[Cursos] OFF
GO
SET IDENTITY_INSERT [dbo].[CursoUsuarios] ON 

INSERT [dbo].[CursoUsuarios] ([Id], [IdCurso], [IdUsuario]) VALUES (1, 1, 1)
SET IDENTITY_INSERT [dbo].[CursoUsuarios] OFF
GO
SET IDENTITY_INSERT [dbo].[ImagenPerfil] ON 

INSERT [dbo].[ImagenPerfil] ([Id], [url], [fkUsuario]) VALUES (1, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1vQPe-Pm_-I8ZPk82L0XEggV76c7--2zrdw&usqp=CAU', 1)
SET IDENTITY_INSERT [dbo].[ImagenPerfil] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([Id], [Descripcion]) VALUES (1, N'Alumno')
INSERT [dbo].[Roles] ([Id], [Descripcion]) VALUES (2, N'Profesor')
INSERT [dbo].[Roles] ([Id], [Descripcion]) VALUES (3, N'Admin')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [Contrasenia], [Nombre], [Apellido], [FkRol], [Telefono], [Mail], [Fiscalia], [Oficio], [Descripcion]) VALUES (1, N'$2a$10$onMwblOpvlmIxsnGBJ1XqunFo65ygkGQ.RU4NSjvGrTr8XKE.xmLi', N'Sami', N'alumno', 1, N'12345678         ', N'alumno@gmail.com', N'fiscalia', N'oficio', N'desc')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
ALTER TABLE [dbo].[Asistencia]  WITH CHECK ADD  CONSTRAINT [FK_Asistencia_ClaseCurso] FOREIGN KEY([fkClase])
REFERENCES [dbo].[ClaseCurso] ([Id])
GO
ALTER TABLE [dbo].[Asistencia] CHECK CONSTRAINT [FK_Asistencia_ClaseCurso]
GO
ALTER TABLE [dbo].[Asistencia]  WITH CHECK ADD  CONSTRAINT [FK_Asistencia_Cursos] FOREIGN KEY([IdCurso])
REFERENCES [dbo].[Cursos] ([Id])
GO
ALTER TABLE [dbo].[Asistencia] CHECK CONSTRAINT [FK_Asistencia_Cursos]
GO
ALTER TABLE [dbo].[Asistencia]  WITH CHECK ADD  CONSTRAINT [FK_Asistencia_Usuarios] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
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
USE [master]
GO
ALTER DATABASE [BDAAF] SET  READ_WRITE 
GO
