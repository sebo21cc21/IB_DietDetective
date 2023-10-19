CREATE DATABASE DietDetective;

CREATE TABLE "User" (
    ID SERIAL NOT NULL, 
    PersonID int4 NOT NULL, 
    Username varchar(255) NOT NULL UNIQUE, 
    Email varchar(255) NOT NULL, 
    Password varchar(255) NOT NULL, 
    "Modified date" timestamp NOT NULL, 
    PRIMARY KEY (ID));

CREATE TABLE Country (
    ID SERIAL NOT NULL, 
    Name varchar(255) NOT NULL UNIQUE, 
    PRIMARY KEY (ID));

CREATE TABLE Preference (
    ID SERIAL NOT NULL, 
    Name int4 NOT NULL UNIQUE, 
    PRIMARY KEY (ID));

CREATE TABLE FitnessPlan (
    ID SERIAL NOT NULL, 
    PersonID int4 NOT NULL, 
    "Daily limit of calories" int4, 
    "Weekly limit of calories" int4, 
    "Monthly limit of calories" int4, 
    "Daily amount of water" int4, 
    "Start date" date NOT NULL, 
    "End date" date, 
    "Modified date" timestamp NOT NULL, 
    PRIMARY KEY (ID));

CREATE TABLE Person (
    ID SERIAL NOT NULL, 
    CountryID int4, 
    Name varchar(255) NOT NULL, 
    Surname varchar(255) NOT NULL, 
    "Date of birth" date, 
    Gender varchar(1), 
    Height int4, 
    Weight int4, 
    "Modified date" date NOT NULL, 
    PRIMARY KEY (ID));

CREATE TABLE Meal (
    ID SERIAL NOT NULL, 
    MealSubcategoryID int4 NOT NULL, 
    Name varchar(255) NOT NULL, 
    "Preparation time" int4, 
    "Difficulty level" varchar(10) NOT NULL, 
    "Modified date" timestamp NOT NULL, 
    PRIMARY KEY (ID));

CREATE TABLE RecipeStep (
    ID SERIAL NOT NULL, 
    MealID int4 NOT NULL, 
    Description varchar(255), 
    "Modified date" timestamp NOT NULL, 
    PRIMARY KEY (ID));

CREATE TABLE Ingredient (
    ID SERIAL NOT NULL, 
    IngredientCharacterID int4 NOT NULL, 
    Name varchar(255) NOT NULL, 
    Unit varchar(5) NOT NULL, 
    "Amount of calories" int4 NOT NULL, 
    "Amount of carbohydrates" int4 NOT NULL, 
    "Amount of proteins" int4 NOT NULL, 
    "Amount of fats" int4 NOT NULL, 
    PRIMARY KEY (ID));

CREATE TABLE MealSubcategory (
    ID SERIAL NOT NULL, 
    MealCategoryID int4 NOT NULL, 
    Name varchar(255) NOT NULL UNIQUE, 
    PRIMARY KEY (ID));

CREATE TABLE IngredientCharacter (
    ID SERIAL NOT NULL, 
    Name varchar(50) NOT NULL UNIQUE, 
    PRIMARY KEY (ID));

CREATE TABLE MealCategory (
    ID SERIAL NOT NULL, 
    Name varchar(50) NOT NULL UNIQUE, 
    PRIMARY KEY (ID));

CREATE TABLE Person_Preference (
    PersonID int4 NOT NULL, 
    PreferenceID int4 NOT NULL, 
    PRIMARY KEY (PersonID, PreferenceID));

CREATE TABLE Preference_Meal (
    PreferenceID int4 NOT NULL, 
    MealID int4 NOT NULL, 
    PRIMARY KEY (PreferenceID, MealID));

CREATE TABLE Person_Meal (
    PersonID int4 NOT NULL, 
    MealID int4 NOT NULL, 
    "Consume date" timestamp NOT NULL, 
    PRIMARY KEY (PersonID, MealID));

CREATE TABLE Meal_Ingredient (
    MealID int4 NOT NULL, 
    IngredientID int4 NOT NULL, 
    Amount int4 NOT NULL, 
    PRIMARY KEY (MealID, IngredientID));
    
ALTER TABLE "User" ADD CONSTRAINT FKUser394858 FOREIGN KEY (PersonID) REFERENCES Person (ID);
ALTER TABLE Person ADD CONSTRAINT FKPerson710664 FOREIGN KEY (CountryID) REFERENCES Country (ID);
ALTER TABLE FitnessPlan ADD CONSTRAINT FKFitnessPla230086 FOREIGN KEY (PersonID) REFERENCES Person (ID);
ALTER TABLE RecipeStep ADD CONSTRAINT FKRecipeStep902471 FOREIGN KEY (MealID) REFERENCES Meal (ID);
ALTER TABLE Person_Preference ADD CONSTRAINT FKPerson_Pre906692 FOREIGN KEY (PersonID) REFERENCES Person (ID);
ALTER TABLE Person_Preference ADD CONSTRAINT FKPerson_Pre85200 FOREIGN KEY (PreferenceID) REFERENCES Preference (ID);
ALTER TABLE Meal ADD CONSTRAINT FKMeal269812 FOREIGN KEY (MealSubcategoryID) REFERENCES MealSubcategory (ID);
ALTER TABLE MealSubcategory ADD CONSTRAINT FKMealSubcat847758 FOREIGN KEY (MealCategoryID) REFERENCES MealCategory (ID);
ALTER TABLE Preference_Meal ADD CONSTRAINT FKPreference24141 FOREIGN KEY (PreferenceID) REFERENCES Preference (ID);
ALTER TABLE Preference_Meal ADD CONSTRAINT FKPreference29710 FOREIGN KEY (MealID) REFERENCES Meal (ID);
ALTER TABLE Person_Meal ADD CONSTRAINT FKPerson_Mea912081 FOREIGN KEY (PersonID) REFERENCES Person (ID);
ALTER TABLE Person_Meal ADD CONSTRAINT FKPerson_Mea728005 FOREIGN KEY (MealID) REFERENCES Meal (ID);
ALTER TABLE Meal_Ingredient ADD CONSTRAINT FKMeal_Ingre184018 FOREIGN KEY (MealID) REFERENCES Meal (ID);
ALTER TABLE Meal_Ingredient ADD CONSTRAINT FKMeal_Ingre723244 FOREIGN KEY (IngredientID) REFERENCES Ingredient (ID);
ALTER TABLE Ingredient ADD CONSTRAINT FKIngredient478352 FOREIGN KEY (IngredientCharacterID) REFERENCES IngredientCharacter (ID);
