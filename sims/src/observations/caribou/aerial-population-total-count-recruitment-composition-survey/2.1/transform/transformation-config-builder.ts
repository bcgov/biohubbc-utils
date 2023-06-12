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

const organismIDField = {
  columnName: 'organismID',
  columnValue: [
    {
      paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
    }
  ]
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
    //Adult Males(static:0)
    //Life stage: adult
    //sex: male
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Males']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(0),
        createPathField('individualCount', 'Observations', ['Adult Males']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('0:antler-configuration'),
            createOccurrenceIDField(0),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'unclassified'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Adult Females(static:1)
    //Life stage: adult
    //sex: female
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Females']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(1),
        createPathField('individualCount', 'Observations', ['Adult Females']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Adults - Unclassified Sex (static:2)
    //Life stage: adult
    //sex: unknown
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adults - Unclassified Sex']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(2),
        createPathField('individualCount', 'Observations', ['Adults - Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Immature Males (static:3)
    //Life stage: unknown
    //sex: male
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Immature Males']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(3),
        createPathField('individualCount', 'Observations', ['Immature Males']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'immature'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Juveniles - Unclassified Sex (static:4)
    //Life stage: juvenile
    //sex: unknown
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Juveniles - Unclassified Sex']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(4),
        createPathField('individualCount', 'Observations', ['Juveniles - Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'juvenile'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Yearling Males (static:5)
    //Life stage: yearling
    //sex: male
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Yearling Males']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(5),
        createPathField('individualCount', 'Observations', ['Yearling Males']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Yearling Females (static: 6)
    //Life stage: yearling
    //sex: female
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Yearling Females']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(6),
        createPathField('individualCount', 'Observations', ['Yearling Females']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Yearling - Unclassified Sex (static: 7)
    //Life stage: yearling
    //sex: unknown
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Yearling - Unclassified Sex']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(7),
        createPathField('individualCount', 'Observations', ['Yearling - Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Males - Unclassified Life Stage (static: 8)
    //Life stage: unknown
    //sex: male
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Males - Unclassified Life Stage']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(8),
        createPathField('individualCount', 'Observations', ['Males - Unclassified Life Stage']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,

            createObservationMeasurementIDField('8:antler-configuration'),
            createOccurrenceIDField(8),

            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'unclassified'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Females - Unclassified Life Stage (static: 9)
    //Life stage: unknown
    //sex: female
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Females - Unclassified Life Stage']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(9),
        createPathField('individualCount', 'Observations', ['Females - Unclassified Life Stage']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //Unclassified Life Stage and Sex (static:10)
    //Life stage: unknown
    //Sex: unknown
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassifed Life Stage and Sex']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(10),
        createPathField('individualCount', 'Observations', ['Unclassifed Life Stage and Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ]
    },
    //BC RISC - Class I Bulls (static: 11)
    //Life stage: yearling
    //sex: male
    //Antler configuration: BC RISC Class I
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC - Class I Bulls']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(11),
        createPathField('individualCount', 'Observations', ['BC RISC - Class I Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('11:antler-configuration'),
            createOccurrenceIDField(11),

            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class I'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //BC RISC - Class II Bulls (static: 12)
    //Life stage: unknown
    //sex: male
    //Antler configuration: BC RISC Class II
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC - Class II Bulls']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(12),
        createPathField('individualCount', 'Observations', ['BC RISC - Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('12:antler-configuration'),
            createOccurrenceIDField(12),

            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class II'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //BC RISC - Class III Bulls (static:13)
    //Life stage: adult
    //sex: male
    //Antler configuration: BC RISC Class III
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC - Class III Bulls']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(13),
        createPathField('individualCount', 'Observations', ['BC RISC - Class III Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('13:antler-configuration'),
            createOccurrenceIDField(13),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class III'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //BC RISC - Class I or  II Bulls (static:14)
    //Life stage: unknown
    //sex: male
    //Antler configuration: BC RISC Class I or II
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC - Class I or  II Bulls']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(14),
        createPathField('individualCount', 'Observations', ['BC RISC - Class I or  II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('14:antler-configuration'),
            createOccurrenceIDField(14),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class I or II'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 3 Points or Fewer(static 15)
    //Life stage: unknown
    //sex: male
    //Antler configuration: 3 Points or Fewer
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 3 Points or Fewer']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(15),
        createPathField('individualCount', 'Observations', ['Bulls - 3 Points or Fewer']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('15:antler-configuration'),
            createOccurrenceIDField(15),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '3 Points or Fewer'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 3 or 4 Points (static: 16)
    //Life stage: unknown
    //sex: male
    //Antler configuration: 3 or 4 Points
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 3 or 4 Points']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(16),
        createPathField('individualCount', 'Observations', ['Bulls - 3 or 4 Points']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('16:antler-configuration'),
            createOccurrenceIDField(16),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '3 or 4 Points'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 4 Points or Fewer (static:17)
    //Life stage: unknown
    //sex: male
    //Antler configuration: 4 Points or Fewer
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 4 Points or Fewer']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(17),
        createPathField('individualCount', 'Observations', ['Bulls - 4 Points or Fewer']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('17:antler-configuration'),
            createOccurrenceIDField(17),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '4 points or fewer'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 4 Points or More (static:18)
    //Life stage: unknown
    //sex: male
    //Antler configuration: 4 Points or More
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 4 Points or More']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(18),
        createPathField('individualCount', 'Observations', ['Bulls - 4 Points or More']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('18:antler-configuration'),
            createOccurrenceIDField(18),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '4 points or fewer'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 5 Points or More (static: 19)
    //Life stage: adult
    //sex: male
    //Antler configuration: 5 Points or More
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 5 Points or More']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(19),
        createPathField('individualCount', 'Observations', ['Bulls - 5 Points or More']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('19:antler-configuration'),
            createOccurrenceIDField(19),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '5 points or more'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 6 Points or More (static: 20)
    //Life stage: adult
    //sex: male
    //Antler configuration: 6 Points or More
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 6 Points or More']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(20),
        createPathField('individualCount', 'Observations', ['Bulls - 6 Points or More']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('20:antler-configuration'),
            createOccurrenceIDField(20),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '6 points or more'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    //Bulls - 10 Points or Tripalm (static: 21)
    //Life stage: adult
    //sex: male
    //Antler configuration: 10 Points or Tripalm
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Bulls - 10 Points or Tripalm']) }]
      },
      fields: [
        eventIDField,
        createOccurrenceIDField(21),
        createPathField('individualCount', 'Observations', ['Bulls - 10 Points or Tripalm']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('21:antler-configuration'),
            createOccurrenceIDField(21),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '10 Points or Tripalm'),
            createValueField('measurementUnit', '')
          ]
        }
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
        createPathField('measurementValue', 'Observations', ['Population Unit']),
        createValueField('measurementUnit', '')
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
          { ifNotEmpty: getValuesByName('Observations', ['Sign type']) },
          { ifNotEmpty: getValuesByName('Observations', ['Sign Count']) }
        ]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('sign-type'),
        createValueField('measurementType', 'Sign Type'),
        createPathField('measurementValue', 'Observations', ['Sign type']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'or',
        checks: [
          { ifNotEmpty: getValuesByName('Observations', ['Sign Count']) },
          { ifNotEmpty: getValuesByName('Observations', ['Sign type']) }
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
        createPathField('measurementValue', 'Observations', ['Elevation (m) of Observation']),
        createValueField('measurementUnit', '')
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
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Habitat-Slope']) }]
      },
      fields: [
        eventIDField,
        createObservationMeasurementIDField('habitat-slope'),
        createValueField('measurementType', 'Habitat-Slope'),
        createPathField('measurementValue', 'Observations', ['Habitat-Slope']),
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
    },

    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Wildlife Health ID']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createOrganismMeasurementIDField('wildlife-health-id'),
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
        organismIDField,
        createOrganismMeasurementIDField('animal-id'),
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
        organismIDField,
        createOrganismMeasurementIDField('telemetry-device-id'),
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
        organismIDField,
        createOrganismMeasurementIDField('collar/tag-frequency'),
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
        organismIDField,
        createOrganismMeasurementIDField('right-ear-tag-id'),
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
        organismIDField,
        createOrganismMeasurementIDField('right-ear-tag-colour'),
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
        organismIDField,
        createOrganismMeasurementIDField('left-ear-tag-id'),
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
        organismIDField,
        createOrganismMeasurementIDField('left-ear-tag-colour'),
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
