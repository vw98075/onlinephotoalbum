<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="onlinephotoalbumApp.thumbUp.home.createOrEditLabel" v-text="$t('onlinephotoalbumApp.thumbUp.home.createOrEditLabel')">Create or edit a ThumbUp</h2>
                <div>
                    <div class="form-group" v-if="thumbUp.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="thumbUp.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.thumbUp.created')" for="thumb-up-created">Created</label>
                        <div class="d-flex">
                            <input id="thumb-up-created" type="datetime-local" class="form-control" name="created" :class="{'valid': !$v.thumbUp.created.$invalid, 'invalid': $v.thumbUp.created.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.thumbUp.created.$model)"
                            @change="updateInstantField('created', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.thumbUp.photo')" for="thumb-up-photo">Photo</label>
                        <select class="form-control" id="thumb-up-photo" name="photo" v-model="thumbUp.photo">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="thumbUp.photo && photoOption.id === thumbUp.photo.id ? thumbUp.photo : photoOption" v-for="photoOption in photos" :key="photoOption.id">{{photoOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.thumbUp.reviewer')" for="thumb-up-reviewer">Reviewer</label>
                        <select class="form-control" id="thumb-up-reviewer" name="reviewer" v-model="thumbUp.reviewer">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="thumbUp.reviewer && userOption.id === thumbUp.reviewer.id ? thumbUp.reviewer : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.thumbUp.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./thumb-up-update.component.ts">
</script>
