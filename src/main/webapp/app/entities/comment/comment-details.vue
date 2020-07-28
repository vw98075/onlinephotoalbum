<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="comment">
                <h2 class="jh-entity-heading"><span v-text="$t('onlinephotoalbumApp.comment.detail.title')">Comment</span> {{comment.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.comment.text')">Text</span>
                    </dt>
                    <dd>
                        <span>{{comment.text}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.comment.created')">Created</span>
                    </dt>
                    <dd>
                        <span v-if="comment.created">{{$d(Date.parse(comment.created), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.comment.photo')">Photo</span>
                    </dt>
                    <dd>
                        <div v-if="comment.photo">
                            <router-link :to="{name: 'PhotoView', params: {photoId: comment.photo.id}}">{{comment.photo.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.comment.reviewer')">Reviewer</span>
                    </dt>
                    <dd>
                        {{comment.reviewer ? comment.reviewer.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="comment.id" :to="{name: 'CommentEdit', params: {commentId: comment.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./comment-details.component.ts">
</script>
