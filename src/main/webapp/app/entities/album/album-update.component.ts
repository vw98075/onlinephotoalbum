import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IAlbum, Album } from '@/shared/model/album.model';
import AlbumService from './album.service';

const validations: any = {
  album: {
    title: {
      required,
    },
    description: {},
    created: {},
  },
};

@Component({
  validations,
})
export default class AlbumUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('albumService') private albumService: () => AlbumService;
  public album: IAlbum = new Album();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.albumId) {
        vm.retrieveAlbum(to.params.albumId);
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
  }

  public save(): void {
    this.isSaving = true;
    if (this.album.id) {
      this.albumService()
        .update(this.album)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.album.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.albumService()
        .create(this.album)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.album.created', { param: param.id });
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
      this.album[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.album[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.album[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.album[field] = null;
    }
  }

  public retrieveAlbum(albumId): void {
    this.albumService()
      .find(albumId)
      .then(res => {
        res.created = new Date(res.created);
        this.album = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
