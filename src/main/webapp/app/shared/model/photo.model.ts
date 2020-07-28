import { IAlbum } from '@/shared/model/album.model';
import { IUser } from '@/shared/model/user.model';
import { ITag } from '@/shared/model/tag.model';

export interface IPhoto {
  id?: number;
  title?: string;
  description?: any;
  imageContentType?: string;
  image?: any;
  height?: number;
  width?: number;
  taken?: Date;
  uploaded?: Date;
  album?: IAlbum;
  user?: IUser;
  tags?: ITag[];
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public title?: string,
    public description?: any,
    public imageContentType?: string,
    public image?: any,
    public height?: number,
    public width?: number,
    public taken?: Date,
    public uploaded?: Date,
    public album?: IAlbum,
    public user?: IUser,
    public tags?: ITag[]
  ) {}
}
