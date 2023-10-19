ALTER TABLE ingredients ADD COLUMN amountofcalories float8;
ALTER TABLE ingredients ADD COLUMN amountofcarbohydrates float8;
ALTER TABLE ingredients ADD COLUMN amountofproteins float8;
ALTER TABLE ingredients ADD COLUMN amountoffats float8;
ALTER TABLE persons ADD COLUMN estimated_weight float4;

UPDATE persons SET estimated_weight = 70 WHERE id=1;
UPDATE persons SET estimated_weight = 70 WHERE id=2;
UPDATE persons SET estimated_weight = 80 WHERE id=3;

UPDATE ingredients SET amountofcalories = 260 WHERE id=1;
UPDATE ingredients SET amountofcalories = 680 WHERE id=2;
UPDATE ingredients SET amountofcalories = 18 WHERE id=3;
UPDATE ingredients SET amountofcalories = 18 WHERE id=4;
UPDATE ingredients SET amountofcalories = 13 WHERE id=5;
UPDATE ingredients SET amountofcalories = 26 WHERE id=6;
UPDATE ingredients SET amountofcalories = 14 WHERE id=7;
UPDATE ingredients SET amountofcalories = 14 WHERE id=8;
UPDATE ingredients SET amountofcalories = 16 WHERE id=9;
UPDATE ingredients SET amountofcalories = 264 WHERE id=10;
UPDATE ingredients SET amountofcalories = 200 WHERE id=11;
UPDATE ingredients SET amountofcalories = 6 WHERE id=12;
UPDATE ingredients SET amountofcalories = 326 WHERE id=13;
UPDATE ingredients SET amountofcalories = 0 WHERE id=14;
UPDATE ingredients SET amountofcalories = 45 WHERE id=15;
UPDATE ingredients SET amountofcalories = 27 WHERE id=16;
UPDATE ingredients SET amountofcalories = 21 WHERE id=17;
UPDATE ingredients SET amountofcalories = 152 WHERE id=18;
UPDATE ingredients SET amountofcalories = 88 WHERE id=19;
UPDATE ingredients SET amountofcalories = 35 WHERE id=20;

UPDATE ingredients SET amountofcarbohydrates = 54 WHERE id=1;
UPDATE ingredients SET amountofcarbohydrates = 3 WHERE id=2;
UPDATE ingredients SET amountofcarbohydrates = 4 WHERE id=3;
UPDATE ingredients SET amountofcarbohydrates = 4 WHERE id=4;
UPDATE ingredients SET amountofcarbohydrates = 2 WHERE id=5;
UPDATE ingredients SET amountofcarbohydrates = 6 WHERE id=6;
UPDATE ingredients SET amountofcarbohydrates = 3 WHERE id=7;
UPDATE ingredients SET amountofcarbohydrates = 3 WHERE id=8;
UPDATE ingredients SET amountofcarbohydrates = 3 WHERE id=9;
UPDATE ingredients SET amountofcarbohydrates = 4 WHERE id=10;
UPDATE ingredients SET amountofcarbohydrates = 0 WHERE id=11;
UPDATE ingredients SET amountofcarbohydrates = 1 WHERE id=12;
UPDATE ingredients SET amountofcarbohydrates = 0 WHERE id=13;
UPDATE ingredients SET amountofcarbohydrates = 0 WHERE id=14;
UPDATE ingredients SET amountofcarbohydrates = 8 WHERE id=15;
UPDATE ingredients SET amountofcarbohydrates = 7 WHERE id=16;
UPDATE ingredients SET amountofcarbohydrates = 10 WHERE id=17;
UPDATE ingredients SET amountofcarbohydrates = 21 WHERE id=18;
UPDATE ingredients SET amountofcarbohydrates = 10 WHERE id=19;
UPDATE ingredients SET amountofcarbohydrates = 11 WHERE id=20;

UPDATE ingredients SET amountofproteins = 8 WHERE id=1;
UPDATE ingredients SET amountofproteins = 1 WHERE id=2;
UPDATE ingredients SET amountofproteins = 0 WHERE id=3;
UPDATE ingredients SET amountofproteins = 0 WHERE id=4;
UPDATE ingredients SET amountofproteins = 1 WHERE id=5;
UPDATE ingredients SET amountofproteins = 1 WHERE id=6;
UPDATE ingredients SET amountofproteins = 1 WHERE id=7;
UPDATE ingredients SET amountofproteins = 1 WHERE id=8;
UPDATE ingredients SET amountofproteins = 1 WHERE id=9;
UPDATE ingredients SET amountofproteins = 0 WHERE id=10;
UPDATE ingredients SET amountofproteins = 36 WHERE id=11;
UPDATE ingredients SET amountofproteins = 8 WHERE id=12;
UPDATE ingredients SET amountofproteins = 26 WHERE id=13;
UPDATE ingredients SET amountofproteins = 0 WHERE id=14;
UPDATE ingredients SET amountofproteins = 12 WHERE id=15;
UPDATE ingredients SET amountofproteins = 9 WHERE id=16;
UPDATE ingredients SET amountofproteins = 8 WHERE id=17;
UPDATE ingredients SET amountofproteins = 23 WHERE id=18;
UPDATE ingredients SET amountofproteins = 22 WHERE id=19;
UPDATE ingredients SET amountofproteins = 1 WHERE id=20;

UPDATE ingredients SET amountoffats = 3 WHERE id=1;
UPDATE ingredients SET amountoffats = 74 WHERE id=2;
UPDATE ingredients SET amountoffats = 0 WHERE id=3;
UPDATE ingredients SET amountoffats = 0 WHERE id=4;
UPDATE ingredients SET amountoffats = 1 WHERE id=5;
UPDATE ingredients SET amountoffats = 0 WHERE id=6;
UPDATE ingredients SET amountoffats = 1 WHERE id=7;
UPDATE ingredients SET amountoffats = 0 WHERE id=8;
UPDATE ingredients SET amountoffats = 0 WHERE id=9;
UPDATE ingredients SET amountoffats = 5 WHERE id=10;
UPDATE ingredients SET amountoffats = 0 WHERE id=11;
UPDATE ingredients SET amountoffats = 3 WHERE id=12;
UPDATE ingredients SET amountoffats = 25 WHERE id=13;
UPDATE ingredients SET amountoffats = 0 WHERE id=14;
UPDATE ingredients SET amountoffats = 22 WHERE id=15;
UPDATE ingredients SET amountoffats = 23 WHERE id=16;
UPDATE ingredients SET amountoffats = 14 WHERE id=17;
UPDATE ingredients SET amountoffats = 30 WHERE id=18;
UPDATE ingredients SET amountoffats = 21 WHERE id=19;
UPDATE ingredients SET amountoffats = 2 WHERE id=20;