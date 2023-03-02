export type BrailConfig = {
  templateExtensions: string[];
  paths: {
    brailDir: string;
    templatesFile: string;
    rootDir: string
  };
  lang: "ts" | "js";
	emitTemplates: boolean;
};
