<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('onlinephotoalbumApp.tag.home.title')" id="tag-heading">Tags</span>
            <router-link :to="{name: 'TagCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-tag">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('onlinephotoalbumApp.tag.home.createLabel')">
                    Create a new Tag
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
        <div class="alert alert-warning" v-if="!isFetching && tags && tags.length === 0">
            <span v-text="$t('onlinephotoalbumApp.tag.home.notFound')">No tags found</span>
        </div>
        <div class="table-responsive" v-if="tags && tags.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('onlinephotoalbumApp.tag.name')">Name</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('created')"><span v-text="$t('onlinephotoalbumApp.tag.created')">Created</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'created'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="tag in tags"
                    :key="tag.id">
                    <td>
                        <router-link :to="{name: 'TagView', params: {tagId: tag.id}}">{{tag.id}}</router-link>
                    </td>
                    <td>{{tag.name}}</td>
                    <td>{{tag.created ? $d(Date.parse(tag.created), 'short') : ''}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TagView', params: {tagId: tag.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TagEdit', params: {tagId: tag.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(tag)"
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
            <span slot="modal-title"><span id="onlinephotoalbumApp.tag.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-tag-heading" v-text="$t('onlinephotoalbumApp.tag.delete.question', {'id': removeId})">Are you sure you want to delete this Tag?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-tag" v-text="$t('entity.action.delete')" v-on:click="removeTag()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./tag.component.ts">
</script>
