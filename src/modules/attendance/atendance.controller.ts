import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Param,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './atendance.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Request } from 'express';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { GetStaffByAttendanceDto } from './dto/get-staff-attendance.dto';

@Controller({ version: '1', path: 'attendances' })
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('clock-in')
  async createClockIn(
    @Body() options: CreateAttendanceDto,
    @Req() request: Request,
  ) {
    const staff = request.user;
    const staffId = staff.id;
    const attendance = await this.attendanceService.createClockIn(
      options,
      staffId,
    );
    return {
      data: attendance,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllStaffByAttendence(@Query() query: GetStaffByAttendanceDto) {
    const staffData = await this.attendanceService.findAllStaffByAttendence(
      query.clockIn,
      query.clockOut,
    );
    return { data: staffData };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/self')
  async findAllAttendanceByStaffId(@Req() request: Request) {
    const staff = request.user;
    const staffId = staff.id.toString();
    const attendanceData =
      await this.attendanceService.findAllAttendanceByStaffId(staffId);
    return { data: attendanceData };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateClockOut(
    @Param('id') id: string,
    @Body() options: UpdateAttendanceDto,
    @Req() request: Request,
  ) {
    const staff = request.user;
    const staffId = staff.id.toString();
    const attendanceData = await this.attendanceService.updateClockOut(
      id,
      options,
      staffId,
    );
    return { data: attendanceData };
  }
}
