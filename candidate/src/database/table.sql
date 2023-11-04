CREATE TABLE "Candidate"
(
    "academical_data" JSONB,
    "certifications"  TEXT,
    "email"           TEXT NOT NULL UNIQUE,
    "experience"      JSONB,
    "first_name"      TEXT,
    "interview_id"    TEXT,
    "is_available"    BOOLEAN,
    "languages"       TEXT,
    "last_name"       TEXT,
    "location"        TEXT,
    "password"        TEXT NOT NULL,
    "role"            TEXT,
    "soft_skills"     TEXT,
    "technical_data"  JSONB,
    "token"           TEXT
);

ALTER TABLE "Candidate" ADD COLUMN candidateId SERIAL PRIMARY KEY;

CREATE TABLE "TestPerformed"
(
    "candidate_id"       INT,
    "test_id"            INT,
    "answers"            TEXT[]
);

