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
  } catch (error) {
    console.log(error);
  }
};
const addCard = async (event) => {
  try {
    document
      .querySelectorAll('.payment-item')[0]
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
    const resData = await axios({
      method: 'POST',
      url: CONFIG.ADD_PAYMENT_URL,
      data: { ...sendData },
    });
    window.location.reload();
  } catch (error) {
    console.error(error);
    document.querySelector('#card-err').classList.remove('hidden');
  }
};
const dropCardForm = (e) => {
  e.target.classList.add('fade-out');
  setTimeout(() => {
    e.target.classList.add('hidden');
  }, 3000);
  e.target.insertAdjacentHTML('beforebegin', AccountView.addCardForm);
  AccountView.cardFormEl = document.querySelector('#add-payment-form');
  if (AccountView.cardFormEl)
    AccountView.cardFormEl.addEventListener('submit', addCard);
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
if (AccountView.infoBasic)
  AccountView.infoBasic.addEventListener('submit', updateBasic);
if (AccountView.addCard)
  AccountView.addCard.addEventListener('click', dropCardForm);
if (AccountView.paymentItem[0])
  AccountView.deleteCard.forEach((el) =>
    el.addEventListener('click', deleteCard)
  );
