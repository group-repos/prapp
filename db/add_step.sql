INSERT INTO steps (r_id, step, description)
VALUES ($1, $2, $3)
RETURNING *;