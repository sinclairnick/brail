import {
  find,
  filter,
  get,
  identity,
  map,
  omit,
  reduce,
  isObject,
  each,
  isEmpty,
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
} from 'lodash'
import path from 'path'
import juice from 'juice'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'js-b... Remove this comment to see the full error message
import { html as htmlBeautify } from 'js-beautify'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'html... Remove this comment to see the full error message
import { minify as htmlMinify } from 'html-minifier'
import cheerio from 'cheerio'

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-parser-xml' or its corres... Remove this comment to see the full error message
import MJMLParser from 'mjml-parser-xml'
import MJMLValidator, {
  dependencies as globalDependencies,
  assignDependencies,
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-validator' or its corresp... Remove this comment to see the full error message
} from 'mjml-validator'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'mjml-migrate' or its correspon... Remove this comment to see the full error message
import { handleMjml3 } from 'mjml-migrate'

import { initComponent } from './createComponent'
import globalComponents, {
  registerComponent,
  assignComponents,
} from './components'

import suffixCssClasses from './helpers/suffixCssClasses'
import mergeOutlookConditionnals from './helpers/mergeOutlookConditionnals'
import minifyOutlookConditionnals from './helpers/minifyOutlookConditionnals'
import defaultSkeleton from './helpers/skeleton'
import { initializeType } from './types/type'

import handleMjmlConfig, {
  readMjmlConfig,
  handleMjmlConfigComponents,
} from './helpers/mjmlconfig'

const isNode = require('detect-node')

class ValidationError extends Error {
  errors: any;

  constructor(message: any, errors: any) {
    super(message)

    this.errors = errors
  }
}

