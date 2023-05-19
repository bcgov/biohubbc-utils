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
      label: 'sheep_aerial-population-total-count-recruitment-composition',
      version: '2.1',
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
      name: 'Goat Aerial Population Total Count Recruitment Composition Survey',
      version: '2.0',
      description: 'Goat Aerial Population Total Count Recruitment Composition Survey',
      taxonIDs: ['23919', '23921', '23922', '25929', '23920']
    }
  };

  new TemplateBuilder(config).build();
};

export default build;
