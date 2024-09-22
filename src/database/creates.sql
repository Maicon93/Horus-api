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
    image_name TEXT,
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

alter table courses add column "description" text;
alter table courses add column "actuation_area" text;
alter table courses add column "duration" decimal(11,2);

CREATE TYPE course_type AS ENUM ('Graduação', 'Pós-Graduação', 'Técnico', 'Licenciatura', 'Outros');
alter table courses add column type course_type;

CREATE TABLE teachers (
	id SERIAL PRIMARY KEY,
    person_id INTEGER REFERENCES persons(id) NOT NULL,
    course_id INTEGER REFERENCES courses(id) NOT NULL
);

alter table courses add column "video_frame" text;