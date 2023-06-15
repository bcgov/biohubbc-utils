SET search_path to 'biohub';
SET SCHEMA 'biohub';

DO $$
    DECLARE
        _template_id integer; -- set after template is created
        _template_name varchar := '___TEMPLATE_NAME___';
        _template_version varchar := '___TEMPLATE_VERSION___';
        _template_description varchar := '___TEMPLATE_DESCRIPTION___';

        _taxonomy_ids integer[] := array[___TAXON_IDS___]; -- wild taxonomic IDs from elastic search
        _taxonomy_id integer; -- used as an index in the loop, do not set
        _validation_config varchar := $v_s$___VALIDATION_CONFIG___$v_s$;

    BEGIN
        -- Insert template record, if one does not already exist
        INSERT INTO summary_template (
            name,
            version,
            record_effective_date,
            description
        )
        VALUES
        (
            _template_name,
            _template_version,
            now(),
            _template_description
        ) 
        ON CONFLICT DO NOTHING;

        -- Get template id
        SELECT
            summary_template_id INTO _template_id
        FROM
            summary_template st
        WHERE
            "name" = _template_name
        AND 
            "version" = _template_version;

        -- Upsert record for each taxonomy id
        FOREACH _taxonomy_id IN ARRAY _taxonomy_ids LOOP
            INSERT INTO summary_template_species
            (
                wldtaxonomic_units_id,
                summary_template_id,
                validation
            )
            VALUES (
                _taxonomy_id,
                _template_id,
                _validation_config :: json
            )
            ON CONFLICT (
                wldtaxonomic_units_id, 
                summary_template_id
            ) 
            DO UPDATE SET
                wldtaxonomic_units_id = _taxonomy_id,
                summary_template_id = _template_id,
                validation = _validation_config :: json
            WHERE
                summary_template_species.wldtaxonomic_units_id = _taxonomy_id
            AND 
                summary_template_species.summary_template_id = _template_id;
        END LOOP;

        RAISE NOTICE 'All done!';
END $$;