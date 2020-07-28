<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="album">
                <h2 class="jh-entity-heading"><span v-text="$t('onlinephotoalbumApp.album.detail.title')">Album</span> {{album.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.album.title')">Title</span>
                    </dt>
                    <dd>
                        <span>{{album.title}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.album.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{album.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.album.created')">Created</span>
                    </dt>
                    <dd>
                        <span v-if="album.created">{{$d(Date.parse(album.created), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.album.user')">User</span>
                    </dt>
                    <dd>
                        {{album.user ? album.user.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="album.id" :to="{name: 'AlbumEdit', params: {albumId: album.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./album-details.component.ts">
</script>
