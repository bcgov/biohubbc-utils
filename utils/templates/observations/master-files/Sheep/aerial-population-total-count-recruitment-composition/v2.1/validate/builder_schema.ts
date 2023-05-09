import {
  basicNumericValidator,
  eastingValidator,
  northingValidator,
  utmZoneValidator
} from '../../../../../../helper/validation-config-helpers';

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

const habitatPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Alpine',
            description: 'Alpine'
          },
          {
            name: 'Alpine Barren',
            description: 'Alpine Barren'
          },
          {
            name: 'Alpine Heath Meadows',
            description: 'Alpine Heath Meadows'
          },
          {
            name: 'Avalanche Path',
            description: 'Avalanche Path'
          },
          {
            name: 'Avalanche path, herbaceous',
            description: 'Avalanche path, herbaceous'
          },
          {
            name: 'Avalanche path, shrubby',
            description: 'Avalanche path, shrubby'
          },
          {
            name: 'Burn',
            description: 'Burn'
          },
          {
            name: 'Bush or Scrub land',
            description: 'Bush or Scrub land'
          },
          {
            name: 'Caves',
            description: 'Caves'
          },
          {
            name: 'Cutblock',
            description: 'Cutblock'
          },
          {
            name: 'Cutblock, herbaceous',
            description: 'Cutblock, herbaceous'
          },
          {
            name: 'Cutblock, shrubby',
            description: 'Cutblock, shrubby'
          },
          {
            name: 'Cutblock, unvegetated',
            description: 'Cutblock, unvegetated'
          },
          {
            name: 'Cutblock - free to grow',
            description: 'Cutblock - free to grow'
          },
          {
            name: 'Cutblock - mature',
            description: 'Cutblock - mature'
          },
          {
            name: 'Cutblock - not sufficiently restored',
            description: 'Cutblock - not sufficiently restored'
          },
          {
            name: 'Agricultural',
            description: 'Agricultural'
          },
          {
            name: 'Cultivated field',
            description: 'Cultivated field'
          },
          {
            name: 'Cultivated or Agricultural',
            description: 'Cultivated or Agricultural'
          },
          {
            name: 'Cultivated orchard',
            description: 'Cultivated orchard'
          },
          {
            name: 'Cultivated vineyard',
            description: 'Cultivated vineyard'
          },
          {
            name: 'Cutbank',
            description: 'Cutbank'
          },
          {
            name: 'Cliff',
            description: 'Cliff'
          },
          {
            name: 'Cliff, broken',
            description: 'Cliff, broken'
          },
          {
            name: 'Cliff, dissected',
            description: 'Cliff, dissected'
          },
          {
            name: 'Cliff, in forest',
            description: 'Cliff, in forest'
          },
          {
            name: 'Cliff, open',
            description: 'Cliff, open'
          },
          {
            name: 'Electrical transmission line',
            description: 'Electrical transmission line'
          },
          {
            name: 'Estuary',
            description: 'Estuary'
          },
          {
            name: 'Flat or Open Slopes',
            description: 'Flat or Open Slopes'
          },
          {
            name: 'Forest',
            description: 'Forest'
          },
          {
            name: 'Forest, coniferous',
            description: 'Forest, coniferous'
          },
          {
            name: 'Forest, deciduous',
            description: 'Forest, deciduous'
          },
          {
            name: 'Forest, commercially thinned',
            description: 'Forest, commercially thinned'
          },
          {
            name: 'Forest, mature',
            description: 'Forest, mature'
          },
          {
            name: 'Forest, mixed',
            description: 'Forest, mixed'
          },
          {
            name: 'Forest, old',
            description: 'Forest, old'
          },
          {
            name: 'Forest, young',
            description: 'Forest, young'
          },
          {
            name: 'Forest, riparian',
            description: 'Forest, riparian'
          },
          {
            name: 'Glacier',
            description: 'Glacier'
          },
          {
            name: 'Golf course',
            description: 'Golf course'
          },
          {
            name: 'Grassland',
            description: 'Grassland'
          },
          {
            name: 'Gravel bar',
            description: 'Gravel bar'
          },
          {
            name: 'Gravel pit',
            description: 'Gravel pit'
          },
          {
            name: 'Krummholtz',
            description: 'Krummholtz'
          },
          {
            name: 'Lake',
            description: 'Lake'
          },
          {
            name: 'Low-elevation',
            description: 'Low-elevation'
          },
          {
            name: 'Mid-elevation',
            description: 'Mid-elevation'
          },
          {
            name: 'Moraine',
            description: 'Moraine'
          },
          {
            name: 'Parkland',
            description: 'Parkland'
          },

          {
            name: 'Pasture',
            description: 'Pasture'
          },
          {
            name: 'Pipeline right-of-way',
            description: 'Pipeline right-of-way'
          },
          {
            name: 'Railway surface',
            description: 'Railway surface'
          },
          {
            name: 'Reservoir',
            description: 'Reservoir'
          },
          {
            name: 'Ridge',
            description: 'Ridge'
          },

          {
            name: 'Riparian',
            description: 'Riparian'
          },
          {
            name: 'River',
            description: 'River'
          },
          {
            name: 'Rock/Talus',
            description: 'Rock/Talus'
          },
          {
            name: 'Rubble',
            description: 'Rubble'
          },
          {
            name: 'Rock outcrop',
            description: 'Rock outcrop'
          },
          {
            name: 'Scree',
            description: 'Scree'
          },
          {
            name: 'Shrub',
            description: 'Shrub'
          },
          {
            name: 'Shore',
            description: 'Shore'
          },
          {
            name: 'Snow',
            description: 'Snow'
          },
          {
            name: 'Sub-Alpine',
            description: 'Sub-Alpine'
          },
          {
            name: 'Talus/Slope',
            description: 'Talus/Slope'
          },
          {
            name: 'Terraces',
            description: 'Terraces'
          },

          {
            name: 'Timber',
            description: 'Timber'
          },

          {
            name: 'Transportation or Transmission Corridor',
            description: 'Transportation or Transmission Corridor'
          },
          {
            name: 'Urban or Residential',
            description: 'Urban or Residential'
          },
          {
            name: 'Wetland/Meadow',
            description: 'Wetland/Meadow'
          },
          {
            name: 'Willow/Shrub',
            description: 'Willow/Shrub'
          },
          {
            name: 'Described in Comments',
            description: 'Described in Comments'
          }
        ]
      }
    }
  ];
};

const targetPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Targeted',
            description: 'Targeted'
          },
          {
            name: 'Non-Targeted',
            description: 'Non-Targeted'
          }
        ]
      }
    }
  ];
};

const yesNoPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Y',
            description: 'Yes'
          },
          {
            name: 'N',
            description: 'No'
          }
        ]
      }
    }
  ];
};

const surveyOrTelemetryPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Survey',
            description: 'Survey'
          },
          {
            name: 'Telemetry',
            description: 'Telemetry'
          }
        ]
      }
    }
  ];
};

const datumPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'NAD83',
            description: 'NAD83'
          },
          {
            name: 'NAD27',
            description: 'NAD27'
          },
          {
            name: 'WGS84',
            description: 'WGS84'
          }
        ]
      }
    }
  ];
};

const signTypePickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Antler',
            description: 'Antler'
          },
          {
            name: 'Bed',
            description: 'Bed'
          },
          {
            name: 'Body Parts',
            description: 'Body Parts'
          },
          {
            name: 'Trail',
            description: 'Trail'
          },
          {
            name: 'Tracks',
            description: 'Tracks'
          },
          {
            name: 'Carcass',
            description: 'Carcass'
          },
          {
            name: 'Scratchings',
            description: 'Scratchings'
          },
          {
            name: 'Hair',
            description: 'Hair'
          },
          {
            name: 'Excrement',
            description: 'Excrement'
          },
          {
            name: 'Cache',
            description: 'Cache'
          },
          {
            name: 'Egg Shell',
            description: 'Egg Shell'
          },
          {
            name: 'Feeding',
            description: 'Feeding'
          },
          {
            name: 'Feather',
            description: 'Feather'
          },
          {
            name: 'Pellet Group',
            description: 'Pellet Group'
          },
          {
            name: 'Regurgitated Pellet',
            description: 'Regurgitated Pellet'
          },
          {
            name: 'Shed Skin',
            description: 'Shed Skin'
          },
          {
            name: 'Whitewash',
            description: 'Whitewash'
          },
          {
            name: 'Described in Comments',
            description: 'Pellet Group'
          }
        ]
      }
    }
  ];
};

const ageOfSignPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'New',
            description: 'New'
          },
          {
            name: 'Old',
            description: 'Old'
          },
          {
            name: 'Hour',
            description: 'Hour'
          },
          {
            name: 'Day',
            description: 'Day'
          },
          {
            name: 'Week',
            description: 'Week'
          },
          {
            name: 'Month',
            description: 'Month'
          },
          {
            name: 'Year',
            description: 'Year'
          },
          {
            name: 'Unclassified',
            description: 'Unclassified'
          },
          {
            name: 'Described in Comments',
            description: 'Described in Comments'
          }
        ]
      }
    }
  ];
};

const aircraftPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Bell JetRanger',
            description: 'Bell JetRanger'
          },
          {
            name: 'Bell JetRanger without bubble window',
            description: 'Bell JetRanger without bubble window'
          },
          {
            name: 'Bell JetRanger with bubble window',
            description: 'Bell JetRanger with bubble window'
          },
          {
            name: 'Bell LongRanger',
            description: 'Bell LongRanger'
          },
          {
            name: 'Hiller 12E4',
            description: 'Hiller 12E4'
          },
          {
            name: 'Hughes 500D',
            description: 'Hughes 500D'
          },
          {
            name: 'Cessna 172',
            description: 'Cessna 172'
          },
          {
            name: 'Cessna 180',
            description: 'Cessna 180'
          },
          {
            name: 'Cessna 182',
            description: 'Cessna 182'
          },
          {
            name: 'Cessna 185',
            description: 'Cessna 185'
          },
          {
            name: 'Cessna 206',
            description: 'Cessna 206'
          },
          {
            name: 'Super Cub',
            description: 'Super Cub'
          },
          {
            name: 'Beaver',
            description: 'Beaver'
          },
          {
            name: 'Single Otter',
            description: 'Single Otter'
          },
          {
            name: 'Twin Otter',
            description: 'Twin Otter'
          },
          {
            name: 'Bell 406',
            description: 'Bell 406'
          },
          {
            name: 'A-Star',
            description: 'A-Star'
          }
        ]
      }
    }
  ];
};

const observationActivityPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Standing',
            description: 'Standing'
          },
          {
            name: 'Bedding',
            description: 'Bedding'
          },
          {
            name: 'Running',
            description: 'Running'
          },
          {
            name: 'Walking',
            description: 'Walking'
          },
          {
            name: 'Moving',
            description: 'Moving'
          },
          {
            name: 'Not Moving',
            description: 'Not Moving'
          }
        ]
      }
    }
  ];
};

const activityNonTargettedPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Alert',
            description: 'Alert'
          },
          {
            name: 'Avoiding Pests',
            description: 'Avoiding Pests'
          },
          {
            name: 'Basking',
            description: 'Basking'
          },
          {
            name: 'Bedding',
            description: 'Bedding'
          },
          {
            name: 'Building',
            description: 'Building'
          },
          {
            name: 'Cashing',
            description: 'Cashing'
          },
          {
            name: 'Casting',
            description: 'Casting'
          },
          {
            name: 'Courting',
            description: 'Courting'
          },
          {
            name: 'Denning',
            description: 'Denning'
          },
          {
            name: 'Disturbed',
            description: 'Disturbed'
          },
          {
            name: 'Drinking',
            description: 'Drinking'
          },
          {
            name: 'Excreting',
            description: 'Excreting'
          },
          {
            name: 'Feeding',
            description: 'Feeding'
          },
          {
            name: 'Fleeing',
            description: 'Fleeing'
          },
          {
            name: 'Feeding salmonid',
            description: 'Feeding salmonid'
          },
          {
            name: 'Grooming',
            description: 'Grooming'
          },
          {
            name: 'Habitat',
            description: 'Habitat'
          },
          {
            name: 'Hibernating',
            description: 'Hibernating'
          },
          {
            name: 'Hunting',
            description: 'Building'
          },
          {
            name: 'Ingesting Minerals',
            description: 'Ingesting Minerals'
          },
          {
            name: 'Incubating',
            description: 'Incubating'
          },
          {
            name: 'Living',
            description: 'Living'
          },
          {
            name: 'Migrating Daily',
            description: 'Migrating Daily'
          },
          {
            name: 'Migrating Seasonally',
            description: 'Migrating Seasonally'
          },
          {
            name: 'Reproducing birthing',
            description: 'Reproducing birthing'
          },
          {
            name: 'Reproducing eggs',
            description: 'Reproducing eggs'
          },
          {
            name: 'Rearing',
            description: 'Rearing'
          },
          {
            name: 'Standing',
            description: 'Standing'
          },
          {
            name: 'Security and/or Thermal',
            description: 'Security and/or Thermal'
          },
          {
            name: 'Thermal',
            description: 'Thermal'
          },
          {
            name: 'Territoriality',
            description: 'Territoriality'
          },
          {
            name: 'Not Traveling',
            description: 'Not Traveling'
          },
          {
            name: 'Traveling, Flying',
            description: 'Traveling flying'
          },
          {
            name: 'Traveling, Unclassified',
            description: 'Traveling, Unclassified'
          },
          {
            name: 'Traveling, Walking',
            description: 'Traveling, Walking'
          },
          {
            name: 'Traveling on a Path',
            description: 'Traveling on a Path'
          },
          {
            name: 'Traveling, Running',
            description: 'Traveling running'
          },
          {
            name: 'Traveling, Swimming',
            description: 'Traveling, Swimming'
          },
          {
            name: 'Traveling, Heli-Skiing',
            description: 'Traveling, Heli-Skiing'
          },
          {
            name: 'Traveling, Skiing',
            description: 'Traveling, Skiing'
          },
          {
            name: 'Traveling, Snowmobiling',
            description: 'Traveling, Snowmobiling'
          },
          {
            name: 'Traveling, Snowshoeing',
            description: 'Traveling, Snowshoeing'
          },
          {
            name: 'Traveling, Snow Cat',
            description: 'Traveling, Snow Cat'
          },
          {
            name: 'Urinating',
            description: 'Urinating'
          },
          {
            name: 'Described in comments',
            description: 'Described in comments'
          }
        ]
      }
    }
  ];
};

const featureTypePickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Breeding Site',
            description: 'Breeding Site'
          },
          {
            name: 'Maternity Roost',
            description: 'Maternity Roost'
          },
          {
            name: 'Bat Nursery Roost',
            description: 'Bat Nursery Roost'
          },
          {
            name: 'Rookery',
            description: 'Rookery'
          },

          {
            name: 'Courting Site',
            description: 'Courting Site'
          },
          {
            name: 'Feeding Site',
            description: 'Feeding Site'
          },

          {
            name: 'Resting Site',
            description: 'Resting Site'
          },
          {
            name: 'Staging Site',
            description: 'Staging Site'
          },
          {
            name: 'Ungulate Winter Range',
            description: 'Ungulate Winter Range'
          },
          {
            name: 'Hibernaculum',
            description: 'Hibernaculum'
          },
          {
            name: 'Roost',
            description: 'Roost'
          },
          {
            name: 'Wallow',
            description: 'Wallow'
          },
          {
            name: 'Mineral Lick',
            description: 'Mineral Lick'
          },
          {
            name: 'Burrow',
            description: 'Burrow'
          },
          {
            name: 'Den',
            description: 'Den'
          },
          {
            name: 'Lodge',
            description: 'Lodge'
          },
          {
            name: 'Nest',
            description: 'Nest'
          },
          {
            name: 'Nest Tree',
            description: 'Nest Tree'
          },
          {
            name: 'Plant Community',
            description: 'Plant Community'
          },
          {
            name: 'Plant Site',
            description: 'Plant Site'
          },
          {
            name: 'Hot Spring',
            description: 'Hot Spring'
          },
          {
            name: 'Water',
            description: 'Water'
          },
          {
            name: 'Fisheries Sensitive Feature',
            description: 'Fisheries Sensitive Feature'
          },
          {
            name: 'Marine Sensitive Feature',
            description: 'Marine Sensitive Feature'
          },
          {
            name: 'Described in Comments',
            description: 'Pellet Group'
          }
        ]
      }
    }
  ];
};

const presentAbsentPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'Present',
            description: 'Present'
          },
          {
            name: 'Absent',
            description: 'Absent'
          }
        ]
      }
    }
  ];
};

const frequencyPickListValidator = () => {
  return [
    {
      column_code_validator: {
        allowed_code_values: [
          {
            name: 'KHz',
            description: 'KHz'
          },
          {
            name: 'MHz',
            description: 'MHz'
          },
          {
            name: 'Hz',
            description: 'Hz'
          }
        ]
      }
    }
  ];
};

export const validationSchemaBuilder = {
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
              'Snow Cover',
              'Snow Conditions',
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
            column_names: ['Study Area', 'Population Unit', 'Block ID/SU ID']
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
              'Population Unit',
              'Block ID/SU ID',
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
              'Adults Unclassified Sex',
              'Kid',
              'Nanny',
              'Billy',
              'Unclassified Age/Sex',
              'Total Count',
              'Sign Type',
              'Sign Count',
              'Age of Sign',
              'Veg Cover (%)',
              'Snow Cover (%)',
              'Activity',
              'Elevation (m) of Observation',
              'Habitat',
              'Wind Blown',
              'Terrain Obstruction',
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
          validations: []
        },
        {
          name: 'Population Unit',
          validations: []
        },
        {
          name: 'Block ID/SU ID',
          validations: []
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
          name: 'Group Label',
          validations: []
        },
        {
          name: 'Date',
          validations: []
        },
        {
          name: 'Species',
          validations: [{ column_required_validator: {} }, ...sheepSpeciesPickListValidator()]
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
            required_columns: []
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
          validations: activityNonTargettedPickListValidator()
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
    },
    {
      workbook_parent_child_key_match_validator: {
        child_worksheet_name: 'Effort & Site Conditions',
        parent_worksheet_name: 'Observations',
        column_names: ['Study Area', 'Population Unit', 'Block ID/SU ID']
      }
    }
  ]
};
