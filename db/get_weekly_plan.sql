SELECT w.wr_id, w.u_id, w.r_id, w.day, r.r_name, r.servings, r.r_pics, r.r_description FROM weekly_plan w
JOIN recipes r ON r.r_id = w.r_id
WHERE w.u_id = $1 AND day = $2;