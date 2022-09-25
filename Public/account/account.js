`use strict`;
class createEmailPref {
  constructor(newsFrequency, partnerReach) {
    this.newsFrequency = newsFrequency;
    this.partnerReach = partnerReach;
  }
}
class createPayment {
  constructor(
    cardHolder,
    cardNumber,
    cardExp,
    cardCVV,
    billFirst,
    billLast,
    billAddressOne,
    billAddressTwo,
    billCity,
    billState,
    billZip,
    billCountry,
    billNumber
  ) {
    this.cardHolder = cardHolder;
    this.cardNumber = cardNumber;
    this.cardExp = cardExp;
    this.cardCVV = cardCVV;
    this.billFirst = billFirst;
    this.billLast = billLast;
    this.billAddressOne = billAddressOne;
    this.billAddressTwo = billAddressTwo;
    this.billCity = billCity;
    this.billState = billState;
    this.billZip = billZip;
    this.billCountry = billCountry;
    this.billNumber = billNumber;
    this._cardType = this.cardType(this.cardNumber[0]);
  }
  cardType(number = this.cardNumber[0]) {
    if (number == 4) {
      return `visa`;
    } else if (number == 6) {
      return `discover`;
    } else if (number == 5) {
      return `mastercard`;
    } else return `placeholder`;
  }
}

class createShipping {
  constructor(
    shipFirst,
    shipLast,
    shipAddOne,
    shipAddTwo,
    shipCity,
    shipState,
    shipZip,
    shipCountry,
    shipNumber
  ) {
    this.shipFirst = shipFirst;
    this.shipLast = shipLast;
    this.shipAddOne = shipAddOne;
    this.shipAddTwo = shipAddTwo;
    this.shipCity = shipCity;
    this.shipState = shipState;
    this.shipZip = shipZip;
    this.shipCountry = shipCountry;
    this.shipNumber = shipNumber;
  }
}
const settingVariables = function () {
  shippingFirst = document.querySelector(`#shipping-first-inp`);
  shippingLast = document.querySelector(`#shipping-last-inp`);
  shippingAddress = document.querySelector(`#shipping-address-inp`);
  shippingAddressTwo = document.querySelector(`#shipping-address-2-inp`);
  shippingCity = document.querySelector(`#shipping-city-inp`);
  shippingState = document.querySelector(`#shipping-state-inp`);
  shippingZip = document.querySelector(`#shipping-zip-inp`);
  shippingCountry = document.querySelector(`#shipping-country-inp`);
  shippingNumber = document.querySelector(`#shipping-phone-inp`);
  updateShipping = document.querySelector(`#update-shipping`);
  cancelUpdate = document.querySelector(`#cancel-update-shipping`);
};
// misc check
if (currentUser == undefined || currentUser == null) {
  window.location.href = `/404-error.html`;
}
// finding current User in the array

// MY ACCOUNT
// input variables
const firstProfile = document.querySelector(`#first-profile`);
const lastProfile = document.querySelector(`#last-profile`);
const emailProfile = document.querySelector(`#email-profile`);
const numberProfile = document.querySelector(`#number-profile`);
const birthdayProfile = document.querySelector(`#birthday-profile`);
const braSizeProfile = document.querySelector(`#bra-size`);
const braletteSizeProfile = document.querySelector(`#bralette-size`);
const pantySizeProfile = document.querySelector(`#panty-size`);
const lingerieSizeProfile = document.querySelector(`#lingerie-size`);
const updateProfile = document.querySelector(`#update-basic`);
//filling in the blanks on load
if (firstProfile && currentUser.firstName != undefined)
  firstProfile.value = currentUser?.firstName;
if (lastProfile && currentUser.lastName != undefined)
  lastProfile.value = currentUser.lastName;
if (emailProfile && currentUser.email != undefined)
  emailProfile.value = currentUser.email;
if (numberProfile && currentUser.number != undefined)
  numberProfile.value = currentUser.number;
if (birthdayProfile && currentUser.birthday != undefined)
  birthdayProfile.value = currentUser.birthday;
