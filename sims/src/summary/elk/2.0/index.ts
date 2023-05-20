import fs from 'fs';
import path from 'path';
import { TemplateBuilder, TemplateBuilderConfig } from '../../helpers/template-builder';
import { validationConfigBuilder } from './validate/validation-config-builder';

/**
 * Builds the validation and SQL files.
 */
export const build = async () => {
  const sqlBuilderString = await fs.promises.readFile(
    path.resolve(__dirname, '../../helpers', 'sql_upsert_template.sql')
  );

  const config: TemplateBuilderConfig = {
    output: {
      label: 'elk_summary-results',
      version: '2.1',
      outputFolderPath: __dirname
    },
    validate: {
      inputBuilderObject: validationConfigBuilder
    },
    sql: {
      inputBuilderString: sqlBuilderString.toString(),
      name: 'Elk Summary Results',
      version: '2.0',
      description: 'Elk Summary Results',
      taxonIDs: ['35370', '35371']
    }
  };

  new TemplateBuilder(config).build();
};
