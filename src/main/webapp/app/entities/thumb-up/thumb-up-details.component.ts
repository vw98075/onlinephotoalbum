import { Component, Vue, Inject } from 'vue-property-decorator';

import { IThumbUp } from '@/shared/model/thumb-up.model';
import ThumbUpService from './thumb-up.service';

@Component
export default class ThumbUpDetails extends Vue {
  @Inject('thumbUpService') private thumbUpService: () => ThumbUpService;
  public thumbUp: IThumbUp = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.thumbUpId) {
        vm.retrieveThumbUp(to.params.thumbUpId);
      }
    });
  }

  public retrieveThumbUp(thumbUpId) {
    this.thumbUpService()
      .find(thumbUpId)
      .then(res => {
        this.thumbUp = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
