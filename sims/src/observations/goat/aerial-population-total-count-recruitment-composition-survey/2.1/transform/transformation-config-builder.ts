import { TransformSchema } from '../../../../../helpers/media/xlsx/transformation/xlsx-transform-schema-parser';
import {
  createPathField,
  createValueField,
  getValuesByName
} from '../../../../../helpers/transformation/transformation-config-helpers';

const eventIDField = {
  columnName: 'eventID',
  columnValue: [
    {
      paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
    }
  ]
};

const createOccurrenceIDField = (staticPostfix: string | number) => {
  return {
    columnName: 'occurrenceID',
    columnValue: [
      {
        paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
        postfix: {
          static: staticPostfix
        }
      }
    ]
  };
};

const organismIDField = {
  columnName: 'organismID',
  columnValue: [
    {
      paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
    }
  ]
};

const createObservationMeasurementIDField = (staticPostfix: string | number) => {
  return {
    columnName: 'measurementID',
    columnValue: [
      {
        paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
        postfix: {
          static: staticPostfix
        }
      }
    ]
  };
};

const createMarkedAnimalsMeasurementIDField = (staticPostfix: string | number) => {
  return {
    columnName: 'measurementID',
    columnValue: [
      {
        paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
        postfix: {
          static: staticPostfix
        }
      }
    ]
  };
};

