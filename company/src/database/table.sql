CREATE TABLE "Company"
(
    "company_name"       TEXT,
    "email"              TEXT NOT NULL unique,
    "main_address"       TEXT,
    "main_contact"       TEXT,
    "password"           TEXT NOT NULL,
    "preferred_language" TEXT,
    "segments"           TEXT,
    "size"               TEXT
);

CREATE TABLE "Test"
(
    "name"               TEXT,
    "applicable_to"      TEXT[],
    "type"               TEXT,
    "result"             INT,
    "questions"          JSONB,
    "is_individual_test" BOOLEAN,
    "is_finished"        BOOLEAN,
    "has_authorization"  JSONB,
    "was_supplanted"     BOOLEAN,
    "minutes_duration"   INT
);

ALTER TABLE "Test" ADD COLUMN test_id SERIAL PRIMARY KEY;
