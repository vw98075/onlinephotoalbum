<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="onlinephotoalbumApp.photo.home.createOrEditLabel" v-text="$t('onlinephotoalbumApp.photo.home.createOrEditLabel')">Create or edit a Photo</h2>
                <div>
                    <div class="form-group" v-if="photo.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="photo.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.title')" for="photo-title">Title</label>
                        <input type="text" class="form-control" name="title" id="photo-title"
                            :class="{'valid': !$v.photo.title.$invalid, 'invalid': $v.photo.title.$invalid }" v-model="$v.photo.title.$model"  required/>
                        <div v-if="$v.photo.title.$anyDirty && $v.photo.title.$invalid">
                            <small class="form-text text-danger" v-if="!$v.photo.title.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.description')" for="photo-description">Description</label>
                        <textarea class="form-control" name="description" id="photo-description"
                            :class="{'valid': !$v.photo.description.$invalid, 'invalid': $v.photo.description.$invalid }" v-model="$v.photo.description.$model" ></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.image')" for="photo-image">Image</label>
                        <div>
                            <img v-bind:src="'data:' + photo.imageContentType + ';base64,' + photo.image" style="max-height: 100px;" v-if="photo.image" alt="photo image"/>
                            <div v-if="photo.image" class="form-text text-danger clearfix">
                                <span class="pull-left">{{photo.imageContentType}}, {{byteSize(photo.image)}}</span>
                                <button type="button" v-on:click="clearInputImage('image', 'imageContentType', 'file_image')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_image" id="file_image" v-on:change="setFileData($event, photo, 'image', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="image" id="photo-image"
                            :class="{'valid': !$v.photo.image.$invalid, 'invalid': $v.photo.image.$invalid }" v-model="$v.photo.image.$model"  required/>
                        <input type="hidden" class="form-control" name="imageContentType" id="photo-imageContentType"
                            v-model="photo.imageContentType" />
                        <div v-if="$v.photo.image.$anyDirty && $v.photo.image.$invalid">
                            <small class="form-text text-danger" v-if="!$v.photo.image.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.height')" for="photo-height">Height</label>
                        <input type="number" class="form-control" name="height" id="photo-height"
                            :class="{'valid': !$v.photo.height.$invalid, 'invalid': $v.photo.height.$invalid }" v-model.number="$v.photo.height.$model" readOnly/>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.width')" for="photo-width">Width</label>
                        <input type="number" class="form-control" name="width" id="photo-width"
                            :class="{'valid': !$v.photo.width.$invalid, 'invalid': $v.photo.width.$invalid }" v-model.number="$v.photo.width.$model" readOnly/>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.taken')" for="photo-taken">Taken</label>
                        <div class="d-flex">
                            <input id="photo-taken" type="datetime-local" class="form-control" name="taken" :class="{'valid': !$v.photo.taken.$invalid, 'invalid': $v.photo.taken.$invalid }"

                            :value="convertDateTimeFromServer($v.photo.taken.$model)"
                            @change="updateInstantField('taken', $event)" readOnly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.uploaded')" for="photo-uploaded">Uploaded</label>
                        <div class="d-flex">
                            <input id="photo-uploaded" type="datetime-local" class="form-control" name="uploaded" :class="{'valid': !$v.photo.uploaded.$invalid, 'invalid': $v.photo.uploaded.$invalid }"

                            :value="convertDateTimeFromServer($v.photo.uploaded.$model)"
                            @change="updateInstantField('uploaded', $event)" readOnly/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.album')" for="photo-album">Album</label>
                        <select class="form-control" id="photo-album" name="album" v-model="photo.album">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="photo.album && albumOption.id === photo.album.id ? photo.album : albumOption" v-for="albumOption in albums" :key="albumOption.id">{{albumOption.title}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('onlinephotoalbumApp.photo.user')" for="photo-user">User</label>
                        <select class="form-control" id="photo-user" name="user" v-model="photo.user">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="photo.user && userOption.id === photo.user.id ? photo.user : userOption" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('onlinephotoalbumApp.photo.tag')" for="photo-tag">Tag</label>
                        <select class="form-control" id="photo-tag" multiple name="tag" v-model="photo.tags">
                            <option v-bind:value="getSelected(photo.tags, tagOption)" v-for="tagOption in tags" :key="tagOption.id">{{tagOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.photo.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./photo-update.component.ts">
</script>
