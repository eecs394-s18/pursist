UPDATE {SCHEMA}.cards
SET goal_tag = 'Alfred Schmidt', need_tag = 'Frankfurt', challenge_tag = 'asd'
WHERE goal_tag IS NULL AND need_tag IS NULL and challenge_tag IS NULL