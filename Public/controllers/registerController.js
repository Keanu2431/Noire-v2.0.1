import RegisterView from '../views/registerView.js';
import * as mainModel from '../model/mainModel.js';

const form = document.querySelector('#register-form');
const registerBtn = document.querySelector('#register-submit-btn');
console.log(form);
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  //   alert('sub');
  const registerData = [...new FormData(form).entries()];
  const user = {
    emailAddress: registerData[0][1].toLowerCase(),
    userName: registerData[1][1].toLowerCase(),
    password: registerData[2][1],
  };
  console.log(user);
  console.log(JSON.stringify(user));
  const resData = await fetch('http://127.0.0.1:3000/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
  mainModel.state.user = resData.user;

  console.log(mainModel);
});
//   console.log();
//   fetch('http://127.0.0.1:3000/products/')
//   .then((data) => data.json())
//   .then((data) => console.log(data));

// registerBtn?.addEventListener('click', function (e) {
//   console.log(e);
//   e.preventDefault();
//   const data = new FormData(form);
//   console.log(data);
// });
