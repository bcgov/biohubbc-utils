import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';
import xlsx from 'xlsx';
import { XLSXTransform } from '../media/xlsx/transformation/xlsx-transform';
import { transformationConfigJSONSchema } from '../media/xlsx/transformation/xlsx-transform-schema';
import { TransformSchema } from '../media/xlsx/transformation/xlsx-transform-schema-parser';

export class TransformTester {
  /**
   * Runs the provided input file against the provided transform config, and writes the results to a folder under the
   * specified output folder path.
   *
   * @param {{ transformConfig: TransformSchema; inputFilePath: string; outputFolderPath: string }} config
   * @memberof TransformTester
   */
  async testTransform(config: { transformConfig: TransformSchema; inputFilePath: string; outputFolderPath: string }) {
    this.isTransformConfigValid({ transformConfig: config.transformConfig });

    fs.mkdir(config.outputFolderPath, { recursive: true }, (error) => {
      if (error) {
        throw new Error(`Failed to create directory, path: ${config.outputFolderPath}`);
      }
    });

    // Emulate a media file received from an endpoint
    const templateBuffer = await fs.promises.readFile(config.inputFilePath);
    const mediaFile = {
      fileName: 'template.xlsx',
      mimeType: 'xlsx',
      buffer: templateBuffer
    };

    // Convert raw media file to xlsx workbook
    const workbook = xlsx.read(mediaFile.buffer, { cellFormula: false, cellHTML: false });

    // Run transformation engine
    const xlsxTransformDebug = new XLSXTransformDebug(workbook, config.transformConfig);
    const transformGenerator = xlsxTransformDebug.startDebug();

    let finalTransformResult: ReturnType<typeof xlsxTransformDebug.start>;
    for (let step = 1; true; step++) {
      const startTime = performance.now();
      const transformStep = transformGenerator.next();
      const endTime = performance.now();

      console.debug(`write - ${step}.json - ${this.getTimeDiff(startTime, endTime)} ms`);

      await fs.promises.writeFile(
        // Write transform output for each step in the transform process
        path.join(config.outputFolderPath, `${step}.json`),
        JSON.stringify(transformStep.value, null, 2),
        { flag: 'w' }
      );

      if (transformStep.done) {
        finalTransformResult = transformStep.value;
        break;
      }
    }

    // Process the result
    const dwcWorkbook = xlsx.utils.book_new();

    await Promise.all(
      Object.entries(finalTransformResult).map(async ([key, value]) => {
        const newWorkbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet(value);
        xlsx.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');
        xlsx.utils.book_append_sheet(dwcWorkbook, worksheet, key);

        const buffer = xlsx.write(newWorkbook, { type: 'buffer', bookType: 'csv' });
        await fs.promises.writeFile(path.join(config.outputFolderPath, `${key}.json`), buffer, { flag: 'w' });
      })
    );

    const buffer = xlsx.write(dwcWorkbook, { type: 'buffer', bookType: 'xlsx' });
    await fs.promises.writeFile(path.join(config.outputFolderPath, 'dwcWorkbook_fixed_with_mark_2.xlsx'), buffer, {
      flag: 'w'
    });
  }

  /**
   * Checks if the specified transform config is valid against the source json schema definition.
   *
   * Throws an error if it fails to validate.
   *
   * @param {{ transformConfig: TransformSchema }} config
   * @memberof TransformTester
   */
  isTransformConfigValid(config: { transformConfig: TransformSchema }) {
    const ajv = new Ajv();
    ajv.validate(transformationConfigJSONSchema, config.transformConfig);
    if (ajv.errors) {
      throw new Error(JSON.stringify(ajv.errors));
    }
  }

  getTimeDiff(startTime: number, endTime: number) {
    const timeDiff = endTime - startTime;
    return Math.round(timeDiff);
  }
}

export class XLSXTransformDebug extends XLSXTransform {
  /**
   * A modified version of the original `start` function from `XLSXTransform` that yields each stage of the transform,
   * for debug purposes.
   *
   * @return {*}
   * @memberof XLSXTransformDebug
   */
  *startDebug() {
    // Prepare the raw data, by adding keys and other dwcMeta to the raw row objects
    const preparedRowObjects = this.prepareRowObjects();
    yield preparedRowObjects;

    // Recurse through the data, and create a hierarchical structure for each logical record
    const hierarchicalRowObjects = this.buildRowObjectsHierarchy(preparedRowObjects);
    yield hierarchicalRowObjects;

    // Iterate over the hierarchical row objects, mapping original values to their DWC equivalents
    const processedHierarchicalRowObjects = this.processHierarchicalRowObjects(hierarchicalRowObjects);
    yield processedHierarchicalRowObjects;

    // Iterate over the Darwin Core records, group them by DWC sheet name, and remove duplicate records in each sheet
    return this.prepareRowObjectsForJSONToSheet(processedHierarchicalRowObjects);
  }
}
