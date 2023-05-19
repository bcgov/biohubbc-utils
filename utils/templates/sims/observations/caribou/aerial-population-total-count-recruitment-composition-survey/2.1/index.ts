import fs from 'fs';
import path from 'path';
import { TemplateBuilder, TemplateBuilderConfig } from '../../../helpers/template-builder';
import { transformationConfigBuilder } from './transform/transformation-config-builder';
import { validationConfigBuilder } from './validate/validation-config-builder';

const build = async () => {
  const sqlBuilderString = await fs.promises.readFile(
    path.resolve(__dirname, '../../../helpers', 'sql_upsert_template.sql')
  );

  const config: TemplateBuilderConfig = {
    output: {
      label: 'moose_aerial-transect-distance-sampling-survey',
      version: '1.1',
      outputFolderPath: __dirname
    },
    validate: {
      inputBuilderObject: validationConfigBuilder
    },
    transform: {
      inputBuilderObject: transformationConfigBuilder
    },
    sql: {
      inputBuilderString: sqlBuilderString.toString(),
      name: 'Caribou Aerial Population Total Count Recruitment Composition Survey',
      version: '1.0',
      description: 'Caribou Aerial Population Total Count Recruitment Composition Survey',
      taxonIDs: ['2070']
    }
  };

  new TemplateBuilder(config).build();
};

export default build;