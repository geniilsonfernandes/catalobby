import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUltil } from './common/test/TestUltil';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.findOne.mockReset();
    mockRepository.find.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.remove.mockReset();
  });

  it('should find all users', async () => {
    const users = [TestUltil.giveMeAUser(), TestUltil.giveMeAUser()];
    mockRepository.find.mockReturnValue(users);

    const result = await service.findAllUsers();

    expect(result.length).toBe(2);
  });

  it('should find user by email', async () => {
    const user = TestUltil.giveMeAUser();
    mockRepository.findOne.mockReturnValue(user);

    const result = await service.findUserByEmail(user.email);

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
  });

  it('should find user', async () => {
    const user = TestUltil.giveMeAUser();
    mockRepository.findOne.mockReturnValue(user);

    const result = await service.findUserById('1');

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
  });

  it('should not find user if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);

    await expect(service.findUserById('1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should create a new user', async () => {
    const user = TestUltil.giveMeAUser();
    mockRepository.create.mockReturnValue(user);
    mockRepository.save.mockReturnValue(user);

    const result = await service.createUser(user);

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result.password).toBe(user.password);
  });

  it('should not create a new user if exists', async () => {
    const user = TestUltil.giveMeAUser();

    mockRepository.findOne.mockReturnValue(user);

    await expect(service.createUser(user)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    );
  });

  it('should update a user', async () => {
    const user = TestUltil.giveMeAUser();
    user.name = 'new name';
    mockRepository.findOne.mockReturnValue({ ...user, id: '1' });
    mockRepository.save.mockReturnValue({
      ...user,
      name: 'new name',
      id: '1',
    });

    const result = await service.updateUser('1', user);

    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result.password).toBe(user.password);
  });

  it('should not update a user if not exists', async () => {
    const user = TestUltil.giveMeAUser();

    mockRepository.findOne.mockReturnValue(null);

    await expect(service.updateUser('1', user)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should delete a user', async () => {
    const user = TestUltil.giveMeAUser();
    mockRepository.findOne.mockReturnValue(user);
    mockRepository.remove.mockReturnValue(user);

    await service.deleteUser('1');

    expect(mockRepository.remove).toHaveBeenCalled();
  });

  it('should not delete a user if not exists', async () => {
    mockRepository.findOne.mockReturnValue(null);

    await expect(service.deleteUser('1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
