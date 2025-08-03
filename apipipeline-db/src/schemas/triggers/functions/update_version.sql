CREATE OR REPLACE FUNCTION update_version()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_date = now();
    NEW.version = OLD.version + 1;
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;
