DROP DATABASE IF EXISTS itemsDB;
CREATE database itemsDB;
USE itemsDB;

CREATE TABLE product(
id INT NOT NULL AUTO_INCREMENT,
item VARCHAR (100) NOT NULL,
price DEC (10,2) NOT NULL,
category VARCHAR (50) NULL,
quantity DEC(10) NULL,
PRIMARY KEY (id)
);

INSERT INTO product (item, price, category, quantity)
VALUES ("Skateboard", 120, "Sports", 20);


SELECT * FROM product;