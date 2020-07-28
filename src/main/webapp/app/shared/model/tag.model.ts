import { IPhoto } from '@/shared/model/photo.model';

export interface ITag {
  id?: number;
  name?: string;
  created?: Date;
  photos?: IPhoto[];
}

export class Tag implements ITag {
  constructor(public id?: number, public name?: string, public created?: Date, public photos?: IPhoto[]) {}
}
