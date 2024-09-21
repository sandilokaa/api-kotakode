import { PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @IsOptional()
  @IsString()
  staffId?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
