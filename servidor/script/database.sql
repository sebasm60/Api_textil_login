USE bjkuzzoj0pxl0teng5am;

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id INT(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(250) NOT NULL UNIQUE,
    pass VARCHAR(250) NOT NULL
) ENGINE=InnoDB;

DROP TABLE IF EXISTS cliente_prenda;

CREATE TABLE cliente_prenda(
    nit INT(10) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    numero INT(10) NOT NULL
) ENGINE=InnoDB;

DROP TABLE IF EXISTS taller_prenda;

CREATE TABLE taller_prenda(
    nit INT(10) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    numero INT(10) NOT NULL
)ENGINE=InnoDB;

DROP TABLE IF EXISTS prendas;

CREATE TABLE prendas (
    id_prenda INT(10) UNSIGNED PRIMARY KEY,
    lote INT(10) NOT NULL UNIQUE,
    genero_prenda ENUM('Masculino', 'Femenino') NOT NULL,
    tipo_prenda ENUM('Vestidos', 'Pantalones', 'Faldas', 'Chaquetas', 'Vermudas', 'Chorts', 'Camisas') NOT NULL,
    talla_prenda VARCHAR(10) NOT NULL,
    muestra_fisica ENUM ('Si', 'No') NOT NULL,
    tipo_empaque ENUM ('Basico', 'Protegido', 'Aislado') NOT NULL,
    cantidad_existente INT(10) NOT NULL,
    cliente_prenda INT(10) NOT NULL,    
    taller_prenda INT(10) NOT NULL,
    CONSTRAINT `fk_prenda_cliente_prenda` FOREIGN KEY (`cliente_prenda`) REFERENCES cliente_prenda (`nit`),
    CONSTRAINT `fk_prenda_taller_prenda` FOREIGN KEY (taller_prenda) REFERENCES taller_prenda (`nit`)
) ENGINE=InnoDB;

INSERT INTO cliente_prenda(nit, nombre, numero)
VALUES (30001, 'Estudio F', '1111111'),
(30002, 'Quest', '2222222'),
(30003, 'Chevioto', '3333333');

INSERT INTO taller_prenda(nit, nombre, numero)
VALUES (20001, 'Boza', '4444444'),
(20002, 'Indicol', '5555555');

INSERT INTO prendas(id_prenda, lote, genero_prenda, tipo_prenda, talla_prenda, muestra_fisica, tipo_empaque, cantidad_existente, cliente_prenda, taller_prenda)
VALUES (40001, 11025641, 'Masculino', 'Pantalones', '36', 'si', 'Basico', 25, 30001, 20001),
(40002, 11025642, 'Femenino', 'Chaquetas', '14', 'no', 'Basico', 25, 30002, 20002);