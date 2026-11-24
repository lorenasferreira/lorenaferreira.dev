CREATE TABLE IF NOT EXISTS scrap_translations (
    id VARCHAR(80) NOT NULL PRIMARY KEY,
    translated_text VARCHAR(8000) NOT NULL,
    source_language VARCHAR(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Reject incompatible hand-created tables instead of silently marking them as migrated.
SET @scrap_translations_check = IF(
    (SELECT COUNT(*) = 3
        AND SUM(COLUMN_KEY = 'PRI') = 1
        AND SUM(
            DATA_TYPE = 'varchar' AND IS_NULLABLE = 'NO' AND EXTRA = ''
            AND (
                (COLUMN_NAME = 'id' AND CHARACTER_MAXIMUM_LENGTH = 80 AND COLUMN_KEY = 'PRI')
                OR (COLUMN_NAME = 'translated_text' AND CHARACTER_MAXIMUM_LENGTH = 8000)
                OR (COLUMN_NAME = 'source_language' AND CHARACTER_MAXIMUM_LENGTH = 12)
            )
        ) = 3
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'scrap_translations'),
    'DO 0',
    'SELECT incompatible_scrap_translations_definition'
);

PREPARE scrap_translations_check FROM @scrap_translations_check;
EXECUTE scrap_translations_check;
DEALLOCATE PREPARE scrap_translations_check;
