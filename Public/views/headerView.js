class HeaderView {
  constructor() {
    this.bannerHiderTags = document.querySelectorAll(`#banner-hider-tag`);
    this.bannerDrop = document.querySelector(`.banner-dropdown-container`);
    this.bannerTags = document.querySelectorAll(`#banner-tag`);
    this.dropItems = document.querySelectorAll(`#items-holder`);
    this.bannerRows = document.querySelector(`.row-0`);
    this.content = document.querySelector(`.content`);
    this.loggedInUI = document.querySelector(`#account-dropdown`);
    this.logOutBtn = document.querySelector(`#log-out-btn`);
    this.loginBtn = document.querySelector(`#sign-in`);
    this.loggedStatus = document.querySelector('#sign-in').dataset.logged;
  }
  modalCloseBtn = document.querySelector(`#modal-close`);

  loginActivate = document.querySelector(`#login-activate`);
  loginModal = document.querySelector(`#for-login`);
  registerModal = document.querySelector(`#for-register`);
  resetPassModal = document.querySelector(`#for-reset`);
  registerSwitchBtn = document.querySelector(`#switch-register`);
  resetPassSwitchBtn = document.querySelector(`#forgot-password-btn`);
  tagData = '';
  holder = '';
}
export default new HeaderView();
