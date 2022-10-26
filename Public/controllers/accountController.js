import AccountView from '../views/accountView.js';
import * as CONFIG from '../config.js';

const updateBasic = async (e) => {
  try {
    e.preventDefault();

    const updateData = [...new FormData(e.target).entries()];
    console.log(updateData);
    // console.log(updateData[0][1]);
    const newInfo = {
      firstName: updateData[0][1].toLowerCase(),
      lastName: updateData[1][1].toLowerCase(),
      phoneNumber: updateData[2][1].toString(),
      birthDay: updateData[3][1],
      braSize: updateData[4][1].toUpperCase(),
      braletteSize: updateData[5][1].toUpperCase(),
      pantySize: updateData[6][1].toUpperCase(),
      lingerieSize: updateData[7][1].toUpperCase(),
    };
    const resData = await axios({
      method: 'POST',
      url: CONFIG.UPDATE_BASIC_URL,
      data: newInfo,
    });
    console.log(resData);
    if (document.querySelector('#success-basic')) return;
    else
      document
        .querySelector('#username-holder')
        .insertAdjacentHTML(
          'afterend',
          '<h2 id="success-basic">User Information Successfully Updated</h2>'
        );
  } catch (error) {
    console.log(error);
  }
};
const addCard = async (event) => {
  try {
    document
      .querySelector('body')
      .insertAdjacentHTML('beforebegin', '<div class="loader"></div>');
    event.preventDefault();
    event.stopImmediatePropagation();
    const formData = [...new FormData(event.target).entries()];
    const sendData = {
      cardHolder: formData[0][1],
      cardNumber: Number(formData[1][1]),
      expiration: String(formData[2][1]),
      cvv: formData[3][1].toString(),
      firstName: formData[4][1],
      lastName: formData[5][1],
      addressOne: formData[6][1],
      addressTwo: formData[7][1],
      city: formData[8][1],
      state: formData[9][1],
      zipcode: formData[10][1],
      country: formData[11][1],
      billingPhone: formData[12][1],
    };
    if (
      sendData.cardHolder.length <= 1 ||
      !sendData.cardHolder.includes(' ') ||
      String(sendData.cardNumber).length < 15 ||
      String(sendData.cvv).length < 3 ||
      !sendData.expiration.includes('/') ||
      String(sendData.zipcode).length < 5
    )
      throw '400 bad request';
    document.querySelector('.loader').remove();
    const resData = await axios({
      method: 'POST',
      url: CONFIG.ADD_PAYMENT_URL,
      data: { ...sendData },
    });
    window.location.reload();
  } catch (error) {
    console.error(error);
    document.querySelector('#card-err').classList.remove('hidden');
    document.querySelector('.loader').remove();
    event.preventDefault();
  }
};
const dropCardForm = (e) => {
  e.target.classList.add('fade-out');
  setTimeout(() => {
    e.target.classList.add('hidden');
  }, 3000);
  e.target.insertAdjacentHTML('beforebegin', AccountView.addCardForm);
  AccountView.cardFormEl = document.querySelector('#add-payment-form');
  if (AccountView.cardFormEl) {
    AccountView.cardFormEl.addEventListener('submit', addCard);
    document
      .querySelector('#cancel-payment')
      .addEventListener('click', function (e) {
        e.target.parentElement.classList.add('fade-out');
        setTimeout(function () {
          e.target.parentElement.remove();
          AccountView.addCard.classList.remove('hidden');
          AccountView.addCard.classList.remove('fade-out');
        }, 2005);
      });
  }
};
const addShipping = async (event) => {
  alert('sub');
  event.preventDefault();
};
const dropShipForm = (e) => {
  e.target.insertAdjacentHTML('beforebegin', AccountView.addShipForm);
  document.querySelector('#shipping-form').classList.add('fade-in');
  if (document.querySelector('#shipping-form')) {
    document
      .querySelector('#cancel-ship')
      .addEventListener('click', function (e) {
        e.target.parentElement.classList.add('fade-out');
        setTimeout(function () {
          e.target.parentElement.remove();
          AccountView.addCard.classList.remove('hidden');
          AccountView.addCard.classList.remove('fade-out');
        }, 2005);
      });
    document
      .querySelector('#shipping-form')
      .addEventListener('submit', async function (event) {
        event.preventDefault();
        document
          .querySelector('body')
          .insertAdjacentHTML('afterbegin', '<div class="loader"></div>');
        const formData = [...new FormData(event.target).entries()];
        console.log(...formData);
        const sendData = {
          firstName: formData[0][1].toLowerCase(),
          lastName: formData[1][1].toLowerCase(),
          addressOne: formData[2][1].toLowerCase(),
          addressTwo: formData[3][1],
          city: formData[4][1],
          state: formData[5][1],
          zipcode: formData[6][1],
          country: formData[7][1],
          phoneNumber: formData[8][1],
        };
        if (
          sendData.firstName.length < 2 ||
          sendData.lastName.length < 2 ||
          sendData.addressOne.length < 5 ||
          sendData.city.length < 3 ||
          sendData.zipcode.length < 5
        ) {
          document.querySelector('.loader').remove();
          document
            .querySelector('#shipping-form')
            .insertAdjacentHTML(
              'beforebegin',
              `<h2 style='color:red;'>Check Shipping Information</h2>`
            );
          return;
        }
        console.log(sendData);
        const resData = await axios({
          method: 'POST',
          url: CONFIG.ADD_SHIPPING_URL,
          data: sendData,
        });
        window.location.reload();
      });
  }
};
const updatePassword = async (e) => {
  try {
    e.preventDefault();
    document
      .querySelector('body')
      .insertAdjacentHTML('afterbegin', AccountView.loader);
    const formData = [...new FormData(AccountView.resetPassForm).entries()];
    const sendData = {
      currentPassword: formData[0][1],
      newPasswordOne: formData[1][1],
      newPasswordTwo: formData[2][1],
    };
    const resData = await axios({
      method: 'POST',
      url: CONFIG.UPDATE_PASSWORD_URL,
      data: sendData,
    });
    window.location.reload();
  } catch (error) {
    const message = error.response.data.message;
    document.querySelector('.loader').remove();
    document.querySelector('#pass-err')?.remove();
    document
      .querySelector('#reset-pass-holder')
      .insertAdjacentHTML(
        'afterend',
        `<h2 style='color:red' id='pass-err'>${message}</h2>`
      );
  }
};
const deleteShip = async (e) => {
  try {
    document
      .querySelector('body')
      .insertAdjacentHTML('afterbegin', AccountView.loader);
    const index = e.target.dataset.index;
    const addressOne =
      e.target.parentElement.parentElement.children[0].textContent.toLowerCase();
    const firstName =
      e.target.parentElement.parentElement.parentElement.children[0].textContent
        .split(' ')[0]
        .toLowerCase();
    const lastName =
      e.target.parentElement.parentElement.parentElement.children[0].textContent
        .split(' ')[1]
        .toLowerCase();
    const sendData = { index, addressOne, firstName, lastName };
    console.log(sendData);
    const resData = await axios({
      method: 'DELETE',
      data: sendData,
      url: CONFIG.DELETE_SHIPPING_URL,
    });
    console.log(resData);
    window.location.reload();
  } catch (error) {
    // document
    //   .querySelector('#shipping')
    if (!document.querySelector('#error-ship'))
      e.target.parentElement.insertAdjacentHTML(
        'afterend',
        '<h3 style="color:red;" id="error-ship"> Something went wrong </h3>'
      );
    document.querySelector('.loader').remove();
    console.log(error);
  }
};
const deleteCard = async (e) => {
  // alert('clicked');
  const lastFour = Number(
    e.target
      .closest('div')
      .children[0].children[1].children[1].textContent.slice(-4)
  );
  const expiration =
    e.target.closest('div').children[0].children[1].children[2].textContent;
  const sendData = { lastFour, expiration };
  const resData = await axios({
    method: 'DELETE',
    url: CONFIG.DELETE_PAYMENT_URL,
    data: { ...sendData },
  });
  console.log(resData);
  window.location.reload();
};
const editCard = async (e) => {
  const edit_del = e.target.parentElement;
  // edit_del.classList.add('hidden');
  const index = e.target.dataset.info;
  let cardData = await axios({
    method: 'GET',
    url: `https://noire-lstudios.herokuapp.com/account/get-card/${index}`,
  });
  cardData = cardData.data.data;
  console.log(cardData);
  const queryObj = {
    lastFour: cardData.lastFour,
    expiration: cardData.expiration,
  };
  // console.log(queryObj);
  e.target.parentElement.insertAdjacentHTML(
    'beforebegin',
    AccountView.populateEditTemp(cardData)
  );
  document
    .querySelector('#edit-payment-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log(queryObj);
      const formSubData = [...new FormData(e.target).entries()];
      console.log(formSubData);
      const sendDataForm = {
        cardHolder: formSubData[0][1],
        expiration: formSubData[1][1],
        firstName: formSubData[2][1],
        lastName: formSubData[3][1],
        addressOne: formSubData[4][1],
        addressTwo: formSubData[5][1],
        city: formSubData[6][1],
        state: formSubData[7][1],
        zipcode: formSubData[8][1],
        billingPhone: formSubData[10][1],
      };
      // console.log(sendDataForm);
      console.log({ query: queryObj, index, sendDataForm });
      const resData = axios({
        method: 'POST',
        url: CONFIG.EDIT_PAYMENT_URL,
        data: { query: queryObj, index, sendDataForm },
      });
    });
};
const editCardSubmit = async (e) => {
  e.preventDefault();
  console.log(queryObj);
  console.log(...new FormData(e.target).entries());
};
const updateEmailPref = async (e) => {
  try {
    document
      .querySelector('body')
      .insertAdjacentHTML('afterbegin', AccountView.loader);
    e.preventDefault();
    console.log(e.target);
    const formData = [...new FormData(e.target).entries()];
    const sendData = { frequency: formData[0][1], permission: formData[1][1] };
    console.log(formData);
    console.log(sendData);
    document.querySelector('.loader').remove();
    const resData = await axios({
      method: 'POST',
      url: CONFIG.UPDATE_PREF,
      data: sendData,
    });
    // window.location.reload();
  } catch (error) {
    console.log(error);
    document.querySelector('.loader').remove();
  }
};
// email pref
if (AccountView.emailPrefForm)
  AccountView.emailPrefForm.addEventListener('submit', updateEmailPref);
// basic/profile
if (AccountView.infoBasic)
  AccountView.infoBasic.addEventListener('submit', updateBasic);
// payment card
if (AccountView.addCard)
  AccountView.addCard.addEventListener('click', dropCardForm);
if (AccountView.paymentItem[0]) {
  AccountView.deleteCard.forEach((el) =>
    el.addEventListener('click', deleteCard)
  );
  AccountView.editCard.forEach((el) => el.addEventListener('click', editCard));
}
// shipping
if (AccountView.addShip)
  AccountView.addShip.addEventListener('click', dropShipForm);
if (AccountView.shipItem[0])
  AccountView.deleteShip.forEach((el) =>
    el.addEventListener('click', deleteShip)
  );
// password
if (AccountView.resetPassForm) {
  AccountView.resetPassForm.addEventListener('submit', updatePassword);
}
