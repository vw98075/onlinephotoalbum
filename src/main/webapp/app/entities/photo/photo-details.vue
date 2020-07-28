<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="photo">
                <h2 class="jh-entity-heading"><span v-text="$t('onlinephotoalbumApp.photo.detail.title')">Photo</span> {{photo.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{photo.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{photo.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.image')">Image</span>
                    </dt>
                    <dd>
                        <div v-if="photo.image">
                            <a v-on:click="openFile(photo.imageContentType, photo.image)">
                                <img v-bind:src="'data:' + photo.imageContentType + ';base64,' + photo.image" style="max-width: 100%;" alt="photo image"/>
                            </a>
                            {{photo.imageContentType}}, {{byteSize(photo.image)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.height')">Height</span>
                    </dt>
                    <dd>
                        <span>{{photo.height}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.width')">Width</span>
                    </dt>
                    <dd>
                        <span>{{photo.width}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.taken')">Taken</span>
                    </dt>
                    <dd>
                        <span v-if="photo.taken">{{$d(Date.parse(photo.taken), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.uploaded')">Uploaded</span>
                    </dt>
                    <dd>
                        <span v-if="photo.uploaded">{{$d(Date.parse(photo.uploaded), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.album')">Album</span>
                    </dt>
                    <dd>
                        <div v-if="photo.album">
                            <router-link :to="{name: 'AlbumView', params: {albumId: photo.album.id}}">{{photo.album.title}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.user')">User</span>
                    </dt>
                    <dd>
                        {{photo.user ? photo.user.login : ''}}
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.photo.tag')">Tag</span>
                    </dt>
                    <dd>
                        <span v-for="(tag, i) in photo.tags" :key="tag.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'TagView', params: {tagId: tag.id}}">{{tag.name}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="photo.id" :to="{name: 'PhotoEdit', params: {photoId: photo.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./photo-details.component.ts">
</script>
