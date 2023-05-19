import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { XLSXTransform } from '../../sims/helpers/transormation/xlsx/xlsx-transform';
import { transformationConfigJSONSchema } from '../../sims/helpers/transormation/xlsx/xlsx-transform-schema';
import { TransformSchema } from '../../sims/helpers/transormation/xlsx/xlsx-transform-schema-parser';

export const transformSchema = (templateName: string, templateSchema: TransformSchema) => {
  fs.writeFileSync(path.join(__dirname, 'output', 'schema.json'), JSON.stringify(templateSchema, null, 2));

  // Validate transform template config against transform schema definition.
  const ajv = new Ajv();
  ajv.validate(transformationConfigJSONSchema, templateSchema);
  if (ajv.errors) {
    throw new Error(JSON.stringify(ajv.errors));
  }

  // Emulate a media file received from an endpoint
  const templateBuffer = fs.readFileSync(path.join(__dirname, 'input', templateName));
  const mediaFile = {
    fileName: 'template.xlsx',
    mimeType: 'xlsx',
    buffer: templateBuffer
  };

  // Convert raw media file to xlsx workbook
  const workbook = xlsx.read(mediaFile.buffer, { cellFormula: false, cellHTML: false });

  // Run transformation engine
  const xlsxTransform = new XLSXTransform(workbook, templateSchema);
  const preparedRowObjectsForJSONToSheet = xlsxTransform.start();

  // Process the result
  const dwcWorkbook = xlsx.utils.book_new();
  Object.entries(preparedRowObjectsForJSONToSheet).map(([key, value]) => {
    const worksheet = xlsx.utils.json_to_sheet(value);

    const newWorkbook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');
    xlsx.utils.book_append_sheet(dwcWorkbook, worksheet, key);

    const buffer = xlsx.write(newWorkbook, { type: 'buffer', bookType: 'csv' });

    fs.writeFileSync(path.join(__dirname, 'output', `${key}.json`), buffer);
  });

  const buffer = xlsx.write(dwcWorkbook, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(path.join(__dirname, 'output', 'dwcWorkbook_fixed_with_mark_2.xlsx'), buffer);

  console.log('All done!');
};
