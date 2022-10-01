import HeaderView from '../views/headerView.js';
import * as mainModel from '../model/mainModel.js';

// FUNC
const tagDrop = (e) => {
  // console.log(e.target);
  HeaderView.tagData = e.target.dataset.tag;
  //   console.log(this.tagData);
  //   console.log(e.target);
  HeaderView.dropItems.forEach(function (itemChecked) {
    if (itemChecked.dataset.tag !== HeaderView.tagData) {
      itemChecked.classList.add(`hidden`);
    }
  });

  const showerFunc = function (dropItem) {
    dropItem.classList.remove(`hidden`);
    HeaderView.bannerDrop.classList.remove(`hidden`);
    dropItem.classList.add(`fade-in`);
    HeaderView.bannerDrop.classList.add(`fade-in`);
  };

  HeaderView.dropItems.forEach(function (item) {
    if (item.dataset.tag == HeaderView.tagData) {
      HeaderView.holder = item;

      showerFunc(HeaderView.holder);
    }
  });
};
const loggedUIDrop = () => {
  if (mainModel.state.loggedIn === true) {
    HeaderView.loggedInUI.classList.remove(`hidden`);
  }
};
const loginActivateFunc = function () {
  if (mainModel.state.loggedIn === true) {
    window.location.href = `/account`;
  } else {
    HeaderView.registerModal.classList.add(`hidden`);
    HeaderView.resetPassModal.classList.add(`hidden`);
    HeaderView.loginModal.classList.remove(`hidden`);
    // HeaderView.loginErr.classList.add(`hidden`);
    HeaderView.loginActivate.click();
  }
};
const registerSwitch = function () {
  HeaderView.loginModal.classList.add(`hidden`);
  HeaderView.resetPassModal.classList.add(`hidden`);

  HeaderView.registerModal.classList.remove(`hidden`);
  HeaderView.registerModal.classList.add(`fade-in`);
};
const resetPassSwitch = function () {
  HeaderView.loginModal.classList.add(`hidden`);
  HeaderView.registerModal.classList.add(`hidden`);
  HeaderView.resetPassModal.classList.remove(`hidden`);
  HeaderView.resetPassModal.classList.add(`fade-in`);
};
// LOGIN ACTIVATE
HeaderView.loginBtn.addEventListener('click', loginActivateFunc);
// BANNER  DROP CONTROLL
HeaderView.bannerTags.forEach((tag) => {
  //   console.log(tag);
  tag.addEventListener('mouseover', tagDrop);
});

HeaderView.content?.addEventListener(`mouseover`, function (e) {
  HeaderView.bannerDrop.classList.add(`hidden`);
  HeaderView.loggedInUI.classList.add(`hidden`);
});

HeaderView.bannerRows?.addEventListener(`mouseover`, function (e) {
  HeaderView.bannerDrop.classList.add(`hidden`);
});

HeaderView.bannerHiderTags.forEach(function (hiderTag) {
  hiderTag.addEventListener(`mouseover`, function (e) {
    e.stopPropagation();
    HeaderView.bannerDrop.classList.add(`hidden`);
  });
});
HeaderView.loginBtn?.addEventListener(`mouseover`, loggedUIDrop);
// bannerTags.forEach(function (tag) {
//     tag.addEventListener(`mouseover`, tagDrop);
//   });
// register switch
HeaderView.registerSwitchBtn?.addEventListener('click', registerSwitch);
// reset pass switch
HeaderView.resetPassSwitchBtn?.addEventListener(`click`, resetPassSwitch);
