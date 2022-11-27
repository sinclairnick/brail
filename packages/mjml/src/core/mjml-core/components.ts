import kebabCase from 'lodash/kebabCase'

const components = {}

export function assignComponents(target: any, source: any) {
  for (const component of source) {
    target[component.componentName || kebabCase(component.name)] = component
  }
}

export function registerComponent(Component: any) {
  assignComponents(components, [Component])
}

export default components
