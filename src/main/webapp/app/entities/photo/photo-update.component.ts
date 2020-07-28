import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlbumService from '../album/album.service';
import { IAlbum } from '@/shared/model/album.model';

import UserService from '@/admin/user-management/user-management.service';

import TagService from '../tag/tag.service';
import { ITag } from '@/shared/model/tag.model';

import AlertService from '@/shared/alert/alert.service';
import { IPhoto, Photo } from '@/shared/model/photo.model';
import PhotoService from './photo.service';

const validations: any = {
  photo: {
    title: {
      required,
    },
    description: {},
    image: {
      required,
    },
    height: {},
    width: {},
    taken: {},
    uploaded: {},
  },
};

@Component({
  validations,
})
export default class PhotoUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('photoService') private photoService: () => PhotoService;
  public photo: IPhoto = new Photo();

  @Inject('albumService') private albumService: () => AlbumService;

  public albums: IAlbum[] = [];

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('tagService') private tagService: () => TagService;

  public tags: ITag[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.photoId) {
        vm.retrievePhoto(to.params.photoId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
    this.photo.tags = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.photo.id) {
      this.photoService()
        .update(this.photo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.photo.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.photoService()
        .create(this.photo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.photo.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.photo[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.photo[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.photo[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.photo[field] = null;
    }
  }

  public retrievePhoto(photoId): void {
    this.photoService()
      .find(photoId)
      .then(res => {
        res.taken = new Date(res.taken);
        res.uploaded = new Date(res.uploaded);
        this.photo = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.photo && field && fieldContentType) {
      if (this.photo.hasOwnProperty(field)) {
        this.photo[field] = null;
      }
      if (this.photo.hasOwnProperty(fieldContentType)) {
        this.photo[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.albumService()
      .retrieve()
      .then(res => {
        this.albums = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.tagService()
      .retrieve()
      .then(res => {
        this.tags = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
