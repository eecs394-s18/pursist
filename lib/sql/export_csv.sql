COPY (SELECT * FROM {SCHEMA}.cards) TO '/Users/juliawilkins/Desktop/cards_db.csv' DELIMITER ',' CSV HEADER;