INSERT INTO {SCHEMA}.cards(
    goal,
    need,
    current_solution,
    problem,
    solution_ideas,
    current_benefits,
    comment,
    email,
    goal_tag,
    need_tag,
    challenge_tag
)
VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11
)