# API Client

We can use Brail to generate typed API clients. This removes the guess work as to what dynamic data each template requires, and ultimately our email pipeline becomes more robust.

## OpenAPI

Brail is self-documenting and can generate fully typed API clients, by emitting an [OpenAPI spec](https://swagger.io/specification/).

While the template paths are automatically supported, to ensure our request bodies adhere to the correct shape we must specify our prop types in a specific way.

For dynamic data type information to be properly read, we must specify the `propType` field when creating our template.

```tsx title="index.template.tsx"
class WelcomeProps {}

createTemplate({
  //...
  propType: WelcomeProps,
});
```

Because we must pass a value, our type must be denoted by a class, and not a type.

Moreover, our class must explicitly specify the field types on the class, using decorators from `class-validator`.

> Typescript has limited type-reflection abilities, so we must explicitly specify what types our fields are, via decorators.

```tsx title="index.template.tsx"
import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class WelcomeUser {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
}

class WelcomeRecommendation {
  @IsString()
  name: string;
}

class WelcomeProps {
  @IsString()
  title: string;
  @IsInt()
  age: number;

  // For arrays and nested objects:
  @ValidateNested({ each: true /** Because of Array */ })
  @Type(() => WelcomeRecommendation)
  recommendation: WelcomeRecommendation[];

  @ValidateNested()
  @Type(() => WelcomeUser)
  user: WelcomeUser;
}
```

Now our OpenAPI spec is fully aware of our email templates and their dynamic data. To directly query the OpenAPI spec, we can call the `/api/openapi.json` endpoint.

This is useful for generating API clients for use on our backends.

### Resources

- [Typescript OpenAPI Client Generator](https://github.com/ferdikoomen/openapi-typescript-codegen)
- [OpenAPI Generator List](https://openapi-generator.tech/docs/generators)
