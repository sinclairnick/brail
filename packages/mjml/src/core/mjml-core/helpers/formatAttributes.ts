
import { reduce } from 'lodash'
import { initializeType } from '../types/type'

export default (attributes: any, allowedAttributes: any) =>
  reduce(
    attributes,
    (acc: any, val: any, attrName: any) => {
      if (allowedAttributes && allowedAttributes[attrName]) {
        const TypeConstructor = initializeType(allowedAttributes[attrName])

        if (TypeConstructor) {
          const type = new TypeConstructor(val)

          return {
            ...acc,
            [attrName]: type.getValue(),
          }
        }
      }

      return {
        ...acc,
        [attrName]: val,
      }
    },
    {},
  )
