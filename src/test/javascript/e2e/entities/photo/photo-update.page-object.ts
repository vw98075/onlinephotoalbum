import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class PhotoUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('onlinephotoalbumApp.photo.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#photo-title'));

  descriptionInput: ElementFinder = element(by.css('textarea#photo-description'));

  imageInput: ElementFinder = element(by.css('input#file_image'));

  heightInput: ElementFinder = element(by.css('input#photo-height'));

  widthInput: ElementFinder = element(by.css('input#photo-width'));

  takenInput: ElementFinder = element(by.css('input#photo-taken'));

  uploadedInput: ElementFinder = element(by.css('input#photo-uploaded'));

  albumSelect = element(by.css('select#photo-album'));

  userSelect = element(by.css('select#photo-user'));

  tagSelect = element(by.css('select#photo-tag'));
}
