-- Adopt a column from the old manual script only when its definition matches.
-- A conflicting definition deliberately fails with a diagnostic instead of modifying data.
SET @scrap_avatar_ddl = COALESCE((
    SELECT CASE
        WHEN DATA_TYPE = 'varchar' AND CHARACTER_MAXIMUM_LENGTH = 100
            AND IS_NULLABLE = 'YES' AND COLUMN_DEFAULT IS NULL AND EXTRA = ''
        THEN 'DO 0'
        ELSE 'SELECT incompatible_scraps_avatar_public_id_definition'
    END
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'scraps'
        AND COLUMN_NAME = 'avatar_public_id'
), 'ALTER TABLE scraps ADD COLUMN avatar_public_id VARCHAR(100) NULL');

PREPARE scrap_avatar_ddl FROM @scrap_avatar_ddl;
EXECUTE scrap_avatar_ddl;
DEALLOCATE PREPARE scrap_avatar_ddl;
