import { basicNumericValidator } from '../../../../helpers/validation/validation-config-helpers';

export const validationConfigBuilder = {
  name: 'Sheep Summary Results Template',
  files: [
    {
      name: 'Sheep_RESULTS',
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: [
              'Study Area',
              'Population Unit',
              'Block/Sample Unit',
              'Parameter',
              'Stratum',
              'Observed',
              'Estimated',
              'Sightability Model',
              'Sightability Correction Factor',
              'SE',
              'Coefficient of Variation (%)',
              'Confidence Level (%)',
              'Lower CL',
              'Upper CL',
              'Total Survey Area (km2)',
              'Area Flown (km2)',
              'Total Kilometers Surveyed (km)',
              'Best Parameter Value Flag',
              'Outlier Blocks Removed',
              'Total Marked Animals Observed',
              'Marked Animals Available',
              'Parameter Comments'
            ]
          }
        }
      ],
      columns: [
        {
          name: 'Observed',
          validations: basicNumericValidator()
        },
        {
          name: 'Estimated',
          validations: basicNumericValidator()
        },
        {
          name: 'Sightability Correction Factor',
          validations: basicNumericValidator()
        },
        {
          name: 'SE',
          validations: basicNumericValidator()
        },
        {
          name: 'Coefficient of Variation (%)',
          validations: basicNumericValidator()
        },
        {
          name: 'Confidence Level (%)',
          validations: basicNumericValidator()
        },
        {
          name: 'Area Flown (km2)',
          validations: basicNumericValidator()
        },
        {
          name: 'Total Survey Area (km2)',
          validations: basicNumericValidator()
        },
        {
          name: 'Total Kilometers Surveyed (km)',
          validations: basicNumericValidator()
        },
        {
          name: 'Best Parameter Value Flag',
          validations: [
            {
              column_code_validator: {
                allowed_code_values: [
                  { name: 'Yes', description: 'Yes' },
                  { name: 'No', description: 'No' },
                  { name: 'Unknown', description: 'Unknown' },
                  { name: 'Not Evaluated', description: 'Not Evaluated' }
                ]
              }
            }
          ]
        },
        {
          name: 'Total Marked Animals Observed',
          validations: basicNumericValidator()
        },
        {
          name: 'Marked Animals Available',
          validations: basicNumericValidator()
        }
      ]
    }
  ],
  validations: [
    {
      mimetype_validator: {
        reg_exps: ['text/csv', 'application/vnd.*']
      }
    }
  ]
};
