import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateManufacturerDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }

    return value as unknown;
  })
  @IsString({ message: 'campo name deve ser uma string' })
  @MaxLength(255)
  @IsNotEmpty()
  readonly name: string;

  @MaxLength(14)
  @IsNotEmpty()
  readonly cnpj: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;
}
