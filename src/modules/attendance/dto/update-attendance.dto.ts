import { IsOptional } from 'class-validator';

export class UpdateAttendanceDto {
  @IsOptional()
  clockOut?: string;
}
