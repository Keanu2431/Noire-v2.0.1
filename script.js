`use strict`;
// IMPORTANT GLOBAL VARS
let signedInStatus = sessionStorage.getItem(`signedInStatusKey`);
const usersObj = {
  usersArray: ``,
};
class createUser {
  constructor(userID, userName, password, email) {
    this.userID = userID;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.cart = [];
    this.wishList = [];
    this.orders = [];
  }
}
// section 1 CREATING AN ACCOUNT
// variables
const registerEmail = document.querySelector(`#register-email`);
const registerUsername = document.querySelector(`#register-username`);
const registerPassword = document.querySelector(`#register-password`);
const registerBtn = document.querySelector(`#register-submit-btn`);
const registerEmailErr = document.querySelector(`#register-email-error`);
const registerUserErr = document.querySelector(`#register-username-error`);
const registerPasswordErr = document.querySelector(`#register-password-error`);
let randomUserID;
const validSpecialCharactersPassword = [`@`, `$`, `#`, `_`, `!`, `%`, `&`];
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const capitals = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
// FUNCTIONS
const registerUser = function (e) {
  e.preventDefault();

  loginUsername.value = ``;
  loginPassword.value = ``;
  const emailExtension = [
    `@yahoo.com`,
    `@gmail.com`,
    `@outlook.com`,
    `@icloud.com`,
  ];
  const submitedUsername = registerUsername.value;
  const submitedPassword = registerPassword.value;
  const submitedEmail = registerEmail.value;

  if (
    submitedEmail.includes(` `) ||
    submitedEmail.length === 0 ||
    usersObj.usersArray?.find(function (user) {
      return user.email === submitedEmail.toLowerCase();
    }) ||
    (!submitedEmail.toLowerCase().includes(emailExtension[0]) &&
      !submitedEmail.toLowerCase().includes(emailExtension[1]) &&
      !submitedEmail.toLowerCase().includes(emailExtension[2]) &&
      !submitedEmail.toLowerCase().includes(emailExtension[3]))
  ) {
    registerEmailErr.classList.remove(`hidden`);
    return;
  } else if (
    usersObj.usersArray?.find(function (user) {
      return user.userName === submitedUsername.toLowerCase();
    }) ||
    submitedUsername.includes(` `) ||
    submitedUsername.length < 8 ||
    submitedUsername.length > 32
  ) {
    registerUserErr.classList.remove(`hidden`);
    registerEmailErr.classList.add(`hidden`);
    return;
  } else if (
    submitedPassword.includes(` `) ||
    submitedPassword.length < 8 ||
    submitedPassword.length > 32 ||
    // spreads the password then checks if it contains one of the elements from the validSpecialCharactersPassword Array using the !(NOT) operator
    ![...submitedPassword].some((i) =>
      validSpecialCharactersPassword.includes(i)
    ) ||
    ![...submitedPassword].some((i) => capitals.includes(i)) ||
    [...submitedPassword].some((i) => digits.includes(i))
  ) {
    registerPasswordErr.classList.remove(`hidden`);
    registerPassword.value = ``;
    return;
  }

  const createUserFunc = function () {
    newUser = new createUser(
      userID,
      submitedUsername.toLowerCase(),
      submitedPassword,
      submitedEmail.toLowerCase()
    );
    usersObj.usersArray?.push(newUser);
    currentUser = newUser;
    localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
    sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(newUser));
  };
  randomUserID = Math.floor(100000 + Math.random() * 500000);
  let userID = randomUserID;

  const repeaterID = function () {
    if (
      usersObj.usersArray?.find(function (user) {
        return user.userID === userID;
      })
    ) {
      userID = Math.floor(100000 + Math.random() * 500000);

      if (
        usersObj.usersArray.find(function (user) {
          return user.userID === userID;
        })
      ) {
        userID = Math.floor(100000 + Math.random() * 500000);

        if (
          usersObj.usersArray.find(function (user) {
            return user.userID === userID;
          })
        ) {
          userID = Math.floor(100000 + Math.random() * 500000);

          if (
            usersObj.usersArray.find(function (user) {
              return user.userID === userID;
            })
          ) {
            userID = Math.floor(100000 + Math.random() * 500000);

            if (
              usersObj.usersArray.find(function (user) {
                return user.userID === userID;
              })
            ) {
              userID = Math.floor(100000 + Math.random() * 500000);
              if (
                usersObj.usersArray.find(function (user) {
                  return user.userID === userID;
                })
              ) {
                userID = Math.floor(100000 + Math.random() * 500000);
                if (
                  usersObj.usersArray.find(function (user) {
                    return user.userID === userID;
                  })
                ) {
                  userID = Math.floor(100000 + Math.random() * 500000);
                }
              }
            }
          }
        }
      }
    }
  };
  repeaterID();
  createUserFunc();
  modalCloseBtn.click();
  switchToLogggedInUI();
  signedInStatus = `signed-in`;
};
// IMPLEMENTATION
registerBtn?.addEventListener(`click`, registerUser);
// section 1 CREATING AN ACCOUNT
//
// AKWAYS CHECK IF SOMEONE IS LOGGED IN 1ST
// SECTION 2 BANNER
// variables
const bannerHiderTags = document.querySelectorAll(`#banner-hider-tag`);
const bannerDrop = document.querySelector(`.banner-dropdown-container`);
const bannerTags = document.querySelectorAll(`#banner-tag`);
const dropItems = document.querySelectorAll(`#items-holder`);
const bannerRows = document.querySelector(`.row-0`);
const content = document.querySelector(`.content`);
const loggedInUI = document.querySelector(`#account-dropdown`);
const logOutBtn = document.querySelector(`#log-out-btn`);
const loginBtn = document.querySelector(`#sign-in`);
let tagData;
let holder;
// FUNCTIONS
const tagDrop = function (e) {
  tagData = e.target.dataset.tag;

  dropItems.forEach(function (itemChecked) {
    if (itemChecked.dataset.tag !== tagData) {
      itemChecked.classList.add(`hidden`);
    }
  });

  const showerFunc = function (dropItem) {
    dropItem.classList.remove(`hidden`);
    bannerDrop.classList.remove(`hidden`);
    dropItem.classList.add(`fade-in`);
    bannerDrop.classList.add(`fade-in`);
  };

  dropItems.forEach(function (item) {
    if (item.dataset.tag == tagData) {
      holder = item;

      showerFunc(holder);
    }
  });
};
const loggedUIDrop = function () {
  if (currentUser || stayLoggedUser) {
    loggedInUI.classList.remove(`hidden`);
  }
};
// IMPLEMENTATION
loginBtn?.addEventListener(`mouseover`, loggedUIDrop);
bannerTags.forEach(function (tag) {
  tag.addEventListener(`mouseover`, tagDrop);
});
content?.addEventListener(`mouseover`, function (e) {
  bannerDrop.classList.add(`hidden`);
  loggedInUI.classList.add(`hidden`);
});
bannerRows?.addEventListener(`mouseover`, function (e) {
  bannerDrop.classList.add(`hidden`);
});
bannerHiderTags.forEach(function (hiderTag) {
  hiderTag.addEventListener(`mouseover`, function (e) {
    e.stopPropagation();
    bannerDrop.classList.add(`hidden`);
  });
});
// SECTION 2 BANNER
//
// SECTION 3 SWITCHING LOGIN/REGISTER/FORGOT Modal
// variables
const loginActivate = document.querySelector(`#login-activate`);
const loginModal = document.querySelector(`#for-login`);
const registerModal = document.querySelector(`#for-register`);
const resetPassModal = document.querySelector(`#for-reset`);
const registerSwitchBtn = document.querySelector(`#switch-register`);
const resetPassSwitchBtn = document.querySelector(`#forgot-password-btn`);
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
loginBtn?.addEventListener(`click`, loginActivateFunc);
registerSwitchBtn?.addEventListener(`click`, registerSwitch);
resetPassSwitchBtn?.addEventListener(`click`, resetPassSwitch);
// SECTION 3 SWITCHING LOGIN/REGISTER/FORGOT Modal
//
// SECTION 4 COOKIES BANNER
// variables
const cookieContainer = document.querySelector(`.cookies-container`);

