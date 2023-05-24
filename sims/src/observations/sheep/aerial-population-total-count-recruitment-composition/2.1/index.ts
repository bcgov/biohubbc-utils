import fs from 'fs';
import path from 'path';
import { TransformationTester } from '../../../../helpers/transformation/transformation-tester';
import { ValidationTester } from '../../../../helpers/validation/validation-tester';
import { TemplateBuilder, TemplateBuilderConfig } from '../../../helpers/template-builder';
import { transformationConfigBuilder } from './transform/transformation-config-builder';
import { validationConfigBuilder } from './validate/validation-config-builder';

/**
 * Builds the validation, transformation, and SQL files.
 */
export const build = async () => {
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

/**
 * Runs the transform engine using this transform config against the specified test file. The output of the test run
 * is written to the `test-run` folder.
 *
 * @param {string} testFileName the name of the test file to transform. Must be included in the `test-data` folder.
 */
export const testTransform = (testFileName: string) => {
  const transformTester = new TransformationTester();

  transformTester.testTransform({
    transformConfig: transformationConfigBuilder,
    inputFilePath: path.resolve(__dirname, 'test-data', testFileName),
    outputFolderPath: path.resolve(__dirname, 'test-run')
  });
};

/**
 * Runs the validation config against the specified test file. The output of the test run is written to the `test-run`
 * folder.
 *
 * @param {string} testFileName the name of the test file to validate. Must be included in the `test-data` folder.
 */
export const testValidate = (testFileName: string) => {
  const validateTester = new ValidationTester();

  validateTester.testValidate({
    validateConfig: validationConfigBuilder,
    inputFilePath: path.resolve(__dirname, 'test-data', testFileName),
    outputFolderPath: path.resolve(__dirname, 'test-run')
  });
};
