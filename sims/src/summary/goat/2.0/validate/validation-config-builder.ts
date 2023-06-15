export const validationConfigBuilder = {
  files: [
    {
      name: 'Goat_RESULTS',
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
              'Survey Start Date',
              'Survey End Date',
              'Survey Year',
              'Survey Month',
              'Survey Day',
              'Total Survey Time',
              'Total Survey Time Unit Code',
              'Total Area Surveyed (km2)',
              'Total Kilometers Surveyed (km)',
              'Species Code',
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
              'Best Parameter Value Flag',
              'Outlier SRB Blocks Removed',
              'Marked Animals Observed',
              'Total Marked Animals Available',
              'Comments'
            ]
          }
        }
      ],
      columns: []
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
