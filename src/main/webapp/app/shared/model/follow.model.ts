import { IUser } from '@/shared/model/user.model';

export interface IFollow {
  id?: number;
  requestTime?: Date;
  approved?: boolean;
  follower?: IUser;
  following?: IUser;
}

export class Follow implements IFollow {
  constructor(public id?: number, public requestTime?: Date, public approved?: boolean, public follower?: IUser, public following?: IUser) {
    this.approved = this.approved || false;
  }
}
