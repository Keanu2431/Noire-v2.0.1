import * as CONFIG from '../config.js';
const cartBadge = document.querySelector('.bag-badge');

const addToCartBtn = document.querySelector('.add-cart');
const addToCart = async function (e) {
  try {
    let entries = [
      ...new FormData(document.querySelector('#myform')).entries(),
    ].flat()[1];
    // entries = entries[1];
    const url = new URL(window.location.href);

    const sendData = {
      ProductID: url.pathname.split('/')[4],
      color: url.searchParams.get('color'),
      size: url.searchParams.get('size'),
      qty: Number(entries),
    };
    if (sendData.qty < 1) throw 'Require atleast one item';
    if (
      sendData.size == 'xs' ||
      sendData.size == 's' ||
      sendData.size == 'm' ||
      sendData.size == 'l' ||
      sendData.size == 'xl'
    ) {
      const resData = await axios({
        method: 'POST',
        url: CONFIG.ADD_CART,
        data: sendData,
      });
      if (
        resData.data.status == 'success' &&
        !document.querySelector('.cart-success')
      ) {
        addToCartBtn.insertAdjacentHTML(
          'afterend',
          "<h2 class='cart-success'>Successfully Added</h2> "
        );
      }
    } else throw 'Require a size';
    cartBadge.textContent = Number(cartBadge.textContent) + 1;
  } catch (error) {
    addToCartBtn.insertAdjacentHTML(
      'afterend',
      `<h2 class='cart-success'>${error}</h2> `
    );
    console.log(error);
  }
};
const toastElList = document.querySelectorAll('.toast');

const toastList = [...toastElList].map(
  (toastEl) => new bootstrap.Toast(toastEl, { autohide: false })
);

// qty button
jQuery(document).ready(($) => {
  $('.quantity').on('click', '.plus', function (e) {
    let $input = $(this).prev('input.qty');
    let val = parseInt($input.val());
    $input.val(val + 1).change();
  });

  $('.quantity').on('click', '.minus', function (e) {
    let $input = $(this).next('input.qty');
    var val = parseInt($input.val());
    if (val > 0) {
      $input.val(val - 1).change();
    }
  });
});
const form = document.querySelector('#myform');
// [... new FormData(form).entries()]
// switching image on hover
const imagesArr = document.querySelectorAll('.product-item-image');
const overviewImage = document.querySelector(
  '.item-container-left-inner-right'
);
const leftImages = document.querySelectorAll('.left-grid-item');
const switchImage = async function (e) {
  const target = e.target;
  let originalImg = target.src;
  let newImg = target.dataset.secondImg;
  if (newImg.includes('undefined')) return;
  target.src = newImg;
  target.addEventListener('mouseout', function (e) {
    e.target.src = originalImg;
  });
};
const switchImageOverview = async function (e) {
  let newSource = e.target.src;
  leftImages.forEach((el) => el.classList.remove('selected-left-item'));
  e.target.classList.add('selected-left-item');
  overviewImage.src = newSource;
};
leftImages.forEach((el) =>
  el.addEventListener('mouseover', switchImageOverview)
);
imagesArr.forEach((el) => el.addEventListener('mouseover', switchImage));
addToCartBtn?.addEventListener('click', addToCart);
