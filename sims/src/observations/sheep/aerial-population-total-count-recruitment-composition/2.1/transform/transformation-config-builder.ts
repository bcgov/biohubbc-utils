import {
  MapSchema,
  TransformSchema
} from '../../../../../helpers/media/xlsx/transformation/xlsx-transform-schema-parser';
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

const createOrganismMeasurementIDField = (staticPostfix: string | number) => {
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

const eventMap: MapSchema = {
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
};

const locationMap: MapSchema = {
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
};

const occurrenceMaps: MapSchema[] = [
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class I Rams']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(0),
      createPathField('individualCount', 'Observations', ['BC RISC Class I Rams']),
      createValueField('sex', 'male'),
      createValueField('lifeStage', '2 year old (Peace-Liard)'),
      createPathField('taxonID', 'Observations', ['Species'])
    ],
    add: [
      {
        sheetName: 'measurementOrFact',
        fields: [
          eventIDField,
          createObservationMeasurementIDField('0:horn-configuration'),
          createOccurrenceIDField(0),
          createValueField('measurementType', 'Horn Configuration'),
          createValueField('measurementValue', 'BC RISC Class I'),
          createValueField('measurementUnit', '')
        ]
      }
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class II Rams']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(1),
      createPathField('individualCount', 'Observations', ['BC RISC Class II Rams']),
      createValueField('sex', 'male'),
      createValueField('lifeStage', '3 year old (Peace-Liard)'),
      createPathField('taxonID', 'Observations', ['Species'])
    ],
    add: [
      {
        sheetName: 'measurementOrFact',
        fields: [
          eventIDField,
          createObservationMeasurementIDField('1:horn-configuration'),
          createOccurrenceIDField(1),
          createValueField('measurementType', 'Horn Configuration'),
          createValueField('measurementValue', 'BC RISC Class II'),
          createValueField('measurementUnit', '')
        ]
      }
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class III Rams']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(2),
      createPathField('individualCount', 'Observations', ['BC RISC Class III Rams']),
      createValueField('sex', 'male'),
      createValueField('lifeStage', '>=4 years old (Peace-Liard)'),
      createPathField('taxonID', 'Observations', ['Species'])
    ],
    add: [
      {
        sheetName: 'measurementOrFact',
        fields: [
          eventIDField,
          createObservationMeasurementIDField('2:horn-configuration'),
          createOccurrenceIDField(2),
          createValueField('measurementType', 'Horn Configuration'),
          createValueField('measurementValue', 'BC RISC Class III'),
          createValueField('measurementUnit', '')
        ]
      }
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class IV Rams']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(3),
      createPathField('individualCount', 'Observations', ['BC RISC Class IV Rams']),
      createValueField('sex', 'male'),
      createValueField('lifeStage', 'adult'),
      createPathField('taxonID', 'Observations', ['Species'])
    ],
    add: [
      {
        sheetName: 'measurementOrFact',
        fields: [
          eventIDField,
          createObservationMeasurementIDField('3:horn-configuration'),
          createOccurrenceIDField(3),
          createValueField('measurementType', 'Horn Configuration'),
          createValueField('measurementValue', 'BC RISC Class IV'),
          createValueField('measurementUnit', '')
        ]
      }
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Ram - Unclassified']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(4),
      createPathField('individualCount', 'Observations', ['Ram - Unclassified']),
      createValueField('sex', 'male'),
      createValueField('lifeStage', 'unknown'),
      createPathField('taxonID', 'Observations', ['Species'])
    ],
    add: [
      {
        sheetName: 'measurementOrFact',
        fields: [
          eventIDField,
          createObservationMeasurementIDField('4:horn-configuration'),
          createOccurrenceIDField(4),
          createValueField('measurementType', 'Horn Configuration'),
          createValueField('measurementValue', 'Unclassified'),
          createValueField('measurementUnit', '')
        ]
      }
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Ewes']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(5),
      createPathField('individualCount', 'Observations', ['Ewes']),
      createValueField('sex', 'female'),
      createValueField('lifeStage', 'adult'),
      createPathField('taxonID', 'Observations', ['Species'])
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Yearlings']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(6),
      createPathField('individualCount', 'Observations', ['Yearlings']),
      createValueField('sex', 'unknown'),
      createValueField('lifeStage', 'juvenile'),
      createPathField('taxonID', 'Observations', ['Species'])
    ]
  },
  {
    sheetName: 'occurrence',
    condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Lambs']) }] },
    fields: [
      eventIDField,
      createOccurrenceIDField(7),
      createPathField('individualCount', 'Observations', ['Lambs']),
      createValueField('sex', 'unknown'),
      createValueField('lifeStage', 'juvenile'),
      createPathField('taxonID', 'Observations', ['Species'])
    ]
  },
  {
    sheetName: 'occurrence',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Observations', ['Ewe-Like Sheep']) }]
    },
    fields: [
      eventIDField,
      createOccurrenceIDField(8),
      createPathField('individualCount', 'Observations', ['Ewe-Like Sheep']),
      createValueField('sex', 'unknown'),
      createValueField('lifeStage', 'ewe-like'),
      createPathField('taxonID', 'Observations', ['Species'])
    ]
  },
  {
    sheetName: 'occurrence',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adults Unclassified/Sex']) }]
    },
    fields: [
      eventIDField,
      createOccurrenceIDField(9),
      createPathField('individualCount', 'Observations', ['Adults Unclassified/Sex']),
      createValueField('sex', 'unknown'),
      createValueField('lifeStage', 'adult'),
      createPathField('taxonID', 'Observations', ['Species'])
    ]
  },
  {
    sheetName: 'occurrence',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassified Age/Sex']) }]
    },
    fields: [
      eventIDField,
      createOccurrenceIDField(10),
      createPathField('individualCount', 'Observations', ['Unclassified Age/Sex']),
      createValueField('sex', 'unknown'),
      createValueField('lifeStage', 'unknown'),
      createPathField('taxonID', 'Observations', ['Species'])
    ]
  }
];

