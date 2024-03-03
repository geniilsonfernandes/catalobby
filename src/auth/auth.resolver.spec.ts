import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  const mockUserService = {};

  const mockRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should try validate user and return token', () => {
    const data: AuthInput = {
      email: 'email',
      password: 'password',
    };

    mockAuthService.validateUser.mockReturnValue({
      user: 'user',
      token: 'token',
    });
    const result = resolver.login(data);
    console.log(result);
  });
});
