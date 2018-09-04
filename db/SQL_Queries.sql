-- We used this query to create our users table:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password TEXT,
    profile_pic TEXT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(120)
);

-- We used this query to create our recipes table:
CREATE TABLE recipes (
    r_id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES users(u_id),
    ingredients TEXT[],
    steps TEXT[],
    servings INTEGER,
    name VARCHAR(120),
    rating INTEGER,
    r_pic TEXT[]
);

-- We used this query to create our favorites table:
CREATE TABLE favorites (
    f_id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES users(u_id),
    f_pic TEXT[],
    f_ingredients TEXT[],
    f_steps TEXT[],
    f_servings INTEGER,
    f_name VARCHAR(120)
);

-- We used this query to create our weekly_recipes table:
CREATE TABLE weekly_recipes (
    wr_id SERIAL PRIMARY KEY,
    u_id INTEGER REFERENCES users(u_id),
    monday TEXT[],
    tuesday TEXT[],
    wednesday TEXT[],
    thursday TEXT[],
    friday TEXT[],
    saturday TEXT[],
    sunday TEXT[],
    active BOOLEAN
);