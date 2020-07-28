import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ThumbUpUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlinephotoalbumApp.thumbUp.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  createdInput: ElementFinder = element(by.css('input#thumb-up-created'));

  photoSelect = element(by.css('select#thumb-up-photo'));

  reviewerSelect = element(by.css('select#thumb-up-reviewer'));
}
