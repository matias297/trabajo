use DB_2021_5AINF_G06;

CREATE TABLE Usuarios (
	idUsuario int AUTO_INCREMENT,
	nombre varchar(50),
    apellido varchar(50),
    mail varchar(50),
	pass varchar(50),
    dni int(10),
    PRIMARY KEY (idUsuario, mail)
);

INSERT INTO Usuarios values (1, "Nicolas", "Facon", "facon@gmail.com", "hola123" , 44892857); 

CREATE TABLE Peliculas (
	idPeliculas int AUTO_INCREMENT,
	nombre varchar(50),
    duracion int,
    director varchar(50),
	genero varchar(50),
    idioma varchar(50),
	PRIMARY KEY (idPeliculas)
);

INSERT INTO Peliculas values (1, "Harry Potter", "111", "Jorgito Cines", "Fantasia" , "Ingles"),
(2, "Vengadores", "100", "Eduardo Camaras", "Accion" , "Ingles"),
(3, "Juegos del Hambre", "120", "Julian Accion", "Drama" , "Español"),
(4, "Cars", "90", "Martin Cortes", "Animacion" , "Español"),
(5, "Black Widow", "160", "Fausto Oscar", "Accion" , "Ingles");

select * from Usuarios;

CREATE TABLE Cines (
	idCines int AUTO_INCREMENT,
	nombre varchar(50),
    barrio varchar(50),
    direccion varchar(50),
	PRIMARY KEY (idCines)
);

INSERT INTO Cines values (1, "Village", "Caballito", "Gregorio de la Ferrere"),
(2, "Cinemark", "Flores", "Av de la Plata"),
(3, "Hoyts", "Palermo", "Independencia");

select * from Cines;

CREATE TABLE Horarios (
	idHorarios int AUTO_INCREMENT,
	hora datetime,
	PRIMARY KEY (idHorarios)
);

INSERT INTO Horarios values (0, '2020-01-01 17:00:00'),
(0, '2020-01-01 20:00:00'),
(0, '2020-01-01 23:00:00');


select * from Horarios;



CREATE TABLE Funciones (
	idFunciones int AUTO_INCREMENT,
    idCines int,
    idPeliculas int,
    idHorarios int,
    FOREIGN KEY (idCines) references Cines(idCines),
    FOREIGN KEY (idPeliculas) references Peliculas(idPeliculas),
    FOREIGN KEY (idHorarios) references Horarios(idHorarios),
    PRIMARY KEY (idFunciones)
);

INSERT INTO Funciones values (0, 1, 2, 1),
(0, 1, 3, 2),
(0, 2, 2, 2),
(0, 2, 1, 3),
(0, 3, 2, 3),
(0, 3, 3, 1),
(0, 4, 1, 1),
(0, 4, 3, 2),
(0, 5, 3, 2),
(0, 5, 2, 3);


select * from Funciones;
select * from Peliculas;
select Peliculas.nombre from Funciones join Peliculas on Funciones.idPeliculas = Peliculas.idPeliculas where idCines = 1;