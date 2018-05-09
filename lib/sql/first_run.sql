DROP SCHEMA IF EXISTS {SCHEMA} CASCADE;
CREATE SCHEMA {SCHEMA};

CREATE TABLE {SCHEMA}.users(
    fullname VARCHAR,
    email VARCHAR,
    password VARCHAR,
    CONSTRAINT uniq_email UNIQUE (email)
);

CREATE TABLE {SCHEMA}.cards(
    goal VARCHAR, 
    need VARCHAR,
    current_solution VARCHAR,
    problem VARCHAR,
    email VARCHAR
);