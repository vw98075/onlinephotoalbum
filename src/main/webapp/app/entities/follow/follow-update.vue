<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="onlinephotoalbumApp.follow.home.createOrEditLabel" v-text="$t('onlinephotoalbumApp.follow.home.createOrEditLabel')">Create or edit a Follow</h2>
                <div>
                    <div class="form-group" v-if="follow.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="follow.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.follow.requestTime')" for="follow-requestTime">Request Time</label>
                        <div class="d-flex">
                            <input id="follow-requestTime" type="datetime-local" class="form-control" name="requestTime" :class="{'valid': !$v.follow.requestTime.$invalid, 'invalid': $v.follow.requestTime.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.follow.requestTime.$model)"
                            @change="updateInstantField('requestTime', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.follow.approved')" for="follow-approved">Approved</label>
                        <input type="checkbox" class="form-check" name="approved" id="follow-approved"
                            :class="{'valid': !$v.follow.approved.$invalid, 'invalid': $v.follow.approved.$invalid }" v-model="$v.follow.approved.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.follow.follower')" for="follow-follower">Follower</label>
                        <select class="form-control" id="follow-follower" name="follower" v-model="follow.follower">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="follow.follower && userOption.id === follow.follower.id ? follow.follower : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.follow.following')" for="follow-following">Following</label>
                        <select class="form-control" id="follow-following" name="following" v-model="follow.following">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="follow.following && userOption.id === follow.following.id ? follow.following : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.follow.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./follow-update.component.ts">
</script>
