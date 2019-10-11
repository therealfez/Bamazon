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
VALUES ("Skateboard", 119.95, "Sports", 14),("Basketball", 24.99, "Sports", 17), ("Headset", 75.64, "Technology", 3), ("Smart Phone", 799.99, "Technology", 48), ("Sofa", 554.99, "Furniture", 0), ("Table", 99.99, "Furniture", 11);

