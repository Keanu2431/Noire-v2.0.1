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
  }
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

//

//
//
// loginActivate = document.querySelector(`#login-activate`);
// loginModal = document.querySelector(`#for-login`);
// registerModal = document.querySelector(`#for-register`);
// resetPassModal = document.querySelector(`#for-reset`);
// registerSwitchBtn = document.querySelector(`#switch-register`);
// resetPassSwitchBtn = document.querySelector(`#forgot-password-btn`);
//functions
const loginActivateFunc = function () {
  if (signedInStatus == `signed-in`) {
    window.location.href = `/account/profile.html`;
  } else {
    registerModal.classList.add(`hidden`);
    resetPassModal.classList.add(`hidden`);
    loginModal.classList.remove(`hidden`);
    loginErr.classList.add(`hidden`);
    loginActivate.click();
  }
};
const registerSwitch = function () {
  loginModal.classList.add(`hidden`);
  resetPassModal.classList.add(`hidden`);

  registerModal.classList.remove(`hidden`);
  registerModal.classList.add(`fade-in`);
};
const resetPassSwitch = function () {
  loginModal.classList.add(`hidden`);
  registerModal.classList.add(`hidden`);
  resetPassModal.classList.remove(`hidden`);
  resetPassModal.classList.add(`fade-in`);
};
// IMPLEMENTATION
// loginBtn?.addEventListener(`click`, loginActivateFunc);
// registerSwitchBtn?.addEventListener(`click`, registerSwitch);
// resetPassSwitchBtn?.addEventListener(`click`, resetPassSwitch);
// SECTION 3 SWITCHING LOGIN/REGISTER/FORGOT Modal
//
// loginBtn?.addEventListener(`mouseover`, loggedUIDrop);
// bannerTags.forEach(function (tag) {
//   tag.addEventListener(`mouseover`, tagDrop);
// });
// content?.addEventListener(`mouseover`, function (e) {
//   bannerDrop.classList.add(`hidden`);
//   loggedInUI.classList.add(`hidden`);
// });
// bannerRows?.addEventListener(`mouseover`, function (e) {
//   bannerDrop.classList.add(`hidden`);
// });
// bannerHiderTags.forEach(function (hiderTag) {
//   hiderTag.addEventListener(`mouseover`, function (e) {
//     e.stopPropagation();
//     bannerDrop.classList.add(`hidden`);
//   });
// });

//

// tagDrop(e) {
//     // console.log(e.target);
//     this.tagData = e.target.dataset.tag;
//     console.log(this.tagData);
//     console.log(e.target);
//     this.dropItems.forEach(function (itemChecked) {
//       if (itemChecked.dataset.tag !== tagData) {
//         itemChecked.classList.add(`hidden`);
//       }
//     });

//     const showerFunc = function (dropItem) {
//       dropItem.classList.remove(`hidden`);
//       bannerDrop.classList.remove(`hidden`);
//       dropItem.classList.add(`fade-in`);
//       bannerDrop.classList.add(`fade-in`);
//     };

//     dropItems.forEach(function (item) {
//       if (item.dataset.tag == tagData) {
//         holder = item;

//         showerFunc(holder);
//       }
//     });
//   }
//   loggedUIDrop() {
//     if (currentUser || stayLoggedUser) {
//       loggedInUI.classList.remove(`hidden`);
//     }
//   }