export const transformationConfigBuilder: TransformSchema = {
  templateMeta: [
    {
      sheetName: 'Observations',
      primaryKey: ['Study Area', 'Population Unit', 'Block ID/SU ID'],
      parentKey: [],
      type: 'root',
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
      sheetName: 'event',
      fields: [
        eventIDField,
        {
          columnName: 'eventDate',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Date'])]
            }
          ]
        },
        {
          columnName: 'eventTime',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Time'])]
            }
          ]
        },
        {
          columnName: 'eventRemarks',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Observation Comments'])]
            }
          ]
        },
        {
          columnName: 'basisOfRecord',
          columnValue: [
            {
              static: 'HumanObservation'
            }
          ]
        }
      ]
    },
    {
      sheetName: 'location',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['_key']) }] },
      fields: [
        eventIDField,
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
    //Adult Unclassified Sex (static: 0)
    // sex: unknown
    //life stage: adult
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adults Unclassified Sex']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(0),
        createPathField('individualCount', 'Observations', ['Adults Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Kid (static: 1)
    // sex: unknown
    //life stage: juvenile
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Kid']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(1),
        createPathField('individualCount', 'Observations', ['Kid']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'juvenile'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Nanny (static: 2)
    // sex: female
    //life stage: adult
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Nanny']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(2),
        createPathField('individualCount', 'Observations', ['Nanny']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Billy (static: 3)
    // sex: male
    //life stage: adult
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Billy']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(3),
        createPathField('individualCount', 'Observations', ['Billy']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Unclassified Age/Sex (static: 4)
    // sex: unknown
    //life stage: adult
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassified Age/Sex']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(4),
        createPathField('individualCount', 'Observations', ['Unclassified Age/Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //-----------------end of animal counts---------------
    {
      sheetName: 'organism',
      condition: {
        type: 'and',
        checks: [
          { ifNotEmpty: getValuesByName('Marked Animals', ['Wildlife Health ID', 'Animal ID', 'Telemetry Device ID']) }
        ]
      },
      fields: [
        eventIDField,
        organismIDField,
        createPathField('organismRemarks', 'Marked Animals', ['Marked Animals Comments'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createObservationMeasurementIDField('study-area'),
        createValueField('measurementType', 'Study Area'),
        createPathField('measurementValue', 'Observations', ['Study Area']),
        createValueField('measurementUnit', '')
      ]
    },
    // ------------- measurementOrFact captures all additional observation and marked animal information (below)

    //measurementOrFact: Observations - BlockID/SU ID
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createObservationMeasurementIDField('block-id/su-id'),
        createValueField('measurementType', 'Block ID/SU ID'),
        createPathField('measurementValue', 'Observations', ['Block ID/SU ID']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createObservationMeasurementIDField('population-unit'),
        createValueField('measurementType', 'Population Unit'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Population Unit'])
      ]
    },
    //measurementOrFact: Observations - Group Label
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Group Label']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('group-label'),
        createValueField('measurementType', 'Group Label'),
        createPathField('measurementValue', 'Observations', ['Group Label']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Observations - Sign Type
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
        eventIDField,
        createObservationMeasurementIDField('sign-type'),
        createValueField('measurementType', 'Sign Type'),
        createPathField('measurementValue', 'Observations', ['Sign Type']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Observations - Sign Count
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
        eventIDField,
        createObservationMeasurementIDField('sign-count'),
        createValueField('measurementType', 'Sign Count'),
        createPathField('measurementValue', 'Observations', ['Sign Count']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Observations - Age of Sign
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Age of Sign']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('age-of-sign'),
        createValueField('measurementType', 'Age of Sign'),
        createPathField('measurementValue', 'Observations', ['Age of Sign']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Observations - Veg Cover (%)
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Veg Cover (%)']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('veg-cover'),
        createValueField('measurementType', 'Veg Cover'),
        createPathField('measurementValue', 'Observations', ['Veg Cover (%)']),
        createValueField('measurementUnit', '%')
      ]
    },
    //measurementOrFact: Observations - Snow Cover (%)
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Snow Cover (%)']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('snow-cover'),
        createValueField('measurementType', 'Snow Cover'),
        createPathField('measurementValue', 'Observations', ['Snow Cover (%)']),
        createValueField('measurementUnit', '%')
      ]
    },
    //measurementOrFact: Observations - Activity
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Activity']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('activity'),
        createValueField('measurementType', 'Activity'),
        createPathField('measurementValue', 'Observations', ['Activity']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Elevation (m) of Observation
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Elevation (m) of Observation']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('elevation-observation'),
        createValueField('measurementType', 'Elevation (m) of Observation'),
        createPathField('measurementValue', 'Observations', ['Elevation (m) of Observation']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Habitat
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Habitat']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('habitat'),
        createValueField('measurementType', 'Habitat'),
        createPathField('measurementValue', 'Observations', ['Habitat']),
        createValueField('measurementUnit', '')
      ]
    },

    //measurementOrFact: Wind Blown
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Wind Blown']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('habitat-slope'),
        createValueField('measurementType', 'Wind Blown'),
        createPathField('measurementValue', 'Observations', ['Wind Blown']),
        createValueField('measurementUnit', '')
      ]
    },

    //measurementOrFact: Terrain Obstruction
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Terrain Obstruction']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('terrain-obstruction'),
        createValueField('measurementType', 'Terrain Obstruction'),
        createPathField('measurementValue', 'Observations', ['Terrain Obstruction']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Number of Marked Animals Observed
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Number of Marked Animals Observed']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('number-of-marked-animals-observed'),
        createValueField('measurementType', 'Number of Marked Animals Observed'),
        createPathField('measurementValue', 'Observations', ['Number of Marked Animals Observed']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Survey or Telemetry Search
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Survey or Telemetry Search']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('survey-or-telemetry-search'),
        createValueField('measurementType', 'Survey or Telemetry Search'),
        createPathField('measurementValue', 'Observations', ['Survey or Telemetry Search']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Observations - Photos
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Photos']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('photos'),
        createValueField('measurementType', 'Photos'),
        createPathField('measurementValue', 'Observations', ['Photos']),
        createValueField('measurementUnit', '')
      ]
    },

    //measurementOrFact: Marked Animals - Targeted or Non-Targeted
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Targeted or Non-Targeted']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('targeted-or-non-targeted'),
        createValueField('measurementType', 'Targeted or Non-Targeted'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Targeted or Non-Targeted'])
      ]
    },
    //measurementOrFact: Marked Animals - Wildlife Health ID
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Wildlife Health ID']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('wildlife-health-id'),
        createValueField('measurementType', 'Wildlife Health ID'),
        createPathField('measurementValue', 'Marked Animals', ['Wildlife Health ID']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Marked Animals - Animal ID
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Animal ID']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('animal-id'),
        createValueField('measurementType', 'Animal ID'),
        createPathField('measurementValue', 'Marked Animals', ['Animal ID']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Marked Animals - Telemetry Device ID
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Telemetry Device ID']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('telemetry-device-id'),
        createValueField('measurementType', 'Telemetry Device ID'),
        createPathField('measurementValue', 'Marked Animals', ['Telemetry Device ID']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Marked Animals - Collar/Tag Frequency
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Collar/Tag Frequency']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('collar/tag-frequency'),
        createValueField('measurementType', 'Collar/Tag Frequency'),
        createPathField('measurementValue', 'Marked Animals', ['Collar/Tag Frequency']),
        createPathField('measurementUnit', 'Marked Animals', ['Frequency Unit'])
      ]
    },
    //measurementOrFact: Marked Animals - Right Ear Tag ID
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Right Ear Tag ID']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('right-ear-tag-id'),
        createValueField('measurementType', 'Right Ear Tag ID'),
        createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag ID']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Marked Animals - Right Ear Tag Colour
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Right Ear Tag Colour']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('right-ear-tag-colour'),
        createValueField('measurementType', 'Right Ear Tag Colour'),
        createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag Colour']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Marked Animals - Left Ear Tag ID
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Left Ear Tag ID']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('left-ear-tag-id'),
        createValueField('measurementType', 'Left Ear Tag ID'),
        createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag ID']),
        createValueField('measurementUnit', '')
      ]
    },
    //measurementOrFact: Marked Animals - Left Ear Tag Colour
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Left Ear Tag Colour']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createMarkedAnimalsMeasurementIDField('left-ear-tag-colour'),
        createValueField('measurementType', 'Left Ear Tag Colour'),
        createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag Colour']),
        createValueField('measurementUnit', '')
      ]
    }
  ],
  dwcMeta: [
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
};
