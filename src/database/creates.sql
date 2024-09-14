CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    id_coordinator INTEGER REFERENCES persons(id)
);

CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    text TEXT NOT NULL,
    link_image TEXT,
    id_course INTEGER REFERENCES course(id),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    highlighted BOOLEAN DEFAULT FALSE,
    preview TEXT,
);

CREATE TABLE session_tokens (
	id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    token VARCHAR(50) NOT NULL,
    validate TIMESTAMP NOT NULL
);