let cookieClickedStatus;
let cookiesStatus;
const cookiesNoBtn = document.querySelector(`#cookies-no`);
const cookiesYesBtn = document.querySelector(`#cookies-yes`);
//functions
const cookieContainerFunction = function (e) {
  let clicked = e.target;
  if (clicked == cookiesYesBtn) {
    cookieContainer.classList.add(`hidden`);
    cookieClickedStatus = `clicked`;
    sessionStorage.setItem(`clickStatusKey`, cookieClickedStatus);
    cookiesStatus = `yes`;
  } else if (clicked == cookiesNoBtn) {
    cookieContainer.classList.add(`hidden`);
    cookieClickedStatus = `clicked`;
    sessionStorage.setItem(`clickStatusKey`, cookieClickedStatus);
    cookiesStatus = `no`;
  }
};
//implementation
cookieContainer?.addEventListener(`click`, cookieContainerFunction);
// SECTION 4 COOKIES BANNER
//
//SECTION 5 SPECIAL POP UP
// variables
const specialModal = document.querySelector(`#special-pop-up`);
const specialCloseBtn = document.querySelector(`#special-close`);
// functions
const specialOpen = function () {
  specialModal?.classList.remove(`hidden`);
  specialModal?.classList.add(`fade-in`);
};
const specialClose = function () {
  sessionStorage.setItem(`specialDenyKey`, `true`);
  specialModal.classList.add(`fade-out`);
  setTimeout(function () {
    specialModal.classList.add(`hidden`);
  }, 1000);
};
// implementation
setTimeout(specialOpen, 5000);
specialCloseBtn?.addEventListener(`click`, specialClose);
// SECTION 5 SPECIAL POP UP
//

