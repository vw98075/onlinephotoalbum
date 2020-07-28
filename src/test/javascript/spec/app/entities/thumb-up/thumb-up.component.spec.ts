/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ThumbUpComponent from '@/entities/thumb-up/thumb-up.vue';
import ThumbUpClass from '@/entities/thumb-up/thumb-up.component';
import ThumbUpService from '@/entities/thumb-up/thumb-up.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('ThumbUp Management Component', () => {
    let wrapper: Wrapper<ThumbUpClass>;
    let comp: ThumbUpClass;
    let thumbUpServiceStub: SinonStubbedInstance<ThumbUpService>;

    beforeEach(() => {
      thumbUpServiceStub = sinon.createStubInstance<ThumbUpService>(ThumbUpService);
      thumbUpServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ThumbUpClass>(ThumbUpComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          thumbUpService: () => thumbUpServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      thumbUpServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllThumbUps();
      await comp.$nextTick();

      // THEN
      expect(thumbUpServiceStub.retrieve.called).toBeTruthy();
      expect(comp.thumbUps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      thumbUpServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(thumbUpServiceStub.retrieve.called).toBeTruthy();
      expect(comp.thumbUps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      thumbUpServiceStub.retrieve.reset();
      thumbUpServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(thumbUpServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.thumbUps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      thumbUpServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeThumbUp();
      await comp.$nextTick();

      // THEN
      expect(thumbUpServiceStub.delete.called).toBeTruthy();
      expect(thumbUpServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
