import {
  activityNonTargetedPickListValidator,
  ageOfSignPickListValidator,
  aircraftPickListValidator,
  basicNumericValidator,
  datumPickListValidator,
  eastingValidator,
  featureTypePickListValidator,
  frequencyPickListValidator,
  northingValidator,
  observationActivityPickListValidator,
  outputValidationSchema,
  presentAbsentPickListValidator,
  signTypePickListValidator,
  surveyOrTelemetryPickListValidator,
  targetPickListValidator,
  utmZoneValidator
} from '../../../helper/validation-config-helpers';

const elkSpeciesValidator = () => {
  return [
    {
      column_code_validator: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        allowed_code_values: [
          {
            name: 'M-CEEL',
            description: 'M-CEEL'
          },
          {
            name: 'M-CEEL-RO',
            description: 'M-CEEL-RO'
          }
        ]
      }
    }
  ];
};

const elkGeneralTemplateValidationSchema = {
  name: '',
  description: '',
  files: [
    {
      name: 'Effort & Site Conditions',
      description: '',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: [
              'Study Area',
              'Population Unit',
              'Block ID/SU ID',
              'Block/Population Unit Area (km2)',
              'Date',
              'Start Time 1 (24hrs)',
              'End Time 1 (24hrs)',
              'Start Time 2 (24hrs)',
              'End Time 2 (24hrs)',
              'Start Time 3 (24hrs)',
              'End Time 3 (24hrs)',
              'Total Block Time',
              'Total Time (hours)',
              'Total Time (mins)',
              'Time (mins)/block area (km2)',
              'Aircraft Company',
              'Aircraft Type',
              'Pilot',
              'Navigator',
              'Rear Left Observer',
              'Rear Right Observer',
              'Air Temperature (C)',
              'Visibility',
              'Cloud Cover (%)',
              'Wind Speed',
              'Precipitation',
              'Light',
              'Snow Cover',
              'Snow Depth',
              'Days Since Snowfall',
              'Weather Description',
              'Habitat Description',
              'Effort & Site Comments'
            ]
          }
        },
        {
          file_column_unique_validator: {
            column_names: ['Study Area', 'Population Unit', 'Block ID/SU ID', 'Date', 'Start Time 1 (24hrs)']
          }
        }
      ],

      columns: [
        {
          name: 'Aircraft Type',
          description: '',
          validations: aircraftPickListValidator()
        }
      ]
    },
    {
      name: 'Observations',
      description: '',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: [
              'Study Area',
              'Population Unit',
              'Block ID/SU ID',
              'UTM Zone',
              'Easting',
              'Northing',
              'Datum',
              'Lat (DD)',
              'Long (DD)',
              'Species',
              'Group Label',
              'Date',
              'Time',
              'BC RISC Yearling Bulls',
              'BC RISC Class I Bulls',
              'BC RISC Class II Bulls',
              'BC RISC Class III Bulls',
              'BC RISC Class IV Bulls',
              'Spike Bulls',
              'Raghorn Bulls',
              '<=3 Point Bulls',
              '3 - 4 Point Bulls',
              '3 - 5 Point Bulls',
              '<4 Point Bulls',
              '>=4 Point Bulls',
              '5 Point Bulls',
              '>=5 Point Bulls',
              '>= 6 Point Bulls',
              'Adult Bulls - Unclassified',
              'Unclassified Bulls',
              'Cows',
              'Calves',
              'Adult Unclassified Sex',
              'Yearling - Unclassified Sex',
              'Unclassified Age/Sex',
              'Total Count',
              'Sign Type',
              'Sign Count',
              'Age of Sign',
              'Topography',
              'Habitat',
              'Veg Cover (%)',
              'Snow Cover (%)',
              'Activity',
              'Number of Marked Animals Observed',
              'Survey or Telemetry Search',
              'Photos',
              'Observation Comments'
            ]
          }
        }
      ],
      columns: [
        {
          name: 'Study Area',
          validations: [
            {
              column_required_validator: {}
            }
          ]
        },
        {
          name: 'Date',
          validations: [
            {
              column_required_validator: {}
            }
          ]
        },
        {
          name: 'UTM Zone',
          description: '',
          validations: utmZoneValidator()
        },
        {
          name: 'Easting',
          description: '',
          validations: eastingValidator()
        },
        {
          name: 'Northing',
          description: '',
          validations: northingValidator()
        },
        {
          name: 'Datum',
          description: '',
          validations: datumPickListValidator()
        },
        {
          name: 'Lat (DD)',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Long (DD)',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Species',
          description: '',
          validations: [...elkSpeciesValidator(), { column_required_validator: {} }]
        },
        {
          name: 'BC RISC Yearlings Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class I Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class II Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class III Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class IV Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Spike Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Raghorn Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '<=3 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '3 - 4 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '3 - 5 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '<4 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '>=4 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '5 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '>=5 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: '>= 6 Point Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Bulls - Unclassified',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Unclassified Bulls',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Cows',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Calves',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Unclassified Sex',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Yearling - Unclassified Sex',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Unclassified Age/Sex',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Sign Type',
          description: '',
          validations: signTypePickListValidator()
        },
        {
          name: 'Sign Count',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Age of Sign',
          description: '',
          validations: ageOfSignPickListValidator()
        },
        {
          name: 'Veg Cover (%)',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Snow Cover (%)',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Activity',
          description: '',
          validations: observationActivityPickListValidator()
        },
        {
          name: 'Number of Marked Animals Observed',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Survey or Telemetry Search',
          description: '',
          validations: surveyOrTelemetryPickListValidator()
        }
      ]
    },
    {
      name: 'Marked Animals',
      description: '',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: [
              'Group Label',
              'Date',
              'Targeted or Non-Targeted',
              'Wildlife Health ID',
              'Animal ID',
              'Telemetry Device ID',
              'Collar/Tag Frequency',
              'Frequency Unit',
              'Right Ear Tag ID',
              'Right Ear Tag Colour',
              'Left Ear Tag ID',
              'Left Ear Tag Colour',
              'Marked Animals Comments'
            ]
          }
        }
      ],
      columns: [
        {
          name: 'Targeted or Non-Targeted',
          description: '',
          validations: targetPickListValidator()
        },
        {
          name: 'Frequency Unit',
          description: '',
          validations: frequencyPickListValidator()
        }
      ]
    },
    {
      name: 'Incidental Observations',
      description: '',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: [
              'Study Area',
              'Block ID/SU ID',
              'Date',
              'Time',
              'UTM Zone',
              'Easting',
              'Northing',
              'Datum',
              'Lat (DD)',
              'Long (DD)',
              'Species',
              'Adult Males',
              'Adult Females',
              'Adults - Unclassified Sex',
              'Juvenile Males',
              'Juvenile Females',
              'Juveniles - Unclassified Sex',
              'Unknown Age/Sex',
              'Total Count',
              'Species Occurrence Status',
              'Activity',
              'Activity Count',
              'Feature Type',
              'Feature Type Count',
              'Sign Type',
              'Sign Count',
              'Photos',
              'Incidental Observation Comments'
            ]
          }
        }
      ],
      columns: [
        {
          name: 'UTM Zone',
          description: '',
          validations: utmZoneValidator()
        },
        {
          name: 'Easting',
          description: '',
          validations: eastingValidator()
        },
        {
          name: 'Northing',
          description: '',
          validations: northingValidator()
        },
        {
          name: 'Datum',
          description: '',
          validations: datumPickListValidator()
        },
        {
          name: 'Lat (DD)',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Long (DD)',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Males',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Females',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Adults - Unclassified Sex',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Juvenile Males',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Juvenile Females',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Juveniles - Unclassified Sex',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Unknown Age/Sex',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Species Occurrence Status',
          description: '',
          validations: presentAbsentPickListValidator()
        },
        {
          name: 'Activity',
          description: '',
          validations: activityNonTargetedPickListValidator
        },
        {
          name: 'Activity Count',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Feature Type',
          description: '',
          validations: featureTypePickListValidator()
        },
        {
          name: 'Feature Type Count',
          description: '',
          validations: basicNumericValidator()
        },
        {
          name: 'Sign Type',
          description: '',
          validations: signTypePickListValidator()
        },
        {
          name: 'Sign Count',
          description: '',
          validations: basicNumericValidator()
        }
      ]
    }
  ],
  validations: [
    {
      submission_required_files_validator: {
        required_files: ['Effort & Site Conditions', 'Observations', 'Marked Animals', 'Incidental Observations']
      }
    }
  ],
  workbookValidations: [
    {
      workbook_parent_child_key_match_validator: {
        child_worksheet_name: 'Marked Animals',
        parent_worksheet_name: 'Observations',
        column_names: ['Group Label']
      }
    }
  ]
};

outputValidationSchema(elkGeneralTemplateValidationSchema, 'elk_general_validation_config_output');
