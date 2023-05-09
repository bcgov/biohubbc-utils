import * as fs from 'fs';
import path from 'path';
import { transformationSchemaBuilder } from './transform/builder_schema';
import { validationSchemaBuilder } from './validate/builder_schema';

/**
 * Builds the validation and transformation configs, and writes the upsert SQL.
 *
 * @export
 * @return {*}  {Promise<void>}
 */
export async function build(): Promise<void> {
  const validateConfig = await build_validation_config();
  const transformConfig = await build_transformation_config();

  await updateSQL([
    { replaceValue: validateConfig, replaceToken: '___VALIDATION_CONFIG___' },
    { replaceValue: transformConfig, replaceToken: '___TRANSFORMATION_CONFIG___' }
  ]);
}

/**
 * Build transformation config.
 *
 * @return {*}  {Promise<string>}
 */
async function build_transformation_config(): Promise<string> {
  const inputString = JSON.stringify(transformationSchemaBuilder);
  const outputPath = path.resolve(__dirname, './transform/config.json');

  await fs.writeFile(outputPath, inputString, { flag: 'w' }, function (error) {
    if (error) {
      console.log(`${path.basename(__dirname)} - write transformation config - error.`, error);
    } else {
      console.log(`${path.basename(__dirname)} - write transformation config - done.`);
    }
  });

  return inputString;
}

/**
 * Build validation config.
 *
 * @return {*}  {Promise<string>}
 */
async function build_validation_config(): Promise<string> {
  const inputString = JSON.stringify(validationSchemaBuilder);
  const outputPath = path.resolve(__dirname, './validate/config.json');

  await fs.writeFile(outputPath, inputString, { flag: 'w' }, function (error) {
    if (error) {
      console.log(`${path.basename(__dirname)} - write validation config - error.`, error);
    } else {
      console.log(`${path.basename(__dirname)} - write validation config - done.`);
    }
  });

  return inputString;
}

/**
 * Update the builder SQL to produce the final working upsert SQL.
 *
 * @param {{ replaceValue: string; replaceToken: string }[]} operations
 * @return {*}  {Promise<void>}
 */
async function updateSQL(operations: { replaceValue: string; replaceToken: string }[]): Promise<void> {
  const inputPath = path.resolve(__dirname, './sql/upsert_builder.sql');
  const outputPath = path.resolve(__dirname, './sql/upsert.sql');

  await fs.readFile(inputPath, function (error, data) {
    if (error) {
      console.log(`${path.basename(__dirname)} - read sql - error.`, error);
    } else {
      let newData = data.toString();

      for (const operation of operations) {
        // Iterate over operations array applying all string replacements one on top of the other
        newData = newData.toString().replace(operation.replaceToken, operation.replaceValue);
      }

      fs.writeFile(outputPath, newData, { flag: 'w' }, function (error) {
        if (error) {
          console.log(`${path.basename(__dirname)} - write sql - error.`, error);
        } else {
          console.log(`${path.basename(__dirname)} - write sql - done.`);
        }
      });
    }
  });
}

export default build;
