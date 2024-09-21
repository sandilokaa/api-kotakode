import { Module } from '@nestjs/common';
import { AttendanceController } from './atendance.controller';
import { AttendanceService } from './atendance.service';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
