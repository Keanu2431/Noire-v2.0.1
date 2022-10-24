const cartRemove = document.querySelectorAll('.cart-remove');
const checkoutBtn = document.querySelector('.check-out__btn');
import * as CONFIG from '../config.js';
// functions
const removeCart = async (e) => {
  try {
    const productCont = e.target.parentElement;
    console.log(productCont);
    const pid = e.target.parentElement.dataset.pid;
    console.log(pid);
    const resData = await axios({
      url: CONFIG.REMOVE_CART,
      method: 'DELETE',
      data: { pid: pid },
    });
    productCont.remove();
  } catch (error) {
    console.error(error);
  }
};
const goCheckout = async () => {
  const resData = await axios({ method: 'GET', url: CONFIG.CHECKOUT });
  console.log(resData.data);
  window.location.href = resData.data.session_url;
};
cartRemove.forEach((el) => el.addEventListener('click', removeCart));
checkoutBtn?.addEventListener('click', goCheckout);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// qty button
jQuery(document).ready(($) => {
  $('.quantity').on('click', '.plus', function (e) {
    let $input = $(this).prev('input.qty__cart');
    let val = parseInt($input.val());
    $input.val(val + 1).change();
  });

  $('.quantity').on('click', '.minus', function (e) {
    let $input = $(this).next('input.qty__cart');
    var val = parseInt($input.val());
    if (val > 0) {
      $input.val(val - 1).change();
    }
  });
});
