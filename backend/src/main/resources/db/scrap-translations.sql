-- Apply explicitly to the intended database before enabling translation.
-- Application schema management remains disabled; this script is not run automatically.
CREATE TABLE IF NOT EXISTS scrap_translations (
    id VARCHAR(80) NOT NULL PRIMARY KEY,
    translated_text VARCHAR(8000) NOT NULL,
    source_language VARCHAR(12) NOT NULL
);
