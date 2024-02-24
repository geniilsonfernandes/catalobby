import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserById(id: string): Promise<User> {
    const userExists = await this.userRepository.findOne({ where: { id } });

    if (!userExists) {
      throw new InternalServerErrorException('Este usuário não existe');
    }

    return userExists;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (userExists) {
      throw new InternalServerErrorException('Este usuário ja existe');
    }

    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException(
        'Não foi possiível criar o usuário, tente novamente',
      );
    }

    return userSaved;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const userExists = await this.findUserById(id);

    if (!userExists) {
      throw new InternalServerErrorException('Este usuário não existe');
    }

    const userUpdated = await this.userRepository.save({
      ...userExists,
      ...data,
    });

    return userUpdated;
  }

  async deleteUser(id: string): Promise<User> {
    const userExists = await this.findUserById(id);

    if (!userExists) {
      throw new InternalServerErrorException('Este usuário não existe');
    }

    const userDeleted = await this.userRepository.remove(userExists);

    return userDeleted;
  }
}
