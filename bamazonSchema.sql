DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Compression Socks", "Health", 28.99, 300),
	   ("Stress Ball", "Work/Office", 4.95, 27),
	   ("Remington Typewriter", "Work/Office", 245.72, 3),
	   ("Red Swingline Stapler", "Work/Office", 14.99, 1),
	   ("Snorkel and Goggles Set", "Outdoors", 12.99, 10),
	   ("Blind Melon Bee Costume", "Costumes", 34.99, 10),
	   ("Jenny", "Red Light District", 86753.09, 1),
	   ("Riding Crop with Rubber Grip Handle", "Animal Husbandry", 9.99, 50),
	   ("Bernzomatic Propane Torch Kit", "Hardware", 19.83, 1500),
	   ("Clown Noses, set of 12", "Costumes", 3.99, 144);

SELECT * FROM products;