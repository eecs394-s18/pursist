UPDATE {SCHEMA}.cards
SET goal_tag = 'a goal', need_tag = 'a need', challenge_tag = 'challenge'
WHERE goal_tag IS NULL AND need_tag IS NULL and challenge_tag IS NULL