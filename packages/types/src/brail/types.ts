export type BrailOptions = {
  /**
   * Brail will consider files with these extensions "templates",
   *  and ignore all others.
   *
   * @default
   */
  templateExtensions?: string[];

  /**
   * Optionally auto-emit templates to a file
   * If true, emits to default location `<rootdir>/.brail/templates.generated`
   * If string, emits to specified location
   */
  emitTemplates?: boolean | string;

  /**
   * Where any generated brail files will be stored
   *
   * @default <rootdir>/.brail
   */
  brailDir?: string;
};
