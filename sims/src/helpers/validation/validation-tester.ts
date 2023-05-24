import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import { MediaFile } from '../media/media-file';
import { validationConfigJSONSchema } from '../media/validation/validation-schema';
import { ValidationSchemaParser } from '../media/validation/validation-schema-parser';
import { XLSXCSV } from '../media/xlsx/xlsx-file';

export class ValidationTester {
  async testValidate(config: { validateConfig: any; inputFilePath: string; outputFolderPath: string }) {
    this._isValidateConfigValid({ validateConfig: config.validateConfig });

    fs.mkdir(config.outputFolderPath, { recursive: true }, (error) => {
      if (error) {
        throw new Error(`Failed to create directory, path: ${config.outputFolderPath}`);
      }
    });

    const templateBuffer = await fs.promises.readFile(config.inputFilePath);
    const mediaFile = new MediaFile('template.xlsx', 'xlsx', templateBuffer);

    const xlsxCSV = new XLSXCSV(mediaFile);

    const validationSchemaParser = new ValidationSchemaParser(config.validateConfig);

    xlsxCSV.validateMedia(validationSchemaParser);

    const mediaState = xlsxCSV.getMediaState();
    if (!mediaState.isValid) {
      await fs.promises.writeFile(
        path.join(config.outputFolderPath, 'validationResults.json'),
        JSON.stringify([mediaState], null, 2),
        { flag: 'w' }
      );

      return;
    }

    xlsxCSV.validateContent(validationSchemaParser);

    const csvState = xlsxCSV.getContentState();
    await fs.promises.writeFile(
      path.join(config.outputFolderPath, 'validationResults.json'),
      JSON.stringify([mediaState, csvState], null, 2),
      { flag: 'w' }
    );

    return;
  }

  _isValidateConfigValid(config: { validateConfig: any }) {
    const ajv = new Ajv({ allowUnionTypes: true });
    ajv.validate(validationConfigJSONSchema, config.validateConfig);
    if (ajv.errors) {
      throw new Error(JSON.stringify(ajv.errors, null, 2));
    }
  }

  _getTimeDiff(startTime: number, endTime: number) {
    const timeDiff = endTime - startTime;
    return Math.round(timeDiff);
  }
}
