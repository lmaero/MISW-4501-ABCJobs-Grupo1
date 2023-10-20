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
