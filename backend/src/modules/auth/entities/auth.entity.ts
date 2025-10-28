import { UserProfile } from 'src/modules/user/entities/user.entity';

export class AuthEntity {
  user: UserProfile;
  token: string;

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial);
  }
}
