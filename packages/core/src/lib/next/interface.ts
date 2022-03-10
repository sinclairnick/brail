export interface IConfig {
  /** Extension to use for templates  */
  templateExtensions?: string;

  /**
   * next.js build directory.
   * @default .next
   */
  sourceDir?: string;
}

export interface IBuildManifest {
  pages: {
    [key: string]: string[];
  };
  ampFirstPages?: string[];
}

export interface IPreRenderManifest {
  routes: {
    [key: string]: any;
  };
}

export interface IRoutesManifest {
  i18n?: {
    locales: string[];
    defaultLocale: string;
  };
}

export interface IExportMarker {
  exportTrailingSlash: boolean;
}

export interface INextManifest {
  build: IBuildManifest;
  preRender?: IPreRenderManifest;
  routes?: IRoutesManifest;
}

export interface IRuntimePaths {
  BUILD_MANIFEST: string;
  PRERENDER_MANIFEST: string;
  ROUTES_MANIFEST: string;
  EXPORT_MARKER: string;
}
