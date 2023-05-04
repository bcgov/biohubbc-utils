SET search_path to 'biohub';
SET SCHEMA 'biohub';

DO $$
DECLARE
    _template_id integer; -- set after template is created
    _template_name varchar := 'Template name';
    _template_version varchar := '2.0';
    _template_description varchar := 'Template Description';
    _field_method_name varchar := null;

    _taxonomy_ids integer[] := array[1,2,3]; -- wild taxonomic IDs from elastic search
    _taxonomy_id integer; -- used as an index in the loop, do not set
    _validation_schema varchar := $v_s${{"name":"","description":"","files":[{"name":"Block Summary","description":"","validations":[{"file_duplicate_columns_validator":{}},{"file_required_columns_validator":{"required_columns":["Study Area","Block ID/SU ID","Stratum","Sampled (Y/N)"]}}],"columns":[{"name":"Stratum","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"very high","description":"very high"},{"name":"high","description":"high"},{"name":"medium","description":"medium"},{"name":"low","description":"low"},{"name":"very low","description":"very low"},{"name":"describe in comments","description":"describe in comments"}]}}]},{"name":"Stratum/Block Area (km2)","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Sampled (Y/N)","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Y","description":"Y"},{"name":"N","description":"N"}]}}]}]},{"name":"Effort & Site Conditions","description":"","validations":[{"file_duplicate_columns_validator":{}}],"columns":[{"name":"Block Area (km2)","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Aircraft Type","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Bell JetRanger","description":"Bell JetRanger"},{"name":"Bell JetRanger without bubble window","description":"Bell JetRanger without bubble window"},{"name":"Bell JetRanger with bubble window","description":"Bell JetRanger with bubble window"},{"name":"Bell LongRanger","description":"Bell LongRanger"},{"name":"Hiller 12E4","description":"Hiller 12E4"},{"name":"Hughes 500D","description":"Hughes 500D"},{"name":"Cessna 172","description":"Cessna 172"},{"name":"Cessna 180","description":"Cessna 180"},{"name":"Cessna 182","description":"Cessna 182"},{"name":"Cessna 185","description":"Cessna 185"},{"name":"Cessna 206","description":"Cessna 206"},{"name":"Super Cub","description":"Super Cub"},{"name":"Beaver","description":"Beaver"},{"name":"Single Otter","description":"Single Otter"},{"name":"Twin Otter","description":"Twin Otter"},{"name":"Bell 406","description":"Bell 406"},{"name":"A-Star","description":"A-Star"}]}}]}]},{"name":"Observations","description":"","validations":[{"file_duplicate_columns_validator":{}},{"file_required_columns_validator":{"required_columns":["Study Area","Block ID/SU ID","Stratum","UTM Zone","Easting","Northing","Lat (DD)","Long (DD)","Species","Group Label","Date"]}}],"columns":[{"name":"Stratum","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"very high","description":"very high"},{"name":"high","description":"high"},{"name":"medium","description":"medium"},{"name":"low","description":"low"},{"name":"very low","description":"very low"},{"name":"describe in comments","description":"describe in comments"}]}}]},{"name":"UTM Zone","description":"","validations":[{"column_format_validator":{"reg_exp":"^([7-9]|1[0-1])$","reg_exp_flags":"g","expected_format":"UTM Zone must be a number between 7 and 11."}}]},{"name":"Easting","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Northing","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Datum","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"NAD83","description":"NAD83"},{"name":"NAD27","description":"NAD27"},{"name":"WGS84","description":"WGS84"}]}}]},{"name":"Lat (DD)","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Long (DD)","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Species","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"M-CEEL","description":"M-CEEL"},{"name":"M-CEEL-RO","description":"M-CEEL-RO"}]}}]},{"name":"BC RISC Yearlings Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"BC RISC Class I Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"BC RISC Class II Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"BC RISC Class III Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"BC RISC Class IV Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Spike Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Raghorn Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"<=3 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"3 - 4 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"3 - 5 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"<4 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":">=4 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"5 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":">=5 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":">= 6 Point Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Adult Bulls - Unclassified","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Unclassified Bulls","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Cows","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Calves","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Adult Unclassified Sex","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Yearling - Unclassified Sex","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Unclassified Age/Sex","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Sign Type","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Antler","description":"Antler"},{"name":"Bed","description":"Bed"},{"name":"Body Parts","description":"Body Parts"},{"name":"Trail","description":"Trail"},{"name":"Tracks","description":"Tracks"},{"name":"Carcass","description":"Carcass"},{"name":"Scratchings","description":"Scratchings"},{"name":"Hair","description":"Hair"},{"name":"Excrement","description":"Excrement"},{"name":"Cache","description":"Cache"},{"name":"Egg Shell","description":"Egg Shell"},{"name":"Feeding","description":"Feeding"},{"name":"Feather","description":"Feather"},{"name":"Pellet Group","description":"Pellet Group"},{"name":"Regurgitated Pellet","description":"Regurgitated Pellet"},{"name":"Shed Skin","description":"Shed Skin"},{"name":"Whitewash","description":"Whitewash"},{"name":"Described in Comments","description":"Pellet Group"}]}}]},{"name":"Sign Count","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Sign Age","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"New","description":"New"},{"name":"Old","description":"Old"},{"name":"Hour","description":"Hour"},{"name":"Day","description":"Day"},{"name":"Week","description":"Week"},{"name":"Month","description":"Month"},{"name":"Year","description":"Year"},{"name":"Unclassified","description":"Unclassified"},{"name":"Described in Comments","description":"Described in Comments"}]}}]},{"name":"Habitat","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Alpine","description":"Alpine"},{"name":"Alpine Barren","description":"Alpine Barren"},{"name":"Alpine Heath Meadows","description":"Alpine Heath Meadows"},{"name":"Avalanche Path","description":"Avalanche Path"},{"name":"Avalanche path, herbaceous","description":"Avalanche path, herbaceous"},{"name":"Avalanche path, shrubby","description":"Avalanche path, shrubby"},{"name":"Burn","description":"Burn"},{"name":"Bush or Scrub land","description":"Bush or Scrub land"},{"name":"Caves","description":"Caves"},{"name":"Cutblock","description":"Cutblock"},{"name":"Cutblock, herbaceous","description":"Cutblock, herbaceous"},{"name":"Cutblock, shrubby","description":"Cutblock, shrubby"},{"name":"Cutblock, unvegetated","description":"Cutblock, unvegetated"},{"name":"Cutblock - free to grow","description":"Cutblock - free to grow"},{"name":"Cutblock - mature","description":"Cutblock - mature"},{"name":"Cutblock - not sufficiently restored","description":"Cutblock - not sufficiently restored"},{"name":"Agricultural","description":"Agricultural"},{"name":"Cultivated field","description":"Cultivated field"},{"name":"Cultivated or Agricultural","description":"Cultivated or Agricultural"},{"name":"Cultivated orchard","description":"Cultivated orchard"},{"name":"Cultivated vineyard","description":"Cultivated vineyard"},{"name":"Cutbank","description":"Cutbank"},{"name":"Cliff","description":"Cliff"},{"name":"Cliff, broken","description":"Cliff, broken"},{"name":"Cliff, dissected","description":"Cliff, dissected"},{"name":"Cliff, in forest","description":"Cliff, in forest"},{"name":"Cliff, open","description":"Cliff, open"},{"name":"Electrical transmission line","description":"Electrical transmission line"},{"name":"Estuary","description":"Estuary"},{"name":"Flat or Open Slopes","description":"Flat or Open Slopes"},{"name":"Forest","description":"Forest"},{"name":"Forest, coniferous","description":"Forest, coniferous"},{"name":"Forest, deciduous","description":"Forest, deciduous"},{"name":"Forest, commercially thinned","description":"Forest, commercially thinned"},{"name":"Forest, mature","description":"Forest, mature"},{"name":"Forest, mixed","description":"Forest, mixed"},{"name":"Forest, old","description":"Forest, old"},{"name":"Forest, young","description":"Forest, young"},{"name":"Forest, riparian","description":"Forest, riparian"},{"name":"Glacier","description":"Glacier"},{"name":"Golf course","description":"Golf course"},{"name":"Grassland","description":"Grassland"},{"name":"Gravel bar","description":"Gravel bar"},{"name":"Gravel pit","description":"Gravel pit"},{"name":"Krummholtz","description":"Krummholtz"},{"name":"Lake","description":"Lake"},{"name":"Low-elevation","description":"Low-elevation"},{"name":"Mid-elevation","description":"Mid-elevation"},{"name":"Moraine","description":"Moraine"},{"name":"Parkland","description":"Parkland"},{"name":"Pasture","description":"Pasture"},{"name":"Pipeline right-of-way","description":"Pipeline right-of-way"},{"name":"Railway surface","description":"Railway surface"},{"name":"Reservoir","description":"Reservoir"},{"name":"Ridge","description":"Ridge"},{"name":"Riparian","description":"Riparian"},{"name":"River","description":"River"},{"name":"Rock/Talus","description":"Rock/Talus"},{"name":"Rubble","description":"Rubble"},{"name":"Rock outcrop","description":"Rock outcrop"},{"name":"Scree","description":"Scree"},{"name":"Shrub","description":"Shrub"},{"name":"Shore","description":"Shore"},{"name":"Snow","description":"Snow"},{"name":"Sub-Alpine","description":"Sub-Alpine"},{"name":"Talus/Slope","description":"Talus/Slope"},{"name":"Terraces","description":"Terraces"},{"name":"Timber","description":"Timber"},{"name":"Transportation or Transmission Corridor","description":"Transportation or Transmission Corridor"},{"name":"Urban or Residential","description":"Urban or Residential"},{"name":"Wetland/Meadow","description":"Wetland/Meadow"},{"name":"Willow/Shrub","description":"Willow/Shrub"},{"name":"Described in Comments","description":"Described in Comments"}]}}]},{"name":"% Veg Cover","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"% Snow Cover","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Activity","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Alert","description":"Alert"},{"name":"Avoiding Pests","description":"Avoiding Pests"},{"name":"Basking","description":"Basking"},{"name":"Bedding","description":"Bedding"},{"name":"Building","description":"Building"},{"name":"Cashing","description":"Cashing"},{"name":"Casting","description":"Casting"},{"name":"Courting","description":"Courting"},{"name":"Denning","description":"Denning"},{"name":"Disturbed","description":"Disturbed"},{"name":"Drinking","description":"Drinking"},{"name":"Excreting","description":"Excreting"},{"name":"Feeding","description":"Feeding"},{"name":"Fleeing","description":"Fleeing"},{"name":"Feeding salmonid","description":"Feeding salmonid"},{"name":"Grooming","description":"Grooming"},{"name":"Habitat","description":"Habitat"},{"name":"Hibernating","description":"Hibernating"},{"name":"Hunting","description":"Building"},{"name":"Ingesting Minerals","description":"Ingesting Minerals"},{"name":"Incubating","description":"Incubating"},{"name":"Living","description":"Living"},{"name":"Migrating Daily","description":"Migrating Daily"},{"name":"Migrating Seasonally","description":"Migrating Seasonally"},{"name":"Reproducing birthing","description":"Reproducing birthing"},{"name":"Reproducing eggs","description":"Reproducing eggs"},{"name":"Rearing","description":"Rearing"},{"name":"Standing","description":"Standing"},{"name":"Security and/or Thermal","description":"Security and/or Thermal"},{"name":"Thermal","description":"Thermal"},{"name":"Territoriality","description":"Territoriality"},{"name":"Not Traveling","description":"Not Traveling"},{"name":"Traveling, Flying","description":"Traveling flying"},{"name":"Traveling, Unclassified","description":"Traveling, Unclassified"},{"name":"Traveling, Walking","description":"Traveling, Walking"},{"name":"Traveling on a Path","description":"Traveling on a Path"},{"name":"Traveling, Running","description":"Traveling running"},{"name":"Traveling, Swimming","description":"Traveling, Swimming"},{"name":"Traveling, Heli-Skiing","description":"Traveling, Heli-Skiing"},{"name":"Traveling, Skiing","description":"Traveling, Skiing"},{"name":"Traveling, Snowmobiling","description":"Traveling, Snowmobiling"},{"name":"Traveling, Snowshoeing","description":"Traveling, Snowshoeing"},{"name":"Traveling, Snow Cat","description":"Traveling, Snow Cat"},{"name":"Urinating","description":"Urinating"},{"name":"Activity described in comments","description":"Described in comments"}]}}]},{"name":"Number of Marked Animals Observed","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Survey or Telemetry Search","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Survey","description":"Survey"},{"name":"Telemetry","description":"Telemetry"}]}}]}]},{"name":"Marked Animals","description":"","validations":[{"file_duplicate_columns_validator":{}},{"file_required_columns_validator":{"required_columns":["Group Label"]}}],"columns":[{"name":"Target or Non-Targeted","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Targeted","description":"Targeted"},{"name":"Non-Targeted","description":"Non-Targeted"}]}}]},{"name":"Frequency Unit","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"KHz","description":"KHz"},{"name":"MHz","description":"MHz"},{"name":"Hz","description":"Hz"}]}}]}]},{"name":"Incidental Observations","description":"","validations":[{"file_duplicate_columns_validator":{}}],"columns":[{"name":"UTM Zone","description":"","validations":[{"column_format_validator":{"reg_exp":"^([7-9]|1[0-1])$","reg_exp_flags":"g","expected_format":"UTM Zone must be a number between 7 and 11."}}]},{"name":"Easting","description":"","validations":[{"column_format_validator":{"reg_exp":"^[1-9][0-9][0-9][0-9][0-9][0-9](?:\\.\\d+)?$","reg_exp_flags":"g","expected_format":"Easting needs to be a 6 digit number."}}]},{"name":"Northing","description":"","validations":[{"column_format_validator":{"reg_exp":"^[1-9][0-9][0-9][0-9][0-9][0-9][0-9](?:\\.\\d+)?$","reg_exp_flags":"g","expected_format":"Northing needs to be a 7 digit number."}}]},{"name":"Datum","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"NAD83","description":"NAD83"},{"name":"NAD27","description":"NAD27"},{"name":"WGS84","description":"WGS84"}]}}]},{"name":"Lat (DD)","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Long (DD)","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Adult Males","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Adult Females","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Adults - Unclassified Sex","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Juvenile Males","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Juvenile Females","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Juveniles - Unclassified Sex","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Unknown Age/Sex","description":"","validators":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"SpeciesOccurrence Status","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Present","description":"Present"},{"name":"Absent","description":"Absent"}]}}]},{"name":"Activity","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Alert","description":"Alert"},{"name":"Avoiding Pests","description":"Avoiding Pests"},{"name":"Basking","description":"Basking"},{"name":"Bedding","description":"Bedding"},{"name":"Building","description":"Building"},{"name":"Cashing","description":"Cashing"},{"name":"Casting","description":"Casting"},{"name":"Courting","description":"Courting"},{"name":"Denning","description":"Denning"},{"name":"Disturbed","description":"Disturbed"},{"name":"Drinking","description":"Drinking"},{"name":"Excreting","description":"Excreting"},{"name":"Feeding","description":"Feeding"},{"name":"Fleeing","description":"Fleeing"},{"name":"Feeding salmonid","description":"Feeding salmonid"},{"name":"Grooming","description":"Grooming"},{"name":"Habitat","description":"Habitat"},{"name":"Hibernating","description":"Hibernating"},{"name":"Hunting","description":"Building"},{"name":"Ingesting Minerals","description":"Ingesting Minerals"},{"name":"Incubating","description":"Incubating"},{"name":"Living","description":"Living"},{"name":"Migrating Daily","description":"Migrating Daily"},{"name":"Migrating Seasonally","description":"Migrating Seasonally"},{"name":"Reproducing birthing","description":"Reproducing birthing"},{"name":"Reproducing eggs","description":"Reproducing eggs"},{"name":"Rearing","description":"Rearing"},{"name":"Standing","description":"Standing"},{"name":"Security and/or Thermal","description":"Security and/or Thermal"},{"name":"Thermal","description":"Thermal"},{"name":"Territoriality","description":"Territoriality"},{"name":"Not Traveling","description":"Not Traveling"},{"name":"Traveling, Flying","description":"Traveling flying"},{"name":"Traveling, Unclassified","description":"Traveling, Unclassified"},{"name":"Traveling, Walking","description":"Traveling, Walking"},{"name":"Traveling on a Path","description":"Traveling on a Path"},{"name":"Traveling, Running","description":"Traveling running"},{"name":"Traveling, Swimming","description":"Traveling, Swimming"},{"name":"Traveling, Heli-Skiing","description":"Traveling, Heli-Skiing"},{"name":"Traveling, Skiing","description":"Traveling, Skiing"},{"name":"Traveling, Snowmobiling","description":"Traveling, Snowmobiling"},{"name":"Traveling, Snowshoeing","description":"Traveling, Snowshoeing"},{"name":"Traveling, Snow Cat","description":"Traveling, Snow Cat"},{"name":"Urinating","description":"Urinating"},{"name":"Activity described in comments","description":"Described in comments"}]}}]},{"name":"Activity Count","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Feature Type","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Breeding Site","description":"Breeding Site"},{"name":"Maternity Roost","description":"Maternity Roost"},{"name":"Bat Nursery Roost","description":"Bat Nursery Roost"},{"name":"Rookery","description":"Rookery"},{"name":"Courting Site","description":"Courting Site"},{"name":"Feeding Site","description":"Feeding Site"},{"name":"Resting Site","description":"Resting Site"},{"name":"Staging Site","description":"Staging Site"},{"name":"Ungulate Winter Range","description":"Ungulate Winter Range"},{"name":"Hibernaculum","description":"Hibernaculum"},{"name":"Roost","description":"Roost"},{"name":"Wallow","description":"Wallow"},{"name":"Mineral Lick","description":"Mineral Lick"},{"name":"Burrow","description":"Burrow"},{"name":"Den","description":"Den"},{"name":"Lodge","description":"Lodge"},{"name":"Nest","description":"Nest"},{"name":"Nest Tree","description":"Nest Tree"},{"name":"Plant Community","description":"Plant Community"},{"name":"Plant Site","description":"Plant Site"},{"name":"Hot Spring","description":"Hot Spring"},{"name":"Water","description":"Water"},{"name":"Fisheries Sensitive Feature","description":"Fisheries Sensitive Feature"},{"name":"Marine Sensitive Feature","description":"Marine Sensitive Feature"},{"name":"Described in Comments","description":"Pellet Group"}]}}]},{"name":"Feature Type Count","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]},{"name":"Sign Type","description":"","validations":[{"column_code_validator":{"name":{"type":"string"},"description":{"type":"string"},"allowed_code_values":[{"name":"Antler","description":"Antler"},{"name":"Bed","description":"Bed"},{"name":"Body Parts","description":"Body Parts"},{"name":"Trail","description":"Trail"},{"name":"Tracks","description":"Tracks"},{"name":"Carcass","description":"Carcass"},{"name":"Scratchings","description":"Scratchings"},{"name":"Hair","description":"Hair"},{"name":"Excrement","description":"Excrement"},{"name":"Cache","description":"Cache"},{"name":"Egg Shell","description":"Egg Shell"},{"name":"Feeding","description":"Feeding"},{"name":"Feather","description":"Feather"},{"name":"Pellet Group","description":"Pellet Group"},{"name":"Regurgitated Pellet","description":"Regurgitated Pellet"},{"name":"Shed Skin","description":"Shed Skin"},{"name":"Whitewash","description":"Whitewash"},{"name":"Described in Comments","description":"Pellet Group"}]}}]},{"name":"Sign Count","description":"","validations":[{"column_numeric_validator":{"name":"","description":""}}]}]}],"validations":[{"submission_required_files_validator":{"required_files":["Block Summary","Effort & Site Conditions","Observations","Marked Animals","Incidental Observations"]}}],"workbookValidations":[{"workbook_parent_child_key_match_validator":{"child_worksheet_name":"Marked Animals","parent_worksheet_name":"Observations","column_names":["Group Label"]}}]}}$v_s$;
    _transformation_schema varchar := $v_s${{
  templateMeta: [
    {
      sheetName: 'Block Summary',
      primaryKey: ['Study Area', 'Block ID/SU ID', 'Stratum'],
      parentKey: [],
      type: 'root',
      foreignKeys: [
        {
          sheetName: 'Observations',
          primaryKey: ['Study Area', 'Block ID/SU ID', 'Stratum']
        }
      ]
    },
    {
      sheetName: 'Observations',
      primaryKey: ['Study Area', 'Block ID/SU ID', 'Stratum'],
      parentKey: ['Study Area', 'Block ID/SU ID', 'Stratum'],
      type: '',
      foreignKeys: [
        {
          sheetName: 'Marked Animals',
          primaryKey: ['Group Label']
        }
      ]
    },
    {
      sheetName: 'Marked Animals',
      primaryKey: ['Wildlife Health ID', 'Animal ID', 'Telemetry Device ID'],
      parentKey: ['Group Label'],
      type: '',
      foreignKeys: []
    }
  ],
  map: [
    {
      sheetName: 'record',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'basisOfRecord ',
          columnValue: [
            {
              static: 'HumanObservation'
            }
          ]
        }
      ]
    },
    {
      sheetName: 'event',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'eventDate',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Date'])]
            },
            {
              paths: [getValuesByName('Effort & Site Conditions', ['Date'])]
            }
          ]
        },
        {
          columnName: 'eventRemarks',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['Block Summary Comments'])]
            }
          ]
        }
      ]
    },
    {
      sheetName: 'location',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['_key']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'verbatimCoordinates',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['UTM Zone', 'Easting', 'Northing'])],
              join: ' '
            },
            {
              paths: [getValuesByName('Observations', ['Lat (DD)', 'Long (DD)'])],
              join: ' '
            }
          ]
        },
        {
          columnName: 'decimalLatitude',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Lat (DD)'])]
            }
          ]
        },
        {
          columnName: 'decimalLongitude',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Long (DD)'])]
            }
          ]
        },
        {
          columnName: 'verbatimSRS',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Datum'])]
            }
          ]
        }
      ]
    },
    // Spike/Fork Bulls (static: 0)
    // sex: Male
    // life stage: Unknown
    // configuration: Spike/Fork Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Spike/Fork Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '0'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Spike/Fork Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '0'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Spike/Fork')
          ]
        }
      ]
    },
    // Sub-Prime Bulls (static: 1)
    // sex: Male
    // life stage: Unknown
    // configuration: Sub-Prime Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Sub-Prime Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '1'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Sub-Prime Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '1'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Sub-Prime')
          ]
        }
      ]
    },
    // Prime Bulls (static: 2)
    // sex: Male
    // life stage: Adult
    // configuration: Prime Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Prime Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '2'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Prime Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '2'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Prime')
          ]
        }
      ]
    },
    // Senior Bulls (static: 3)
    // sex: Male
    // life stage: Adult
    // configuration: Senior Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Senior Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '3'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Senior Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '3'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Senior')
          ]
        }
      ]
    },
    // 3 Brow/10 Points Bulls (static: 4)
    // sex: Male
    // life stage: Adult
    // configuration: 3 Brow/10 Points Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['3 Brow/10 Points Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '4'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['3 Brow/10 Points Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '4'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', '3 Brow/10 Points')
          ]
        }
      ]
    },
    // BC RISC Yearling Bulls (static: 5)
    // sex: Male
    // life stage: Yearling
    // configuration: BC RISC Yearling Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Yearling Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '5'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['BC RISC Yearling Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '5'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Yearling')
          ]
        }
      ]
    },
    // BC RISC Class I Bulls (static: 6)
    // sex: Male
    // life stage: Unknown
    // configuration: BC RISC Class I Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class I Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '6'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['BC RISC Class I Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '6'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Class I')
          ]
        }
      ]
    },
    // BC RISC Class II Bulls (static: 7)
    // sex: Male
    // life stage: Adult
    // configuration: BC RISC Class II Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class II Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '7'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['BC RISC Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '7'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Class II')
          ]
        }
      ]
    },
    // BC RISC Class III Bulls (static: 8)
    // sex: Male
    // life stage: Adult
    // configuration: BC RISC Class III Bulls
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class III Bulls']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '8'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['BC RISC Class III Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '8'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Class III')
          ]
        }
      ]
    },
    // Oswald (1997) Class I Bulls (static: 9)
    // sex: Male
    // life stage: Unknown
    // configuration: Oswald (1997) Class I Bulls
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Oswald (1997) Class I Bulls']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '9'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class I Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '9'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Oswald (1997) Class I')
          ]
        }
      ]
    },
    // Oswald (1997) Class II Bulls (static: 10)
    // sex: Male
    // life stage: Unknown
    // configuration: Oswald (1997) Class II Bulls
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Oswald (1997) Class II Bulls']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '10'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '10'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Oswald (1997) Class II')
          ]
        }
      ]
    },
    // Oswald (1997) Class III Bulls (static: 11)
    // sex: Male
    // life stage: Adult
    // configuration: Oswald (1997) Class III Bulls
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Oswald (1997) Class III Bulls']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '11'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class III Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '11'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Oswald (1997) Class III')
          ]
        }
      ]
    },
    // Adult Bulls - Unclassified (static: 12)
    // sex: Male
    // life stage: Adult
    // configuration: Adult Bulls - Unclassified
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Bulls - Unclassified']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '12'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Adult Bulls - Unclassified']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '0'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'unclassified')
          ]
        }
      ]
    },
    // Bulls - Unclassified (static: 13)
    // sex: Male
    // life stage: Unknown
    // configuration: Bulls - Unclassified
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - Unclassified']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '13'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Bulls - Unclassified']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '0'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'unclassified')
          ]
        }
      ]
    },
    // Cow (static: 14)
    // sex: Female
    // life stage: Adult
    // configuration: Cow
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '14'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Cow']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Calves (static: 15)
    // sex: Unknown
    // life stage: Juvenile
    // configuration: Calves
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Calves']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '15'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Calves']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'juvenile'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Adult Unclassified Sex (static: 16)
    // sex: Unknown
    // life stage: Adult
    // configuration: Adult Unclassified Sex
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Unclassified Sex']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '16'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Adult Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Adult Unclassified Sex (static: 17)
    // sex: Unknown
    // life stage: Unknown
    // configuration: Adult Unclassified Sex
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassified Age/Sex']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '17'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Unclassified Age/Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    {
      sheetName: 'organism',
      condition: {
        type: 'and',
        checks: [
          { ifNotEmpty: getValuesByName('Marked Animals', ['Wildlife Health ID', 'Animal ID', 'Telemetry Device ID']) }
        ]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        createPathField('organismRemarks', 'Marked Animals', ['Marked Animals Comments'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'study-area'
              }
            }
          ]
        },
        createValueField('measurementType', 'Study Area'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Block Summary', ['Study Area'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'block-id/su-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Block ID/SU ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Block Summary', ['Block ID/SU ID'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'stratum'
              }
            }
          ]
        },
        createValueField('measurementType', 'Stratum'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Block Summary', ['Stratum'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'stratum/block-area'
              }
            }
          ]
        },
        createValueField('measurementType', 'Stratum/Block Area'),
        createValueField('measurementUnit', 'km2'),
        createPathField('measurementValue', 'Block Summary', ['Stratum/Block Area (km2)'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'sampled'
              }
            }
          ]
        },
        createValueField('measurementType', 'Sampled'),
        createValueField('measurementUnit', 'Y/N'),
        createPathField('measurementValue', 'Block Summary', ['Sampled (Y/N)'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Group Label']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'group-label'
              }
            }
          ]
        },
        createValueField('measurementType', 'Group Label'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Group Label'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow W/1 calves']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'cow-w/1-calf'
              }
            }
          ]
        },
        createValueField('measurementType', 'Cow W/1 calf'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Cow W/1 calf'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow W/2 calves']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'cow-w/2-calves'
              }
            }
          ]
        },
        createValueField('measurementType', 'Cow W/2 calves'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Cow W/2 calves'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'or',
        checks: [
          { ifNotEmpty: getValuesByName('Observations', ['Sign Type']) },
          { ifNotEmpty: getValuesByName('Observations', ['Sign Count']) }
        ]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'sign-type'
              }
            }
          ]
        },
        createValueField('measurementType', 'Sign Type'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Sign Type'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'or',
        checks: [
          { ifNotEmpty: getValuesByName('Observations', ['Sign Count']) },
          { ifNotEmpty: getValuesByName('Observations', ['Sign Type']) }
        ]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'sign-count'
              }
            }
          ]
        },
        createValueField('measurementType', 'Sign Count'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Sign Count'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Age of Sign']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'age-of-sign'
              }
            }
          ]
        },
        createValueField('measurementType', 'Age of Sign'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Age of Sign'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Veg Cover (%)']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'veg-cover'
              }
            }
          ]
        },
        createValueField('measurementType', 'Veg Cover'),
        createValueField('measurementUnit', '%'),
        createPathField('measurementValue', 'Observations', ['Veg Cover (%)'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Snow Cover (%)']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'snow-cover'
              }
            }
          ]
        },
        createValueField('measurementType', 'Snow Cover'),
        createValueField('measurementUnit', '%'),
        createPathField('measurementValue', 'Observations', ['Snow Cover (%)'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Activity']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'activity'
              }
            }
          ]
        },
        createValueField('measurementType', 'Activity'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Activity'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Number of Marked Animals Observed']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'number-of-marked-animals-observed'
              }
            }
          ]
        },
        createValueField('measurementType', 'Number of Marked Animals Observed'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Number of Marked Animals Observed'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Survey or Telemetry Search']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'survey-or-telemetry-search'
              }
            }
          ]
        },
        createValueField('measurementType', 'Survey or Telemetry Search'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Survey or Telemetry Search'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Photos']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'photos'
              }
            }
          ]
        },
        createValueField('measurementType', 'Photos'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Photos'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Targeted or Non-Targeted']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'targeted-or-non-targeted'
              }
            }
          ]
        },
        createValueField('measurementType', 'Targeted or Non-Targeted'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Targeted or Non-Targeted'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Wildlife Health ID']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'wildlife-health-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Wildlife Health ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Wildlife Health ID'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Animal ID']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'animal-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Animal ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Animal ID'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Telemetry Device ID']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'telemetry-device-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Telemetry Device ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Telemetry Device ID'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Collar/Tag Frequency']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'collar/tag-frequency'
              }
            }
          ]
        },
        createValueField('measurementType', 'Collar/Tag Frequency'),
        createPathField('measurementUnit', 'Marked Animals', ['Frequency Unit']),
        createPathField('measurementValue', 'Marked Animals', ['Collar/Tag Frequency'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Right Ear Tag ID']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'right-ear-tag-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Right Ear Tag ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag ID'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Right Ear Tag Colour']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'right-ear-tag-colour'
              }
            }
          ]
        },
        createValueField('measurementType', 'Right Ear Tag Colour'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag Colour'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Left Ear Tag ID']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'left-ear-tag-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Left Ear Tag ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag ID'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Left Ear Tag Colour']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'left-ear-tag-colour'
              }
            }
          ]
        },
        createValueField('measurementType', 'Left Ear Tag Colour'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag Colour'])
      ]
    }
  ],
  dwcMeta: [
    {
      sheetName: 'record',
      primaryKey: ['eventID']
    },
    {
      sheetName: 'event',
      primaryKey: ['eventID']
    },
    {
      sheetName: 'location',
      primaryKey: ['eventID']
    },
    {
      sheetName: 'occurrence',
      primaryKey: ['occurrenceID']
    },
    {
      sheetName: 'organism',
      primaryKey: ['organismID']
    },
    {
      sheetName: 'measurementOrFact',
      primaryKey: ['eventID', 'measurementID', 'occurrenceID', 'organismID']
    }
  ]
}}$v_s$;
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