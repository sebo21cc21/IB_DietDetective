DROP TABLE IF EXISTS eaten_meals;
DROP TABLE IF EXISTS water_intake;
DROP TABLE IF EXISTS weight_records;
DROP TABLE IF EXISTS categories_meals;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS meals;
DROP TABLE IF EXISTS categories;


CREATE TABLE users
(
    id            SERIAL PRIMARY KEY,
    provider      varchar(255),
    provider_id   varchar(255),
    first_name    VARCHAR(255) NOT NULL,
    last_name     VARCHAR(255) NOT NULL,
    birth_date    DATE,
    height        INT,
    sex           VARCHAR(10),
    target_weight FLOAT,
    goal          VARCHAR(255),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL
);


CREATE TABLE meals
(
    id                SERIAL PRIMARY KEY,
    name              VARCHAR(255) NOT NULL,
    image             VARCHAR(255),
    unit              VARCHAR(255),
    calories          INT,
    proteins          FLOAT,
    carbohydrates     FLOAT,
    fats              FLOAT,
    preparation_time  INT,
    long_description  TEXT,
    short_description VARCHAR(255)
);


CREATE TABLE water_intake
(
    id      SERIAL PRIMARY KEY,
    date    DATE  NOT NULL,
    volume  FLOAT NOT NULL,
    user_id INT   NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE weight_records
(
    id      SERIAL PRIMARY KEY,
    date    DATE  NOT NULL,
    weight  FLOAT NOT NULL,
    user_id INT   NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE categories
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);


CREATE TABLE eaten_meals
(
    id      SERIAL PRIMARY KEY,
    date    DATE NOT NULL,
    user_id INT       NOT NULL,
    meal_id INT       NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (meal_id) REFERENCES meals (id)
);

CREATE TABLE categories_meals
(
    id          SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    meal_id     INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id),
    FOREIGN KEY (meal_id) REFERENCES meals (id)
);

