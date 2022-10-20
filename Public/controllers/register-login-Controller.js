import RegisterLoginView from '../views/register-login-View.js';
import HeaderView from '../views/headerView.js';
import { REGISTER_URL } from '../config.js';
import * as CONFIG from '../config.js';

import * as mainModel from '../model/mainModel.js';

// const registerBtn = document.querySelector('#register-submit-btn');
RegisterLoginView.modalCloseBtn.addEventListener('click', function () {
  RegisterLoginView._parentElement.reset();
  RegisterLoginView.loginForm.reset();
});

RegisterLoginView._parentElement.addEventListener('submit', async function (e) {
  e.preventDefault();
  document
    .querySelector('#banner-container')
    .insertAdjacentHTML('beforebegin', '<div class="loader"></div>');
  //   alert('sub');
  const registerData = [
    ...new FormData(RegisterLoginView._parentElement).entries(),
  ];
  const user = {
    emailAddress: registerData[0][1].toLowerCase(),
    userName: registerData[1][1].toLowerCase(),
    password: registerData[2][1],
  };

  // getting responsee and data
  const resData = await fetch(CONFIG.REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
  if (resData.status === 'success') {
    mainModel.state.user = resData.user;
    HeaderView.modalCloseBtn.click();
    mainModel.state.loggedIn = true;
    HeaderView.loggedStatus = 'true';
    document.querySelector('.loader').remove();
    // && resData.error.code == 11000
  } else if (resData.status === 'fail') {
    document.querySelector('.loader').remove();
    if (resData.error.keyPattern.emailAddress) {
      RegisterLoginView.registerEmailErr.classList.remove('hidden');
    } else if (resData.error.keyPattern.userName) {
      RegisterLoginView.registerUserErr.classList.remove('hidden');
    } else if (resData.error.code == 462) {
      RegisterLoginView.registerPasswordErr.classList.remove('hidden');
    }
    console.log(resData);
    console.log(user);
    console.log(JSON.stringify(user));
  }
});
// login
RegisterLoginView.loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  document
    .querySelector('#banner-container')
    .insertAdjacentHTML('beforebegin', '<div class="loader"></div>');
  const loginData = [...new FormData(this).entries()];
  console.log(loginData);
  const user = {
    userName: loginData[0][1].toLowerCase(),
    password: loginData[1][1],
    // stayLogged: loginData[2][1],
  };
  // console.log(loginData[2][1]);
  // if (loginData[2][1]) user.stayLogged = 'on';

  try {
    const resData = await axios({
      method: 'POST',
      url: CONFIG.LOGIN_URL,
      data: user,
      withCredentials: true,
    });
    console.log(resData);

    RegisterLoginView.modalCloseBtn.click();
    RegisterLoginView.loginForm.reset();
    mainModel.state.loggedIn = true;
    HeaderView.loggedStatus = 'true';
    document.querySelector('.loader').remove();
  } catch (error) {
    RegisterLoginView.loginErr.classList.remove('hidden');
    document.querySelector('.loader').remove();

    console.log(error.response.data);
  }

  // {"emailAddress":"lumppkinkeddfsdfsdfdgjdnu@gmail.com","userName":"kerfsddsdffgfsmitkan","password":"Babyc@t24"}
});
// axios.defaults.withCredentials = true;
