/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ThumbUpDetailComponent from '@/entities/thumb-up/thumb-up-details.vue';
import ThumbUpClass from '@/entities/thumb-up/thumb-up-details.component';
import ThumbUpService from '@/entities/thumb-up/thumb-up.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('ThumbUp Management Detail Component', () => {
    let wrapper: Wrapper<ThumbUpClass>;
    let comp: ThumbUpClass;
    let thumbUpServiceStub: SinonStubbedInstance<ThumbUpService>;

    beforeEach(() => {
      thumbUpServiceStub = sinon.createStubInstance<ThumbUpService>(ThumbUpService);

      wrapper = shallowMount<ThumbUpClass>(ThumbUpDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { thumbUpService: () => thumbUpServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundThumbUp = { id: 123 };
        thumbUpServiceStub.find.resolves(foundThumbUp);

        // WHEN
        comp.retrieveThumbUp(123);
        await comp.$nextTick();

        // THEN
        expect(comp.thumbUp).toBe(foundThumbUp);
      });
    });
  });
});
