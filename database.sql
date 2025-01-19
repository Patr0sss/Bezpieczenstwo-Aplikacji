


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


CREATE TABLE messages(
    sender_id INTEGER,
    receiver_id INTEGER,
    message TEXT,
    created_at TEXT
);

INSERT INTO users (username,user_password) VALUES (
    'admin', 'ktd1332'
    
);

INSERT INTO users (username,user_password) VALUES (
    'borygo', '123'
    
);
SELECT * FROM users;