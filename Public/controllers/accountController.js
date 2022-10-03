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
    // const newInfo = { hi: updateData[0][1].toLowerCase(), bye: 'bimi' };
    console.log(newInfo);
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
AccountView.infoBasic.addEventListener('submit', updateBasic);
console.log('hellow');
