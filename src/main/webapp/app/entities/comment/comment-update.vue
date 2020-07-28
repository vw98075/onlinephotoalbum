<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="onlinephotoalbumApp.comment.home.createOrEditLabel" v-text="$t('onlinephotoalbumApp.comment.home.createOrEditLabel')">Create or edit a Comment</h2>
                <div>
                    <div class="form-group" v-if="comment.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="comment.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.comment.text')" for="comment-text">Text</label>
                        <input type="text" class="form-control" name="text" id="comment-text"
                            :class="{'valid': !$v.comment.text.$invalid, 'invalid': $v.comment.text.$invalid }" v-model="$v.comment.text.$model"  required/>
                        <div v-if="$v.comment.text.$anyDirty && $v.comment.text.$invalid">
                            <small class="form-text text-danger" v-if="!$v.comment.text.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.comment.text.minLength" v-text="$t('entity.validation.minlength', {min: 9})">
                                This field is required to be at least 9 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.comment.created')" for="comment-created">Created</label>
                        <div class="d-flex">
                            <input id="comment-created" type="datetime-local" class="form-control" name="created" :class="{'valid': !$v.comment.created.$invalid, 'invalid': $v.comment.created.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.comment.created.$model)"
                            @change="updateInstantField('created', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.comment.photo')" for="comment-photo">Photo</label>
                        <select class="form-control" id="comment-photo" name="photo" v-model="comment.photo">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="comment.photo && photoOption.id === comment.photo.id ? comment.photo : photoOption" v-for="photoOption in photos" :key="photoOption.id">{{photoOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.comment.reviewer')" for="comment-reviewer">Reviewer</label>
                        <select class="form-control" id="comment-reviewer" name="reviewer" v-model="comment.reviewer">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="comment.reviewer && userOption.id === comment.reviewer.id ? comment.reviewer : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.comment.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./comment-update.component.ts">
</script>
