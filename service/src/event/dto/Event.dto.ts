import { ApiModelProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class EventDto {
  @ApiModelProperty({ example: 'John', minLength: 1 })
  @MinLength(1)
  firstName: string;

  @ApiModelProperty({ example: 'Doe', minLength: 1 })
  @MinLength(1)
  lastName: string;

  @ApiModelProperty({ example: 'john-doe@example.com' })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    type: 'string',
    format: 'date-time',
    example: '2019-07-11T06:20:32.232Z',
  })
  @Type(() => Date)
  @IsDate()
  date: Date;
}
