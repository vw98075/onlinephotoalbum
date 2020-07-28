<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('onlinephotoalbumApp.follow.home.title')" id="follow-heading">Follows</span>
            <router-link :to="{name: 'FollowCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-follow">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('onlinephotoalbumApp.follow.home.createLabel')">
                    Create a new Follow
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
        <div class="alert alert-warning" v-if="!isFetching && follows && follows.length === 0">
            <span v-text="$t('onlinephotoalbumApp.follow.home.notFound')">No follows found</span>
        </div>
        <div class="table-responsive" v-if="follows && follows.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('requestTime')"><span v-text="$t('onlinephotoalbumApp.follow.requestTime')">Request Time</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'requestTime'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('approved')"><span v-text="$t('onlinephotoalbumApp.follow.approved')">Approved</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'approved'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('follower.login')"><span v-text="$t('onlinephotoalbumApp.follow.follower')">Follower</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'follower.login'"></jhi-sort-indicator></th>
                    <th v-on:click="changeOrder('following.login')"><span v-text="$t('onlinephotoalbumApp.follow.following')">Following</span> <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'following.login'"></jhi-sort-indicator></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="follow in follows"
                    :key="follow.id">
                    <td>
                        <router-link :to="{name: 'FollowView', params: {followId: follow.id}}">{{follow.id}}</router-link>
                    </td>
                    <td>{{follow.requestTime ? $d(Date.parse(follow.requestTime), 'short') : ''}}</td>
                    <td>{{follow.approved}}</td>
                    <td>
                        {{follow.follower ? follow.follower.login : ''}}
                    </td>
                    <td>
                        {{follow.following ? follow.following.login : ''}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'FollowView', params: {followId: follow.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'FollowEdit', params: {followId: follow.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(follow)"
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
            <span slot="modal-title"><span id="onlinephotoalbumApp.follow.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-follow-heading" v-text="$t('onlinephotoalbumApp.follow.delete.question', {'id': removeId})">Are you sure you want to delete this Follow?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-follow" v-text="$t('entity.action.delete')" v-on:click="removeFollow()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./follow.component.ts">
</script>