if (braSizeProfile && currentUser.braSize != undefined)
  braSizeProfile.value = currentUser.braSize;
if (braletteSizeProfile && currentUser.braletteSize != undefined)
  braletteSizeProfile.value = currentUser.braletteSize;
if (pantySizeProfile && currentUser.pantySize != undefined)
  pantySizeProfile.value = currentUser.pantySize;
if (lingerieSizeProfile && currentUser.lingerieSize != undefined)
  lingerieSizeProfile.value = currentUser.lingerieSize;

//functions
const updateProfileBasic = function (e) {
  e.preventDefault();
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  user.firstName = firstProfile.value;
  user.lastName = lastProfile.value;
  user.number = numberProfile.value;
  user.birthday = birthdayProfile.value;
  user.braSize = braSizeProfile.value;
  user.braletteSize = braletteSizeProfile.value;
  user.pantySize = pantySizeProfile.value;
  user.lingerieSize = lingerieSizeProfile.value;
  localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
  sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
  document
    .querySelector(`.user-div`)
    .insertAdjacentHTML(
      `beforebegin`,
      `<h2 style="color:var(--secondary-color);text-align:center; font-size:18px;">Profile Information Updated</h2>`
    );
};
// implementation
updateProfile?.addEventListener(`click`, updateProfileBasic);
//
const settingVariablesBill = function () {
  billingCardHolder = document.querySelector(`#card-holder-inp`);
  billingCardNumber = document.querySelector(`#card-number-inp`);
  billingCardExp = document.querySelector(`#card-exp-inp`);
  billingCardCVV = document.querySelector(`#card-cvv-inp`);
  billingFirst = document.querySelector(`#billing-first-inp`);
  billingLast = document.querySelector(`#billing-last-inp`);
  billingAddress = document.querySelector(`#billing-address-inp`);
  billingAddressTwo = document.querySelector(`#billing-address-2-inp`);
  billingCity = document.querySelector(`#billing-city-inp`);
  billingState = document.querySelector(`#billing-state-inp`);
  billingZip = document.querySelector(`#billing-zip-inp`);
  billingCountry = document.querySelector(`#billing-country-inp`);
  billingNumber = document.querySelector(`#billing-phone-inp`);
  // billEqualShip = document.querySelector(`#bill-ship`);
  updatePayment = document.querySelector(`#update-payment`);
  savePayment = document.querySelector(`#save-payment`);
  cancelPayment = document.querySelector(`#cancel-payment`);
};
let billingCardHolder = document.querySelector(`#card-holder-inp`);
let billingCardNumber = document.querySelector(`#card-number-inp`);
let billingCardExp = document.querySelector(`#card-exp-inp`);
let billingCardCVV = document.querySelector(`#card-cvv-inp`);
let billingFirst = document.querySelector(`#billing-first-inp`);
let billingLast = document.querySelector(`#billing-last-inp`);
let billingAddress = document.querySelector(`#billing-address-inp`);
let billingAddressTwo = document.querySelector(`#billing-address-2-inp`);
let billingCity = document.querySelector(`#billing-city-inp`);
let billingState = document.querySelector(`#billing-state-inp`);
let billingZip = document.querySelector(`#billing-zip-inp`);
let billingCountry = document.querySelector(`#billing-country-inp`);
let billingNumber = document.querySelector(`#billing-phone-inp`);
// let billEqualShip = document.querySelector(`#bill-ship`);
let updatePayment = document.querySelector(`#update-payment`);
let savePayment = document.querySelector(`#save-payment`);
let cancelPayment = document.querySelector(`#cancel-payment`);

