import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({
              username: 'sandilokaa',
              accessToken: 'thisisaccesstoken',
            }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return token', async () => {
      const userLoginDto: UserLoginDto = {
        username: 'sandilokaa',
        password: 'password123',
      };

      const result = await authController.login(userLoginDto);
      expect(result).toEqual({
        data: {
          username: 'sandilokaa',
          accessToken: 'thisisaccesstoken',
        },
      });
      expect(authService.login).toHaveBeenCalledWith(userLoginDto);
    });
    it('should throw if username or password is incorrect', async () => {
      const userLoginDto: UserLoginDto = {
        username: 'wrongusername',
        password: 'wrongpassword',
      };
      jest
        .spyOn(authService, 'login')
        .mockRejectedValue(new UnauthorizedException());
      await expect(authController.login(userLoginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.login).toHaveBeenCalledWith(userLoginDto);
    });
  });
});
