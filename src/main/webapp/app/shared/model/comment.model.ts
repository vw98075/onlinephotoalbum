import { IPhoto } from '@/shared/model/photo.model';
import { IUser } from '@/shared/model/user.model';

export interface IComment {
  id?: number;
  text?: string;
  created?: Date;
  photo?: IPhoto;
  reviewer?: IUser;
}

export class Comment implements IComment {
  constructor(public id?: number, public text?: string, public created?: Date, public photo?: IPhoto, public reviewer?: IUser) {}
}
