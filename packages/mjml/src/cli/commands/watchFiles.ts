import chokidar from 'chokidar';
import glob from 'glob';
import path from 'path';
import mjml2html from '../../core/mjml-core';
import { flow, pickBy, flatMap, uniq, difference, remove } from 'lodash/fp';
import { omit } from 'lodash';
import { html as htmlBeautify } from 'js-beautify';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'html-minifier' or its correspo... Remove this comment to see the full error message
import { minify as htmlMinify } from 'html-minifier';

import readFile from './readFile';
import makeOutputToFile from './outputToFile';
import fileContext from '../helpers/fileContext';

let dirty: any = [];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'convert' does not exist on type 'LodashF... Remove this comment to see the full error message
const _flatMap = flatMap.convert({ cap: false }); // eslint-disable-line no-underscore-dangle
const flatMapAndJoin = _flatMap((v: any, k: any) =>
  v.map((p: any) => path.join(k, p))
);
const flatMapKeyAndValues = flow(
  _flatMap((v: any, k: any) => [k, ...v]),
  uniq
);

export default (input: any, options: any) => {
  const dependencies = {};
  const outputToFile = makeOutputToFile(options.o);
  const getRelatedFiles = (file: any) =>
    flow(
      pickBy((v: any, k: any) => k === file || v.indexOf(file) !== -1),
      Object.keys
    )(dependencies);
  const synchronyzeWatcher = (filePath: any) => {
    getRelatedFiles(filePath).forEach((f: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      dependencies[f] = fileContext(f, options.config.filePath);

      if (dirty.indexOf(f) === -1) {
        dirty.push(f);
      }
    });

    /* eslint-disable no-use-before-define */
    const files = {
      toWatch: flatMapKeyAndValues(dependencies),
      watched: flatMapAndJoin(watcher.getWatched()),
    };

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
    watcher.add(difference(files.toWatch, files.watched));
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'LodashDifference1x2<unknown>' is... Remove this comment to see the full error message
    watcher.unwatch(difference(files.watched, files.toWatch));
    /* eslint-enable no-use-before-define */
  };
  const readAndCompile = flow(
    (file: any) => ({
      file,
      content: readFile(file).mjml,
    }),
    (args: any) => {
      const { config, beautifyConfig, minifyConfig } = options;
      const beautify = config.beautify && config.beautify !== 'false';
      const minify = config.minify && config.minify !== 'false';

      const compiled = mjml2html(args.content, {
        filePath: args.file,
        actualPath: args.file,
        ...omit(config, ['minify', 'beautify']),
      });
      if (beautify) {
        compiled.html = htmlBeautify(compiled.html, beautifyConfig);
      }
      if (minify) {
        compiled.html = htmlMinify(compiled.html, {
          ...minifyConfig,
          ...config.minifyOptions,
        });
      }

      return {
        ...args,
        compiled,
      };
    },
    (args: any) => {
      const {
        compiled: { errors },
      } = args;

      errors.forEach((e: any) => console.warn(e.formattedMessage));

      return args;
    },
    (args: any) =>
      outputToFile(args)
        .then(() => console.log(`${args.file} - Successfully compiled`))
        .catch(() => console.log(`${args.file} - Error while compiling file`))
  );

  const watcher = chokidar
    .watch(input.map((i: any) => i.replace(/\\/g, '/')))
    .on('change', (file) => synchronyzeWatcher(path.resolve(file)))
    .on('add', (file) => {
      const filePath = path.resolve(file);
      console.log(`Now watching file: ${filePath}`);

      const matchInputOption = input.reduce(
        (found: any, file: any) =>
          // @ts-expect-error
          found || glob(path.resolve(file)).minimatch.match(filePath),
        false
      );

      if (matchInputOption) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        dependencies[filePath] = getRelatedFiles(filePath);
      }

      synchronyzeWatcher(filePath);
    })
    .on('unlink', (file) => {
      const filePath = path.resolve(file);

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      delete dependencies[path.resolve(filePath)];

      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      remove(dirty, (f: any) => f === filePath);

      synchronyzeWatcher(filePath);
    });

  setInterval(() => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'f' implicitly has an 'any' type.
    dirty.forEach((f) => {
      console.log(`${f} - Change detected`);
      try {
        readAndCompile(f);
      } catch (e) {
        console.log(`${f} - Error while rendering the file : `, e);
      }
    });
    dirty = [];
  }, 500);

  return [];
};
/* eslint-enable no-console */
