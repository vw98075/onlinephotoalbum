<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('onlinephotoalbumApp.comment.home.title')" id="comment-heading">Comments</span>
            <router-link :to="{name: 'CommentCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-comment">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('onlinephotoalbumApp.comment.home.createLabel')">
                    Create a new Comment
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
        <div class="alert alert-warning" v-if="!isFetching && comments && comments.length === 0">
            <span v-text="$t('onlinephotoalbumApp.comment.home.notFound')">No comments found</span>
        </div>
        <div class="table-responsive" v-if="comments && comments.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('text')"><span v-text="$t('onlinephotoalbumApp.comment.text')">Text</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'text'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('created')"><span v-text="$t('onlinephotoalbumApp.comment.created')">Created</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'created'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('photo.id')"><span v-text="$t('onlinephotoalbumApp.comment.photo')">Photo</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'photo.id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('reviewer.login')"><span v-text="$t('onlinephotoalbumApp.comment.reviewer')">Reviewer</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'reviewer.login'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="comment in comments"
                    :key="comment.id">
                    <td>
                        <router-link :to="{name: 'CommentView', params: {commentId: comment.id}}">{{comment.id}}</router-link>
                    </td>
                    <td>{{comment.text}}</td>
                    <td>{{comment.created ? $d(Date.parse(comment.created), 'short') : ''}}</td>
                    <td>
                        <div v-if="comment.photo">
                            <router-link :to="{name: 'PhotoView', params: {photoId: comment.photo.id}}">{{comment.photo.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        {{comment.reviewer ? comment.reviewer.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'CommentView', params: {commentId: comment.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'CommentEdit', params: {commentId: comment.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(comment)"
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
            <span slot="modal-title"><span id="onlinephotoalbumApp.comment.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-comment-heading" v-text="$t('onlinephotoalbumApp.comment.delete.question', {'id': removeId})">Are you sure you want to delete this Comment?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-comment" v-text="$t('entity.action.delete')" v-on:click="removeComment()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./comment.component.ts">
</script>
