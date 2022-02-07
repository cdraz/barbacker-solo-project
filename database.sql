-- Create database "barbacker"
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "bar_ingredients" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "apiID" INT NOT NULL,
    "apiString" VARCHAR(255) NOT NULL
);

CREATE TABLE "saved_api_recipes" (
    "id" SERIAL PRIMARY KEY,
    "apiId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "user"
);

CREATE TABLE "user_recipes" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "user",
    "name" VARCHAR(255) NOT NULL,
    "instructions" VARCHAR(2400) NOT NULL,
    "image" VARCHAR(1200) NOT NULL,
    "alcoholic" BOOLEAN NOT NULL
);

CREATE TABLE "user_recipes_ingredients" (
    "id" SERIAL PRIMARY KEY,
    "recipeId" INTEGER NOT NULL REFERENCES "user_recipes",
    "apiIngredientName" VARCHAR(255) NOT NULL,
    "apiIngredientId" INTEGER NOT NULL
);
