import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AlbumUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlinephotoalbumApp.album.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#album-title'));

  descriptionInput: ElementFinder = element(by.css('textarea#album-description'));

  createdInput: ElementFinder = element(by.css('input#album-created'));

  userSelect = element(by.css('select#album-user'));
}
