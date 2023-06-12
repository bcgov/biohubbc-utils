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
      sheetName: 'Observations',
      primaryKey: ['Study Area', 'Block ID/SU ID'],
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
    // Spike/Fork Bulls (static: 0)
    // sex: Male
    // life stage: Unknown
    // configuration: Spike/Fork Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Spike/Fork Bulls']) }] },
      fields: [
        eventIDField,
        createOccurrenceIDField(0),
        createPathField('individualCount', 'Observations', ['Spike/Fork Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
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
        eventIDField,
        createOccurrenceIDField(1),
        createPathField('individualCount', 'Observations', ['Sub-Prime Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('1:antler-configuration'),
            createOccurrenceIDField(1),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Sub-Prime'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(2),
        createPathField('individualCount', 'Observations', ['Prime Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('2:antler-configuration'),
            createOccurrenceIDField(2),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Prime'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(3),
        createPathField('individualCount', 'Observations', ['Senior Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('3:antler-configuration'),
            createOccurrenceIDField(3),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Senior'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(4),
        createPathField('individualCount', 'Observations', ['3 Brow/10 Points Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('4:antler-configuration'),
            createOccurrenceIDField(4),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', '3 Brow/10 Points'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(5),
        createPathField('individualCount', 'Observations', ['BC RISC Yearling Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'yearling'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('5:antler-configuration'),
            createOccurrenceIDField(5),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Yearling'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(6),
        createPathField('individualCount', 'Observations', ['BC RISC Class I Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('6:antler-configuration'),
            createOccurrenceIDField(6),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class I'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(7),
        createPathField('individualCount', 'Observations', ['BC RISC Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('7:antler-configuration'),
            createOccurrenceIDField(7),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'BC RISC Class II'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(8),
        createPathField('individualCount', 'Observations', ['BC RISC Class III Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
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
            createValueField('measurementValue', 'BC RISC Class III'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(9),
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class I Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('9:antler-configuration'),
            createOccurrenceIDField(9),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Oswald (1997) Class I'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(10),
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            eventIDField,
            createObservationMeasurementIDField('10:antler-configuration'),
            createOccurrenceIDField(10),
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementValue', 'Oswald (1997) Class II'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(11),
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class III Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
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
            createValueField('measurementValue', 'Oswald (1997) Class III'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(12),
        createPathField('individualCount', 'Observations', ['Adult Bulls - Unclassified']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
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
            createValueField('measurementValue', 'unclassified'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(13),
        createPathField('individualCount', 'Observations', ['Bulls - Unclassified']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
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
            createValueField('measurementValue', 'unclassified'),
            createValueField('measurementUnit', '')
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
        eventIDField,
        createOccurrenceIDField(14),
        createPathField('individualCount', 'Observations', ['Cow']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          condition: {
            type: 'and',
            checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow W/1 calf']) }]
          },
          fields: [
            eventIDField,
            createObservationMeasurementIDField('14:cow-w/1-calf'),
            createOccurrenceIDField(14),
            createValueField('measurementType', 'Cow W/1 calf'),
            createPathField('measurementValue', 'Observations', ['Cow W/1 calf']),
            createValueField('measurementUnit', '')
          ]
        },
        {
          sheetName: 'measurementOrFact',
          condition: {
            type: 'and',
            checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow W/2 calves']) }]
          },
          fields: [
            eventIDField,
            createObservationMeasurementIDField('14:cow-w/2-calves'),
            createOccurrenceIDField(14),
            createValueField('measurementType', 'Cow W/2 calves'),
            createPathField('measurementValue', 'Observations', ['Cow W/2 calves']),
            createValueField('measurementUnit', '')
          ]
        }
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
        eventIDField,
        createOccurrenceIDField(15),
        createPathField('individualCount', 'Observations', ['Calves']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'juvenile'),
        createPathField('taxonID', 'Observations', ['Species'])
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
        eventIDField,
        createOccurrenceIDField(16),
        createPathField('individualCount', 'Observations', ['Adult Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species'])
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
        eventIDField,
        createOccurrenceIDField(17),
        createPathField('individualCount', 'Observations', ['Unclassified Age/Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species'])
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
        createEventMeasurementIDField('study-area'),
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

    //
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
        createPathField('measurementValue', 'Marked Animals', ['Collar/Tag Frequency']),
        createPathField('measurementUnit', 'Marked Animals', ['Frequency Unit'])
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