export default function mjml2html(mjml: any, options = {}) {
  let content = ''
  let errors = []

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'skeleton' does not exist on type '{}'.
  if (isNode && typeof options.skeleton === 'string') {
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'skeleton' does not exist on type '{}'.
    options.skeleton = require(options.skeleton.charAt(0) === '.'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'skeleton' does not exist on type '{}'.
      ? path.resolve(process.cwd(), options.skeleton)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'skeleton' does not exist on type '{}'.
      : options.skeleton)
    /* eslint-enable global-require */
    /* eslint-enable import/no-dynamic-require */
  }

  let packages = {}
  let confOptions = {}
  let mjmlConfigOptions = {}
  let confPreprocessors = []
  let error = null
  let componentRootPath = null

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'useMjmlConfigOptions' does not exist on ... Remove this comment to see the full error message
  if ((isNode && options.useMjmlConfigOptions) || options.mjmlConfigPath) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mjmlConfigPath' does not exist on type '... Remove this comment to see the full error message
    const mjmlConfigContent = readMjmlConfig(options.mjmlConfigPath)

    ;({
      mjmlConfig: { packages, options: confOptions, preprocessors: confPreprocessors },
      componentRootPath,
      error,
    } = mjmlConfigContent)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'useMjmlConfigOptions' does not exist on ... Remove this comment to see the full error message
    if (options.useMjmlConfigOptions) {
      mjmlConfigOptions = confOptions
    }
  }

  // if mjmlConfigPath is specified then we need to register components it on each call
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mjmlConfigPath' does not exist on type '... Remove this comment to see the full error message
  if (isNode && !error && options.mjmlConfigPath) {
    handleMjmlConfigComponents(packages, componentRootPath, registerComponent)
  }

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
    preprocessors: options.preprocessors ? [...confPreprocessors, ...options.preprocessors] : confPreprocessors,
  }

  const components = { ...globalComponents }
  const dependencies = assignDependencies({}, globalDependencies)
  for (const preset of presets) {
    assignComponents(components, preset.components)
    assignDependencies(dependencies, preset.dependencies)
  }

  if (typeof mjml === 'string') {
    mjml = MJMLParser(mjml, {
      keepComments,
      components,
      filePath,
      actualPath,
      preprocessors,
      ignoreIncludes,
    })
  }

  mjml = handleMjml3(mjml, { noMigrateWarn })

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
  }

  const validatorOptions = {
    components,
    dependencies,
    initializeType,
  }

  switch (validationLevel) {
    case 'skip':
      break

    case 'strict':
      errors = MJMLValidator(mjml, validatorOptions)

      if (errors.length > 0) {
        throw new ValidationError(
          `ValidationError: \n ${errors
            .map((e: any) => e.formattedMessage)
            .join('\n')}`,
          errors,
        )
      }
      break

    case 'soft':
    default:
      errors = MJMLValidator(mjml, validatorOptions)
      break
  }

  const mjBody = find(mjml.children, { tagName: 'mj-body' })
  const mjHead = find(mjml.children, { tagName: 'mj-head' })
  const mjOutsideRaws = filter(mjml.children, { tagName: 'mj-raw' })

  const processing = (node: any, context: any, parseMJML = identity) => {
    if (!node) {
      return
    }

    const component = initComponent({
      name: node.tagName,
      initialDatas: {
        ...parseMJML(node),
        context,
      },
    })

    if (component !== null) {
      if ('handler' in component) {
        return component.handler() // eslint-disable-line consistent-return
      }

      if ('render' in component) {
        return component.render() // eslint-disable-line consistent-return
      }
    }
  }

  const applyAttributes = (mjml: any) => {
    const parse = (mjml: any, parentMjClass = '') => {
      const { attributes, tagName, children } = mjml
      const classes = get(mjml.attributes, 'mj-class', '').split(' ')
      const attributesClasses = reduce(
        classes,
        (acc: any, value: any) => {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const mjClassValues = globalDatas.classes[value]
          let multipleClasses = {}
          if (acc['css-class'] && get(mjClassValues, 'css-class')) {
            multipleClasses = {
              'css-class': `${acc['css-class']} ${mjClassValues['css-class']}`,
            }
          }

          return {
            ...acc,
            ...mjClassValues,
            ...multipleClasses,
          }
        },
        {},
      )

      const defaultAttributesForClasses = reduce(
        parentMjClass.split(' '),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'acc' implicitly has an 'any' type.
        (acc, value) => ({
          ...acc,
          ...get(globalDatas.classesDefault, `${value}.${tagName}`),
        }),
        {},
      )
      const nextParentMjClass = get(attributes, 'mj-class', parentMjClass)

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
      }
    }

    return parse(mjml)
  }

  const bodyHelpers = {
    components,
    addMediaQuery(className: any, {
      parsedWidth,
      unit,
    }: any) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      globalDatas.mediaQueries[
        className
      ] = `{ width:${parsedWidth}${unit} !important; max-width: ${parsedWidth}${unit}; }`
    },
    addHeadStyle(identifier: any, headStyle: any) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      globalDatas.headStyle[identifier] = headStyle
    },
    addComponentHeadSyle(headStyle: any) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      globalDatas.componentsHeadStyle.push(headStyle)
    },
    setBackgroundColor: (color: any) => {
      globalDatas.backgroundColor = color
    },
    processing: (node: any, context: any) => processing(node, context, applyAttributes),
  }

  const headHelpers = {
    components,
    add(attr: any, ...params: any[]) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Array.isArray(globalDatas[attr])) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        globalDatas[attr].push(...params)
      } else if (Object.prototype.hasOwnProperty.call(globalDatas, attr)) {
        if (params.length > 1) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (isObject(globalDatas[attr][params[0]])) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            globalDatas[attr][params[0]] = {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              ...globalDatas[attr][params[0]],
              ...params[1],
            }
          } else {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // eslint-disable-next-line prefer-destructuring
            globalDatas[attr][params[0]] = params[1]
          }
        } else {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          // eslint-disable-next-line prefer-destructuring
          globalDatas[attr] = params[0]
        }
      } else {
        throw Error(
          `An mj-head element add an unkown head attribute : ${attr} with params ${
            Array.isArray(params) ? params.join('') : params
          }`,
        )
      }
    },
  }

  globalDatas.headRaw = processing(mjHead, headHelpers)

  content = processing(mjBody, bodyHelpers, applyAttributes)
  
  if (!content) {
    throw new Error('Malformed MJML. Check that your structure is correct and enclosed in <mjml> tags.')
  }

  content = minifyOutlookConditionnals(content)
  
  if (mjOutsideRaws.length) {
    const toAddBeforeDoctype = mjOutsideRaws.filter((elt: any) => elt.attributes.position && elt.attributes.position === 'file-start',
    )
    if (toAddBeforeDoctype.length) {
      globalDatas.beforeDoctype = toAddBeforeDoctype.map((elt: any) => elt.content).join('\n')
    }
  }

  if (!isEmpty(globalDatas.htmlAttributes)) {
    const $ = cheerio.load(content, {
      xmlMode: true, // otherwise it may move contents that aren't in any tag
      decodeEntities: false, // won't escape special characters
    })

    each(globalDatas.htmlAttributes, (data: any, selector: any) => {
      each(data, (value: any, attrName: any) => {
        $(selector).each(function getAttr() {
          $(this).attr(attrName, value || '')
        })
      })
    })

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    content = $.root().html()
  }

  content = skeleton({
    content,
    ...globalDatas,
  })

  if (globalDatas.inlineStyle.length > 0) {
    if (juicePreserveTags) {
      each(juicePreserveTags, (val: any, key: any) => {
        juice.codeBlocks[key] = val
      })
    }

    content = juice(content, {
      applyStyleTags: false,
      extraCss: globalDatas.inlineStyle.join(''),
      insertPreservedExtraCss: false,
      removeStyleTags: false,
      ...juiceOptions,
    })
  }

  content = mergeOutlookConditionnals(content)

  if (beautify) {
    // eslint-disable-next-line no-console
    console.warn(
      '"beautify" option is deprecated in mjml-core and only available in mjml cli.',
    )
    content = htmlBeautify(content, {
      indent_size: 2,
      wrap_attributes_indent_size: 2,
      max_preserve_newline: 0,
      preserve_newlines: false,
    })
  }

  if (minify) {
    // eslint-disable-next-line no-console
    console.warn(
      '"minify" option is deprecated in mjml-core and only available in mjml cli.',
    )

    content = htmlMinify(content, {
      collapseWhitespace: true,
      minifyCSS: false,
      caseSensitive: true,
      removeEmptyAttributes: true,
      ...minifyOptions,
    })
  }

  return {
    html: content,
    json: mjml,
    errors,
  }
}

if (isNode) {
  handleMjmlConfig(process.cwd(), registerComponent)
}

export {
  globalComponents as components,
  initComponent,
  registerComponent,
  assignComponents,
  suffixCssClasses,
  handleMjmlConfig,
  initializeType,
}

export { BodyComponent, HeadComponent } from './createComponent'
