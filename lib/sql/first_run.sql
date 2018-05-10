DROP SCHEMA IF EXISTS {SCHEMA} CASCADE;
CREATE SCHEMA {SCHEMA};

CREATE TABLE {SCHEMA}.users(
    email VARCHAR,
    password VARCHAR
);

CREATE TABLE {SCHEMA}.cards(
    goal VARCHAR, 
    need VARCHAR,
    current_solution VARCHAR,
    problem VARCHAR,
    comment VARCHAR,
    email VARCHAR
);