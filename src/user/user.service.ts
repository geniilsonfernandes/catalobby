import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { NotFoundUserException } from './common/erros/NotFoundUserException';
import { UserAlreadyExistsException } from './common/erros/UserAlreadyExistsException';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async findUserOrFail(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundUserException('Este usuário não existe');
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundUserException('Este usuário não existe');
    }
    return user;
  }

  async findUserById(id: string): Promise<User> {
    return this.findUserOrFail(id);
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const alreadyExists = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (alreadyExists) {
      throw new UserAlreadyExistsException('Este usuário já existe');
    }
    const passwordHash = await bcrypt.hash(data.password, 8);
    const user = this.userRepository.create({
      ...data,
      password: passwordHash,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findUserOrFail(id);
    const updatedUser = await this.userRepository.save({ ...user, ...data });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findUserOrFail(id);
    return this.userRepository.remove(user);
  }
}
