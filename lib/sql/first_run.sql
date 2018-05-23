DROP SCHEMA IF EXISTS {SCHEMA} CASCADE;
CREATE SCHEMA {SCHEMA};

CREATE TABLE {SCHEMA}.users(
    email VARCHAR,
    password VARCHAR
);


CREATE TABLE {SCHEMA}.cards(
    id SERIAL,
    goal VARCHAR,
    need VARCHAR,
    current_solution VARCHAR,
    problem VARCHAR,
    solution_ideas VARCHAR,
    current_benefits VARCHAR,
    comment VARCHAR,
    email VARCHAR,
    var1 VARCHAR,
    link12 VARCHAR,
    var2 VARCHAR,
    link23 VARCHAR,
    var3 VARCHAR
    -- link34 VARCHAR,
    -- var4 VARCHAR,
    -- link45 VARCHAR,
    -- var5 VARCHAR
);