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

const sheepSpeciesPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'M-OVCA',
            description: 'M-OVCA'
          },
          {
            name: 'M-OVDA',
            description: 'M-OVDA'
          },
          {
            name: 'M-OVDA-DA',
            description: 'M-OVDA-DA'
          },
          {
            name: 'M-OVDA-ST',
            description: 'M-OVDA-ST'
          }
        ]
      }
    }
  ];
};

export const sheepTemplateValidationSchema = {
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
            required_columns: ['Study Area']
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
            required_columns: ['Study Area', 'Date', 'Species']
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
          name: 'Species',
          validations: sheepSpeciesPickListValidator()
        },
        {
          name: 'BC RISC Class I Rams',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class II Rams',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class III Rams',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Class IV Rams',
          validations: basicNumericValidator()
        },
        {
          name: 'Ram - Unclassified',
          validations: basicNumericValidator()
        },
        {
          name: 'BC RISC Yearling Bulls',
          validations: basicNumericValidator()
        },
        {
          name: 'Ewes',
          validations: basicNumericValidator()
        },
        {
          name: 'Yearlings',
          validations: basicNumericValidator()
        },
        {
          name: 'Lambs',
          validations: basicNumericValidator()
        },
        {
          name: 'Ewe-Like Sheep',
          validations: basicNumericValidator()
        },
        {
          name: 'Adults Unclassified Sex',
          validations: basicNumericValidator()
        },
        {
          name: 'Unclassified Age/Sex',
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
