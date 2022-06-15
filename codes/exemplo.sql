CREATE DATABASE IF NOT EXISTS labso;
USE teste;

CREATE TABLE IF NOT EXISTS pessoa(
	id int NOT NULL AUTO_INCREMENT,
	nome varchar(255),
	idade int,

	PRIMARY KEY (id)

);

INSERT INTO pessoa (nome,idade) VALUES ("Arthur",19);
