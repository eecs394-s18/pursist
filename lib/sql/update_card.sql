UPDATE {SCHEMA}.cards
SET goal_tag = $2, need_tag = $3, challenge_tag = $4
-- WHERE goal_tag IS NULL AND need_tag IS NULL and challenge_tag IS NULL AND id = $1
WHERE id = $1