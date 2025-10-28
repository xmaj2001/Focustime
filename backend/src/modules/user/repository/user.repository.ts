import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract update(id: string, data: UpdateUserDto): Promise<UserEntity | null>;
  abstract delete(id: string): Promise<boolean>;
}
