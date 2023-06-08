import fs from 'fs';
import path from 'path';
import { ValidationTester } from '../../../helpers/validation/validation-tester';
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
      label: 'moose_summary-results',
      version: '1.0',
      outputFolderPath: __dirname
    },
    validate: {
      inputBuilderObject: validationConfigBuilder
    },
    sql: {
      inputBuilderString: sqlBuilderString.toString(),
      name: 'Moose Summary Results Template',
      version: '1.0',
      description: 'Moose Summary Results Template',
      taxonIDs: ['2065']
    }
  };

  await new TemplateBuilder(config).build();
};

/**
 * Runs the validation config against the specified test file. The output of the test run is written to the `test-run`
 * folder.
 *
 * @param {string} testFileName the name of the test file to validate. Must be included in the `test-data` folder.
 */
export const testValidate = async (testFileName: string) => {
  const validateTester = new ValidationTester();

  await validateTester.testValidate({
    validateConfig: validationConfigBuilder,
    inputFilePath: path.resolve(__dirname, 'test-data', testFileName),
    outputFolderPath: path.resolve(__dirname, 'test-run')
  });
};