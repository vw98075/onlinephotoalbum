<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('onlinephotoalbumApp.album.home.title')" id="album-heading">Albums</span>
            <router-link :to="{name: 'AlbumCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-album">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('onlinephotoalbumApp.album.home.createLabel')">
                    Create a new Album
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
        <div class="alert alert-warning" v-if="!isFetching && albums && albums.length === 0">
            <span v-text="$t('onlinephotoalbumApp.album.home.notFound')">No albums found</span>
        </div>
        <div class="table-responsive" v-if="albums && albums.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('title')"><span v-text="$t('onlinephotoalbumApp.album.title')">Title</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'title'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('onlinephotoalbumApp.album.description')">Description</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('created')"><span v-text="$t('onlinephotoalbumApp.album.created')">Created</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'created'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('user.login')"><span v-text="$t('onlinephotoalbumApp.album.user')">User</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'user.login'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="album in albums"
                    :key="album.id">
                    <td>
                        <router-link :to="{name: 'AlbumView', params: {albumId: album.id}}">{{album.id}}</router-link>
                    </td>
                    <td>{{album.title}}</td>
                    <td>{{album.description}}</td>
                    <td>{{album.created ? $d(Date.parse(album.created), 'short') : ''}}</td>
                    <td>
                        {{album.user ? album.user.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'AlbumView', params: {albumId: album.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'AlbumEdit', params: {albumId: album.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(album)"
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
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="onlinephotoalbumApp.album.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-album-heading" v-text="$t('onlinephotoalbumApp.album.delete.question', {'id': removeId})">Are you sure you want to delete this Album?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-album" v-text="$t('entity.action.delete')" v-on:click="removeAlbum()">Delete</button>
            </div>
        </b-modal>
        <div v-show="albums && albums.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./album.component.ts">
</script>