const addCard = document.querySelector(`#add-card`);
const populatePayments = function () {
  let paymentTitile = document.querySelector(`#payment-title`);
  let cardTemplatePrimary = `<div class="payment-item" id="billing-primary">
<div class="payment-row-0">
  <img
    src="/Images/Card Placeholder/${currentUser?.paymentInfo[0]?._cardType}.png"
    alt=""
    srcset=""
    class="payment-img"
  />

  <div class="card-info">
    <h2>${currentUser?.paymentInfo[0]?.cardHolder}</h2>
    <h2>************${currentUser?.paymentInfo[0]?.cardNumber.slice(-4)}</h2>
    <h2>${currentUser?.paymentInfo[0]?.cardExp}</h2>
    <h2 style="font-size: var(--standard-font)">primary card</h2>
  </div>
</div>
<h2 class="edit-delete">
  <span id="edit-card" data-info=${0}>edit</span> |
  <span id="delete-card" data-info=${0}>delete</span>
</h2>
</div>`;
  if (currentUser?.paymentInfo?.length > 0) {
    paymentTitile?.insertAdjacentHTML(`afterend`, cardTemplatePrimary);
  }
  if (currentUser?.paymentInfo?.length > 1) {
    for (let i = 1; i + 1 <= currentUser.paymentInfo.length; i++) {
      let cardTemplate = `<div class="payment-item">
      <div class="payment-row-0">
        <img
          src="/Images/Card Placeholder/${
            currentUser.paymentInfo[i]._cardType
          }.png"
          alt=""
          srcset=""
          class="payment-img"
        />

        <div class="card-info">
          <h2>${currentUser.paymentInfo[i].cardHolder}</h2>
          <h2>************${currentUser.paymentInfo[i].cardNumber.slice(
            -4
          )}</h2>
          <h2>${currentUser.paymentInfo[i].cardExp}</h2>
        </div>
      </div>
      <h2 class="edit-delete">
        <span id="edit-card" data-info=${i}>edit</span> |
        <span id="delete-card" data-info=${i}>delete</span>
      </h2>
    </div>`;
      document
        .querySelector(`#billing-primary`)
        ?.insertAdjacentHTML(`afterend`, cardTemplate);
    }
  }
};
if (currentUser.paymentInfo) {
  populatePayments();
}
const addFormBill = `<form
action=""
class="set-card-information fade-in"
id="add-payment-form"
>
<h2 class="standard-text">card information</h2>
<div class="user-div">
  <div class="inp-div">
    <label for="card-holder-inp">Card holder</label>
    <input
      type="text"
      name="card-holder-inp"
      id="card-holder-inp"
    />
  </div>
  <div class="inp-div">
    <label for="card-number-inp">Card Number</label>
    <input
      maxlength="16"
      type="text"
      name="card-number-inp"
      id="card-number-inp"
    />
  </div>
  <div class="inp-div">
    <label for="card-exp-inp"> expiration</label>
    <input type="text" name="card-exp-inp" id="card-exp-inp"  placeholder="MM/YY" maxlength="5"/>
  </div>
  <div class="inp-div">
    <label for="card-cvv-inp"> security code</label>
    <input
      maxlength="4"
      type="text"
      name="card-cvv-inp"
      id="card-cvv-inp"
    />
  </div>
  <h2 class="standard-text">billing</h2>
  <br />
  <div class="inp-div">
    <label for="billing-first-inp"> first name</label>
    <input
      type="text"
      name="billing-first-inp"
      id="billing-first-inp"
    />
  </div>
  <div class="inp-div">
    <label for="billing-last-inp"> last name</label>
    <input
      type="text"
      name="billing-last-inp"
      id="billing-last-inp"
    />
  </div>
  <div class="inp-div">
    <label for="billing-address-inp">address</label>
    <input
      type="text"
      name="billing-address-inp"
      id="billing-address-inp"
    />
  </div>
  <div class="inp-div">
    <label for="billing-address-2-inp">address 2(Optional)</label>
    <input
      type="text"
      name="billing-address-2-inp"
      id="billing-address-2-inp"
    />
  </div>
  <div class="inp-div">
    <label for="billing-city-inp">city</label>
    <br />
    <input
      type="text"
      name="billing-city-inp"
      id="billing-city-inp"
    />
  </div>
  <div class="inp-div-inner">
    <div class="inp-div" style="border: none; width: 55%">
      <label for="state-inp">state</label>
      <br />
      <select name="state-inp" id="billing-state-inp">
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    </div>
    <div class="inp-div" style="width: 15%">
      <label for="billing-zip-inp">zipcode</label>
      <input
        type="text"
        name="zip-inp"
        id="billing-zip-inp"
        maxlength="5"
      />
    </div>
  </div>
  <div class="inp-div" style="border: none">
    <label for="billing-country-inp">country</label>
    <br />
    <select name="billing-country-inp" id="billing-country-inp">
      <option value="" disabled>Select your countryy</option>
      <option value="USA">United States of America</option>
    </select>
  </div>
  <div class="inp-div">
    <label for="billing-phone-inp">phone number(Optional)</label>
    <br />
    <input
      type="tel"
      name="billing-phone-inp"
      id="billing-phone-inp"
    />
  </div>
</div>
<button type="submit" class="noire-btn" id="save-payment">
  Save Card
</button>
<button type="button" class="noire-btn" id="cancel-payment">
  Cancel
</button>
</form>`;
const deleteCard = document.querySelectorAll(`#delete-card`);
const editCard = document.querySelectorAll(`#edit-card`);
//

