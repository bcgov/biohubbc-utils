import fs from 'fs';
import path from 'path';
import { TemplateBuilder, TemplateBuilderConfig } from '../../helpers/template-builder';
import { validationConfigBuilder } from './validate/validation-config-builder';

const build = async () => {
  const sqlBuilderString = await fs.promises.readFile(
    path.resolve(__dirname, '../../helpers', 'sql_upsert_template.sql')
  );

  const config: TemplateBuilderConfig = {
    output: {
      label: 'sheep_summary-results',
      version: '2.1',
      outputFolderPath: __dirname
    },
    validate: {
      inputBuilderObject: validationConfigBuilder
    },
    sql: {
      inputBuilderString: sqlBuilderString.toString(),
      name: 'Sheep Summary Results',
      version: '2.0',
      description: 'Sheep Summary Results',
      taxonIDs: ['23919', '23921', '23922', '25929', '23920']
    }
  };

  new TemplateBuilder(config).build();
};

export default build;
