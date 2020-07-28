import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import PhotoService from '../photo/photo.service';
import { IPhoto } from '@/shared/model/photo.model';

import AlertService from '@/shared/alert/alert.service';
import { ITag, Tag } from '@/shared/model/tag.model';
import TagService from './tag.service';

const validations: any = {
  tag: {
    name: {
      required,
      minLength: minLength(2),
    },
    created: {},
  },
};

@Component({
  validations,
})
export default class TagUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('tagService') private tagService: () => TagService;
  public tag: ITag = new Tag();

  @Inject('photoService') private photoService: () => PhotoService;

  public photos: IPhoto[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tagId) {
        vm.retrieveTag(to.params.tagId);
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
    if (this.tag.id) {
      this.tagService()
        .update(this.tag)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.tag.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.tagService()
        .create(this.tag)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('onlinephotoalbumApp.tag.created', { param: param.id });
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
      this.tag[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.tag[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.tag[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.tag[field] = null;
    }
  }

  public retrieveTag(tagId): void {
    this.tagService()
      .find(tagId)
      .then(res => {
        res.created = new Date(res.created);
        this.tag = res;
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
  }
}
