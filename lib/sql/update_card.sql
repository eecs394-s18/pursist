UPDATE {SCHEMA}.cards
SET goal_tag = $1, need_tag = $2, challenge_tag = $3
WHERE goal_tag IS NULL AND need_tag IS NULL and challenge_tag IS NULL