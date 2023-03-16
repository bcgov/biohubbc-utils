set search_path = biohub;
set schema 'biohub';

do $$
	declare
		_summary_template_id integer; -- set after template is created
		_template_name varchar := 'Template Name 1';
		_template_version varchar := '2.0';
		_template_description varchar := '';
		
		_taxonomy_ids integer[] := array[1,2,3]; -- wild taxonomic IDs from elastic search
		_taxonomy_id integer; -- used as an index in the loop, do not set

		_validation_schema varchar := $v_s${}$v_s$;
		_transformation_schema varchar := $t_s${}$t_s$;
begin
	INSERT INTO
	  summary_template (name, version, record_effective_date, description)
	VALUES
	  (_template_name, _template_version, now(), _template_description)
	RETURNING summary_template_id into _summary_template_id;

	FOREACH _taxonomy_id IN ARRAY _taxonomy_ids LOOP
		INSERT INTO
			summary_template_species (wldtaxonomic_units_id, template_id, validation)
		VALUES
			(
				_taxonomy_id,
				_template_id,
				_validation_schema::json
			);
  END LOOP;
	RAISE NOTICE 'All done!';
end $$