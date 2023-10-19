ALTER TABLE ingredients ALTER COLUMN amountofcalories DROP NOT NULL;
ALTER TABLE ingredients ALTER COLUMN amountofcarbohydrates DROP NOT NULL;
ALTER TABLE ingredients ALTER COLUMN amountofproteins DROP NOT NULL;
ALTER TABLE ingredients ALTER COLUMN amountoffats DROP NOT NULL;

ALTER TABLE ingredients DROP COLUMN amountofcalories;
ALTER TABLE ingredients DROP COLUMN amountofcarbohydrates;
ALTER TABLE ingredients DROP COLUMN amountofproteins;
ALTER TABLE ingredients DROP COLUMN amountoffats;