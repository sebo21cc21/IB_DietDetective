ALTER TABLE Users ALTER COLUMN personid DROP NOT NULL;
ALTER TABLE Users ALTER COLUMN username DROP NOT NULL;
ALTER TABLE Users ALTER COLUMN password DROP NOT NULL;

ALTER TABLE Users ADD CONSTRAINT unique_email UNIQUE(email);

ALTER TABLE Users ADD COLUMN email_verified boolean;
ALTER TABLE Users ADD COLUMN image_url varchar(255);
ALTER TABLE Users ADD COLUMN provider varchar(255) NOT NULL;
ALTER TABLE Users ADD COLUMN provider_id varchar(255);
ALTER TABLE Users ADD COLUMN role varchar(255);

CREATE TABLE IF NOT EXISTS Tokens
(
    ID          SERIAL NOT NULL,
    ExpiryTime  bigint,
    Token       varchar(255),
    UserID      int4    REFERENCES Users,
    PRIMARY KEY (ID)
);
