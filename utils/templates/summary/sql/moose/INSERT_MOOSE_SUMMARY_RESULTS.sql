set search_path = biohub;
set schema 'biohub';

do $$
	declare
		_summary_template_id integer; -- set after template is created
		_template_name varchar := 'Moose Summary Results';
		_template_version varchar := '2.0';
		_template_description varchar := '';
		
		_taxonomy_ids integer[] := array[2065]; -- wild taxonomic IDs from elastic search
		_taxonomy_id integer; -- used as an index in the loop, do not set

		_validation_schema varchar := $v_s${"name":"","description":"","files":[{"name":"Moose_RESULTS","description":"","validations":[{"file_duplicate_columns_validator":{}},{"file_required_columns_validator":{"required_columns":["Study Area","Population Unit","Block ID/SU ID","Survey Start Date","Survey End Date","Survey Year","Survey Month","Survey Day","Total Survey Time","Total Survey Time Unit Code","Total Area Surveyed (km2)","Total Kilometers Surveyed (km)","Species Code","Parameter","Stratum","Observed","Estimated","Sightability Model","Sightability Correction Factor","SE","Coefficient of Variation (%)","Confidence Level (%)","Lower CL","Upper CL","Best Parameter Value Flag","Outlier SRB Blocks Removed","Marked Animals Observed","Total Marked Animals Available","Comments"]}}],"columns":[]}],"validations":[{"mimetype_validator":{"reg_exps":["text/csv","application/vnd.*"]}}]}$v_s$;
begin
	INSERT INTO
	  summary_template (name, version, record_effective_date, description)
	VALUES
	  (_template_name, _template_version, now(), _template_description)
	RETURNING summary_template_id into _summary_template_id;

	FOREACH _taxonomy_id IN ARRAY _taxonomy_ids LOOP
		INSERT INTO
			summary_template_species (wldtaxonomic_units_id, summary_template_id, validation)
		VALUES
			(
				_taxonomy_id,
				_summary_template_id,
				_validation_schema::json
			);
  END LOOP;
	RAISE NOTICE 'All done!';
end $$