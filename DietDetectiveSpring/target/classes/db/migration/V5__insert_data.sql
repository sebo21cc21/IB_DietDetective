INSERT INTO countries (name) VALUES ('Poland');
INSERT INTO countries (name) VALUES ('Germany');
INSERT INTO countries (name) VALUES ('France');


insert into persons (countryid, name, surname, dateofbirth, gender, height, weight, modifieddate)
values  (1, 'Adam', 'Nowak', '1973-05-08', 'M', 183, 79, '2023-05-09 22:01:20.000000'),
        (1, 'Maria', 'Kowalska', '1996-10-12', 'F', 169, 58, '2023-05-09 22:03:20.000000'),
        (2, 'Carl', 'Vogt', '1952-06-24', 'M', 159, 111, '2023-05-09 22:05:20.000000');

insert into difficultylevels (name)
values  ('Easy'),
        ('Medium'),
        ('Hard'),
        ('Expert');


insert into ingredientcharacters (name)
values  ('Vegetables'),
        ('Fruits'),
        ('Dairy'),
        ('Breadstuff'),
        ('Other');

insert into ingredients (ingredientcharacterid, name, unit)
values  (4, 'Bagietka korzenna', 'szt'),
        (3, 'Majonez', 'g'),
        (1, 'Pomidor cherry', 'szt'),
        (1, 'Czarna oliwka', 'szt'),
        (1, 'Kolorowa sałata', 'op'),
        (1, 'Papryka czerwona', 'szt'),
        (1, 'Ogórek', 'szt'),
        (1, 'Rzodkiewka', 'szt'),
        (3, 'Ser feta', 'op'),
        (5, 'Cielęcina bez kości', 'g'),
        (5, 'Bulion drobiowy', 'szt'),
        (5, 'Kiełbasa', 'g'),
        (5, 'Woda', 'l'),
        (5, 'Grzyby', 'g'),
        (1, 'Groszek konserwowy', 'g'),
        (1, 'Ząbek czosnku', 'szt'),
        (1, 'Brokuł różyczki', 'szt'),
        (3, 'Kremowy serek topiony', 'szt'),
        (3, 'Jajka', 'szt'),
        (1, 'Cebula', 'szt');

insert into mealcategories (name)
values  ('Breakfast'),
        ('Lunch'),
        ('Supper'),
        ('Snacks'),
        ('Drinks');

insert into mealsubcategories (mealcategoryid, name)
values  (1, 'Dairy breakfast'),
        (1, 'Sandwiches'),
        (2, 'Pizzas'),
        (2, 'Soups');

insert into meals (mealsubcategoryid, name, preparationtime, difficultylevelid, modifieddate, amountofcalories, amountofcarbohydrates, amountofproteins, amountoffats, numberofpeople)
values  (2, 'Kanapka warzywna', 15, 1, '2023-05-09 22:09:20.000000', 0, 0, 0, 0, 2),
        (4, 'Zupa grzybowa', 90, 2, '2023-05-09 22:11:22.000000', 0, 0, 0, 0, 2),
        (1, 'Jajecznica z brokułami', 15, 1, '2023-05-09 22:12:19.000000', 0, 0, 0, 0, 2);


insert into recipesteps (mealid, description, modifieddate)
values  (1, 'Bagietkę pokrój wzdłuż, tak aby powstały duże kromki. Każdą posmaruj majonezem i nałóż kolorowe sałaty.', '2023-05-09 22:37:42.000000'),
        (1, 'Rzodkiewki i ogórka pokrój w cienkie plasterki, oliwki na pół, pomidorki na ćwiartki, a paprykę w paski.', '2023-05-09 22:37:54.000000'),
        (1, 'Na sałacie zrób kilka kropek z majonezu i powtykaj wszystkie warzywa.', '2023-05-09 22:38:06.000000'),
        (1, 'Ser pokrój w kostkę. Połóż na wierzchu kanapek i podawaj.', '2023-05-09 22:38:18.000000'),
        (3, 'Umyte różyczki brokuł gotuj 3-4 minuty we wrzącej wodzie.', '2023-05-09 22:38:51.000000'),
        (3, 'Jajka wymieszaj z serkiem topionym, dopraw pieprzem. Masę jajeczną dopraw pieprzem i przyprawą Knorr.', '2023-05-09 22:39:08.000000'),
        (3, 'Półplasterki cebuli zeszklij na oliwie. Dodaj masę jajeczną i brokuły. Smaż cały czas mieszając, aż jaja się zetną.', '2023-05-09 22:39:20.000000');

insert into meals_ingredients (mealid, ingredientid, amount)
values  (1, 1, 1),
        (1, 2, 2),
        (1, 3, 5),
        (1, 4, 10),
        (1, 5, 1),
        (1, 6, 1),
        (1, 7, 1),
        (1, 8, 2),
        (1, 9, 1),
        (2, 10, 250),
        (2, 11, 2),
        (2, 12, 100),
        (2, 13, 2),
        (2, 14, 300),
        (2, 15, 50),
        (2, 16, 2),
        (3, 17, 8),
        (3, 18, 1),
        (3, 19, 4),
        (3, 20, 1);