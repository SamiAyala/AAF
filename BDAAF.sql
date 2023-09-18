USE [master]
GO
/****** Object:  Database [BDAAF]    Script Date: 18/9/2023 10:42:51 ******/
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
/****** Object:  User [alumno]    Script Date: 18/9/2023 09:44:30 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [AAF]    Script Date: 18/9/2023 09:44:30 ******/
CREATE USER [AAF] FOR LOGIN [AAF] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [AAF]
GO
/****** Object:  Table [dbo].[ArticuloNoticia]    Script Date: 18/9/2023 10:42:51 ******/
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
/****** Object:  Table [dbo].[CursoAsistencia]    Script Date: 18/9/2023 09:44:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CursoAsistencia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCursoUsuarios] [int] NOT NULL,
	[Fecha] [date] NOT NULL,
	[Asistencia] [bit] NOT NULL,
 CONSTRAINT [PK_CursoAsistencia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CursoMateriales]    Script Date: 18/9/2023 10:42:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CursoMateriales](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCurso] [int] NOT NULL,
	[Imagen] [varchar](max) NULL,
	[Texto] [varchar](max) NULL,
 CONSTRAINT [PK_CursoMateriales] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cursos]    Script Date: 18/9/2023 10:42:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cursos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](max) NOT NULL,
	[Descripcion] [varchar](max) NOT NULL,
	[fkProfesor] [int] NOT NULL,
 CONSTRAINT [PK_Cursos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CursoUsuarios]    Script Date: 18/9/2023 10:42:51 ******/
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
/****** Object:  Table [dbo].[Mensaje]    Script Date: 18/9/2023 10:42:51 ******/
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
/****** Object:  Table [dbo].[Roles]    Script Date: 18/9/2023 10:42:51 ******/
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
/****** Object:  Table [dbo].[Usuarios]    Script Date: 18/9/2023 10:42:51 ******/
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

INSERT [dbo].[ArticuloNoticia] ([Id], [Titulo], [Texto], [Imagen], [Fecha], [Footer]) VALUES (1, N'titulo1', N'texto', N'https://static.wixstatic.com/media/b793be_bbc72cf84af446cfac26495d2addc1a4f000.jpg/v1/fill/w_507,h_285,al_c,q_80,usm_0.33_1.00_0.00,enc_auto/b793be_bbc72cf84af446cfac26495d2addc1a4f000.jpg', CAST(N'2020-02-02' AS Date), N'footer')
INSERT [dbo].[ArticuloNoticia] ([Id], [Titulo], [Texto], [Imagen], [Fecha], [Footer]) VALUES (2, N'titulo2', N'texto2', NULL, CAST(N'2023-08-10' AS Date), N'footer')
SET IDENTITY_INSERT [dbo].[ArticuloNoticia] OFF
GO
SET IDENTITY_INSERT [dbo].[Cursos] ON 

INSERT [dbo].[Cursos] ([Id], [Titulo], [Descripcion], [fkProfesor]) VALUES (1, N'example', N'123', 1)
INSERT [dbo].[Cursos] ([Id], [Titulo], [Descripcion], [fkProfesor]) VALUES (2, N'example 2', N'321', 1)
INSERT [dbo].[Cursos] ([Id], [Titulo], [Descripcion], [fkProfesor]) VALUES (3, N'example3', N'122', 1)
INSERT [dbo].[Cursos] ([Id], [Titulo], [Descripcion], [fkProfesor]) VALUES (4, N'example', N'1234', 1)
SET IDENTITY_INSERT [dbo].[Cursos] OFF
GO
SET IDENTITY_INSERT [dbo].[CursoUsuarios] ON 

INSERT [dbo].[CursoUsuarios] ([Id], [IdCurso], [IdUsuario]) VALUES (1, 1, 1)
INSERT [dbo].[CursoUsuarios] ([Id], [IdCurso], [IdUsuario]) VALUES (2, 1, 2)
SET IDENTITY_INSERT [dbo].[CursoUsuarios] OFF
GO
SET IDENTITY_INSERT [dbo].[Roles] ON 

INSERT [dbo].[Roles] ([Id], [Descripcion]) VALUES (1, N'Alumno')
INSERT [dbo].[Roles] ([Id], [Descripcion]) VALUES (2, N'Profesor')
INSERT [dbo].[Roles] ([Id], [Descripcion]) VALUES (3, N'Admin')
SET IDENTITY_INSERT [dbo].[Roles] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [Contrasenia], [Nombre], [Apellido], [FkRol], [Telefono], [Mail], [Fiscalia], [Oficio], [Descripcion]) VALUES (1, N'$2a$10$Sq2LKAWQtXyxxJRrTvkwNe/jOBpYjvzVVVpuJMfZWLCetL0oo3BXq', N'example', N'example', 2, N'12345678         ', N'example@gmail.com', N'Fiscalia', N'Oficio', NULL)
INSERT [dbo].[Usuarios] ([Id], [Contrasenia], [Nombre], [Apellido], [FkRol], [Telefono], [Mail], [Fiscalia], [Oficio], [Descripcion]) VALUES (2, N'$2a$10$D/JHeiAaQUzN2VZrOfeUxeFj45x1bOS.zr76KgD1AARNwYd4skGrC', N'example2', N'example', 2, N'12345678         ', N'example2@gmail.com', N'Fiscalia', N'Oficio', NULL)
INSERT [dbo].[Usuarios] ([Id], [Contrasenia], [Nombre], [Apellido], [FkRol], [Telefono], [Mail], [Fiscalia], [Oficio], [Descripcion]) VALUES (5, N'$2a$10$H.pAu871vbLFgJ36aVpoj.Mt/8UrbVWBkiHTU6zyBILq23GklYEoW', N'samir', N'profe', 1, N'54 11 1234 5678  ', N'profe@gmail.com', N'fiscalia', N'oficio', NULL)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
ALTER TABLE [dbo].[CursoAsistencia]  WITH CHECK ADD  CONSTRAINT [FK_CursoAsistencia_CursoUsuarios] FOREIGN KEY([IdCursoUsuarios])
REFERENCES [dbo].[CursoUsuarios] ([Id])
GO
ALTER TABLE [dbo].[CursoAsistencia] CHECK CONSTRAINT [FK_CursoAsistencia_CursoUsuarios]
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
ALTER TABLE [dbo].[CursoUsuarios]  WITH CHECK ADD  CONSTRAINT [FK_CursoUsuarios_Cursos] FOREIGN KEY([IdCurso])
REFERENCES [dbo].[Cursos] ([Id])
GO
ALTER TABLE [dbo].[CursoUsuarios] CHECK CONSTRAINT [FK_CursoUsuarios_Cursos]
GO
ALTER TABLE [dbo].[CursoUsuarios]  WITH CHECK ADD  CONSTRAINT [FK_CursoUsuarios_Usuarios] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[CursoUsuarios] CHECK CONSTRAINT [FK_CursoUsuarios_Usuarios]
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
