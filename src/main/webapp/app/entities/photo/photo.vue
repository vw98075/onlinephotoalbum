<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('onlinephotoalbumApp.photo.home.title')" id="photo-heading">Photos</span>
            <router-link :to="{name: 'PhotoCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-photo">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('onlinephotoalbumApp.photo.home.createLabel')">
                    Create a new Photo
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && photos && photos.length === 0">
            <span v-text="$t('onlinephotoalbumApp.photo.home.notFound')">No photos found</span>
        </div>
        <div class="table-responsive" v-if="photos && photos.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('title')"><span v-text="$t('onlinephotoalbumApp.photo.title')">Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('onlinephotoalbumApp.photo.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('image')"><span v-text="$t('onlinephotoalbumApp.photo.image')">Image</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'image'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('height')"><span v-text="$t('onlinephotoalbumApp.photo.height')">Height</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'height'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('width')"><span v-text="$t('onlinephotoalbumApp.photo.width')">Width</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'width'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('taken')"><span v-text="$t('onlinephotoalbumApp.photo.taken')">Taken</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'taken'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('uploaded')"><span v-text="$t('onlinephotoalbumApp.photo.uploaded')">Uploaded</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'uploaded'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('album.title')"><span v-text="$t('onlinephotoalbumApp.photo.album')">Album</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'album.title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('user.login')"><span v-text="$t('onlinephotoalbumApp.photo.user')">User</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.login'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="photo in photos"
                    :key="photo.id">
                    <td>
                        <router-link :to="{name: 'PhotoView', params: {photoId: photo.id}}">{{photo.id}}</router-link>
                    </td>
                    <td>{{photo.title}}</td>
                    <td>{{photo.description}}</td>
                    <td>
                        <a v-if="photo.image" v-on:click="openFile(photo.imageContentType, photo.image)">
                            <img v-bind:src="'data:' + photo.imageContentType + ';base64,' + photo.image" style="max-height: 30px;" alt="photo image"/>
                        </a>
                        <span v-if="photo.image">{{photo.imageContentType}}, {{byteSize(photo.image)}}</span>
                    </td>
                    <td>{{photo.height}}</td>
                    <td>{{photo.width}}</td>
                    <td>{{photo.taken ? $d(Date.parse(photo.taken), 'short') : ''}}</td>
                    <td>{{photo.uploaded ? $d(Date.parse(photo.uploaded), 'short') : ''}}</td>
                    <td>
                        <div v-if="photo.album">
                            <router-link :to="{name: 'AlbumView', params: {albumId: photo.album.id}}">{{photo.album.title}}</router-link>
                        </div>
                    </td>
                    <td>
                        {{photo.user ? photo.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'PhotoView', params: {photoId: photo.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'PhotoEdit', params: {photoId: photo.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(photo)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
                <infinite-loading
                    ref="infiniteLoading"
                    v-if="totalItems > itemsPerPage"
                    :identifier="infiniteId"
                    slot="append"
                    @infinite="loadMore"
                    force-use-infinite-wrapper=".el-table__body-wrapper"
                    :distance='20'>
                </infinite-loading>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="onlinephotoalbumApp.photo.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-photo-heading" v-text="$t('onlinephotoalbumApp.photo.delete.question', {'id': removeId})">Are you sure you want to delete this Photo?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-photo" v-text="$t('entity.action.delete')" v-on:click="removePhoto()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./photo.component.ts">
</script>
