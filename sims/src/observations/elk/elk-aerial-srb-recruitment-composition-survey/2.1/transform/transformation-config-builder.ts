import { TransformSchema } from '../../../../../helpers/media/xlsx/transformation/xlsx-transform-schema-parser';
import {
  createPathField,
  createValueField,
  getValuesByName
} from '../../../../../helpers/transformation/transformation-config-helpers';

const occurrenceIDField = {
  columnName: 'eventID',
  columnValue: [
    {
      paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
    }
  ]
};

const eventIDField = {
  columnName: 'eventID',
  columnValue: [
    {
      paths: [getValuesByName('Block Summary', ['_key']), getValuesByName('Observations', ['_row'])]
    }
  ]
};
const organismIDField = {
  columnName: 'organismID',
  columnValue: [
    {
      paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
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

const createEventMeasurementIDField = (staticPostfix: string | number) => {
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

export const transformationConfigBuilder: TransformSchema = {
  templateMeta: [
    {
      sheetName: 'Block Summary',
      primaryKey: ['Study Area', 'Population Unit', 'Block ID/SU ID', 'Stratum'],
      parentKey: [],
      type: 'root',
      foreignKeys: [
        {
          sheetName: 'Effort & Site Conditions',
          primaryKey: ['Study Area', 'Population Unit', 'Block ID/SU ID']
        },
        {
          sheetName: 'Observations',
          primaryKey: ['Study Area', 'Population Unit', 'Block ID/SU ID', 'Stratum']
        }
      ]
    },
    {
      sheetName: 'Effort & Site Conditions',
      primaryKey: ['Study Area', 'Population Unit', 'Block ID/SU ID'],
      parentKey: ['Study Area', 'Population Unit', 'Block ID/SU ID'],
      type: '',
      foreignKeys: []
    },
    {
      sheetName: 'Observations',
      primaryKey: ['Study Area', 'Population Unit', 'Block ID/SU ID', 'Stratum'],
      parentKey: ['Study Area', 'Population Unit', 'Block ID/SU ID', 'Stratum'],
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
      sheetName: 'event',
      fields: [
        occurrenceIDField,
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
        occurrenceIDField,
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
    // BC RISC Yearling Bulls (static: 0)
    // life stage:Yearling
    // sex: Male
    // configuration: BC RISC Yearling
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Yearling Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(0),
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
            eventIDField,
            createObservationMeasurementIDField('0:antler-configuration'),
            createOccurrenceIDField(0),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Yearling Bulls'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // BC RISC Class I Bulls (static: 1)
    // life stage: Unknown
    // sex: Male
    // configuration: BC RISC Class I
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class I Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(1),
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
            eventIDField,
            createObservationMeasurementIDField('1:antler-configuration'),
            createOccurrenceIDField(1),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class I'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // BC RISC Class II Bulls (static: 2)
    // life stage: Unknown
    // sex: Male
    // configuration: BC RISC Class II
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class I Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(2),
        createPathField('individualCount', 'Observations', ['BC RISC Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('2:antler-configuration'),
            createOccurrenceIDField(2),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class II'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // BC RISC Class III Bulls (static: 3)
    // life stage: Adult
    // sex: Male
    // configuration: BC RISC Class III
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class III Bulls']) }]
      },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(3),
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
            eventIDField,
            createObservationMeasurementIDField('3:antler-configuration'),
            createOccurrenceIDField(3),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class III'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // BC RISC Class IV Bulls (static: 4)
    // life stage: Adult
    // sex: Male
    // configuration: BC RISC Class IV
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['BC RISC Class IV Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(4),
        createPathField('individualCount', 'Observations', ['BC RISC Class IV Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('4:antler-configuration'),
            createOccurrenceIDField(4),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class IV'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // Spike Bulls (static: 5)
    // life stage: Unknown
    // sex: Male
    // configuration: Spike antlers
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Spike Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(5),
        createPathField('individualCount', 'Observations', ['Spike Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('5:antler-configuration'),
            createOccurrenceIDField(5),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Spike antlers'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // Raghorn Bulls (static: 6)
    // life stage: Unknown
    // sex: Male
    // configuration: Raghorn antlers
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Raghorn Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(6),
        createPathField('individualCount', 'Observations', ['Raghorn Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('6:antler-configuration'),
            createOccurrenceIDField(6),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Raghorn antlers'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // <=3 Point Bulls (static: 7)
    // life stage: Unknown
    // sex: Male
    // configuration: 3 points or fewer
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['<=3 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(7),
        createPathField('individualCount', 'Observations', ['<=3 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('7:antler-configuration'),
            createOccurrenceIDField(7),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '3 points or fewer'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // 3 - 4 Point Bulls (static: 8)
    // life stage: Unknown
    // sex: Male
    // configuration: 3 or 4 points
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['3 - 4 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(8),
        createPathField('individualCount', 'Observations', ['3 - 4 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('8:antler-configuration'),
            createOccurrenceIDField(8),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '3 or 4 points'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // 3 - 5 Point Bulls (static: 9)
    // life stage: Unknown
    // sex: Male
    // configuration: 3 or 4 or 5 points
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['3 - 5 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(9),
        createPathField('individualCount', 'Observations', ['3 - 5 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('9:antler-configuration'),
            createOccurrenceIDField(9),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '3 or 4 or 5 points'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // <4 Point Bulls (static: 10)
    // life stage: Unknown
    // sex: Male
    // configuration: fewer than 4 points
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['<4 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(10),
        createPathField('individualCount', 'Observations', ['<4 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('10:antler-configuration'),
            createOccurrenceIDField(10),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'fewer than 4 points'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // >=4 Point Bulls (static: 11)
    // life stage: Unknown
    // sex: Male
    // 4 points or more
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['>=4 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(11),
        createPathField('individualCount', 'Observations', ['>=4 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('11:antler-configuration'),
            createOccurrenceIDField(11),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '4 points or more'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // 5 Point Bulls (static: 12)
    // life stage: Adult
    // sex: Male
    // configuration: 5 points
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['5 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(12),
        createPathField('individualCount', 'Observations', ['5 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('12:antler-configuration'),
            createOccurrenceIDField(12),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '5 points'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // >=5 Point Bulls (static: 13)
    // life stage: Adult
    // sex: Male
    // configuration: 5 points or more
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['>=5 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(13),
        createPathField('individualCount', 'Observations', ['>=5 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('13:antler-configuration'),
            createOccurrenceIDField(13),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '5 points or more'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // >= 6 Point Bulls (static: 14)
    // life stage: Adult
    // sex: Male
    // configuration: 6 points or more
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['>= 6 Point Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(14),
        createPathField('individualCount', 'Observations', ['>=6 Point Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('14:antler-configuration'),
            createOccurrenceIDField(14),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '6 points or more'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // Adult Bulls - Unclassified (static: 15)
    // life stage: Adult
    // sex: Male
    // configuration: unclassified
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Bulls - Unclassified']) }]
      },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(15),
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
            eventIDField,
            createObservationMeasurementIDField('15:antler-configuration'),
            createOccurrenceIDField(15),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'unclassified'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // Unclassified Bulls (static: 16)
    // life stage: Unknown
    // sex: Male
    // configuration: unclassified
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassified Bulls']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(16),
        createPathField('individualCount', 'Observations', ['Unclassified Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('16:antler-configuration'),
            createOccurrenceIDField(16),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'unclassified'),
            createValueField('measurementUnit', '')
          ]
        }
      ]
    },
    // Cows (static: 17)
    // life stage: Adult
    // sex: Female
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cows']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(17),
        createPathField('individualCount', 'Observations', ['Cows']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Calves (static: 18)
    // life stage: Juvenile
    // sex: Unknown
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Calves']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(18),
        createPathField('individualCount', 'Observations', ['Calves']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'juvenile'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Adult Unclassified Sex (static: 19)
    // life stage: Adult
    // sex: Unknown
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Unclassified Sex']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(19),
        createPathField('individualCount', 'Observations', ['Adult Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Yearling - Unclassified Sex (static: 20)
    // life stage: Yearling
    // sex: Unknown
    {
      sheetName: 'occurrence',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Yearling - Unclassified Sex']) }]
      },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(20),
        createPathField('individualCount', 'Observations', ['Yearling - Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    // Unclassified Age/Sex (static: 21)
    // life stage: Unknown
    // sex: Unknown
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassified Age/Sex']) }] },
      fields: [
        occurrenceIDField,
        createOccurrenceIDField(21),
        createPathField('individualCount', 'Observations', ['Unclassified Age/Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createEventMeasurementIDField('study-area'),
        createValueField('measurementType', 'Study Area'),
        createPathField('measurementValue', 'Block Summary', ['Study Area']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createEventMeasurementIDField('block-id/su-id'),
        createValueField('measurementType', 'Block ID/SU ID'),
        createPathField('measurementValue', 'Block Summary', ['Block ID/SU ID']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createEventMeasurementIDField('population-unit'),

        createValueField('measurementType', 'Population Unit'),
        createPathField('measurementValue', 'Block Summary', ['Population Unit']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createEventMeasurementIDField('stratum'),

        createValueField('measurementType', 'Stratum'),
        createPathField('measurementValue', 'Block Summary', ['Stratum']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createEventMeasurementIDField('stratum/block-area'),
        createValueField('measurementType', 'Stratum/Block Area'),
        createPathField('measurementValue', 'Block Summary', ['Stratum/Block Area (km2)']),
        createValueField('measurementUnit', 'km2')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        eventIDField,
        createEventMeasurementIDField('sampled'),
        createValueField('measurementType', 'Sampled'),
        createPathField('measurementValue', 'Block Summary', ['Sampled (Y/N)']),
        createValueField('measurementUnit', 'Y/N')
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
        createEventMeasurementIDField('group-label'),
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
        createEventMeasurementIDField('sign-type'),
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
        createEventMeasurementIDField('sign-count'),

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
        createEventMeasurementIDField('age-of-sign'),
        createValueField('measurementType', 'Age of Sign'),
        createPathField('measurementValue', 'Observations', ['Age of Sign']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Topography']) }]
      },
      fields: [
        eventIDField,
        createEventMeasurementIDField('topography'),
        createValueField('measurementType', 'Topography'),
        createPathField('measurementValue', 'Observations', ['Topography']),
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
        createEventMeasurementIDField('habitat'),
        createValueField('measurementType', 'Habitat'),
        createPathField('measurementValue', 'Observations', ['Habitat']),
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
        createEventMeasurementIDField('veg-cover'),
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
        createEventMeasurementIDField('snow-cover'),
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
        createEventMeasurementIDField('activity'),
        createValueField('measurementType', 'Activity'),
        createPathField('measurementValue', 'Observations', ['Activity']),
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
        createEventMeasurementIDField('number-of-marked-animals-observed'),
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
        createEventMeasurementIDField('survey-or-telemetry-search'),

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
        createEventMeasurementIDField('photos'),
        createValueField('measurementType', 'Photos'),
        createPathField('measurementValue', 'Observations', ['Photos']),
        createValueField('measurementUnit', '')
      ]
    },
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Targeted or Non-Targeted']) }]
      },
      fields: [
        eventIDField,
        organismIDField,
        createOrganismMeasurementIDField('targeted-or-non-targeted'),
        createValueField('measurementType', 'Targeted or Non-Targeted'),
        createPathField('measurementValue', 'Marked Animals', ['Targeted or Non-Targeted']),
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
