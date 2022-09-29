import HeaderView from '../views/headerView.js';
import * as mainModel from '../model/mainModel.js';
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
