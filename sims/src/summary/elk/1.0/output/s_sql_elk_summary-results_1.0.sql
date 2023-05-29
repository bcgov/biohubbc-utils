SET search_path to 'biohub';
SET SCHEMA 'biohub';

DO $$
    DECLARE
        _template_id integer; -- set after template is created
        _template_name varchar := 'Elk Summary Results';
        _template_version varchar := '1.0';
        _template_description varchar := 'Elk Summary Results';

        _taxonomy_ids integer[] := array[35370,35371]; -- wild taxonomic IDs from elastic search
        _taxonomy_id integer; -- used as an index in the loop, do not set
        _validation_config varchar := $v_s${"name":"Elk Summary Results Template","files":[{"name":"Elk_RESULTS","validations":[{"file_duplicate_columns_validator":{}},{"file_required_columns_validator":{"required_columns":["Study Area","Population Unit","Block/Sample Unit","Parameter","Stratum","Observed","Estimated","Sightability Model","Sightability Correction Factor","SE","Coefficient of Variation (%)","Confidence Level (%)","Lower CL","Upper CL","Total Survey Area (km2)","Area Flown (km2)","Total Kilometers Surveyed (km)","Best Parameter Value Flag","Outlier Blocks Removed","Total Marked Animals Observed","Marked Animals Available","Parameter Comments"]}}],"columns":[{"name":"Observed","validations":[{"column_numeric_validator":{}}]},{"name":"Estimated","validations":[{"column_numeric_validator":{}}]},{"name":"Sightability Correction Factor","validations":[{"column_numeric_validator":{}}]},{"name":"SE","validations":[{"column_numeric_validator":{}}]},{"name":"Coefficient of Variation (%)","validations":[{"column_numeric_validator":{}}]},{"name":"Confidence Level (%)","validations":[{"column_numeric_validator":{}}]},{"name":"Area Flown (km2)","validations":[{"column_numeric_validator":{}}]},{"name":"Total Survey Area (km2)","validations":[{"column_numeric_validator":{}}]},{"name":"Total Kilometers Surveyed (km)","validations":[{"column_numeric_validator":{}}]},{"name":"Best Parameter Value Flag","validations":[{"column_code_validator":{"allowed_code_values":[{"name":"Yes","description":"Yes"},{"name":"No","description":"No"},{"name":"Unknown","description":"Unknown"},{"name":"Not Evaluated","description":"Not Evaluated"}]}}]},{"name":"Total Marked Animals Observed","validations":[{"column_numeric_validator":{}}]},{"name":"Marked Animals Available","validations":[{"column_numeric_validator":{}}]}]}],"validations":[{"mimetype_validator":{"reg_exps":["text/csv","application/vnd.*"]}}]}$v_s$;

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