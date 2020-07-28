import { IPhoto } from '@/shared/model/photo.model';
import { IUser } from '@/shared/model/user.model';

export interface IThumbUp {
  id?: number;
  created?: Date;
  photo?: IPhoto;
  reviewer?: IUser;
}

export class ThumbUp implements IThumbUp {
  constructor(public id?: number, public created?: Date, public photo?: IPhoto, public reviewer?: IUser) {}
}
