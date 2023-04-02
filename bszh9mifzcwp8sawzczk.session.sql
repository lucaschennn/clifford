--https://drawsql.app/teams/clifford/diagrams/db


--@block
SELECT * FROM users;

--@block
CREATE TABLE IF NOT EXISTS sellers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(63) NOT NULL,
    thumbnail VARCHAR(63) NOT NULL,
    category VARCHAR(31) NOT NULL,
    keywords json,
    FOREIGN KEY (owner_id) REFERENCES users(id)
)

--@block
CREATE TABLE IF NOT EXISTS products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    price float NOT NULL,
    name varchar(100) NOT NULL,
    description TEXT NOT NULL,
    product_url varchar(100),
    quantity int NOT NULL,
    FOREIGN KEY (business_id) REFERENCES sellers(id)
)

--@block
CREATE TABLE IF NOT EXISTS purchases(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    date datetime NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
)

--@block
SELECT * FROM users

--@block
INSERT INTO sellers (owner_id, name, category, keywords, thumbnail, description)
VALUES
('3', "Modern Photo Gallery", "Art", '{"keywords":["photography", "gallery", "art", "portraits", "still life"]}', "sample_3.jpg", "Modern Photo Gallery is the gallery of a photographer and includes their photographs.")


--@block
INSERT INTO products (business_id, price, name, description, product_url, quantity)
VALUES
('2', 1.99, "Carrots", "They are carrots", "1.jpg", 1000),
('2', 5.99, "Fudge", "Yummy fudge yum", "2.jpg", 50),
('3', 0, "Concert at Memorial Park", "Come to Memorial Park Friday April 7th for a free outdoor concert", "3.jpg", 0),
('3', 20.00, "The Zooeys Tee in Pink", "Tasteful. Luxurious. Evergreen. The Classic Zooeys T Shirt.", "4.jpg", 100)

--@block
ALTER TABLE users
ADD COLUMN cart json;


--@block
UPDATE products
SET
product_id = "prod_Nda0Y51pCoDZqf",
price_id = "price_1MsIqyGm81VMr6VhCkBaoNqR"
WHERE id=4


--@block
select * from users


