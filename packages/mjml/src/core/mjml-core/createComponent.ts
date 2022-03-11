// eslint-disable-next-line max-classes-per-file
import {
  get,
  forEach,
  identity,
  reduce,
  kebabCase,
  find,
  filter,
  isNil,
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
} from 'lodash'

import MJMLParser from 'mjml-parser-xml'

import shorthandParser, { borderParser } from './helpers/shorthandParser'
import formatAttributes from './helpers/formatAttributes'
import jsonToXML from './helpers/jsonToXML'

export function initComponent({
  initialDatas,
  name,
}: any) {
  const Component = initialDatas.context.components[name]

  if (Component) {
    const component = new Component(initialDatas)

    if (component.headStyle) {
      component.context.addHeadStyle(name, component.headStyle)
    }
    if (component.componentHeadStyle) {
      component.context.addComponentHeadSyle(component.componentHeadStyle)
    }

    return component
  }

  return null
}

class Component {
  static getTagName() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'componentName' does not exist on type 't... Remove this comment to see the full error message
    return this.componentName || kebabCase(this.name)
  }

  static isRawElement() {
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'rawElement' does not exist on type 'type... Remove this comment to see the full error message
    return !!this.rawElement
  }

  static defaultAttributes = {}

  attributes: any;

  componentName: any;

  context: any;

  props: any;

  rawElement: any;

  constructor(initialDatas = {}) {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'attributes' does not exist on type '{}'.
      attributes = {},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{}'.
      children = [],
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type '{}'.
      content = '',
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'context' does not exist on type '{}'.
      context = {},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
      props = {},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'globalAttributes' does not exist on type... Remove this comment to see the full error message
      globalAttributes = {},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'absoluteFilePath' does not exist on type... Remove this comment to see the full error message
      absoluteFilePath = null,
    } = initialDatas

    this.props = {
      absoluteFilePath,
      ...props,
      children,
      content,
    }

    this.attributes = formatAttributes(
      {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultAttributes' does not exist on typ... Remove this comment to see the full error message
        ...this.constructor.defaultAttributes,
        ...globalAttributes,
        ...attributes,
      },
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'allowedAttributes' does not exist on typ... Remove this comment to see the full error message
      this.constructor.allowedAttributes,
    )
    this.context = context

    return this
  }

  getChildContext() {
    return this.context
  }

  getAttribute(name: any) {
    return this.attributes[name]
  }

  getContent() {
    return this.props.content.trim()
  }

  renderMJML(mjml: any, options = {}) {
    if (typeof mjml === 'string') {
      // supports returning siblings elements from a custom component
      const partialMjml = MJMLParser(`<fragment>${mjml}</fragment>`, {
        ...options,
        components: this.context.components,
        ignoreIncludes: true,
      })
      return partialMjml.children
        .map((child: any) => this.context.processing(child, this.context))
        .join('')
    }

    return this.context.processing(mjml, this.context)
  }
}

export class BodyComponent extends Component {
  context: any;

  props: any;

  // eslint-disable-next-line class-methods-use-this
  getStyles() {
    return {}
  }

  getShorthandAttrValue(attribute: any, direction: any) {
    const mjAttributeDirection = this.getAttribute(`${attribute}-${direction}`)
    const mjAttribute = this.getAttribute(attribute)

    if (mjAttributeDirection) {
      return parseInt(mjAttributeDirection, 10)
    }

    if (!mjAttribute) {
      return 0
    }

    return shorthandParser(mjAttribute, direction)
  }

  getShorthandBorderValue(direction: any) {
    const borderDirection =
      direction && this.getAttribute(`border-${direction}`)
    const border = this.getAttribute('border')

    return borderParser(borderDirection || border || '0')
  }

  getBoxWidths() {
    const { containerWidth } = this.context
    const parsedWidth = parseInt(containerWidth, 10)

    const paddings =
      this.getShorthandAttrValue('padding', 'right') +
      this.getShorthandAttrValue('padding', 'left')

    const borders =
      this.getShorthandBorderValue('right') +
      this.getShorthandBorderValue('left')

    return {
      totalWidth: parsedWidth,
      borders,
      paddings,
      box: parsedWidth - paddings - borders,
    }
  }

  htmlAttributes(attributes: any) {
    const specialAttributes = {
      style: (v: any) => this.styles(v),
      default: identity,
    }

    return reduce(
      attributes,
      (output: any, v: any, name: any) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const value = (specialAttributes[name] || specialAttributes.default)(v)

        if (!isNil(value)) {
          return `${output} ${name}="${value}"`
        }

        return output
      },
      '',
    )
  }

  styles(styles: any) {
    let stylesObject

    if (styles) {
      if (typeof styles === 'string') {
        stylesObject = get(this.getStyles(), styles)
      } else {
        stylesObject = styles
      }
    }

    return reduce(
      stylesObject,
      (output: any, value: any, name: any) => {
        if (!isNil(value)) {
          return `${output}${name}:${value};`
        }
        return output
      },
      '',
    )
  }

  renderChildren(children: any, options = {}) {
    const {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type '{}'.
      props = {},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'renderer' does not exist on type '{}'.
      renderer = (component: any) => component.render(),
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'attributes' does not exist on type '{}'.
      attributes = {},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'rawXML' does not exist on type '{}'.
      rawXML = false,
    } = options

    children = children || this.props.children

    if (rawXML) {
      return children.map((child: any) => jsonToXML(child)).join('\n')
    }

    const sibling = children.length

    const rawComponents = filter(this.context.components, (c: any) => c.isRawElement(),
    )
    const nonRawSiblings = children.filter(
      (child: any) => !find(rawComponents, (c: any) => c.getTagName() === child.tagName),
    ).length

    let output = ''
    let index = 0

    forEach(children, (children: any) => {
      const component = initComponent({
        name: children.tagName,
        initialDatas: {
          ...children,
          attributes: {
            ...attributes,
            ...children.attributes,
          },
          context: this.getChildContext(),
          props: {
            ...props,
            first: index === 0,
            index,
            last: index + 1 === sibling,
            sibling,
            nonRawSiblings,
          },
        },
      })

      if (component !== null) {
        output += renderer(component)
      }

      index++ // eslint-disable-line no-plusplus
    })

    return output
  }
}

export class HeadComponent extends Component {
  componentName: any;

  props: any;

  static getTagName() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'componentName' does not exist on type 't... Remove this comment to see the full error message
    return this.componentName || kebabCase(this.name)
  }

  handlerChildren() {
    const { children } = this.props

    return children.map((children: any) => {
      const component = initComponent({
        name: children.tagName,
        initialDatas: {
          ...children,
          context: this.getChildContext(),
        },
      })

      if (!component) {
        // eslint-disable-next-line no-console
        console.error(`No matching component for tag : ${children.tagName}`)
        return null
      }

      if (component.handler) {
        component.handler()
      }

      if (component.render) {
        return component.render()
      }
      return null
    })
  }
}
