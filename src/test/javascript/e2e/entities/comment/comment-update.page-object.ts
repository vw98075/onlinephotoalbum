import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class CommentUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlinephotoalbumApp.comment.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  textInput: ElementFinder = element(by.css('input#comment-text'));

  createdInput: ElementFinder = element(by.css('input#comment-created'));

  photoSelect = element(by.css('select#comment-photo'));

  reviewerSelect = element(by.css('select#comment-reviewer'));
}
