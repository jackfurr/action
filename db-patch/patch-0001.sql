--
-- Schema version table
--

DROP TABLE IF EXISTS schema_version;
CREATE TABLE schema_version (
  patch_level int
)
ENGINE=INNODB;

INSERT INTO schema_version(patch_level) values(0);
