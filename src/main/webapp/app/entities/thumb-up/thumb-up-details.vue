<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="thumbUp">
                <h2 class="jh-entity-heading"><span v-text="$t('onlinephotoalbumApp.thumbUp.detail.title')">ThumbUp</span> {{thumbUp.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.thumbUp.created')">Created</span>
                    </dt>
                    <dd>
                        <span v-if="thumbUp.created">{{$d(Date.parse(thumbUp.created), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.thumbUp.photo')">Photo</span>
                    </dt>
                    <dd>
                        <div v-if="thumbUp.photo">
                            <router-link :to="{name: 'PhotoView', params: {photoId: thumbUp.photo.id}}">{{thumbUp.photo.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.thumbUp.reviewer')">Reviewer</span>
                    </dt>
                    <dd>
                        {{thumbUp.reviewer ? thumbUp.reviewer.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="thumbUp.id" :to="{name: 'ThumbUpEdit', params: {thumbUpId: thumbUp.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./thumb-up-details.component.ts">
</script>
