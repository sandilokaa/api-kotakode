import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';
import { BaseEntityWithUUID } from '../../../common/base.entity';

@Entity()
export class Attendance extends BaseEntityWithUUID {
  @ManyToOne(() => Staff, (staff) => staff.attendances, { eager: true })
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @Column({ nullable: true })
  clockIn: string;

  @Column({ nullable: true })
  clockOut: string;
}
