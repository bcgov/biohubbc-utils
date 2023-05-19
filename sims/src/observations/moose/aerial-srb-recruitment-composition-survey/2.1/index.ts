import fs from 'fs';
import path from 'path';
import { TransformTester } from '../../../../helpers/transformation/transform';
import { TemplateBuilder, TemplateBuilderConfig } from '../../../helpers/template-builder';
import { transformationConfigBuilder } from './transform/transformation-config-builder';
import { validationConfigBuilder } from './validate/validation-config-builder';

export const build = async () => {
  const sqlBuilderString = await fs.promises.readFile(
    path.resolve(__dirname, '../../../helpers', 'sql_upsert_template.sql')
  );

  const config: TemplateBuilderConfig = {
    output: {
      label: 'moose_aerial-srb-recruitment-composition-survey',
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
      name: 'Moose Aerial SRB Recruitment Composition Survey',
      version: '2.0',
      description: 'Moose Aerial SRB Recruitment Composition Survey',
      taxonIDs: ['2065']
    }
  };

  new TemplateBuilder(config).build();
};

export const testTransform = (testFileName: string) => {
  const transformTester = new TransformTester();

  transformTester.testTransform({
    transformConfig: transformationConfigBuilder,
    inputFilePath: path.resolve(__dirname, 'test-data', testFileName),
    outputFolderPath: path.resolve(__dirname, 'test-run')
  });
};
