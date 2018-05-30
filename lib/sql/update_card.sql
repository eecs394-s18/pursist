UPDATE {SCHEMA}.cards
SET var1 = $2, link12 = $3, var2 = $4, link23 = $5, var3 = $6, link34 = $7, var4 = $8, link45 = $9, var5 = $10
-- WHERE goal_tag IS NULL AND need_tag IS NULL and challenge_tag IS NULL AND id = $1
WHERE id = $1