INSERT INTO meals (name, image, unit, calories, proteins, carbohydrates, fats, preparation_time, long_description, short_description)
VALUES
    ('Jogurt z bananem i wiórkami kokosowymi', 'https://cdn.kalkulatorkalorii.net/photos/jogurt-z-bananem-kokosem.jpg', '276g', 84, 6.13, 13.34, 1.44, 2, 'Banana pokrój w plasterki.\nOwoc przełóż do miseczki, zalej jogurtem.\nCałość posyp wiórkami kokosowymi.', 'Z doświadczenia wiem, że większość z Was nie przepada za jogurtami naturalnymi. Owocowe (czy ktoś kiedyś sprawdził, ile w nich owoców? Tyle co nic!) jadacie całkiem chętnie, a naturalne oceniacie jako zbyt kwaśne i niesmaczne.');

INSERT INTO meals (name, unit, calories, proteins, carbohydrates, fats)
VALUES
    ('Banan', '100g', 89, 1.1, 22.8, 0.2),
    ('Wiórki kokosowe', '100g', 657, 5.6, 27, 63.2),
    ('Jogurt grecki light', '100g', 57, 10.2, 5.2, 0);


INSERT INTO categories (name)
VALUES
    ('Bez glutenu'),
    ('Koktajle'),
    ('Składniki');


INSERT INTO categories_meals(category_id, meal_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (3, 3),
    (3, 4);

INSERT INTO users (first_name, last_name, email, password)
VALUES ('Alice', 'Johnson', 'alice@example.com', 'hashed_password_1');

INSERT INTO users (first_name, last_name, birth_date, target_weight, goal, email, password)
VALUES ('Bob', 'Smith', '1985-03-15', 80.0, 'Build Muscle', 'bob@example.com', 'hashed_password_2');

INSERT INTO users (first_name, last_name, birth_date, email, password)
VALUES ('Charlie', 'Brown', '1992-07-20', 'charlie@example.com', 'hashed_password_3');

INSERT INTO weight_records (user_id, weight, date)
VALUES
    (1, 70.0, '2019-01-01'),
    (1, 69.0, '2019-01-02'),
    (1, 68.0, '2019-01-03'),
    (1, 67.0, '2019-01-04'),
    (1, 66.0, '2019-01-05'),
    (1, 65.0, '2019-01-06'),
    (1, 64.0, '2019-01-07'),
    (1, 63.0, '2019-01-08'),
    (1, 62.0, '2019-01-09'),
    (1, 61.0, '2019-01-10'),
    (1, 60.0, '2019-01-11'),
    (1, 59.0, '2019-01-12'),
    (1, 58.0, '2019-01-13'),
    (1, 57.0, '2019-01-14'),
    (1, 56.0, '2019-01-15'),
    (1, 55.0, '2019-01-16'),
    (1, 54.0, '2019-01-17'),
    (1, 53.0, '2019-01-18'),
    (1, 52.0, '2019-01-19'),
    (1, 51.0, '2019-01-20'),
    (1, 50.0, '2019-01-21'),
    (1, 49.0, '2019-01-22'),
    (1, 48.0, '2019-01-23'),
    (1, 47.0, '2019-01-24'),
    (1, 46.0, '2019-01-25'),
    (1, 45.0, '2019-01-26'),
    (1, 44.0, '2019-01-27'),
    (1, 43.0, '2019-01-28'),
    (1, 42.0, '2019-01-29'),
    (1, 45.0, '2019-01-30');

INSERT INTO water_intake (user_id, volume, date)
VALUES
    (1, 2000, '2019-01-01'),
    (1, 2000, '2019-01-02'),
    (1, 2000, '2019-01-03'),
    (1, 2000, '2019-01-04'),
    (1, 2000, '2019-01-05'),
    (1, 2000, '2019-01-06'),
    (1, 2000, '2019-01-07'),
    (1, 2000, '2019-01-08'),
    (1, 2000, '2019-01-09'),
    (1, 2000, '2019-01-10'),
    (1, 2000, '2019-01-11'),
    (1, 2000, '2019-01-12'),
    (1, 2000, '2019-01-13'),
    (1, 2000, '2019-01-14'),
    (1, 2000, '2019-01-15'),
    (1, 2000, '2019-01-16'),
    (1, 2000, '2019-01-17'),
    (1, 2000, '2019-01-18'),
    (1, 2000, '2019-01-19'),
    (1, 2000, '2019-01-20'),
    (1, 2000, '2019-01-21'),
    (1, 2000, '2019-01-22'),
    (1, 2000, '2019-01-23'),
    (1, 2000, '2019-01-24'),
    (1, 2000, '2019-01-25'),
    (1, 2000, '2019-01-26'),
    (1, 2000, '2019-01-27'),
    (1, 2000, '2019-01-28'),
    (1, 2000, '2019-01-29'),
    (1, 2000, '2019-01-30');


INSERT INTO eaten_meals (user_id, meal_id, date, eaten_weight)
VALUES
    (1, 1, '2019-01-01', 100),
    (1, 2, '2019-01-01', 100),
    (1, 3, '2019-01-01', 100),
    (1, 1, '2019-01-02', 100),
    (1, 2, '2019-01-02', 100),
    (1, 3, '2019-01-02', 100),
    (1, 1, '2019-01-03', 100),
    (1, 2, '2019-01-03', 100),
    (1, 3, '2019-01-03', 100),
    (1, 1, '2019-01-04', 100),
    (1, 2, '2019-01-04', 100),
    (1, 3, '2019-01-04', 100),
    (1, 1, '2019-01-05', 100),
    (1, 2, '2019-01-05', 100),
    (1, 3, '2019-01-05', 100),
    (1, 1, '2019-01-06', 100),
    (1, 2, '2019-01-06', 100),
    (1, 3, '2019-01-06', 100),
    (1, 1, '2019-01-07', 100),
    (1, 2, '2019-01-07', 100),
    (1, 3, '2019-01-07', 100),
    (1, 1, '2019-01-08', 100),
    (1, 2, '2019-01-08', 100),
    (1, 3, '2019-01-08', 100),
    (1, 1, '2019-01-09', 100),
    (1, 2, '2019-01-09', 100),
    (1, 3, '2019-01-09', 100),
    (1, 1, '2019-01-10', 100),
    (1, 2, '2019-01-10', 100);
