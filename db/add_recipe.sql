INSERT INTO recipes (u_id, servings, r_name, r_pics, r_description)
VALUES($1, $2, $3, $4, $5)
RETURNING *;