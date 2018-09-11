SELECT recipes.r_id, recipes.r_name, recipes.r_pics, recipes.servings, recipes.rating, recipes.r_description
    , json_agg (json_build_object('id', ingredients.i_id, 'ingredient',ingredients.ingredient, 'quantity', ingredients.quantity, 'unit',ingredients.unit)) AS ingredients
FROM   recipes
JOIN   ingredients ON ingredients.r_id = recipes.r_id
GROUP  BY recipes.r_name, recipes.r_id
ORDER BY recipes.r_id;