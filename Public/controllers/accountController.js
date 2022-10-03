import AccountView from '../views/accountView.js';
import * as CONFIG from '../config.js';

console.log(AccountView);
const updateBasic = async (e) => {
  try {
    e.preventDefault();
    const updateData = [...new FormData(this).entries()];
    console.log(updateData);
    const newInfo = {
      firstName: updateData[0][1].toLowerCase(),
      lastName: updateData[1][1].toLowerCase(),
      phoneNumber: updateData[3][1].toString(),
      birthDay: updateData[4][1],
      braSize: updateData[5][1].toUpperCase(),
      braletteSize: updateData[6][1].toUpperCase(),
      pantySize: updateData[7][1].toUpperCase(),
      lingerieSize: updateData[8][1].toUpperCase(),
    };
    const resData = await axios({
      method: 'POST',
      url: CONFIG.UPDATE_BASIC_URL,
      data: newInfo,
    });
  } catch (error) {}
};
AccountView.infoBasic.addEventListener('submit', updateBasic);
console.log('hellow');
