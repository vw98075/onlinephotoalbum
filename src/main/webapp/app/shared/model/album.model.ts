import { IUser } from '@/shared/model/user.model';

export interface IAlbum {
  id?: number;
  title?: string;
  description?: any;
  created?: Date;
  user?: IUser;
}

export class Album implements IAlbum {
  constructor(public id?: number, public title?: string, public description?: any, public created?: Date, public user?: IUser) {}
}
