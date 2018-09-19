SELECT w.wr_id, w.u_id, w.r_id, w.day, r.r_name,
    jsonb_agg (jsonb_build_object ('i_id', i.i_id, 'ingredient', i.ingredient, 'quantity', i.quantity, 'unit', i.unit)) AS ingredients
FROM weekly_plan w
JOIN recipes r ON w.r_id = r.r_id
JOIN ingredients i on i.r_id = w.r_id
WHERE w.u_id = $1
GROUP BY w.wr_id, r.r_name
ORDER BY w.day;