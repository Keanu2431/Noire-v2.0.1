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
const shipTemp = `
<div class="shipping-info" id="shipping-primary">
<h2>keanu lumpkin </h2>
<div id="info-small">
  <h3 id="street">530 east 99th street</h3>
  <h3 id="zip">brooklyn,NY 11236</h3>
  <h3>Primary address</h3>
  <h2 class="edit-delete" style="margin-left: 0px">
    <span id="edit-shipping" data-info="0">edit</span>|<span id="delete-shipping" data-info="0">delete</span>
  </h2>
</div>
</div>`;
const secTemp = `
<div class="shipping-info" id="shipping-secondary" style="width:100%">
     <h2>keanu lumpkin </h2>
      <div id="info-small">
        <h3 id="street">530 east 99th street</h3>
        <h3 id="zip">brooklyn,NY 11236</h3>
        <h2 class="edit-delete" style="margin-left: 0px">
          <span id="edit-shipping" data-info="1">edit</span>|<span id="delete-shipping" data-info="1">delete</span>
        </h2>
      </div>
</div>`;
