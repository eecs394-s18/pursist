INSERT INTO {SCHEMA}.cards(
    goal,
    need,
    current_solution,
    problem,
    comment,
    email
)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)