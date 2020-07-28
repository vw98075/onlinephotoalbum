/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AlbumDetailComponent from '@/entities/album/album-details.vue';
import AlbumClass from '@/entities/album/album-details.component';
import AlbumService from '@/entities/album/album.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Album Management Detail Component', () => {
    let wrapper: Wrapper<AlbumClass>;
    let comp: AlbumClass;
    let albumServiceStub: SinonStubbedInstance<AlbumService>;

    beforeEach(() => {
      albumServiceStub = sinon.createStubInstance<AlbumService>(AlbumService);

      wrapper = shallowMount<AlbumClass>(AlbumDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { albumService: () => albumServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAlbum = { id: 123 };
        albumServiceStub.find.resolves(foundAlbum);

        // WHEN
        comp.retrieveAlbum(123);
        await comp.$nextTick();

        // THEN
        expect(comp.album).toBe(foundAlbum);
      });
    });
  });
});
