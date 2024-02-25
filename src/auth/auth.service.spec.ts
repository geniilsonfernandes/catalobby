import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TestUltil } from '../user/common/test/TestUltil';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findAllUsers: jest.fn(),
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(() => 'token'),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be try validate user', async () => {
    const user = TestUltil.giveStoredUser();

    mockUserService.findUserByEmail.mockReturnValue(user);
    const result = await service.validateUser({
      email: user.email,
      password: 'password',
    });

    expect(result.user.name).toBe(user.name);
    expect(result.user.email).toBe(user.email);
    expect(result.token).toBe('token');
  });

  it('should be not validate user if not authorized', async () => {
    mockUserService.findUserByEmail.mockReturnValue({
      id: '1',
      name: 'name',
      email: 'email@email.com',
      password: 'password',
    });
    await expect(
      service.validateUser({
        email: 'email@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
