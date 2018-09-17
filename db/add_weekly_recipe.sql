INSERT INTO weekly_recipes (u_id, recipes)
VALUES ($1, $2)
RETURNING *;