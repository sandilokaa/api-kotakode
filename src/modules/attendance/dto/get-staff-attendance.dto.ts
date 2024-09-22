import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from '../../../common/dto/page-options.dto';

export class GetStaffByAttendanceDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  clockIn?: string;

  @IsOptional()
  @IsString()
  clockOut?: string;
}
