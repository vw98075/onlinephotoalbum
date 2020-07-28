import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import UserService from '@/admin/user-management/user-management.service';

import AlertService from '@/shared/alert/alert.service';
import { IFollow, Follow } from '@/shared/model/follow.model';
import FollowService from './follow.service';

const validations: any = {
  follow: {
    requestTime: {},
    approved: {},
  },
};

@Component({
  validations,
})
export default class FollowUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('followService') private followService: () => FollowService;
  public follow: IFollow = new Follow();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.followId) {
        vm.retrieveFollow(to.params.followId);
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
    if (this.follow.id) {
      this.followService()
        .update(this.follow)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.follow.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.followService()
        .create(this.follow)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.follow.created', { param: param.id });
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
      this.follow[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.follow[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.follow[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.follow[field] = null;
    }
  }

  public retrieveFollow(followId): void {
    this.followService()
      .find(followId)
      .then(res => {
        res.requestTime = new Date(res.requestTime);
        this.follow = res;
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
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
  }
}
