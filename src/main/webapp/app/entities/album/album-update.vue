<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="onlinephotoalbumApp.album.home.createOrEditLabel" v-text="$t('onlinephotoalbumApp.album.home.createOrEditLabel')">Create or edit a Album</h2>
                <div>
                    <div class="form-group" v-if="album.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="album.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.album.title')" for="album-title">Title</label>
                        <input type="text" class="form-control" name="title" id="album-title"
                            :class="{'valid': !$v.album.title.$invalid, 'invalid': $v.album.title.$invalid }" v-model="$v.album.title.$model"  required/>
                        <div v-if="$v.album.title.$anyDirty && $v.album.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.album.title.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.album.description')" for="album-description">Description</label>
                        <textarea class="form-control" name="description" id="album-description"
                            :class="{'valid': !$v.album.description.$invalid, 'invalid': $v.album.description.$invalid }" v-model="$v.album.description.$model" ></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.album.created')" for="album-created">Created</label>
                        <div class="d-flex">
                            <input id="album-created" type="datetime-local" class="form-control" name="created" :class="{'valid': !$v.album.created.$invalid, 'invalid': $v.album.created.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.album.created.$model)"
                            @change="updateInstantField('created', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.album.user')" for="album-user">User</label>
                        <select class="form-control" id="album-user" name="user" v-model="album.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="album.user && userOption.id === album.user.id ? album.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.album.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./album-update.component.ts">
</script>
