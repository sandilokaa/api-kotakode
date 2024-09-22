import { Test, TestingModule } from '@nestjs/testing';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { GetStaffDto } from './dto/get-staff.dto';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

describe('StaffController', () => {
  let staffController: StaffController;
  let staffService: StaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaffController],
      providers: [
        {
          provide: StaffService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              staffs: [{ id: 1, name: 'Sandi' }],
              count: 1,
              meta: {},
            }),
            findOne: jest.fn().mockResolvedValue({
              staff: [{ id: '1', name: 'Sandi' }],
            }),
            create: jest.fn().mockResolvedValue({
              id: '1',
              staffId: 'angangang',
              firstName: 'Sandi',
              username: 'sanlokaja',
              lastName: 'Loka',
              email: 'sandi@gmail.com',
              password: 'sandinyaloka123',
            }),
            update: jest.fn().mockResolvedValue({
              id: '1',
              lastName: 'Loka Ananta',
            }),
          },
        },
      ],
    }).compile();

    staffController = module.get<StaffController>(StaffController);
    staffService = module.get<StaffService>(StaffService);
  });

  describe('findAll', () => {
    it('should return all staffs', async () => {
      const query: GetStaffDto = {
        skip: 0,
      };
      const result = await staffController.findAll(query);

      expect(result).toEqual({
        data: [{ id: 1, name: 'Sandi' }],
        count: 1,
        meta: {},
      });
      expect(staffService.findAll).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return staff by id', async () => {
      const id = '1';
      const result = await staffController.findOne(id);

      expect(result).toEqual({
        data: { staff: [{ id: '1', name: 'Sandi' }] },
      });
      expect(staffService.findOne).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('create', () => {
    it('should create a new staff', async () => {
      const createStaffDto: CreateStaffDto = {
        email: 'sandi@gmail.com',
        firstName: 'Sandi',
        lastName: 'Loka',
        password: 'sandinyaloka123',
        staffId: 'angangang',
        username: 'sanlokaja',
      };

      const result = await staffController.create(createStaffDto);

      expect(result).toEqual({
        data: {
          id: '1',
          staffId: 'angangang',
          firstName: 'Sandi',
          username: 'sanlokaja',
          lastName: 'Loka',
          email: 'sandi@gmail.com',
          password: 'sandinyaloka123',
        },
      });

      expect(staffService.create).toHaveBeenCalledWith(createStaffDto);
    });
  });

  describe('update', () => {
    it('should update an existing staff if the user is authorized', async () => {
      const id = '1';
      const updateStaffDto: UpdateStaffDto = {
        lastName: 'Loka Ananta',
      };

      const request: Request = {
        user: {
          id: '1',
        },
      } as unknown as Request;

      const result = await staffController.update(id, updateStaffDto, request);

      expect(result).toEqual({
        data: {
          id: '1',
          lastName: 'Loka Ananta',
        },
      });

      expect(staffService.update).toHaveBeenCalledWith(
        id,
        updateStaffDto,
        request.user.id,
      );
    });
    // it('should not allow update if the user is not authorized', async () => {
    //   const id = '2';
    //   const updateStaffDto: UpdateStaffDto = {
    //     lastName: 'Loka Ananta',
    //   };

    //   const request: Request = {
    //     user: {
    //       id: '1',
    //     },
    //   } as unknown as Request;

    //   await expect(
    //     staffController.update(id, updateStaffDto, request),
    //   ).rejects.toThrow(UnauthorizedException);
    // });
  });
});
