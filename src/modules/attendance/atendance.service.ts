import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Staff } from '../staff/entities/staff.entity';
import { Between } from 'typeorm';
import { parseDate } from '../../helpers/date-parser.helper';

@Injectable()
export class AttendanceService {
  async createClockIn(
    options: CreateAttendanceDto,
    staffId,
  ): Promise<Attendance> {
    const attendance = new Attendance();
    attendance.clockIn = parseDate(new Date());
    attendance.clockOut = null;
    attendance.staff = staffId;

    const createdAttendenceClockIn = await Attendance.save(attendance);
    return createdAttendenceClockIn;
  }

  async findAllStaffByAttendence(
    clockIn?: string,
    clockOut?: string,
  ): Promise<Attendance[]> {
    const query: any = {};

    if (clockIn && clockOut) {
      query.clockIn = Between(clockIn, clockOut);
    }

    if (clockIn) {
      query.clockIn = clockIn;
    }

    if (clockOut) {
      query.clockOut = clockOut;
    }

    const findAll = await Attendance.find({
      where: query,
      relations: ['staff'],
    });
    return findAll;
  }

  async updateClockOut(
    id: string,
    options: UpdateAttendanceDto,
    staffId,
  ): Promise<Attendance> {
    const staff = await Staff.findOne({ where: { id: staffId } });

    if (!staff) {
      throw new ForbiddenException('Staff not found');
    }

    if (staff.id !== staffId) {
      throw new ForbiddenException(
        'You are not allowed to update other staffs data',
      );
    }

    const attendanceById = await Attendance.findOne({ where: { id } });

    if (!attendanceById) {
      throw new NotFoundException('Attendance not found');
    }

    if (options.clockOut) {
      attendanceById.clockOut = options.clockOut;
    }

    await attendanceById.save();

    const updatedAttendence = await Attendance.findOne({
      where: { id: attendanceById.id },
    });

    return updatedAttendence;
  }
}