// functions
const updatePref = document.querySelector(`#update-preferences`);
const addEmailPref = function (e) {
  e.preventDefault();
  let freqChecked = document.querySelector(
    'input[name="e-pref"]:checked'
  ).value;
  let reachYesNo = document.querySelector(
    'input[name="reach-out"]:checked'
  ).value;
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  let emailPrefObj = new createEmailPref(freqChecked, reachYesNo);
  console.log(user);
  user.emailPref = emailPrefObj;
  currentUser = user;
  localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
  sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
  document
    .querySelector(`#username-holder`)
    .insertAdjacentHTML(
      `afterend`,
      `<h2 style="color:var(--secondary-color);text-align:center; font-size:18px;">email preferences Updated, Please Wait</h2>`
    );
  setTimeout(() => {
    location.reload();
  }, 2000);
};
const populateEmailPref = function () {
  if (currentUser.emailPref && updatePref) {
    document.querySelector(
      `#${currentUser.emailPref.newsFrequency}`
    ).checked = true;
    document.querySelector(
      `#${currentUser.emailPref.partnerReach}`
    ).checked = true;
  }
};
populateEmailPref();

updatePref?.addEventListener(`click`, addEmailPref);
//
const populateBillForm = function (object) {
  billingCardHolder.value = object.cardHolder;
  billingCardNumber.value = object.cardNumber;
  billingCardExp.value = object.cardExp;
  billingCardCVV.value = ``;
  billingFirst.value = object.billFirst;
  billingLast.value = object.billLast;
  billingAddress.value = object.billAddressOne;
  billingAddressTwo.value = object.billAddressTwo;
  billingCity.value = object.billCity;
  billingState.value = object.billState.toUpperCase();
  billingZip.value = object.billZip;
  billingCountry.value = object.billCountry.toUpperCase();
  billingNumber.value == object.billNumber;
};
const addCardForm = function (e) {
  e.preventDefault();
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  const saveCard = function (event) {
    event.preventDefault();
    console.log(user);
    let card = new createPayment(
      billingCardHolder?.value,
      billingCardNumber?.value,
      billingCardExp?.value,
      billingCardCVV?.value,
      billingFirst?.value,
      billingLast?.value,
      billingAddress?.value,
      billingAddressTwo?.value,
      billingCity?.value,
      billingState?.value.toUpperCase(),
      billingZip?.value,
      billingCountry?.value.toUpperCase(),
      billingNumber?.value
    );
    // pushing card into array
    if (user.paymentInfo?.length >= 3) {
      alert(`delete one method if you want to add more`);
      return;
    } else if (user.paymentInfo) {
      user.paymentInfo.push(card);
    } else if (user.paymentInfo == undefined || user.paymentInfo == null) {
      user.paymentInfo = [card];
    }
    currentUser = user;
    localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
    sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
    location.reload();
  };
  // addCard.classList.add(`fade-out`);
  addCard.insertAdjacentHTML(`afterend`, addFormBill);
  addCard.classList.add(`hidden`);
  settingVariablesBill();
  console.log(savePayment);
  savePayment?.addEventListener(`click`, saveCard);
};

