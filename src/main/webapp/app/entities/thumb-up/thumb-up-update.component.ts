import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import PhotoService from '../photo/photo.service';
import { IPhoto } from '@/shared/model/photo.model';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IThumbUp, ThumbUp } from '@/shared/model/thumb-up.model';
import ThumbUpService from './thumb-up.service';

const validations: any = {
  thumbUp: {
    created: {},
  },
};

@Component({
  validations,
})
export default class ThumbUpUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('thumbUpService') private thumbUpService: () => ThumbUpService;
  public thumbUp: IThumbUp = new ThumbUp();

  @Inject('photoService') private photoService: () => PhotoService;

  public photos: IPhoto[] = [];

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.thumbUpId) {
        vm.retrieveThumbUp(to.params.thumbUpId);
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
    if (this.thumbUp.id) {
      this.thumbUpService()
        .update(this.thumbUp)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.thumbUp.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.thumbUpService()
        .create(this.thumbUp)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.thumbUp.created', { param: param.id });
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
      this.thumbUp[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.thumbUp[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.thumbUp[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.thumbUp[field] = null;
    }
  }

  public retrieveThumbUp(thumbUpId): void {
    this.thumbUpService()
      .find(thumbUpId)
      .then(res => {
        res.created = new Date(res.created);
        this.thumbUp = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.photoService()
      .retrieve()
      .then(res => {
        this.photos = res.data;
      });
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
