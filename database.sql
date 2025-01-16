


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (username,user_password) VALUES (
    'admin', 'ktd1332'
);


SELECT * FROM users;