// SECTION 6 LOGGING IN/ STAYING LOGGED IN/LOGGING OUT
// variables
const modalCloseBtn = document.querySelector(`#modal-close`);
const loginUsername = document.querySelector(`#login-username`);
const loginPassword = document.querySelector(`#login-password`);
const loginSubmit = document.querySelector(`#login-submit-btn`);
const loginErr = document.querySelector(`#login-error-message`);
const stayLogged = document.querySelector(`#stay-logged-in`);
// functions
const loginCheck = function (e) {
  e.preventDefault();
  if (usersObj?.usersArray.length == 0) {
    loginErr.classList.remove(`hidden`);
  }
  // first check if the username exist and if it does check if the password matches
  usersObj.usersArray?.forEach(function (user) {
    const submitedLogin = loginUsername.value;
    const submitedPassword = loginPassword.value;
    if (
      submitedLogin.toLowerCase() == user.userName &&
      submitedPassword == user.password &&
      stayLogged.hasAttribute(`value`)
    ) {
      currentUser = user;
      stayLoggedUser = user;

      localStorage.setItem(`stayLoggedUserKey`, JSON.stringify(stayLoggedUser));
      loginErr.classList.add(`hidden`);
      loginErr.classList.remove(`fade-in`);
      loginUsername.value = ``;
      loginPassword.value = ``;
      modalCloseBtn.click();
      signedInStatus = `signed-in`;
      stayLogged.removeAttribute(`value`);
      switchToLogggedInUI();
    } else if (
      submitedLogin.toLowerCase() == user.userName &&
      submitedPassword == user.password
    ) {
      currentUser = user;
      sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
      loginErr.classList.add(`hidden`);
      loginErr.classList.remove(`fade-in`);
      loginUsername.value = ``;
      loginPassword.value = ``;
      modalCloseBtn.click();
      signedInStatus = `signed-in`;
      stayLogged.removeAttribute(`value`);
      stayLoggedUser = ``;
      localStorage.removeItem(`stayLoggedUserKey`);
      switchToLogggedInUI();
    } else {
      loginErr.classList.remove(`hidden`);
      loginErr.classList.add(`fade-in`);

      return;
    }
    loginPassword.value = ``;
  });
};
const logOut = function () {
  currentUser = ``;
  user = ``;
  stayLoggedUser = ``;
  localStorage.removeItem(`stayLoggedUserKey`);
  sessionStorage.removeItem(`currentSessionUserKey`);
  sessionStorage.removeItem(`signedInStatusKey`);
  window.location.href = `/index.html`;
};
const switchToLogggedInUI = function () {
  if (currentUser != undefined && currentUser != null) {
    // loginBtn.dataset.status = `signed-in`;
    // signedInStatus = `signed-in`;
    sessionStorage.setItem(`signedInStatusKey`, `signed-in`);
  }
};
const modalCloseReset = function () {
  loginErr.classList.add(`hidden`);
};
// implementation
stayLogged?.addEventListener(`click`, function () {
  stayLogged.setAttribute(`value`, `yes`);
});
loginSubmit?.addEventListener(`click`, loginCheck);
modalCloseBtn?.addEventListener(`click`, modalCloseReset);
logOutBtn?.addEventListener(`click`, logOut);

