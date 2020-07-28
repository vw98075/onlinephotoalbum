<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="follow">
                <h2 class="jh-entity-heading"><span v-text="$t('onlinephotoalbumApp.follow.detail.title')">Follow</span> {{follow.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.follow.requestTime')">Request Time</span>
                    </dt>
                    <dd>
                        <span v-if="follow.requestTime">{{$d(Date.parse(follow.requestTime), 'long') }}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.follow.approved')">Approved</span>
                    </dt>
                    <dd>
                        <span>{{follow.approved}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.follow.follower')">Follower</span>
                    </dt>
                    <dd>
                        {{follow.follower ? follow.follower.login : ''}}
                    </dd>
                    <dt>
                        <span v-text="$t('onlinephotoalbumApp.follow.following')">Following</span>
                    </dt>
                    <dd>
                        {{follow.following ? follow.following.login : ''}}
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="follow.id" :to="{name: 'FollowEdit', params: {followId: follow.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./follow-details.component.ts">
</script>
