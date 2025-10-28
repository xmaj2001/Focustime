import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserRepository } from '../user.repository';
import { CreateUserDto, UpdateUserDto } from '../../dto/user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data });
    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new UserEntity(user) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new UserEntity(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map((u) => new UserEntity(u));
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user ? new UserEntity(user) : null;
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}
