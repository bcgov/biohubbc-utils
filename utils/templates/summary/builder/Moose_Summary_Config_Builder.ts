import * as fs from 'fs';

export const sightabilityModel = () => {
  return [
    {
      column_code_validator: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        allowed_code_values: [
          {name: "Model or Correction - Sightability Correct Factor", description: "Model or Correction - Sightability Correct Factor"},
          {name: "Model or Correction - Joint Hypergeometric Estimator", description: "Model or Correction - Joint Hypergeometric Estimator"},
          {name: "Model or Correction - Lincoln-Peterson", description: "Model or Correction - Lincoln-Peterson"},
          {name: "Model or Correction - MoosePop - Kamloops", description: "Model or Correction - MoosePop - Kamloops"},
          {name: "Model or Correction - MoosePop - Prince George", description: "Model or Correction - MoosePop - Prince George"},
          {name: "Model or Correction - AERIAL SURVEY", description: "Model or Correction - AERIAL SURVEY"},
          {name: "Model or Correction - Recruitment-Mortality", description: "Model or Correction - Recruitment-Mortality"},
          {name: "Model or Correction & Expert Knowledge", description: "Model or Correction & Expert Knowledge"},
          {name: "Minimum Number Known Alive", description: "Minimum Number Known Alive"},
          {name: "Peak Count", description: "Peak Count"},
          {name: "None", description: "None"},
          {name: "Describe in Comments", description: "Describe in Comments"}
        ]
      }
    }
  ]
}

export const totalSurveyUnitCodes = () => {
  return [
    {
      column_code_validator: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        allowed_code_values: [
          {name: "Minutes", description: "Minutes"},
          {name: "Hours", description: "Hours"},
          {name: "Days", description: "Days"},
          {name: "Population", description: "Population"},
        ]
      }
    }
  ]
}

export const mooseParameterPickList = () => {
  return [
    {
      column_code_validator: {
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        allowed_code_values: [
          {name: "Population", description: "Population"},
          {name: "Individuals", description: "Individuals"},
          {name: "Adults", description: "Adults"},
          {name: "Calves", description: "Calves"},
          {name: "Bulls", description: "Bulls"},
          {name: "Sub-Prime Bulls", description: "Sub-Prime Bulls"},
          {name: "Prime Bulls", description: "Prime Bulls"},
          {name: "Senior Bulls", description: "Senior Bulls"},
          {name: "Adult Bulls", description: "Adult Bulls"},
          {name: "Yearlings Bulls", description: "Yearlings Bulls"},
          {name: "Cows", description: "Cows"},
          {name: "Unclassified Age and Sex", description: "Unclassified Age and Sex"},
          {name: "Calf:100 Adult Ratio", description: "Calf:100 Adult Ratio"},
          {name: "Cow:100 Bull Ratio", description: "Cow:100 Bull Ratio"},
          {name: "Calf:100 Cow Ratio", description: "Calf:100 Cow Ratio"},
          {name: "Percent Calves", description: "Percent Calves"},
          {name: "Survival Adult", description: "Survival Adult"},
          {name: "Survival Cows", description: "Survival Cows"},
          {name: "Survival Bulls", description: "Survival Bulls"},
          {name: "Survival Calves", description: "Survival Calves"},
          {name: "Survival Yearling", description: "Survival Yearling"},
          {name: "Mortality Adults", description: "Mortality Adults"},
          {name: "Mortality Bulls", description: "Mortality Bulls"},
          {name: "Mortality Cows", description: "Mortality Cows"},
          {name: "Mortality Calves", description: "Mortality Calves"},
          {name: "Mortality Yearlings", description: "Mortality Yearlings"},
          {name: "Individuals/km2", description: "Individuals/km2"},
          {name: "Individuals/m2", description: "Individuals/m2"},
          {name: "Detections", description: "Detections"},
          {name: "Detections/km", description: "Detections/km"},
          {name: "Detections/100 m", description: "Detections/100 m"},
          {name: "Detections/hour", description: "Detections/hour"},
          {name: "Detections/day", description: "Detections/day"},
          {name: "Detections/100 days", description: "Detections/100 days"}
        ]
      }
    }
  ]
}

const mooseSummarySchema = {
  name: '',
  description: '',
  files: [
    {
      name: "Moose_RESULTS",
      description: "",
      validations: [
        {
          file_duplicate_columns_validator: {}
        },
        {
          file_required_columns_validator: {
            required_columns: [
              "Study Area",  
              "Population Unit",  
              "Block ID/SU ID",
              "Survey Start Date",
              "Survey End Date",
              "Survey Year",  
              "Survey Month",  
              "Survey Day",
              "Total Survey Time",
              "Total Survey Time Unit Code",
              "Total Area Surveyed (km2)",
              "Total Kilometers Surveyed (km)",
              "Species Code",  
              "Parameter", 
              "Stratum", 
              "Observed", 
              "Estimated", 
              "Sightability Model",  
              "Sightability Correction Factor",
              "SE", 
              "Coefficient of Variation (%)",
              "Confidence Level (%)",  
              "Lower CL",  
              "Upper CL",  
              "Best Parameter Value Flag",
              "Outlier SRB Blocks Removed",
              "Marked Animals Observed",
              "Total Marked Animals Available",
              "Comments"
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
        reg_exps: [
          "text/csv",
          "application/vnd.*"
        ]
      }
    }
  ]
}

fs.writeFile('./summary/schema/moose_summary_results.json', JSON.stringify(mooseSummarySchema), (err) => {
  // file written successfully
  if (err) {
    console.log('Oops');
    console.log(err)
  } else {
    console.log('All Done!');
  }
});
