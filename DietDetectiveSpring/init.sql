CREATE TABLE IF NOT EXISTS Users
(
    ID           SERIAL       NOT NULL,
    PersonID     int4         NOT NULL,
    Username     varchar(255) NOT NULL UNIQUE,
    Email        varchar(255) NOT NULL,
    Password     varchar(255) NOT NULL,
    ModifiedDate timestamp    NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Countries
(
    ID   SERIAL       NOT NULL,
    Name varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Preferences
(
    ID   SERIAL       NOT NULL,
    Name varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS FitnessPlans
(
    ID                     SERIAL    NOT NULL,
    PersonID               int4      NOT NULL,
    DailyLimitOfCalories   int4,
    WeeklyLimitOfCalories  int4,
    MonthlyLimitOfCalories int4,
    DailyAmountOfWater     int4,
    StartDate              timestamp      NOT NULL,
    EndDate                timestamp,
    ModifiedDate           timestamp NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Persons
(
    ID           SERIAL       NOT NULL,
    CountryID    int4,
    Name         varchar(255) NOT NULL,
    Surname      varchar(255) NOT NULL,
    DateOfBirth  date,
    Gender       varchar(1),
    Height       int4,
    Weight       int4,
    ModifiedDate timestamp    NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Meals
(
    ID                SERIAL       NOT NULL,
    MealSubcategoryID int4         NOT NULL,
    Name              varchar(255) NOT NULL,
    PreparationTime   int4,
    DifficultyLevelID int4         NOT NULL,
    ModifiedDate      timestamp    NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS DifficultyLevels
(
    ID   SERIAL      NOT NULL,
    Name varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS RecipeSteps
(
    ID           SERIAL    NOT NULL,
    MealID       int4      NOT NULL,
    Description  varchar(255),
    ModifiedDate timestamp NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Ingredients
(
    ID                    SERIAL       NOT NULL,
    IngredientCharacterID int4         NOT NULL,
    Name                  varchar(255) NOT NULL,
    Unit                  varchar(5)   NOT NULL,
    AmountOfCalories      int4         NOT NULL,
    AmountOfCarbohydrates int4         NOT NULL,
    AmountOfProteins      int4         NOT NULL,
    AmountOfFats          int4         NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS MealSubcategories
(
    ID             SERIAL       NOT NULL,
    MealCategoryID int4         NOT NULL,
    Name           varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS IngredientCharacters
(
    ID   SERIAL      NOT NULL,
    Name varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS MealCategories
(
    ID   SERIAL      NOT NULL,
    Name varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Persons_Preferences
(
    PersonID     int4 NOT NULL,
    PreferenceID int4 NOT NULL,
    PRIMARY KEY (PersonID, PreferenceID)
);

CREATE TABLE IF NOT EXISTS Preferences_Meals
(
    PreferenceID int4 NOT NULL,
    MealID       int4 NOT NULL,
    PRIMARY KEY (PreferenceID, MealID)
);

CREATE TABLE IF NOT EXISTS Persons_Meals
(
    PersonID    int4      NOT NULL,
    MealID      int4      NOT NULL,
    ConsumeDate timestamp NOT NULL,
    PRIMARY KEY (PersonID, MealID)
);

CREATE TABLE IF NOT EXISTS Meals_Ingredients
(
    MealID       int4 NOT NULL,
    IngredientID int4 NOT NULL,
    Amount       int4 NOT NULL,
    PRIMARY KEY (MealID, IngredientID)
);

ALTER TABLE Users
    ADD CONSTRAINT FKUser394858 FOREIGN KEY (PersonID) REFERENCES Persons (ID);
ALTER TABLE Persons
    ADD CONSTRAINT FKPerson710664 FOREIGN KEY (CountryID) REFERENCES Countries (ID);
ALTER TABLE FitnessPlans
    ADD CONSTRAINT FKFitnessPla230086 FOREIGN KEY (PersonID) REFERENCES Persons (ID);
ALTER TABLE RecipeSteps
    ADD CONSTRAINT FKRecipeStep902471 FOREIGN KEY (MealID) REFERENCES Meals (ID);
ALTER TABLE Persons_Preferences
    ADD CONSTRAINT FKPerson_Pre906692 FOREIGN KEY (PersonID) REFERENCES Persons (ID);
ALTER TABLE Persons_Preferences
    ADD CONSTRAINT FKPerson_Pre85200 FOREIGN KEY (PreferenceID) REFERENCES Preferences (ID);
ALTER TABLE Meals
    ADD CONSTRAINT FKMeal269812 FOREIGN KEY (MealSubcategoryID) REFERENCES MealSubcategories (ID);
ALTER TABLE Meals
    ADD CONSTRAINT FKMeal269817 FOREIGN KEY (DifficultyLevelID) REFERENCES DifficultyLevels (ID);
ALTER TABLE MealSubcategories
    ADD CONSTRAINT FKMealSubcat847758 FOREIGN KEY (MealCategoryID) REFERENCES MealCategories (ID);
ALTER TABLE Preferences_Meals
    ADD CONSTRAINT FKPreference24141 FOREIGN KEY (PreferenceID) REFERENCES Preferences (ID);
ALTER TABLE Preferences_Meals
    ADD CONSTRAINT FKPreference29710 FOREIGN KEY (MealID) REFERENCES Meals (ID);
ALTER TABLE Persons_Meals
    ADD CONSTRAINT FKPerson_Mea912081 FOREIGN KEY (PersonID) REFERENCES Persons (ID);
ALTER TABLE Persons_Meals
    ADD CONSTRAINT FKPerson_Mea728005 FOREIGN KEY (MealID) REFERENCES Meals (ID);
ALTER TABLE Meals_Ingredients
    ADD CONSTRAINT FKMeal_Ingre184018 FOREIGN KEY (MealID) REFERENCES Meals (ID);
ALTER TABLE Meals_Ingredients
    ADD CONSTRAINT FKMeal_Ingre723244 FOREIGN KEY (IngredientID) REFERENCES Ingredients (ID);
ALTER TABLE Ingredients
    ADD CONSTRAINT FKIngredient478352 FOREIGN KEY (IngredientCharacterID) REFERENCES IngredientCharacters (ID);
