CREATE TABLE locations
(
    id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    x float8 NOT NULL,
    y float8 NOT NULL,
    schedule TEXT,
    data TEXT,
    PRIMARY KEY(id)
);