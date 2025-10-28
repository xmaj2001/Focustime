import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserProfile } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/user.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll(): Promise<UserProfile[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserProfile | null> {
    return this.service.getById(id);
  }

  @Get('email/:email')
  async getByEmail(@Param('email') email: string): Promise<UserProfile | null> {
    return this.service.getByEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserProfile | null> {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
