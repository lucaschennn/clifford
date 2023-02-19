--https://drawsql.app/teams/clifford/diagrams/db


--@block
SELECT * FROM users;

--@block
CREATE TABLE IF NOT EXISTS sellers(
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    name VARCHAR(63) NOT NULL,
    category VARCHAR(31) NOT NULL,
    keywords json,
    FOREIGN KEY (owner_id) REFERENCES users(id)
)

--@block
CREATE TABLE IF NOT EXISTS products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    business_id INT NOT NULL,
    price float NOT NULL,
    name float NOT NULL,
    description blob NOT NULL,
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
SELECT * FROM users WHERE email = "test@test.com" LIMIT 1