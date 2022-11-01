import { Type } from 'class-transformer';
import { IsString, IsInt, ValidateNested, IsIn } from 'class-validator';

class Pet {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}

// Props class for type-safe API generation

export class WelcomeTemplateProps {
  @IsString()
  firstName: string;

  @ValidateNested()
  @Type(() => Pet)
  pet: Pet;

  @IsIn(['yellow', 'blue', 'red'])
  favColor: 'yellow' | 'blue' | 'red';
}