// SECTION 6 LOGGING IN/ STAYING LOGGED IN/ REGISTERING/LOGGING OUT

// SECTION 7 RESETTING PASSWORD
// variables
const resetUserErr = document.querySelector(`#reset-error-user`);
const requestResetForm = document.querySelector(`#reset-form`);
const resetUsername = document.querySelector(`#reset-username`);
const resetSubmit = document.querySelector(`#reset-submit`);
const passwordResetForm = document.querySelector(`#reset-password-form`);
const passwordOne = document.querySelector(`#reset-passsword-1`);
const passwordTwo = document.querySelector(`#reset-passsword-2`);
const passswordResetSubmit = document.querySelector(`#reset-password-submit`);
let resetPassUser;

// functions
const confirmPassword = function (e) {
  e.preventDefault();
  let passswordResetOne = passwordOne.value;
  let passswordResetTwo = passwordTwo.value;
  if (
    passswordResetOne !== passswordResetTwo ||
    passswordResetOne.length < 8 ||
    passswordResetOne.length > 32 ||
    // spreads the password then checks if it contains one of the elements from the validSpecialCharactersPassword Array using the !(NOT) operator
    ![...passswordResetOne].some((i) =>
      validSpecialCharactersPassword.includes(i)
    ) ||
    ![...passswordResetOne].some((i) => capitals.includes(i)) ||
    [...passswordResetOne].some((i) => digits.includes(i))
  ) {
  } else {
    resetPassUser.password = passswordResetTwo;
    localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));

    // need to update local storage so local storage can update userObj
  }
  // page refreshes after a successful password reset
  window.location.reload();
};

const requestResetPassword = function (e) {
  e.preventDefault();
  let submitedUsername = resetUsername.value;
  usersObj.usersArray?.forEach(function (user) {
    if (user.userName?.toLowerCase() == submitedUsername.toLowerCase()) {
      requestResetForm.classList.add(`hidden`);
      passwordResetForm.classList.remove(`hidden`);
      resetPassUser = user;
      resetUserErr.classList.add(`hidden`);
      resetUserErr.classList.remove(`fade-in`);
    } else {
      resetUserErr.classList.remove(`hidden`);
      resetUserErr.classList.add(`fade-in`);
    }
  });
};

// implementation
resetSubmit?.addEventListener(`click`, requestResetPassword);
passswordResetSubmit?.addEventListener(`click`, confirmPassword);

// SECTION 7 RESETTING PASSWORD
// // section 0 on page checks
// VARIABLES
let currentUser;
let stayLoggedUser;
// FUNCTIONS
const checkSpecialDeny = function () {
  if (sessionStorage.getItem(`specialDenyKey`) == `true`) {
    specialModal?.remove();
  }
};
const checkCurrentUser = function () {
  const localUserObject = JSON.parse(localStorage.getItem(`stayLoggedUserKey`));
  const currentSessionUser = JSON.parse(
    sessionStorage.getItem(`currentSessionUserKey`)
  );
  if (JSON.parse(localStorage.getItem(`stayLoggedUserKey`)) != null) {
    let localUser = localUserObject;
    stayLoggedUser = localUser;
    currentUser = localUser;
    // userDisplay.textContent = `Welcome Back ${
    //   currentUser?.firstName || currentUser.userName
    // }`;
    switchToLogggedInUI();
  } else if (sessionStorage.getItem(`currentSessionUserKey`) != null) {
    currentUser = currentSessionUser;
    // userDisplay.textContent = ``;
  } else return;
};
const checkCookieDeny = function () {
  if (sessionStorage.getItem(`clickStatusKey`) === `clicked`) {
    cookieContainer.classList.add(`hidden`);
  }
};
const updateUsersObject = function () {
  // how to get the users
  delete usersObj.usersArray;
  if (
    JSON.parse(localStorage.getItem(`localUsersObject`))?.usersArray !==
    undefined
  ) {
    usersObj.usersArray = JSON.parse(
      localStorage.getItem(`localUsersObject`)
    )?.usersArray;
  } else {
    usersObj.usersArray = [];
  }
};
// IMPLEMENTATION
checkCookieDeny();
checkCurrentUser();
checkSpecialDeny();
updateUsersObject();
// checking cookies accept or decline

// section 0 on page checks
