// File taken from https://github.com/epiphone/class-validator-jsonschema/issues/64#issuecomment-1006603371

// @ts-ignore
import { defaultMetadataStorage } from 'class-transformer/cjs/storage.js';
import { getMetadataStorage, ValidationTypes } from 'class-validator';
import { targetConstructorToSchema } from 'class-validator-jsonschema';
import { ISchemaConverters } from 'class-validator-jsonschema/build/defaultConverters';
import { IOptions } from 'class-validator-jsonschema/build/options';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

export const classToJsonSchema = (clz: Function) => {
  return targetConstructorToSchema(clz, options);
};

const additionalConverters: ISchemaConverters = {
  [ValidationTypes.NESTED_VALIDATION]: plainNestedConverter,
};

const options: Partial<IOptions> = {
  classTransformerMetadataStorage: defaultMetadataStorage,
  classValidatorMetadataStorage: getMetadataStorage(),
  additionalConverters,
};

/**
 * Explicitly inline nested schemas instead of using refs
 *
 * @see https://github.com/epiphone/class-validator-jsonschema/blob/766c02dd0de188ebeb697f3296982997249bffc9/src/defaultConverters.ts#L25
 */
function plainNestedConverter(meta: ValidationMetadata, options: IOptions) {
  if (typeof meta.target === 'function') {
    const typeMeta = options.classTransformerMetadataStorage
      ? options.classTransformerMetadataStorage.findTypeMetadata(
          meta.target,
          meta.propertyName
        )
      : null;

    const childType = typeMeta
      ? typeMeta.typeFunction()
      : getPropType(meta.target.prototype, meta.propertyName);

    return targetToSchema(childType, options);
  }
}

function getPropType(target: object, property: string) {
  return Reflect.getMetadata('design:type', target, property);
}

function targetToSchema(type: any, options: IOptions): any | void {
  if (typeof type === 'function') {
    if (
      type.prototype === String.prototype ||
      type.prototype === Symbol.prototype
    ) {
      return { type: 'string' };
    } else if (type.prototype === Number.prototype) {
      return { type: 'number' };
    } else if (type.prototype === Boolean.prototype) {
      return { type: 'boolean' };
    }

    return classToJsonSchema(type);
  }
}
