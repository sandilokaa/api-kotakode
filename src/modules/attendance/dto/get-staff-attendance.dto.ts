import { IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

export class GetStaffByAttendanceDto extends PageOptionsDto {
  @IsOptional()
  clockIn?: Date;

  @IsOptional()
  clockOut?: Date;
}
