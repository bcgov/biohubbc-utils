import Ajv from 'ajv';
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { XLSXTransform } from './xlsx/xlsx-transform';
import { transformationConfigJSONSchema } from './xlsx/xlsx-transform-schema';
import { TransformSchema } from './xlsx/xlsx-transform-schema-parser';

// const TEMPLATE_NAME = 'EastKootenay_Sheep_Aerial_Total_Count_2.0.xlsx';
// const TEMPLATE_SCHEMA = sheepTotalCountchema;

//const TEMPLATE_NAME = 'Monashee_Mt_Goat_Total_Count_Recuit_Comp_Survey_2.0.xlsx';
// const TEMPLATE_NAME = 'Goat_test.xlsx';
// const TEMPLATE_SCHEMA = goatTotalCountchema;

//const TEMPLATE_NAME = 'Central Selkirks Caribou_Aerial_Population_Total_Count_Recuit_Comp_Survey_1.0.xlsx';
// const TEMPLATE_NAME = 'cariboo_sample_test.xlsx';
// const TEMPLATE_SCHEMA = caribouTotalCountchema;

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
}