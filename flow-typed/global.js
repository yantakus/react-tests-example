// @flow

// For importing css files
declare module CSSModule {
  declare var exports: { [key: string]: string }
}

// For using System.import
declare var System: {
  import: (module: string) => Promise<Object>
}

// For using module.hot
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
}
