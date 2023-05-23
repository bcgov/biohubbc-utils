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
  stratumPickListValidator,
  surveyOrTelemetryPickListValidator,
  targetPickListValidator,
  utmZoneValidator,
  yesNoPickListValidator
} from '../../../../../helpers/validation/validation-config-helpers';

const mooseSpeciesPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'M-ALAM',
            description: 'M-ALAM'
          }
        ]
      }
    }
  ];
};

export const validationConfigBuilder = {
  name: '',
  files: [
    {
      name: 'Block Summary',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: ['Study Area', 'Block ID/SU ID', 'Stratum', 'Sampled (Y/N)']
          }
        },
        {
          file_column_unique_validator: {
            column_names: ['Study Area', 'Block ID/SU ID', 'Stratum']
          }
        }
      ],
      columns: [
        {
          name: 'Stratum',
          validations: stratumPickListValidator()
        },
        {
          name: 'Sampled (Y/N)',
          validations: yesNoPickListValidator()
        }
      ]
    },
    {
      name: 'Effort & Site Conditions',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: []
          }
        }
      ],
      columns: [
        {
          name: 'Block Area (km2)',
          validations: basicNumericValidator()
        },
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
              'Block ID/SU ID',
              'Stratum',
              'UTM Zone',
              'Easting',
              'Northing',
              'Datum',
              'Lat (DD)',
              'Long (DD)',
              'Group Label',
              'Date',
              'Time',
              'Species',
              'Spike/Fork Bulls',
              'Sub-Prime Bulls',
              'Prime Bulls',
              'Senior Bulls',
              '3 Brow/10 Points Bulls',
              'BC RISC Yearling Bulls',
              'BC RISC Class I Bulls',
              'BC RISC Class II Bulls',
              'BC RISC Class III Bulls',
              'Oswald (1997) Class I Bulls',
              'Oswald (1997) Class II Bulls',
              'Oswald (1997) Class III Bulls',
              'Adult Bulls - Unclassified',
              'Bulls - Unclassified',
              'Cow',
              'Calves',
              'Adult Unclassified Sex',
              'Unclassified Age/Sex',
              'Total Count',
              'Cow W/1 calf',
              'Cow W/2 calves',
              'Sign Type',
              'Sign Count',
              'Age of Sign',
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
          name: 'Study Area',
          validations: [{ column_required_validator: {} }]
        },
        {
          name: 'Block ID/SU ID',
          validations: [{ column_required_validator: {} }]
        },
        {
          name: 'Stratum',
          validations: [{ column_required_validator: {} }, ...stratumPickListValidator()]
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
          validations: [{ column_required_validator: {} }, ...mooseSpeciesPickListValidator()]
        },
        {
          name: 'Spike/Fork Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Sub-Prime Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Prime Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Senior Bulls',
          validations: basicNumericValidator()
        },
        {
          name: '3 Brow/10 Point Bulls',
          validations: basicNumericValidator()
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
          name: 'Oswald (1997) Class I Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Oswald (1997) Class II Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Oswald (1997) Class III Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Cow',
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
          name: 'Unclassified Age/Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Cow W/1 calf',
          validations: basicNumericValidator()
        },
        {
          name: 'Cow W/2 calves',
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
        required_files: [
          'Block Summary',
          'Effort & Site Conditions',
          'Observations',
          'Marked Animals',
          'Incidental Observations'
        ]
      }
    }
  ],
  workbookValidations: [
    {
      workbook_parent_child_key_match_validator: {
        parent_worksheet_name: 'Observations',
        child_worksheet_name: 'Marked Animals',
        column_names: ['Group Label']
      }
    }
  ]
};