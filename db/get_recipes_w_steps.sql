SELECT recipes.r_id, recipes.r_name
    , json_agg (json_build_object('id', steps.s_id, 'step', steps.step, 'description', steps.description)) AS steps
FROM   recipes
JOIN steps on steps.r_id = recipes.r_id
GROUP  BY recipes.r_name, recipes.r_id
ORDER BY recipes.r_id;