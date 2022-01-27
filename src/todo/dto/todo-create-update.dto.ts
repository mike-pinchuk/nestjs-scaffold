import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @IsString()
  readonly description?: string;

  @IsBoolean()
  readonly isDone?: boolean;
}
