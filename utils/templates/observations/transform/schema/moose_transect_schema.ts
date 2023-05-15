import { transformSchema } from '../transform';
import { createPathField, createValueField, getValuesByName } from '../xlsx/xlsx-transform-json-path-queries';
import { TransformSchema } from '../xlsx/xlsx-transform-schema-parser';

export const mooseTransectSchema: TransformSchema = {
  templateMeta: [
    {
      sheetName: 'Observations',
      primaryKey: ['Study Area', 'Block ID/SU ID', 'Transect ID'],
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
      sheetName: 'record',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'basisOfRecord ',
          columnValue: [
            {
              static: 'HumanObservation'
            }
          ]
        }
      ]
    },
    {
      sheetName: 'event',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'eventDate',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['Date'])]
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
        }
      ]
    },
    {
      sheetName: 'location',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['_key']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
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
    // antler-configuration: Spike/Fork Bulls
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Spike/Fork Bulls']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '0'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Spike/Fork Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '0'
                  }
                }
              ]
            },
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '1'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Sub-Prime Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '1'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Sub-Prime')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '2'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Prime Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '2'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Prime')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '3'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Senior Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '3'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Senior')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '4'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['3 Brow/10 Points Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '4'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', '3 Brow/10 Points')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '5'
              }
            }
          ]
        },
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
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '5'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Yearling')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '6'
              }
            }
          ]
        },
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
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '6'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Class I')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '7'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['BC RISC Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '7'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Class II')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '8'
              }
            }
          ]
        },
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
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '8'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'BC RISC Class III')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '9'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class I Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '9'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Oswald (1997) Class I')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '10'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class II Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '10'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Oswald (1997) Class II')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '11'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Oswald (1997) Class III Bulls']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '11'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'Oswald (1997) Class III')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '12'
              }
            }
          ]
        },
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
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '12'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'unclassified')
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '13'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Bulls - Unclassified']),
        createValueField('sex', 'male'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'antler-configuration'
                  }
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '13'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Antler Configuration'),
            createValueField('measurementUnit', ''),
            createValueField('measurementValue', 'unclassified')
          ]
        }
      ]
    },
    // Cow (static: 14)
    // sex: Female
    // life stage: Adult
    // configuration: Cow
    // if the attributes cow w/1 calf, add to measurementOrFact
    // if the attributes cow w/2 calves, add to measurementOrFact
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '14'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Cow']),
        createValueField('sex', 'female'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ],
      add: [
        {
          sheetName: 'measurementOrFact',
          condition: {
            type: 'and',
            checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow W/1 calf']) }]
          },
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '14'
                  }
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'cow-w/1-calf'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Cow W/1 calf'),
            createValueField('measurementUnit', ''),
            createPathField('measurementValue', 'Observations', ['Cow W/1 calf'])
          ]
        },
        {
          sheetName: 'measurementOrFact',
          condition: {
            type: 'and',
            checks: [{ ifNotEmpty: getValuesByName('Observations', ['Cow W/2 calves']) }]
          },
          fields: [
            {
              columnName: 'eventID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
                }
              ]
            },
            {
              columnName: 'occurrenceID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: '14'
                  }
                }
              ]
            },
            {
              columnName: 'measurementID',
              columnValue: [
                {
                  paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
                  postfix: {
                    static: 'cow-w/2-calf'
                  }
                }
              ]
            },
            createValueField('measurementType', 'Cow W/2 calf'),
            createValueField('measurementUnit', ''),
            createPathField('measurementValue', 'Observations', ['Cow W/2 calf'])
          ]
        }
      ]
    },

    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Calves']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '15'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Calves']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'juvenile'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Adult Unclassified Sex']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '16'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Adult Unclassified Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'adult'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
      ]
    },
    {
      sheetName: 'occurrence',
      condition: { type: 'and', checks: [{ ifNotEmpty: getValuesByName('Observations', ['Unclassified Age/Sex']) }] },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'occurrenceID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: '17'
              }
            }
          ]
        },
        createPathField('individualCount', 'Observations', ['Unclassified Age/Sex']),
        createValueField('sex', 'unknown'),
        createValueField('lifeStage', 'unknown'),
        createPathField('taxonID', 'Observations', ['Species']),
        createPathField('occurrenceRemarks', 'Observations', ['Observation Comments'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        createPathField('organismRemarks', 'Marked Animals', ['Marked Animals Comments'])
      ]
    },
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'study-area'
              }
            }
          ]
        },
        createValueField('measurementType', 'Study Area'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Study Area'])
      ]
    },

    // ------------- measurementOrFact captures all additional observation and marked animal information (below)

    //measurementOrFact: Observations - BlockID/SU ID
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'block-id/su-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Block ID/SU ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Block ID/SU ID'])
      ]
    },

    //measurementOrFact: Observations - Perpendicular Distance From Transect Line (m)
    {
      sheetName: 'measurementOrFact',
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'perpendicular-distance-from-transect-line'
              }
            }
          ]
        },
        createValueField('measurementType', 'Perpendicular Distance From Transect Line'),
        createValueField('measurementUnit', 'm'),
        createPathField('measurementValue', 'Observations', ['Perpendicular Distance From Transect Line (m)'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'group-label'
              }
            }
          ]
        },
        createValueField('measurementType', 'Group Label'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Group Label'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'sign-type'
              }
            }
          ]
        },
        createValueField('measurementType', 'Sign Type'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Sign Type'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'sign-count'
              }
            }
          ]
        },
        createValueField('measurementType', 'Sign Count'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Sign Count'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'age-of-sign'
              }
            }
          ]
        },
        createValueField('measurementType', 'Age of Sign'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Age of Sign'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'veg-cover'
              }
            }
          ]
        },
        createValueField('measurementType', 'Veg Cover'),
        createValueField('measurementUnit', '%'),
        createPathField('measurementValue', 'Observations', ['Veg Cover (%)'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'snow-cover'
              }
            }
          ]
        },
        createValueField('measurementType', 'Snow Cover'),
        createValueField('measurementUnit', '%'),
        createPathField('measurementValue', 'Observations', ['Snow Cover (%)'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'activity'
              }
            }
          ]
        },
        createValueField('measurementType', 'Activity'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Activity'])
      ]
    },
    //measurementOrFact: Observations: Number of Marked Animals Observed
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Number of Marked Animals Observed']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'number-of-marked-animals-observed'
              }
            }
          ]
        },
        createValueField('measurementType', 'Number of Marked Animals Observed'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Number of Marked Animals Observed'])
      ]
    },

    //measurementOrFact: Observations: Survey or Telemetry Search
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Observations', ['Survey or Telemetry Search']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'survey-or-telemetry-search'
              }
            }
          ]
        },
        createValueField('measurementType', 'Survey or Telemetry Search'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Survey or Telemetry Search'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])],
              postfix: {
                static: 'photos'
              }
            }
          ]
        },
        createValueField('measurementType', 'Photos'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Observations', ['Photos'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'targeted-or-non-targeted'
              }
            }
          ]
        },
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'wildlife-health-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Wildlife Health ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Wildlife Health ID'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'animal-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Animal ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Animal ID'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'telemetry-device-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Telemetry Device ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Telemetry Device ID'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'collar/tag-frequency'
              }
            }
          ]
        },
        createValueField('measurementType', 'Collar/Tag Frequency'),
        createPathField('measurementUnit', 'Marked Animals', ['Frequency Unit']),
        createPathField('measurementValue', 'Marked Animals', ['Collar/Tag Frequency'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'right-ear-tag-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Right Ear Tag ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag ID'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'right-ear-tag-colour'
              }
            }
          ]
        },
        createValueField('measurementType', 'Right Ear Tag Colour'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Right Ear Tag Colour'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'left-ear-tag-id'
              }
            }
          ]
        },
        createValueField('measurementType', 'Left Ear Tag ID'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag ID'])
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
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'left-ear-tag-colour'
              }
            }
          ]
        },
        createValueField('measurementType', 'Left Ear Tag Colour'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Left Ear Tag Colour'])
      ]
    },
    //measurementOrFact: Marked Animals - Marked Animals Comments
    {
      sheetName: 'measurementOrFact',
      condition: {
        type: 'and',
        checks: [{ ifNotEmpty: getValuesByName('Marked Animals', ['Marked Animals Comments']) }]
      },
      fields: [
        {
          columnName: 'eventID',
          columnValue: [
            {
              paths: [getValuesByName('Observations', ['_key']), getValuesByName('Observations', ['_row'])]
            }
          ]
        },
        {
          columnName: 'organismID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])]
            }
          ]
        },
        {
          columnName: 'measurementID',
          columnValue: [
            {
              paths: [getValuesByName('Marked Animals', ['_key']), getValuesByName('Marked Animals', ['_row'])],
              postfix: {
                static: 'marked-animals-comments'
              }
            }
          ]
        },
        createValueField('measurementType', 'Marked Animals Comments'),
        createValueField('measurementUnit', ''),
        createPathField('measurementValue', 'Marked Animals', ['Marked Animals Comments'])
      ]
    }
  ],
  dwcMeta: [
    {
      sheetName: 'record',
      primaryKey: ['eventID']
    },
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

transformSchema('Moose_Transect_SpikeBulls_no_marked_animals.xlsx', mooseTransectSchema);

//transformSchema('Moose_Transect_SpikeBulls_with_marked_animals.xlsx', mooseTransectSchema);
//transformSchema('Moose_Transect_SpikeBulls_no_marked_animals.xlsx', mooseTransectSchema);
