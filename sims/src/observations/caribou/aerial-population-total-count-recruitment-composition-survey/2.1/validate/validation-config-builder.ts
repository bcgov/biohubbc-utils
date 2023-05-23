import {
  activityNonTargetedPickListValidator,
  ageOfSignPickListValidator,
  aircraftPickListValidator,
  basicNumericValidator,
  datumPickListValidator,
  eastingValidator,
  featureTypePickListValidator,
  frequencyPickListValidator,
  habitatPickListValidator,
  northingValidator,
  observationActivityPickListValidator,
  presentAbsentPickListValidator,
  signTypePickListValidator,
  surveyOrTelemetryPickListValidator,
  targetPickListValidator,
  utmZoneValidator,
  yesNoPickListValidator
} from '../../../../../helpers/validation/validation-config-helpers';

const caribouSpeciesPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'M-RATA',
            description: 'M-RATA'
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
              'Population Unit/Block Area (km2)',
              'Date',
              'Start Time 1 (24hrs)',
              'End Time 1 (24hrs)',
              'Start Time 2 (24hrs)',
              'End Time 2 (24hrs)',
              'Start Time 3 (24hrs)',
              'End Time 3 (24hrs)',
              'Start Time 4 (24hrs)',
              'End Time 4 (24hrs)',
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
              'New Snow Cover',
              'Snow conditions',
              'Snow Depth',
              'Days Since Snowfall',
              'Weather Description',
              'Location Description',
              'Effort & Site Comments'
            ]
          }
        },
        {
          file_column_unique_validator: {
            column_names: ['Study Area', 'Block ID/SU ID', 'Date', 'Start Time 1 (24hrs)']
          }
        }
      ],
      columns: [
        {
          name: 'Population Unit/Block Area (km2)',
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
              'Population Unit',
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
              'Group Label',
              'Adult Males',
              'Adult Females',
              'Adults - Unclassified Sex',
              'Immature Males',
              'Juveniles - Unclassified Sex',
              'Yearling Males',
              'Yearling Females',
              'Yearling - Unclassified Sex',
              'Males - Unclassified Life Stage',
              'Females - Unclassified Life Stage',
              'Unclassifed Life Stage and Sex',
              'BC RISC - Class I Bulls',
              'BC RISC - Class II Bulls',
              'BC RISC - Class III Bulls',
              'BC RISC - Class I or  II Bulls',
              'Bulls - 3 Points or Fewer',
              'Bulls - 3 or 4 Points',
              'Bulls - 4 Points or Fewer',
              'Bulls - 4 Points or More',
              'Bulls - 5 Points or More',
              'Bulls - 6 Points or More',
              'Bulls - 10 Points or Tripalm',
              'Total Count',
              'Sign Type',
              'Sign Count',
              'Age of Sign',
              'Veg Cover (%)',
              'Snow Cover (%)',
              'Activity',
              'Elevation (m) of Observation',
              'Habitat',
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
          validations: [{ column_required_validator: {} }, ...caribouSpeciesPickListValidator()]
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
          name: 'Immature Males',
          validations: basicNumericValidator()
        },
        {
          name: 'Juveniles - Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Yearling Males',
          validations: basicNumericValidator()
        },
        {
          name: 'Yearling Females',
          validations: basicNumericValidator()
        },
        {
          name: 'Yearling - Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Males - Unclassified Life Stage',
          validations: basicNumericValidator()
        },
        {
          name: 'Females - Unclassified Life Stage',
          validations: basicNumericValidator()
        },
        {
          name: 'Unclassified Life Stage and Sex',
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
          name: 'BC RISC - Class I or  II Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 3 Points or Fewer',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 3 or 4 Points',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 4 Points or Fewer',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 4 Points or More',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 5 Points or More',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 6 Points or More',
          validations: basicNumericValidator()
        },
        {
          name: 'Bulls - 10 Points or Tripalm',
          validations: basicNumericValidator()
        },
        {
          name: 'Total Count',
          validations: basicNumericValidator()
        },
        {
          name: 'Sign Count',
          validations: basicNumericValidator()
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
          name: 'Elevation (m) of Observation',
          validations: basicNumericValidator()
        },
        {
          name: 'Number of Marked Animals Observed',
          validations: basicNumericValidator()
        },
        {
          name: 'Survey or Telemetry Search',
          validations: surveyOrTelemetryPickListValidator()
        },
        {
          name: 'Sign Type',
          validations: signTypePickListValidator()
        },
        {
          name: 'Sign Age',
          validations: ageOfSignPickListValidator()
        },
        {
          name: 'Activity',
          validations: observationActivityPickListValidator()
        },
        {
          name: 'Habitat',
          validations: habitatPickListValidator()
        },
        {
          name: 'Terrain Obstruction',
          validations: yesNoPickListValidator()
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
              'Population Unit',
              'Block ID/SU ID',
              'Date',
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
              'Habitat Feature Type',
              'Habitat Feature Count',
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
          name: 'Habitat Feature Type',
          validations: featureTypePickListValidator()
        },
        {
          name: 'Habitat Feature Count',
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