//

const populateShipForm = function (object) {
  shippingFirst.value = object.shipFirst;
  shippingLast.value = object.shipLast;
  shippingAddress.value = object.shipAddOne;
  shippingAddressTwo.value = object?.shipAddTwo;
  shippingCity.value = object.shipCity;
  shippingState.value = object.shipState;
  shippingZip.value = object.shipZip;
  shippingCountry.value = object.shipCountry;
  shippingNumber.valuie = object?.shipNumber;
  updateShipping = document.querySelector(`#update-shipping`);
  cancelUpdate = document.querySelector(`#cancel-update-shipping`);
};
// implementation
addCard?.addEventListener(`click`, addCardForm);

//
const addFormShip = `<form action="" id="shipping-info" class="fade-in">
<div class="user-div"> 
  <div class="inp-div">
    <label for="shipping-first-inp"> first name</label>
    <input
      type="text"
      name="shipping-first-inp"
      id="shipping-first-inp"
    />
  </div>
  <div class="inp-div">
    <label for="shipping-last-inp"> last name</label>
    <input
      type="text"
      name="shipping-last-inp"
      id="shipping-last-inp"
    />
  </div>
  <div class="inp-div">
    <label for="shipping-address-inp">address</label> <br>
    <input
      type="text"
      name="shipping-address-inp"
      id="shipping-address-inp"
    />
  </div>
  <div class="inp-div">
    <label for="shipping-address-2-inp"
      >address 2(Optional)</label
    >
    <input
      type="text"
      name="shipping-address-2-inp"
      id="shipping-address-2-inp"
    />
  </div>
  <div class="inp-div">
    <label for="shipping-city-inp">city</label>
    <br />
    <input
      type="text"
      name="shipping-city-inp"
      id="shipping-city-inp"
    />
  </div>
  <div class="inp-div-inner">
    <div class="inp-div" style="border: none; width: 55%">
      <label for="shipping-state-inp">state</label>
      <br />
      <select name="shipping-state-inp" id="shipping-state-inp">
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
    </div>
    <div class="inp-div" style="width: 15%">
      <label for="shipping-zip-inp">zipcode</label>
      <input
        type="text"
        name="shipping-zip-inp"
        id="shipping-zip-inp"
        maxlength="5"
      />
    </div>
  </div>
  <div class="inp-div" style="border: none">
    <label for="shipping-country-inp">country</label>
    <br />
    <select
      name="shipping-country-inp"
      id="shipping-country-inp"
    >
      <option value="" disabled>Select your countryy</option>
      <option value="USA">United States of America</option>
    </select>
  </div>
  <div class="inp-div">
    <label for="shipping-phone-inp"
      >phone number(Optional)</label
    >
    <br />
    <input
      type="tel"
      name="shipping-phone-inp"
      id="shipping-phone-inp"
    />
  </div>
</div>
<button type="submit" class="noire-btn" id="update-shipping">
  Save
</button>
<button type="submit" class="noire-btn" id="cancel-update-shipping">
  Cancel
</button>


</form>`;
let deleteShipping;
let editShipping;
const shippingContainer = document.querySelector(`#shipping`);
let addAddress = document.querySelector(`#add-address`);
let shippingFirst = document.querySelector(`#shipping-first-inp`);
let shippingLast = document.querySelector(`#shipping-last-inp`);
let shippingAddress = document.querySelector(`#shipping-address-inp`);
let shippingAddressTwo = document.querySelector(`#shipping-address-2-inp`);
let shippingCity = document.querySelector(`#shipping-city-inp`);
let shippingState = document.querySelector(`#shipping-state-inp`);
let shippingZip = document.querySelector(`#shipping-zip-inp`);
let shippingCountry = document.querySelector(`#shipping-country-inp`);
let shippingNumber = document.querySelector(`#shipping-phone-inp`);
let updateShipping = document.querySelector(`#update-shipping`);
let cancelUpdate = document.querySelector(`#cancel-update-shipping`);
// functions
const addShipForm = function (e) {
  e.preventDefault();
  addAddress.insertAdjacentHTML(`afterend`, addFormShip);
  addAddress.classList.add(`hidden`);
  const settingVar = function () {
    addAddress = document.querySelector(`#add-address`);
    shippingFirst = document.querySelector(`#shipping-first-inp`);
    shippingLast = document.querySelector(`#shipping-last-inp`);
    shippingAddress = document.querySelector(`#shipping-address-inp`);
    shippingAddressTwo = document.querySelector(`#shipping-address-2-inp`);
    shippingCity = document.querySelector(`#shipping-city-inp`);
    shippingState = document.querySelector(`#shipping-state-inp`);
    shippingZip = document.querySelector(`#shipping-zip-inp`);
    shippingCountry = document.querySelector(`#shipping-country-inp`);
    shippingNumber = document.querySelector(`#shipping-phone-inp`);
    updateShipping = document.querySelector(`#update-shipping`);
    cancelUpdate = document.querySelector(`#cancel-update-shipping`);
    // event listener
    updateShipping?.addEventListener(`click`, createFirstShip);
  };
  setTimeout(settingVar, 500);
};
const createFirstShip = function (e) {
  e.preventDefault();
  let user;
  let shipping = new createShipping(
    shippingFirst?.value.toLowerCase(),
    shippingLast?.value.toLowerCase(),
    shippingAddress?.value.toLowerCase(),
    shippingAddressTwo?.value.toLowerCase(),
    shippingCity?.value.toLowerCase(),
    shippingState?.value,
    shippingZip?.value.toLowerCase(),
    shippingCountry?.value,
    shippingNumber?.value.toLowerCase()
  );
  // find user
  //
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  //
  if (user.shippingInfo?.length >= 3) {
    alert(`delete one method if you want to add more`);
    return;
  } else if (user.shippingInfo) {
    user.shippingInfo.push(shipping);
  } else if (user.shippingInfo == undefined || user.shippingInfo == null) {
    user.shippingInfo = [shipping];
  }

  currentUser = user;
  localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
  sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
  location.reload();
};
const populateShip = function () {
  let shippingPrimaryTemplate = `<div class="shipping-info" id="shipping-primary">
<h2>${
    currentUser.shippingInfo?.[0]?.shipFirst +
    ` ` +
    currentUser.shippingInfo?.[0]?.shipLast
  } </h2>
<div id="info-small">
  <h3 id="street">${currentUser.shippingInfo?.[0]?.shipAddOne}</h3>
  <h3 id="zip">${
    currentUser.shippingInfo?.[0]?.shipCity +
    `,` +
    currentUser.shippingInfo?.[0]?.shipState.toUpperCase() +
    ` ` +
    currentUser.shippingInfo?.[0]?.shipZip
  }</h3>
  <h3>Primary address</h3>
  <h2 class="edit-delete" style="margin-left: 0px">
    <span id="edit-shipping" data-info=0>edit</span>|<span id="delete-shipping" data-info=0
      >delete</span
    >
  </h2>
</div>
</div>`;
  if (currentUser.shippingInfo?.length > 0) {
    shippingContainer?.insertAdjacentHTML(`afterend`, shippingPrimaryTemplate);
  }
  if (currentUser.shippingInfo?.length > 1) {
    for (let i = 1; i + 1 <= currentUser.shippingInfo.length; i++) {
      let shippingTemplate = `<div class="shipping-info" id="shipping-secondary" style="width:100%">
     <h2>${
       currentUser.shippingInfo?.[i].shipFirst +
       ` ` +
       currentUser.shippingInfo?.[i].shipLast
     } </h2>
      <div id="info-small">
        <h3 id="street">${currentUser.shippingInfo?.[i].shipAddOne}</h3>
        <h3 id="zip">${
          currentUser.shippingInfo?.[i].shipCity +
          `,` +
          currentUser.shippingInfo?.[i].shipState.toUpperCase() +
          ` ` +
          currentUser.shippingInfo?.[i].shipZip
        }</h3>
        <h2 class="edit-delete" style="margin-left: 0px">
          <span id="edit-shipping" data-info=${i}>edit</span>|<span id="delete-shipping" data-info=${i}
            >delete</span
          >
        </h2>
      </div>
      </div>`;

      document
        .querySelector(`#shipping-primary`)
        ?.insertAdjacentHTML(`afterend`, shippingTemplate);
    }
  }
  deleteShipping = document.querySelectorAll(`#delete-shipping`);
  editShipping = document.querySelectorAll(`#edit-shipping`);
};
const deleteShip = function (e) {
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });

  index = e.target.dataset.info;
  user.shippingInfo.splice(index, 1);
  currentUser = user;
  localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
  sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
  location.reload();
};
const deletePayment = function (e) {
  e.preventDefault();

  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  index = e.target.dataset.info;
  user.paymentInfo.splice(index, 1);
  currentUser = user;
  localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
  sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
  location.reload();
};

