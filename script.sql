CREATE DATABASE inventory_db;
CREATE DATABASE order_db;
CREATE DATABASE payment_db;
CREATE DATABASE product_db;
CREATE DATABASE user_db;

USE inventory_db;
SELECT * FROM inventories;

USE order_db;
SELECT * FROM orders;

USE payment_db;
SELECT * FROM payments;

USE product_db;
SELECT * FROM products;

USE user_db;
SELECT * FROM users;