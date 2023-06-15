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
  presentAbsentPickListValidator,
  signTypePickListValidator,
  surveyOrTelemetryPickListValidator,
  targetPickListValidator,
  utmZoneValidator
} from '../../../../../helpers/validation/validation-config-helpers';

const elkSpeciesValidator = () => {
  return [
    {
      column_code_validator: {
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

export const validationConfigBuilder = {
  files: [
    {
      name: 'Effort & Site Conditions',
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
          validations: aircraftPickListValidator()
        }
      ]
    },
    {
      name: 'Observations',
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
        },
        {
          file_column_unique_validator: {
            column_names: ['Group Label']
          }
        }
      ],
      columns: [
        {
          name: 'Date',
          validations: [{ column_required_validator: {} }]
        },
        {
          name: 'UTM Zone',
          validations: utmZoneValidator()
        },
        {
          name: 'Easting',
          validations: eastingValidator()
        },
        {
          name: 'Northing',
          validations: northingValidator()
        },
        {
          name: 'Datum',
          validations: datumPickListValidator()
        },
        {
          name: 'Lat (DD)',
          validations: basicNumericValidator()
        },
        {
          name: 'Long (DD)',
          validations: basicNumericValidator()
        },
        {
          name: 'Species',
          validations: [{ column_required_validator: {} }, ...elkSpeciesValidator()]
        },
        {
          name: 'BC RISC Yearling Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class I Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class II Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class III Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class IV Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Spike Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Raghorn Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '<=3 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '3 - 4 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '3 - 5 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '<4 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '>=4 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '5 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '>=5 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '>= 6 Point Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Bulls - Unclassified',
          validations: basicNumericValidator()
        },
        {
          name: 'Unclassified Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Cows',
          validations: basicNumericValidator()
        },
        {
          name: 'Calves',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Yearling - Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Unclassified Age/Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Sign Type',
          validations: signTypePickListValidator()
        },
        {
          name: 'Sign Count',
          validations: basicNumericValidator()
        },
        {
          name: 'Age of Sign',
          validations: ageOfSignPickListValidator()
        },
        {
          name: 'Veg Cover (%)',
          validations: basicNumericValidator()
        },
        {
          name: 'Snow Cover (%)',
          validations: basicNumericValidator()
        },
        {
          name: 'Activity',
          validations: observationActivityPickListValidator()
        },
        {
          name: 'Number of Marked Animals Observed',
          validations: basicNumericValidator()
        },
        {
          name: 'Survey or Telemetry Search',
          validations: surveyOrTelemetryPickListValidator()
        }
      ]
    },
    {
      name: 'Marked Animals',
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
        },
        {
          file_column_unique_validator: {
            column_names: ['Wildlife Health ID', 'Animal ID', 'Telemetry Device ID']
          }
        }
      ],
      columns: [
        {
          name: 'Group Label',
          validations: [{ column_required_validator: {} }]
        },
        {
          name: 'Targeted or Non-Targeted',
          validations: targetPickListValidator()
        },
        {
          name: 'Frequency Unit',
          validations: frequencyPickListValidator()
        }
      ]
    },
    {
      name: 'Incidental Observations',
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
          validations: utmZoneValidator()
        },
        {
          name: 'Easting',
          validations: eastingValidator()
        },
        {
          name: 'Northing',
          validations: northingValidator()
        },
        {
          name: 'Datum',
          validations: datumPickListValidator()
        },
        {
          name: 'Lat (DD)',
          validations: basicNumericValidator()
        },
        {
          name: 'Long (DD)',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Males',
          validations: basicNumericValidator()
        },
        {
          name: 'Adult Females',
          validations: basicNumericValidator()
        },
        {
          name: 'Adults - Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Juvenile Males',
          validations: basicNumericValidator()
        },
        {
          name: 'Juvenile Females',
          validations: basicNumericValidator()
        },
        {
          name: 'Juveniles - Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Unknown Age/Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Species Occurrence Status',
          validations: presentAbsentPickListValidator()
        },
        {
          name: 'Activity',
          validations: activityNonTargetedPickListValidator()
        },
        {
          name: 'Activity Count',
          validations: basicNumericValidator()
        },
        {
          name: 'Feature Type',
          validations: featureTypePickListValidator()
        },
        {
          name: 'Feature Type Count',
          validations: basicNumericValidator()
        },
        {
          name: 'Sign Type',
          validations: signTypePickListValidator()
        },
        {
          name: 'Sign Count',
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
