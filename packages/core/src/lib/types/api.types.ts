import { MjType } from '@brail/mjml';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Meta {
  @IsString()
  @IsOptional()
  subject?: string | null;

  @IsString()
  @IsOptional()
  preview?: string | null;
}

export class RenderError implements MjType.MjmlError {
  @IsString()
  tagName: string;
  @IsString()
  message: string;
  @IsInt()
  line: number;
  @IsString()
  formattedMessage: string;
}

export class BrailResponse {
  @IsString()
  html: string;

  @ValidateNested()
  @Type(() => Meta)
  meta: Meta;

  @ValidateNested({ each: true })
  @Type(() => RenderError)
  errors: RenderError[];
}

enum ValidationLevel {
  Strict = 'strict',
  Soft = 'soft',
  Skip = 'skip',
}

export class RenderOptions {
  @IsBoolean()
  @IsOptional()
  beautify?: boolean;

  @IsEnum(ValidationLevel)
  @IsOptional()
  validationLevel?: 'skip';

  @IsOptional()
  @IsBoolean()
  keepComments?: boolean;

  @IsBoolean()
  @IsOptional()
  minify?: boolean;
}

export class Sender {
  @IsString()
  email: string;
  @IsString()
  @IsOptional()
  name: string | undefined;
}

export class Recipient {
  @IsString()
  email: string;
  @IsString()
  @IsOptional()
  name: string | undefined;
}

export class SenderArgs {
  @ValidateNested()
  @Type(() => Sender)
  from: Sender;
  @ValidateNested({ each: true })
  @Type(() => Recipient)
  to: Recipient[];
  @ValidateNested({ each: true })
  @Type(() => Recipient)
  cc?: Recipient[];
  @ValidateNested({ each: true })
  @Type(() => Recipient)
  bcc?: Recipient[];
  @ValidateNested({ each: true })
  @Type(() => Recipient)
  reply_to?: Recipient;
  @IsString()
  subject: string;
}
