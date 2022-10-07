class AccountView {
  constructor() {}
  infoBasic = document.querySelector('#user-info');
  addCard = document.querySelector('#add-card');
  addShip = document.querySelector('#add-address');
  addCardForm = `<form
  action=""
  class="set-card-information fade-in"
  id="add-payment-form"
  >
  <h2 class="standard-text">card information</h2>
  <h2 class="standard-text hidden" id='card-err' style="color:red; text-align:center;">card information</h2>
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
      <br/>
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
      <br/>
      <input
        type="text"
        name="billing-first-inp"
        id="billing-first-inp"
      />
    </div>
    <div class="inp-div">
      <label for="billing-last-inp"> last name</label>
      <br/>
      <input
        type="text"
        name="billing-last-inp"
        id="billing-last-inp"
      />
    </div>
    <div class="inp-div">
      <label for="billing-address-inp">address</label>
      <br/>
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
  addShipForm = `<form action="" id="shipping-form">
  <div class="user-div"> 
    <div class="inp-div">
      <label for="shipping-first-inp"> first name</label>
      <br/>
      <input
        type="text"
        name="shipping-first-inp"
        id="shipping-first-inp"
      />
    </div>
    <div class="inp-div">
      <label for="shipping-last-inp"> last name</label>
      <br/>
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
  <button type="submit" class="noire-btn" id="save-shipping">
    Save
  </button>
</form>`;
  editCardForm = `<form
  action=""
  class="set-card-information fade-in"
  id="edit-payment-form"
  >
  <h2 class="standard-text">card information</h2>
  <h2 class="standard-text hidden" id='card-err' style="color:red; text-align:center;">card information</h2>
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
      <br/>
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
      <br/>
      <input
        type="text"
        name="billing-first-inp"
        id="billing-first-inp"
      />
    </div>
    <div class="inp-div">
      <label for="billing-last-inp"> last name</label>
      <br/>
      <input
        type="text"
        name="billing-last-inp"
        id="billing-last-inp"
      />
    </div>
    <div class="inp-div">
      <label for="billing-address-inp">address</label>
      <br/>
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
  cardFormEl = document.querySelector('#add-payment-form');
  cancelCard = document.querySelector('#cancel-payment');
  paymentItem = document.querySelectorAll('.payment-item');
  deleteCard = document.querySelectorAll('#delete-card');
  editCard = document.querySelectorAll('#edit-card');
  populateTemp = (el, index = 0) => {
    return `
<div class="payment-item">
      <div class="payment-row-0">
        <img src="/Images/Card Placeholder/card-${
          String(el.cardNumber).slice(0, 1) != 4 ||
          String(el.cardNumber).slice(0, 1) != 5 ||
          String(el.cardNumber).slice(0, 1) != 6
            ? String(el.cardNumber).slice(0, 1)
            : 0
        }.png" alt="" srcset="" class="payment-img">

        <div class="card-info">
          <h2>${el.cardHolder}</h2>
          <h2>************${String(el.cardNumber).slice(-4)}</h2>
          <h2>${el.expiration}</h2>
        </div>
      </div>
      <h2 class="edit-delete">
       
        <span id="delete-card" data-info="${index}">delete</span>
      </h2>
    </div>
`;
    string = ` <span id="edit-card" data-info="${index}">edit</span> |`;
  };
  populateEditTemp = (card) => {
    return `<form
    action=""
    class="set-card-information fade-in"
    id="edit-payment-form"
    >
    <h2 class="standard-text">card information</h2>
    <h2 class="standard-text hidden" id='card-err' style="color:red; text-align:center;">card information</h2>
    <div class="user-div">
      <div class="inp-div">
        <label for="card-holder-inp">Card holder</label>
        <input
          type="text"
          name="card-holder-inp"
          id="card-holder-inp"
          value="${card.cardHolder}"
        />
      </div>
      <div class="inp-div">
        <label for="card-number-inp">Card Number</label>
        <input
          disabled
          maxlength="16"
          type="string"
          name="card-number-inp"
          id="card-number-inp"
          value="************${card.lastFour}"
        />
      </div>
      <div class="inp-div">
        <label for="card-exp-inp"> expiration</label>
        <br/>
        <input type="text" value="${card.expiration}" name="card-exp-inp" id="card-exp-inp"  placeholder="MM/YY" maxlength="5"/>
      </div>
      <div class="inp-div">
        <label for="card-cvv-inp"> security code</label>
        <input
          disabled
          maxlength="4"
          type="text"
          name="card-cvv-inp"
          id="card-cvv-inp"
          value="***"
        />
      </div>
      <h2 class="standard-text">billing</h2>
      <br />
      <div class="inp-div">
        <label for="billing-first-inp"> first name</label>
        <br/>
        <input
          type="text"
          name="billing-first-inp"
          id="billing-first-inp"
          value="${card.firstName}"
        />
      </div>
      <div class="inp-div">
        <label for="billing-last-inp"> last name</label>
        <br/>
        <input
          type="text"
          name="billing-last-inp"
          id="billing-last-inp"
          value="${card.lastName}"
        />
      </div>
      <div class="inp-div">
        <label for="billing-address-inp">address</label>
        <br/>
        <input
          type="text"
          name="billing-address-inp"
          id="billing-address-inp"
          value="${card.addressOne}"

        />
      </div>
      <div class="inp-div">
        <label for="billing-address-2-inp">address 2(Optional)</label>
        <input
          type="text"
          name="billing-address-2-inp"
          id="billing-address-2-inp"
          value="${card.addressTwo}"

        />
      </div>
      <div class="inp-div">
        <label for="billing-city-inp">city</label>
        <br />
        <input
          type="text"
          name="billing-city-inp"
          id="billing-city-inp"
          value="${card.city}"

        />
      </div>
      <div class="inp-div-inner">
        <div class="inp-div" style="border: none; width: 55%">
          <label for="state-inp">state</label>
          <br />
          <select name="state-inp" id="billing-state-inp" value="${card.state}">
            <option value="${card.state}" selected >${card.state}</option>
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
          value="${card.zipcode}"

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
          value="${card.billingPhone}"

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
  };
}
export default new AccountView();
