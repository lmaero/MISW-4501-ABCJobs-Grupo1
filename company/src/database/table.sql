CREATE TABLE "Company"
(
    "company_name"       TEXT,
    "email"              TEXT NOT NULL unique,
    "main_address"       TEXT,
    "main_contact"       TEXT,
    "password"           TEXT NOT NULL,
    "preferred_language" TEXT,
    "segments"           TEXT,
    "size"               TEXT,
    "token"              TEXT,
    "company_id"         SERIAL PRIMARY KEY
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
    "has_authorization"  JSONB[],
    "was_supplanted"     BOOLEAN,
    "minutes_duration"   INT,
    "test_id"            SERIAL PRIMARY KEY
);

<<<<<<< HEAD

=======
>>>>>>> ABC-55
CREATE TABLE "Interview"
(
    "candidateid"        INT,
    "company_id"         INT,
    "company_name"       TEXT,
    "schedule"          TIMESTAMP,
    "result"            JSONB[],
    "interview_id"      SERIAL PRIMARY KEY
<<<<<<< HEAD
);
=======
);
>>>>>>> ABC-55
