import map from 'lodash/map';
import omit from 'lodash/omit';
import isObject from 'lodash/isObject';
import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import identity from 'lodash/identity';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import filter from 'lodash/filter';
import juice from 'juice';

import { html as htmlBeautify } from 'js-beautify';
import cheerio from 'cheerio';

import MJMLParser from '../mjml-parser-xml';
import MJMLValidator, {
  dependencies as globalDependencies,
  assignDependencies,
} from '../mjml-validator';

import { handleMjml3 } from '../mjml-migrate';

import { initComponent } from './createComponent';
import globalComponents, {
  registerComponent,
  assignComponents,
} from './components';

import suffixCssClasses from './helpers/suffixCssClasses';
import mergeOutlookConditionnals from './helpers/mergeOutlookConditionnals';
import minifyOutlookConditionnals from './helpers/minifyOutlookConditionnals';
import defaultSkeleton from './helpers/skeleton';
import { initializeType } from './types/type';

class ValidationError extends Error {
  errors: any;

  constructor(message: any, errors: any) {
    super(message);

    this.errors = errors;
  }
}

export default function mjml2html(mjml: any, options = {}) {
  let content: string = '';
  let errors = [];

  let packages = {};
  let confOptions = {};
  let mjmlConfigOptions = {};
  let confPreprocessors: any[] = [];
  let error = null;
  let componentRootPath = null;

  // if mjmlConfigPath is specified then we need to register components it on each call

  const {
    beautify = false,

    fonts = {
      'Open Sans':
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
      'Droid Sans':
        'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
      Lato: 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
      Roboto: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
      Ubuntu: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700',
    },

    keepComments,
    minify = false,
    minifyOptions = {},
    ignoreIncludes = false,
    juiceOptions = {},
    juicePreserveTags = null,
    skeleton = defaultSkeleton,
    validationLevel = 'soft',
    filePath = '.',
    actualPath = '.',
    noMigrateWarn = false,
    preprocessors,
    presets = [],
  }: any = {
    ...mjmlConfigOptions,
    ...options,

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'preprocessors' does not exist on type '{... Remove this comment to see the full error message
    preprocessors: options.preprocessors
      ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'preprocessors' does not exist on type '{... Remove this comment to see the full error message
        [...confPreprocessors, ...options.preprocessors]
      : confPreprocessors,
  };

  const components = { ...globalComponents };
  const dependencies = assignDependencies({}, globalDependencies);
  for (const preset of presets) {
    assignComponents(components, preset.components);
    assignDependencies(dependencies, preset.dependencies);
  }

  if (typeof mjml === 'string') {
    mjml = MJMLParser(mjml, {
      keepComments,
      components,
      filePath,
      actualPath,
      preprocessors,
      ignoreIncludes,
    });
  }

  mjml = handleMjml3(mjml, { noMigrateWarn });

  const globalDatas = {
    backgroundColor: '',
    beforeDoctype: '',
    breakpoint: '480px',
    classes: {},
    classesDefault: {},
    defaultAttributes: {},
    htmlAttributes: {},
    fonts,
    inlineStyle: [],
    headStyle: {},
    componentsHeadStyle: [],
    headRaw: [],
    mediaQueries: {},
    preview: '',
    style: [],
    title: '',
    forceOWADesktop: get(mjml, 'attributes.owa', 'mobile') === 'desktop',
    lang: get(mjml, 'attributes.lang'),
  };

  const validatorOptions = {
    components,
    dependencies,
    initializeType,
  };

  switch (validationLevel) {
    case 'skip':
      break;

    case 'strict':
      errors = MJMLValidator(mjml, validatorOptions);

      if (errors.length > 0) {
        throw new ValidationError(
          `ValidationError: \n ${errors
            .map((e: any) => e.formattedMessage)
            .join('\n')}`,
          errors
        );
      }
      break;

    case 'soft':
    default:
      errors = MJMLValidator(mjml, validatorOptions);
      break;
  }

  const mjBody = find(mjml.children, { tagName: 'mj-body' });
  const mjHead = find(mjml.children, { tagName: 'mj-head' });
  const mjOutsideRaws = filter(mjml.children, { tagName: 'mj-raw' });

  const processing = (node: any, context: any, parseMJML = identity) => {
    if (!node) {
      return;
    }

    const component = initComponent({
      name: node.tagName,
      initialDatas: {
        ...parseMJML(node),
        context,
      },
    });

    return component.render?.() ?? component.handler?.();
  };

  const applyAttributes = (mjml: any) => {
    // @ts-expect-error ts-migrate(7024) FIXME: Function implicitly has return type 'any' because ... Remove this comment to see the full error message
    const parse = (mjml: any, parentMjClass = '') => {
      const { attributes, tagName, children } = mjml;
      const classes = get(mjml.attributes, 'mj-class', '').split(' ');
      const attributesClasses = reduce(
        classes,
        (acc: any, value: any) => {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const mjClassValues = globalDatas.classes[value];
          let multipleClasses = {};
          if (acc['css-class'] && get(mjClassValues, 'css-class')) {
            multipleClasses = {
              'css-class': `${acc['css-class']} ${mjClassValues['css-class']}`,
            };
          }

          return {
            ...acc,
            ...mjClassValues,
            ...multipleClasses,
          };
        },
        {}
      );

      const defaultAttributesForClasses = reduce(
        parentMjClass.split(' '),

        (acc, value) => ({
          ...acc,
          ...(get(globalDatas.classesDefault, `${value}.${tagName}`) ?? {}),
        }),
        {}
      );
      const nextParentMjClass = get(attributes, 'mj-class', parentMjClass);

      return {
        ...mjml,
        attributes: {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          ...globalDatas.defaultAttributes[tagName],
          ...attributesClasses,
          ...defaultAttributesForClasses,
          ...omit(attributes, ['mj-class']),
        },
        globalAttributes: {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          ...globalDatas.defaultAttributes['mj-all'],
        },
        children: map(children, (mjml: any) => parse(mjml, nextParentMjClass)),
      };
    };

    return parse(mjml);
  };

  const bodyHelpers = {
    components,
    addMediaQuery(className: any, { parsedWidth, unit }: any) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      globalDatas.mediaQueries[
        className
      ] = `{ width:${parsedWidth}${unit} !important; max-width: ${parsedWidth}${unit}; }`;
    },
    addHeadStyle(identifier: any, headStyle: any) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      globalDatas.headStyle[identifier] = headStyle;
    },
    addComponentHeadSyle(headStyle: any) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      globalDatas.componentsHeadStyle.push(headStyle);
    },
    setBackgroundColor: (color: any) => {
      globalDatas.backgroundColor = color;
    },
    processing: (node: any, context: any) =>
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(mjml: any) => any' is not assig... Remove this comment to see the full error message
      processing(node, context, applyAttributes),
  };

  const headHelpers = {
    components,
    add(attr: any, ...params: any[]) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Array.isArray(globalDatas[attr])) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        globalDatas[attr].push(...params);
      } else if (Object.prototype.hasOwnProperty.call(globalDatas, attr)) {
        if (params.length > 1) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (isObject(globalDatas[attr][params[0]])) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            globalDatas[attr][params[0]] = {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              ...globalDatas[attr][params[0]],
              ...params[1],
            };
          } else {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // eslint-disable-next-line prefer-destructuring
            globalDatas[attr][params[0]] = params[1];
          }
        } else {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          // eslint-disable-next-line prefer-destructuring
          globalDatas[attr] = params[0];
        }
      } else {
        throw Error(
          `An mj-head element add an unkown head attribute : ${attr} with params ${
            Array.isArray(params) ? params.join('') : params
          }`
        );
      }
    },
  };

  globalDatas.headRaw = processing(mjHead, headHelpers);

  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(mjml: any) => any' is not assig... Remove this comment to see the full error message
  content = processing(mjBody, bodyHelpers, applyAttributes);
  if (!content) {
    throw new Error(
      'Malformed MJML. Check that your structure is correct and enclosed in <mjml> tags.'
    );
  }

  content = minifyOutlookConditionnals(content);

  if (mjOutsideRaws.length) {
    const toAddBeforeDoctype = mjOutsideRaws.filter(
      (elt: any) =>
        elt.attributes.position && elt.attributes.position === 'file-start'
    );
    if (toAddBeforeDoctype.length) {
      globalDatas.beforeDoctype = toAddBeforeDoctype
        .map((elt: any) => elt.content)
        .join('\n');
    }
  }

  if (!isEmpty(globalDatas.htmlAttributes)) {
    const $ = cheerio.load(content, {
      xmlMode: true, // otherwise it may move contents that aren't in any tag
      decodeEntities: false, // won't escape special characters
    });

    each(globalDatas.htmlAttributes, (data: any, selector: any) => {
      each(data, (value: any, attrName: any) => {
        $(selector).each(function getAttr() {
          $(this).attr(attrName, value || '');
        });
      });
    });

    content = $.root().html() ?? '';
  }

  content = skeleton({
    content,
    ...globalDatas,
  });

  if (globalDatas.inlineStyle.length > 0) {
    if (juicePreserveTags) {
      each(juicePreserveTags, (val: any, key: any) => {
        juice.codeBlocks[key] = val;
      });
    }

    content = juice(content ?? '', {
      applyStyleTags: false,
      extraCss: globalDatas.inlineStyle.join(''),
      insertPreservedExtraCss: false,
      removeStyleTags: false,
      ...juiceOptions,
    });
  }

  content = mergeOutlookConditionnals(content);

  if (beautify) {
    content = htmlBeautify(content ?? '', {
      indent_size: 2,
      wrap_attributes_indent_size: 2,
      max_preserve_newlines: 0,
      preserve_newlines: false,
    });
  }

  return {
    html: content,
    json: mjml,
    errors,
  };
}

export {
  globalComponents as components,
  initComponent,
  registerComponent,
  assignComponents,
  suffixCssClasses,
  initializeType,
};

export { BodyComponent, HeadComponent } from './createComponent';
