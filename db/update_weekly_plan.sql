UPDATE weekly_recipes
SET recipes = $2
WHERE u_id = $1
RETURNING *;