const organismMap: MapSchema = {
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
};

const measurementEventIDMaps: MapSchema[] = [
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
      createPathField('measurementValue', 'Observations', ['Elevation (m) of Observation'])
    ]
  },
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
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Observations', ['Habitat - Slope']) }]
    },
    fields: [
      eventIDField,
      createObservationMeasurementIDField('habitat-slope'),
      createValueField('measurementType', 'Habitat-Slope'),
      createPathField('measurementValue', 'Observations', ['Habitat - Slope']),
      createValueField('measurementUnit', '')
    ]
  },
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
  }
];

const measurementOrganismIDMaps: MapSchema[] = [
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Wildlife Health ID']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('wildlife-health-id'),
      organismIDField,
      createValueField('measurementType', 'Wildlife Health ID'),
      createPathField('measurementValue', 'Marked Animals', ['Wildlife Health ID']),
      createValueField('measurementUnit', '')
    ]
  },
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Animal ID']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('animal-id'),
      organismIDField,
      createValueField('measurementType', 'Animal ID'),
      createPathField('measurementValue', 'Marked Animals', ['Animal ID']),
      createValueField('measurementUnit', '')
    ]
  },
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Telemetry Device ID']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('telemetry-device-id'),
      organismIDField,
      createValueField('measurementType', 'Telemetry Device ID'),
      createPathField('measurementValue', 'Marked Animals', ['Telemetry Device ID']),
      createValueField('measurementUnit', '')
    ]
  },
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Collar/Tag Frequency']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('collar/tag-frequency'),
      organismIDField,
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
      eventIDField,
      createOrganismMeasurementIDField('right-ear-tag-id'),
      organismIDField,
      createValueField('measurementType', 'Right Ear Tag ID'),
      createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag ID']),
      createValueField('measurementUnit', '')
    ]
  },
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Right Ear Tag Colour']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('right-ear-tag-colour'),
      organismIDField,
      createValueField('measurementType', 'Right Ear Tag Colour'),
      createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag Colour']),
      createValueField('measurementUnit', '')
    ]
  },
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Left Ear Tag ID']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('left-ear-tag-id'),
      organismIDField,
      createValueField('measurementType', 'Left Ear Tag ID'),
      createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag ID']),
      createValueField('measurementUnit', '')
    ]
  },
  {
    sheetName: 'measurementOrFact',
    condition: {
      type: 'and',
      checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Left Ear Tag Colour']) }]
    },
    fields: [
      eventIDField,
      createOrganismMeasurementIDField('left-ear-tag-colour'),
      organismIDField,
      createValueField('measurementType', 'Left Ear Tag Colour'),
      createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag Colour']),
      createValueField('measurementUnit', '')
    ]
  }
];

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
  map: [eventMap, locationMap, ...occurrenceMaps, organismMap, ...measurementEventIDMaps, ...measurementOrganismIDMaps],
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
