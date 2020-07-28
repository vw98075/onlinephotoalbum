import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class FollowUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlinephotoalbumApp.follow.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  requestTimeInput: ElementFinder = element(by.css('input#follow-requestTime'));

  approvedInput: ElementFinder = element(by.css('input#follow-approved'));
  followerSelect = element(by.css('select#follow-follower'));

  followingSelect = element(by.css('select#follow-following'));
}
