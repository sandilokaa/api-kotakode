import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty()
  clockIn: string;

  @ApiProperty()
  clockOut: string;

  @ApiProperty()
  staffId: number;
}
