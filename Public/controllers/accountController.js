import AccountView from '../views/accountView.js';
import * as CONFIG from '../config.js';

console.log(AccountView);
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
    if (resData.data.status == 'success') alert('profile updates');
  } catch (error) {
    alert('something went wrong, check your fields');
    console.log(error);
  }
};
const addCard = (event) => {
  try {
    event.stopImmediatePropagation();
    event.preventDefault();
    const formData = [...new FormData(event.target).entries()];
    console.log(formData);
    const sendData = {
      cardHolder: formData[0][1],
      cardNumber: Number(formData[1][1]),
      expiration: formData[2][1],
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
    console.log({ ...sendData });
    axios({
      method: 'POST',
      url: CONFIG.ADD_PAYMENT_URL,
      data: { ...sendData },
    });
  } catch (error) {
    console.log(error);
  }
};
const dropCardForm = (e) => {
  console.log(e.target);
  e.target.classList.add('fade-out');
  setTimeout(() => {
    e.target.classList.add('hidden');
  }, 3000);
  e.target.insertAdjacentHTML('beforebegin', AccountView.addCardForm);
  AccountView.cardFormEl = document.querySelector('#add-payment-form');
  if (AccountView.cardFormEl)
    AccountView.cardFormEl.addEventListener('submit', addCard);

  console.log(AccountView);
};

if (AccountView.infoBasic)
  AccountView.infoBasic.addEventListener('submit', updateBasic);
if (AccountView.addCard)
  AccountView.addCard.addEventListener('click', dropCardForm);
// if (AccountView.cardFormEl)
//   AccountView.cardFormEl.addEventListener('submit', addCard);
