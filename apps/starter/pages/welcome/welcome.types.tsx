import { IsString } from 'class-validator';

export class WelcomeTemplateProps {
  @IsString()
  name: string;
}
