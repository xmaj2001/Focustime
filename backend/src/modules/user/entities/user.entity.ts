import { GenerateAdapter } from '../../../adapter/generate.adapter';

export class UserEntity {
  public id: string;
  public name: string;
  public email: string;
  private password: string;
  public avatarUrl?: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  public async verifyPassword(password: string): Promise<boolean> {
    return GenerateAdapter.comparePassword(password, this.password);
  }

  public async setPassword(password: string): Promise<void> {
    this.password = await GenerateAdapter.hashPassword(password);
  }

  public getPublicProfile(): UserProfile {
    const { password, ...publicProfile } = this;
    return publicProfile as UserProfile;
  }
}

export type UserProfile = Omit<UserEntity, 'password'>;
