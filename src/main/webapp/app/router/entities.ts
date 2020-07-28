import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Album = () => import('@/entities/album/album.vue');
// prettier-ignore
const AlbumUpdate = () => import('@/entities/album/album-update.vue');
// prettier-ignore
const AlbumDetails = () => import('@/entities/album/album-details.vue');
// prettier-ignore
const Photo = () => import('@/entities/photo/photo.vue');
// prettier-ignore
const PhotoUpdate = () => import('@/entities/photo/photo-update.vue');
// prettier-ignore
const PhotoDetails = () => import('@/entities/photo/photo-details.vue');
// prettier-ignore
const Tag = () => import('@/entities/tag/tag.vue');
// prettier-ignore
const TagUpdate = () => import('@/entities/tag/tag-update.vue');
// prettier-ignore
const TagDetails = () => import('@/entities/tag/tag-details.vue');
// prettier-ignore
const ThumbUp = () => import('@/entities/thumb-up/thumb-up.vue');
// prettier-ignore
const ThumbUpUpdate = () => import('@/entities/thumb-up/thumb-up-update.vue');
// prettier-ignore
const ThumbUpDetails = () => import('@/entities/thumb-up/thumb-up-details.vue');
// prettier-ignore
const Comment = () => import('@/entities/comment/comment.vue');
// prettier-ignore
const CommentUpdate = () => import('@/entities/comment/comment-update.vue');
// prettier-ignore
const CommentDetails = () => import('@/entities/comment/comment-details.vue');
// prettier-ignore
const Follow = () => import('@/entities/follow/follow.vue');
// prettier-ignore
const FollowUpdate = () => import('@/entities/follow/follow-update.vue');
// prettier-ignore
const FollowDetails = () => import('@/entities/follow/follow-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/album',
    name: 'Album',
    component: Album,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album/new',
    name: 'AlbumCreate',
    component: AlbumUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album/:albumId/edit',
    name: 'AlbumEdit',
    component: AlbumUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/album/:albumId/view',
    name: 'AlbumView',
    component: AlbumDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/photo',
    name: 'Photo',
    component: Photo,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/photo/new',
    name: 'PhotoCreate',
    component: PhotoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/photo/:photoId/edit',
    name: 'PhotoEdit',
    component: PhotoUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/photo/:photoId/view',
    name: 'PhotoView',
    component: PhotoDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tag',
    name: 'Tag',
    component: Tag,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tag/new',
    name: 'TagCreate',
    component: TagUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tag/:tagId/edit',
    name: 'TagEdit',
    component: TagUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/tag/:tagId/view',
    name: 'TagView',
    component: TagDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/thumb-up',
    name: 'ThumbUp',
    component: ThumbUp,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/thumb-up/new',
    name: 'ThumbUpCreate',
    component: ThumbUpUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/thumb-up/:thumbUpId/edit',
    name: 'ThumbUpEdit',
    component: ThumbUpUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/thumb-up/:thumbUpId/view',
    name: 'ThumbUpView',
    component: ThumbUpDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/new',
    name: 'CommentCreate',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/edit',
    name: 'CommentEdit',
    component: CommentUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/comment/:commentId/view',
    name: 'CommentView',
    component: CommentDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/follow',
    name: 'Follow',
    component: Follow,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/follow/new',
    name: 'FollowCreate',
    component: FollowUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/follow/:followId/edit',
    name: 'FollowEdit',
    component: FollowUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/follow/:followId/view',
    name: 'FollowView',
    component: FollowDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
