import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity, UserProfile } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.repo.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException(
        `O usuário com email ${data.email} já existe.`,
      );
    }
    return await this.repo.create(data);
  }

  async getById(id: string): Promise<UserProfile | null> {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user.getPublicProfile();
  }

  async getByEmail(email: string): Promise<UserProfile | null> {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Usuário com email ${email} não encontrado.`);
    }
    return user.getPublicProfile();
  }

  async getAll(): Promise<UserProfile[]> {
    const users = await this.repo.findAll();
    return users.map((user) => user.getPublicProfile());
  }

  async update(id: string, data: UpdateUserDto): Promise<UserProfile | null> {
    const userexisting = await this.repo.findById(id);
    if (!userexisting) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    if (data.email && data.email !== userexisting.email) {
      const emailTaken = await this.repo.findByEmail(data.email);
      if (emailTaken) {
        throw new ConflictException(
          `O usuário com email ${data.email} já existe.`,
        );
      }
    }
    const updatedUser = await this.repo.update(id, data);
    return updatedUser ? updatedUser.getPublicProfile() : null;
  }

  async delete(id: string): Promise<boolean> {
    const userexisting = await this.repo.findById(id);
    if (!userexisting) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return await this.repo.delete(id);
  }
}