const editShip = function (e) {
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });

  const saveEdit = function (e) {
    e.preventDefault();
    user.shippingInfo[index].shipFirst = shippingFirst.value;
    user.shippingInfo[index].shipLast = shippingLast.value;
    user.shippingInfo[index].shipAddOne = shippingAddress.value;
    user.shippingInfo[index].shipAddTwo = shippingAddressTwo.value;
    user.shippingInfo[index].shipCity = shippingCity.value;
    user.shippingInfo[index].shipState = shippingState.value;
    user.shippingInfo[index].shipZip = shippingZip.value;
    user.shippingInfo[index].shipCountry = shippingCountry.value;
    user.shippingInfo[index].shipNumber = shippingNumber.value;
    currentUser = user;
    localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
    sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
    document
      .querySelector(`.fade-in`)
      .insertAdjacentHTML(
        `beforebegin`,
        `<h2 style="color:var(--secondary-color);text-align:center; font-size:18px;">Shipping Information Updated, Please Wait</h2>`
      );
    setTimeout(function () {
      location.reload();
    }, 2000);
  };
  parent = e.target.parentNode.parentNode.parentNode;
  index = e.target.dataset.info;
  item = user.shippingInfo[index];
  parent.insertAdjacentHTML(`afterend`, addFormShip);
  settingVariables();
  populateShipForm(item);
  updateShipping.addEventListener(`click`, saveEdit);
  cancelUpdate.addEventListener(`click`, function (e) {
    e.preventDefault();
    location.reload();
  });
};
const editPayment = function (e) {
  e.preventDefault();
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  const saveCardEdit = function (e) {
    e.preventDefault();
    user.paymentInfo[index].cardHolder = billingCardHolder.value;
    user.paymentInfo[index].cardNumber = billingCardNumber.value;
    user.paymentInfo[index].cardExp = billingCardExp.value;
    user.paymentInfo[index].cardCVV = billingCardCVV.value;
    user.paymentInfo[index].billFirst = billingFirst.value;
    user.paymentInfo[index].billLast = billingLast.value;
    user.paymentInfo[index].billAddressOne = billingAddress.value;
    user.paymentInfo[index].billAddressTwo = billingAddressTwo.value;
    user.paymentInfo[index].billCity = billingCity.value;
    user.paymentInfo[index].billState = billingState.value;
    user.paymentInfo[index].billZip = billingZip.value;
    user.paymentInfo[index].billCountry = billingCountry.value;
    user.paymentInfo[index].billNumber = billingNumber.value;
    if (user.paymentInfo[index].cardNumber[0] == 4) {
      user.paymentInfo[index]._cardType = `visa`;
    } else if (user.paymentInfo[index].cardNumber[0] == 6) {
      user.paymentInfo[index]._cardType = `discover`;
    } else if (user.paymentInfo[index].cardNumber[0] == 5) {
      user.paymentInfo[index]._cardType = `mastercard`;
    } else {
      user.paymentInfo[index]._cardType = `placeholder`;
    }

    //
    //   if (number == 4) {
    //     return `visa`;
    //   } else if (number == 6) {
    //     return `discover`;
    //   } else if (number == 5) {
    //     return `mastercard`;
    //   } else return `placeholder`;
    // }

    //
    // user.paymentInfo[index]._cardType = user.paymentInfo[index].cardType();
    currentUser = user;
    localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
    sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
    document
      .querySelector(`.fade-in`)
      .insertAdjacentHTML(
        `beforebegin`,
        `<h2 style="color:var(--secondary-color);text-align:center; font-size:18px;">Billing Information Updated, Please Wait</h2>`
      );

    setTimeout(function () {
      location.reload();
    }, 2000);
  };
  itemHolder = e.target.parentNode.parentNode;
  index = e.target.dataset.info;
  item = user.paymentInfo[index];
  console.log(item);
  itemHolder.insertAdjacentHTML(`afterend`, addFormBill);
  settingVariablesBill();
  populateBillForm(item);
  savePayment.addEventListener(`click`, saveCardEdit);
  cancelPayment.addEventListener(`click`, function (e) {
    e.preventDefault();
    location.reload();
  });
};
populateShip();
// next i want to work on either payment methods next or finish up the edit,delete and add set card as primary
// implementation
addAddress?.addEventListener(`click`, addShipForm);
//
deleteShipping?.forEach(function (deleteBtn) {
  deleteBtn.addEventListener(`click`, deleteShip);
});
editShipping?.forEach(function (editBtn) {
  editBtn.addEventListener(`click`, editShip);
});
editCard?.forEach(function (editBtn) {
  editBtn.addEventListener(`click`, editPayment);
});
deleteCard?.forEach(function (deleteBtn) {
  deleteBtn.addEventListener(`click`, deletePayment);
});
//////
//set new pass
const currPass = document.querySelector(`#verify-pass`);
const newPass = document.querySelector(`#new-pass`);
const verifyNewPass = document.querySelector(`#verify-new-pass`);
const updatePass = document.querySelector(`#update-password`);
const passInpDivs = Array.from(document.querySelectorAll(`.inp-div`));
// func
const setNewPass = function (e) {
  e.preventDefault();
  let user;
  usersObj.usersArray.forEach(function (obj) {
    if (obj.userID == currentUser.userID) {
      user = obj;
    }
  });
  console.log(user);
  console.log();

  if (currPass.value !== currentUser.password) {
    passInpDivs[0].insertAdjacentHTML(
      `afterend`,
      `<h2 class="error-text fade-in">wrong password</h2>`
    );
    return;
  } else if (
    newPass.value.includes(` `) ||
    newPass.value.length < 8 ||
    newPass.value.length > 32 ||
    // spreads the password then checks if it contains one of the elements from the validSpecialCharactersPassword Array using the !(NOT) operator
    ![...newPass.value].some((i) =>
      validSpecialCharactersPassword.includes(i)
    ) ||
    ![...newPass.value].some((i) => capitals.includes(i)) ||
    [...newPass.value].some((i) => digits.includes(i))
  ) {
    passInpDivs[1].insertAdjacentHTML(
      `afterend`,
      `
      <h2 class="error-text" style="font-size:18px; ">
        password must Be Between 8-32 Characters
      </h2>
      <h2 class="error-text" style="font-size:18px;" >
        must include atleast one number , special character and
        capital letter
      </h2>

   `
    );
    return;
  } else if (newPass.value !== verifyNewPass.value) {
    passInpDivs[2].insertAdjacentHTML(
      `afterend`,
      `<h2 class="error-text"> Passwords don't match</h2>`
    );
    return;
  } else {
    user.password = verifyNewPass.value;
    currentUser = user;
    localStorage.setItem(`localUsersObject`, JSON.stringify(usersObj));
    sessionStorage.setItem(`currentSessionUserKey`, JSON.stringify(user));
    document
      .querySelector(`#reset-pass-holder`)
      .insertAdjacentHTML(
        `afterend`,
        `<h2 class="success-text"> new password set,please wait</h2>`
      );
    setTimeout(function () {
      location.href = `/account/profile.html`;
    }, 1000);
  }
};

updatePass?.addEventListener(`click`, setNewPass);
