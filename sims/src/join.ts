import fs from 'fs';
import { join } from 'node:path';
import path from 'path';

const UpsertSQLFilePathRegex = /.*(?:\\|\/)output(?:\\|\/).*\.sql/;

/**
 * Walks the folder structure of the specified rootDirectory, returning a flattened array of all file paths.
 *
 * @param {string} rootDirectory
 * @return {*}  {Promise<string[]>}
 */
const getAllFilesUnderDirectory = async (rootDirectory: string): Promise<string[]> =>
  Promise.all(
    await fs.promises.readdir(rootDirectory, { withFileTypes: true }).then((entries: any) =>
      entries.map((entry: any) => {
        const childPath = join(rootDirectory, entry.name);
        return entry.isDirectory() ? getAllFilesUnderDirectory(childPath) : childPath;
      })
    )
  ).then((hierarchicalFiles: any[]) => hierarchicalFiles.flat(Number.POSITIVE_INFINITY));

/**
 * Concatenates all upsert sql files in all `output` folders under `src/observations` and writes the resulting data to
 * a single file under `./output`
 */
const joinAllObservationSQLUpsertOutputFIles = async () => {
  const filePaths = await getAllFilesUnderDirectory('src/observations');

  const upsertSQLPaths = filePaths.filter((path) => path.match(UpsertSQLFilePathRegex));

  const upsertSQLData = await Promise.all(
    upsertSQLPaths.map((path) => fs.promises.readFile(path).then((data) => data.toString()))
  );

  const concatenatedSQLData = upsertSQLData.join('\n\n');

  await fs.promises.writeFile(path.join(__dirname, 'output', 'o_sql_upsert_all.sql'), concatenatedSQLData, {
    flag: 'w'
  });
};

/**
 * Concatenates all upsert sql files in all `output` folders under `src/summary` and writes the resulting data to
 * a single file under `./output`
 */
const joinAllSummarySQLUpsertOutputFIles = async () => {
  const filePaths = await getAllFilesUnderDirectory('src/summary');

  const upsertSQLPaths = filePaths.filter((path) => path.match(UpsertSQLFilePathRegex));

  const upsertSQLData = await Promise.all(
    upsertSQLPaths.map((path) => fs.promises.readFile(path).then((data) => data.toString()))
  );

  const concatenatedSQLData = upsertSQLData.join('\n\n');

  await fs.promises.writeFile(path.join(__dirname, 'output', 's_sql_upsert_all.sql'), concatenatedSQLData, {
    flag: 'w'
  });
};

joinAllObservationSQLUpsertOutputFIles();
joinAllSummarySQLUpsertOutputFIles();
