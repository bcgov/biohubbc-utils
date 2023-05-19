import fs from 'fs';
import path from 'path';

export interface TemplateBuilderConfig {
  /**
   * Details about the output files produced by the template builder.
   */
  output: {
    /**
     * A human readable label that will be used in the filenames of any produced files.
     *
     * @example
     * `moose_aerial-srb-recruitment-composition-survey`
     */
    label: string;
    /**
     * The human readable version of the template.
     *
     * Note: This version is only used in the filename, and is a separate value to the version used in the upsert sql.
     *
     * @example
     * `2.0`
     */
    version: string;
    /**
     * The absolute filepath to the folder where output files should be written.
     *
     * @example
     * `__dirname`
     */
    outputFolderPath: string;
  };
  /**
   * Details about the the validation config.
   */
  validate?: {
    /**
     * The validation builder object.
     */
    inputBuilderObject: Record<string, any>;
  };
  /**
   * Details about the the upsert sql.
   */
  sql?: {
    /**
     * The upsert sql template string.
     */
    inputBuilderString: string;
    /**
     * The template name.
     *
     * Note: This is used when identifying matching excel templates.
     */
    name: string;
    /**
     * The template version.
     *
     * * Note: This is used when identifying matching excel templates.
     */
    version: string;
    /**
     * The template description.
     */
    description: string;
    /**
     * An array of applicable taxon IDs.
     *
     * @type {string[]}
     */
    taxonIDs: string[];
  };
}

export class TemplateBuilder {
  config;

  validateString: string | undefined;

  constructor(config: TemplateBuilderConfig) {
    this.config = config;
  }

  /**
   * Builds the validation config, and writes the upsert SQL.
   *
   * @export
   * @return {*}  {Promise<void>}
   */
  async build(): Promise<void> {
    try {
      this.validateString = await this._buildValidationConfig();

      await this._buildSQLUpsert();

      console.debug(`[success] - build - ${this.config.output.label} - ${this.config.output.version}`);
    } catch (error) {
      console.error(`[error] - build - ${this.config.output.label} - ${this.config.output.version}`, error);
    }
  }

  /**
   * Build validation config.
   *
   * @return {*}  {Promise<string>}
   */
  async _buildValidationConfig(): Promise<string> {
    if (!this.config.validate) {
      return '';
    }

    const inputString = JSON.stringify(this.config.validate.inputBuilderObject);
    const outputPath = path.resolve(
      this.config.output.outputFolderPath,
      'output',
      `s_v_${this.config.output.label}_${this.config.output.version}.json`
    );

    await fs.promises.writeFile(outputPath, inputString, { flag: 'w' });

    console.debug(`write - ${outputPath}`);

    return inputString;
  }

  /**
   * Update the builder SQL to produce the final working upsert SQL.
   *
   * @return {*}  {Promise<void>}
   */
  async _buildSQLUpsert(): Promise<void> {
    if (!this.config.sql) {
      return;
    }

    // Build SQL upsert query file
    const operations = [
      {
        replaceValue: this.config.sql.name,
        replaceToken: '___TEMPLATE_NAME___'
      },
      {
        replaceValue: this.config.sql.version,
        replaceToken: '___TEMPLATE_VERSION___'
      },
      {
        replaceValue: this.config.sql.description,
        replaceToken: '___TEMPLATE_DESCRIPTION___'
      },
      {
        replaceValue: this.config.sql.taxonIDs.join(','),
        replaceToken: '___TAXON_IDS___'
      },
      {
        replaceValue: this.validateString || '',
        replaceToken: '___VALIDATION_CONFIG___'
      }
    ];

    const outputPath = path.resolve(
      this.config.output.outputFolderPath,
      'output',
      `s_upsert_sql_${this.config.output.label}_${this.config.output.version}.sql`
    );

    let sqlString = this.config.sql.inputBuilderString;

    for (const operation of operations) {
      // Iterate over operations array applying all string replacements one on top of the other
      sqlString = sqlString.toString().replace(operation.replaceToken, operation.replaceValue);
    }

    await fs.promises.writeFile(outputPath, sqlString, { flag: 'w' });

    console.debug(`write - ${outputPath}`);
  }
}
