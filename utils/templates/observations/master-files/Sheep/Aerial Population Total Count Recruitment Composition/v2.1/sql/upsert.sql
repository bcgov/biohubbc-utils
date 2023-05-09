SET search_path to 'biohub';
SET SCHEMA 'biohub';

DO $$
DECLARE
    _template_id integer; -- set after template is created
    _template_name varchar := 'Goat Aerial Population Total Count Recruitment Composition Survey';
    _template_version varchar := '2.0';
    _template_description varchar := 'Goat Aerial Population Total Count Recruitment Composition Survey';
    _field_method_name varchar := null;

    _taxonomy_ids integer[] := array[2062]; -- wild taxonomic IDs from elastic search
    _taxonomy_id integer; -- used as an index in the loop, do not set
    _validation_schema varchar := $v_s$ /* TODO */ $v_s$;
    _transformation_schema varchar := $v_s$ /* TODO */ $v_s$;
BEGIN
  INSERT INTO
    template (name, version, record_effective_date, description)
  VALUES
    (_template_name, _template_version, now(), _template_description)
  ON CONFLICT DO NOTHING;

  SELECT template_id INTO _template_id FROM template t WHERE "name" = _template_name AND "version" = _template_version;

  FOREACH _taxonomy_id IN ARRAY _taxonomy_ids LOOP
    INSERT INTO
        template_methodology_species (wldtaxonomic_units_id, template_id, validation, transform)
        VALUES
        (
            _taxonomy_id,
            _template_id,
            _validation_schema::json,
            _transformation_schema::json
        )
    ON CONFLICT ( wldtaxonomic_units_id,template_id) DO UPDATE SET
        validation = _validation_schema::json,
        transform = _transformation_schema::json;
  END LOOP;
  RAISE NOTICE 'All done!';
END $$;
