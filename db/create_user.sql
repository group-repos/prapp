INSERT INTO users ( first_name, last_name, profile_pic, email, auth_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;