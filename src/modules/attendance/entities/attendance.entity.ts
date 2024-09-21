import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { BaseEntityWithUUID } from 'src/common/base.entity';

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
